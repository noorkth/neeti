import nodemailer from 'nodemailer'

// ── Server-side rate limiter ──────────────────────────────────────────────────
// Simple in-memory store.  Works per-serverless-instance; sufficient for a
// low-traffic appointment form without needing an external store like Redis.
//
// Schema: Map<ip, { count: number, windowStart: number }>
const RATE_LIMIT_MAP = new Map()
const MAX_ATTEMPTS   = 3          // max submissions per window
const WINDOW_MS      = 60 * 60 * 1000  // 1 hour in ms

function getRateLimitResult(ip) {
  const now    = Date.now()
  const record = RATE_LIMIT_MAP.get(ip)

  if (!record || now - record.windowStart >= WINDOW_MS) {
    // First request or window has expired — start fresh
    RATE_LIMIT_MAP.set(ip, { count: 1, windowStart: now })
    return { blocked: false, attemptsLeft: MAX_ATTEMPTS - 1, retryAfter: null }
  }

  if (record.count >= MAX_ATTEMPTS) {
    // Still within the block window
    const retryAfter = record.windowStart + WINDOW_MS
    return { blocked: true, attemptsLeft: 0, retryAfter }
  }

  // Increment counter within existing window
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

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
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
      retryAfter,           // Unix ms timestamp when the block lifts
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
  } = req.body

  // Basic validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,       // e.g. neeti2020k@gmail.com
        pass: process.env.GMAIL_APP_PASSWORD, // 16-char Google App Password
      },
    })

    await transporter.sendMail({
      from: `"Neeti Nutrition Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // sends to yourself
      replyTo: email,             // so you can reply directly to the client
      subject: `New Consultation Request — ${consultationType || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a7c59; border-bottom: 2px solid #4a7c59; padding-bottom: 10px;">
            New Consultation Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold; width: 160px;">Name</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Email</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold;">Phone</td>
              <td style="padding: 10px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Age</td>
              <td style="padding: 10px;">${age || '—'}</td>
            </tr>
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold;">Gender</td>
              <td style="padding: 10px;">${gender || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold;">Consultation Type</td>
              <td style="padding: 10px;">${consultationType || '—'}</td>
            </tr>
            <tr style="background: #f5f9f6;">
              <td style="padding: 10px; font-weight: bold;">Health Goal</td>
              <td style="padding: 10px;">${healthGoal || '—'}</td>
            </tr>
          </table>

          ${message ? `
          <div style="margin-top: 20px; padding: 15px; background: #f5f9f6; border-left: 4px solid #4a7c59; border-radius: 4px;">
            <strong>Additional Information:</strong>
            <p style="margin-top: 8px; color: #444;">${message}</p>
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
