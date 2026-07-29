import nodemailer from 'nodemailer'

// ── Allowed origins ───────────────────────────────────────────────────────────
// Add your Vercel production domain AND any preview domains you want to allow.
// Keep VITE_ prefix out of here — this is server-only code.
const ALLOWED_ORIGINS = new Set([
  'https://neetikayastha.com.np',
  'https://www.neetikayastha.com.np',
  // During Vercel preview deployments the origin is a *.vercel.app subdomain.
  // Remove the line below once you have a stable production domain.
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean))

// ── Payload size limit ────────────────────────────────────────────────────────
const MAX_BODY_BYTES = 16 * 1024  // 16 KB — more than enough for a contact form

// ── Server-side rate limiter ──────────────────────────────────────────────────
// Simple in-memory store.  Works per-serverless-instance; sufficient for a
// low-traffic appointment form without needing an external store like Redis.
//
// Schema: Map<ip, { count: number, windowStart: number }>
const RATE_LIMIT_MAP = new Map()
const MAX_ATTEMPTS   = 3               // max submissions per window
const WINDOW_MS      = 60 * 60 * 1000  // 1 hour in ms

function getRateLimitResult(ip) {
  const now    = Date.now()
  const record = RATE_LIMIT_MAP.get(ip)

  if (!record || now - record.windowStart >= WINDOW_MS) {
    RATE_LIMIT_MAP.set(ip, { count: 1, windowStart: now })
    return { blocked: false, attemptsLeft: MAX_ATTEMPTS - 1, retryAfter: null }
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfter = record.windowStart + WINDOW_MS
    return { blocked: true, attemptsLeft: 0, retryAfter }
  }

  record.count += 1
  RATE_LIMIT_MAP.set(ip, record)
  return { blocked: false, attemptsLeft: MAX_ATTEMPTS - record.count, retryAfter: null }
}

// Periodically purge stale entries so the Map doesn't grow unbounded
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of RATE_LIMIT_MAP.entries()) {
    if (now - record.windowStart >= WINDOW_MS) RATE_LIMIT_MAP.delete(ip)
  }
}, WINDOW_MS)

// ── HTML escaping helper ──────────────────────────────────────────────────────
// Prevents user-supplied data from injecting HTML into the email body.
function escHtml(str) {
  if (str == null) return ''
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
}

// ── CORS preflight helper ─────────────────────────────────────────────────────
function setCORSHeaders(req, res) {
  const origin = req.headers['origin'] || ''
  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  setCORSHeaders(req, res)

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // ── Payload size guard ────────────────────────────────────────────────────
  const contentLength = parseInt(req.headers['content-length'] || '0', 10)
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Payload too large' })
  }

  // ── Rate limit check ──────────────────────────────────────────────────────
  // Vercel sets x-forwarded-for; fall back to socket address for local dev
  const ip = (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  )

  const { blocked, retryAfter } = getRateLimitResult(ip)
  if (blocked) {
    return res.status(429).json({
      error: 'Too many requests',
      retryAfter,  // Unix ms timestamp when the block lifts
    })
  }

  const {
    name,
    email,
    phone,
    age,
    gender,
    healthGoal,
    consultationType,
    message,
    website,  // honeypot field — must be empty
  } = req.body

  // ── Honeypot server-side check ────────────────────────────────────────────
  if (website) {
    // Bot detected — return 200 to avoid tipping it off
    return res.status(200).json({ success: true })
  }

  // ── Basic field validation ────────────────────────────────────────────────
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // ── Allowed consultation types / health goals (whitelist) ─────────────────
  const VALID_CONSULTATION_TYPES = new Set([
    'General Nutrition Consultation', 'Weight Management', 'PMOS Diet Planning',
    'Prenatal / Postnatal Nutrition', 'Metabolic Disease Management',
    'Therapeutic / Medical Nutrition', 'Sports Nutrition',
    'Pediatric Nutrition', 'Geriatric Nutrition', 'Corporate Wellness',
  ])
  const VALID_HEALTH_GOALS = new Set([
    'Lose Weight', 'Gain Weight / Build Muscle', 'Manage a Medical Condition',
    'Improve Energy & Vitality', 'Hormonal Balance (PMOS, Thyroid)',
    'Prenatal / Postnatal Support', 'Athletic Performance', 'General Healthy Eating',
  ])

  if (consultationType && !VALID_CONSULTATION_TYPES.has(consultationType)) {
    return res.status(400).json({ error: 'Invalid consultation type' })
  }
  if (healthGoal && !VALID_HEALTH_GOALS.has(healthGoal)) {
    return res.status(400).json({ error: 'Invalid health goal' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,        // e.g. neeti2020k@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char Google App Password
      },
    })

    // All user values are HTML-escaped before interpolation
    await transporter.sendMail({
      from:    `"Neeti Nutrition Website" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,
      replyTo: escHtml(email),
      subject: `New Consultation Request — ${escHtml(consultationType || 'General')}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a7c59; border-bottom: 2px solid #4a7c59; padding-bottom: 10px;">
            New Consultation Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold; width: 160px;">Name</td>
              <td style="padding: 10px;">${escHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email</td>
              <td style="padding: 10px;"><a href="mailto:${escHtml(email)}">${escHtml(email)}</a></td>
            </tr>
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold;">Phone</td>
              <td style="padding: 10px;">${escHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Age</td>
              <td style="padding: 10px;">${escHtml(age) || '—'}</td>
            </tr>
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold;">Gender</td>
              <td style="padding: 10px;">${escHtml(gender) || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Consultation Type</td>
              <td style="padding: 10px;">${escHtml(consultationType) || '—'}</td>
            </tr>
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold;">Health Goal</td>
              <td style="padding: 10px;">${escHtml(healthGoal) || '—'}</td>
            </tr>
          </table>

          ${message ? `
          <div style="margin-top: 20px; padding: 15px; background: #f5f9f6; border-left: 4px solid #4a7c59; border-radius: 4px;">
            <strong>Additional Information:</strong>
            <p style="margin-top: 8px; color: #444;">${escHtml(message)}</p>
          </div>` : ''}

          <p style="margin-top: 30px; color: #888; font-size: 12px;">
            Sent from your Neeti Nutrition website contact form.
          </p>
        </div>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Email send error:', error)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}
