import { useForm } from 'react-hook-form'
import { useState, useEffect, useRef } from 'react'
import { sendConsultationEmail, RateLimitError } from '../services/emailService'
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Calendar, MessageSquare } from 'lucide-react'

// ── Disposable / spam email domain blocklist ─────────────────────────────────
const BLOCKED_EMAIL_DOMAINS = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org',
  'guerrillamail.biz', 'guerrillamail.de', 'guerrillamail.info',
  'tempmail.com', 'temp-mail.org', 'temp-mail.io', 'throwam.com',
  'throwaway.email', 'trashmail.com', 'trashmail.net', 'trashmail.at',
  'trashmail.io', 'trashmail.me', 'trashmail.xyz', 'yopmail.com',
  'yopmail.fr', 'cool.fr.nf', 'jetable.fr.nf', 'nospam.ze.tc',
  'nomail.xl.cx', 'mega.zik.dj', 'speed.1s.fr', 'courriel.fr.nf',
  'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf',
  'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'spam4.me',
  'fakeinbox.com', 'maildrop.cc', 'dispostable.com', 'mailnull.com',
  'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org',
  'spamgourmet.com', 'spamspot.com', 'spamthisplease.com',
  'binkmail.com', 'bob.email', 'clrmail.com', 'discard.email',
  'discardmail.com', 'discardmail.de', 'drdrb.com', 'drdrb.net',
  'dump-email.info', 'dumpandforfeit.com', 'dumpmail.de',
  'emailondeck.com', 'emailsensei.com', 'fakemail.net', 'filzmail.com',
  'fleckens.hu', 'garbagemail.org', 'get2mail.fr', 'getonemail.com',
  'getonemail.net', 'hatespam.org', 'hidemail.de', 'hulapla.de',
  'ieatspam.eu', 'ieatspam.info', 'inoutmail.de', 'inoutmail.eu',
  'inoutmail.info', 'inoutmail.net', 'jetable.com', 'jetable.net',
  'jetable.org', 'klzlk.com', 'kurzepost.de', 'letthemeatspam.com',
  'lhsdv.com', 'lifebyfood.com', 'lol.ovpn.to', 'lortemail.dk',
  'lukop.dk', 'maileater.com', 'mailfreeonline.com',
  'mailguard.me', 'mailimate.com', 'mailmetrash.com', 'mailmoat.com',
  'mailnew.com', 'mailscrap.com', 'mailsiphon.com', 'mailslite.com',
  'mailzilla.com', 'mailzilla.org', 'mbx.cc', 'meltmail.com',
  'messagebeamer.de', 'mintemail.com', 'misterpinball.de',
  'mox.pp.ua', 'mt2009.com', 'mt2014.com', 'mytrashmail.com',
  'neomailbox.com', 'nepwk.com', 'nervmich.net', 'nervtmich.net',
  'netmails.com', 'netmails.net', 'netzidiot.de', 'nevermail.de',
  'no-spam.ws', 'nobulk.com', 'noclickemail.com', 'nogmailspam.info',
  'nospamfor.us', 'nospammail.net', 'notmailinator.com',
  'nwldx.com', 'odnorazovoe.ru', 'oneoffemail.com', 'oneoffmail.com',
  'onewaymail.com', 'pookmail.com', 'privy-mail.com',
  'proxymail.eu', 'punkass.com', 'putthisinyourspamdatabase.com',
  'qq.com', 'quickinbox.com', 'rcpt.at', 'recode.me',
  'regbypass.com', 'safetymail.info', 'safetypost.de', 'sandelf.de',
  'shiftmail.com', 'shitmail.me', 'shortmail.net', 'sibmail.com',
  'sinnlos-mail.de', 'slapsfromlastnight.com', 'slaskpost.se',
  'slave-auctions.net', 'slopsbox.com', 'smellfear.com',
  'snakemail.com', 'sneakemail.com', 'sneakmail.de', 'snkmail.com',
  'sofort-mail.de', 'sogetthis.com', 'soodonims.com', 'spam.la',
  'spam.su', 'spamail.de', 'spambob.com', 'spambob.net',
  'spambob.org', 'spamcannon.com', 'spamcannon.net',
  'spamcero.com', 'spamcon.org', 'spamcorptastic.com',
  'spamcowboy.com', 'spamcowboy.net', 'spamcowboy.org',
  'spamday.com', 'spamex.com', 'spamfree24.de', 'spamfree24.eu',
  'spamfree24.info', 'spamfree24.net', 'spamfree24.org',
  'spamfree.eu', 'spamgoes.in', 'spamherelots.com',
  'spamherelots.com', 'spamhereplease.com', 'spamhole.com',
  'spamify.com', 'spaminator.de', 'spamkill.info',
  'spaml.com', 'spaml.de', 'spammotel.com', 'spamoff.de',
  'spamotron.com', 'spamovore.com', 'spamox.com', 'spampoison.com',
  'spampop.net', 'spamtest.com', 'spamtrail.com', 'speed.1s.fr',
  'spikio.com', 'spoofmail.de', 'squizzy.de', 'squizzy.eu',
  'squizzy.net', 'stinkefinger.net', 'stuffmail.de',
  'supergreatmail.com', 'supermailer.jp', 'superstachel.de',
  'suremail.info', 'tafmail.com', 'tagyourself.com', 'teewars.org',
  'teleworm.com', 'teleworm.us', 'tempalias.com', 'tempe-mail.com',
  'tempemail.biz', 'tempemail.com', 'tempemail.net', 'tempemail.us',
  'tempinbox.co.uk', 'tempinbox.com', 'tempthe.net',
  'thankyou2010.com', 'thisisnotmyrealemail.com', 'throwam.com',
  'throwam.net', 'throwamsg.com', 'tmail.com', 'tmail.io',
  'tmailinator.com', 'toiea.com', 'trashdevil.com', 'trashdevil.de',
  'trashemail.de', 'trashimail.de', 'trashmail.at', 'trashmail.com',
  'trashmail.io', 'trashmail.me', 'trashmail.net', 'trashmailer.com',
  'trashmail.org', 'trashmail.xyz', 'trashmailer.com',
  'trbvm.com', 'turual.com', 'twinmail.de', 'tyldd.com',
  'uggsrock.com', 'umail.net', 'uroid.com', 'us.af',
  'venompen.com', 'veryrealemail.com', 'viditag.com',
  'viralplays.com', 'vpn.st', 'vsimcard.com', 'vubby.com',
  'wasteland.rfc822.org', 'webemail.me', 'webm4il.info',
  'weg-werf-email.de', 'wegwerfadresse.de', 'wegwerfemail.com',
  'wegwerfemail.de', 'wegwerfemail.net', 'wegwerfemail.org',
  'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org',
  'wegwerfmailadresse.de', 'wetrainbayarea.com', 'wetrainbayarea.org',
  'wh4f.org', 'whyspam.me', 'willhackforfood.biz',
  'willselfdestruct.com', 'wmail.cf', 'wollan.info',
  'wronghead.com', 'wuzupmail.net', 'xagloo.com', 'xemaps.com',
  'xents.com', 'xmaily.com', 'xoxy.net', 'xyzfree.net',
  'yapped.net', 'yeah.net', 'yogamaven.com', 'yopmail.com',
  'yopmail.fr', 'youmail.ga', 'ypmail.webarnak.fr.eu.org',
  'yuurok.com', 'z1p.biz', 'za.com', 'zebins.com',
  'zebins.eu', 'zehnminuten.de', 'zeitersetzung.net',
  'zippymail.info', 'zoemail.net', 'zoemail.org', 'zomg.info',
  'aa.com', 'aaa.com', 'test.com', 'example.com', 'example.net',
  'example.org', 'invalid.com', 'noemail.com', 'none.com',
  'nomail.com', 'no-reply.com', 'noreply.com', 'fake.com',
  'fakemail.com', 'dummy.com', 'spam.com', 'spamme.com',
])

/**
 * Returns an error string if the email is invalid or uses a blocked domain.
 * Returns true (valid) otherwise.
 */
function validateEmail(value) {
  if (!value) return 'Email is required'

  // Basic format: local@domain.tld  (no consecutive dots, no starting/ending dots)
  const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._%+\-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(value)) return 'Please enter a valid email address'

  const domain = value.split('@')[1].toLowerCase()

  // Block known disposable / spam domains
  if (BLOCKED_EMAIL_DOMAINS.has(domain)) {
    return 'Please use a real email address — disposable or temporary emails are not accepted'
  }

  // Reject suspiciously short TLDs combined with single-char local parts
  const [local] = value.split('@')
  if (local.length < 2) return 'Please enter a valid email address'

  return true
}

/**
 * Validates an international phone number.
 * Must start with + followed by a country code and 7–15 digits total.
 * Spaces, dashes, and parentheses are allowed as separators.
 */
function validatePhone(value) {
  if (!value) return 'Phone number is required'

  // Remove allowed formatting characters for digit count check
  const stripped = value.replace(/[\s\-().]/g, '')

  // Must start with + and a country code digit (1-9)
  if (!/^\+[1-9]/.test(stripped)) {
    return 'Include your country code (e.g. +977 9808531814 or +1 555 123 4567)'
  }

  // E.164: + followed by 7 to 15 digits
  if (!/^\+[0-9]{7,15}$/.test(stripped)) {
    return 'Phone number must be 7–15 digits after the country code'
  }

  return true
}

const consultationTypes = [
  'General Nutrition Consultation',
  'Weight Management',
  'PMOS Diet Planning',
  'Prenatal / Postnatal Nutrition',
  'Metabolic Disease Management',
  'Therapeutic / Medical Nutrition',
  'Sports Nutrition',
  'Pediatric Nutrition',
  'Geriatric Nutrition',
  'Corporate Wellness',
]

const healthGoals = [
  'Lose Weight',
  'Gain Weight / Build Muscle',
  'Manage a Medical Condition',
  'Improve Energy & Vitality',
  'Hormonal Balance (PMOS, Thyroid)',
  'Prenatal / Postnatal Support',
  'Athletic Performance',
  'General Healthy Eating',
]

/**
 * Consultation booking form.
 * Uses React Hook Form for validation.
 * Submits via EmailJS — configure credentials in /src/services/emailService.js
 */
// ── Client-side rate limit constants (mirrors server) ────────────────────────
const CL_MAX_ATTEMPTS = 3
const CL_WINDOW_MS    = 60 * 60 * 1000  // 1 hour
const LS_KEY_COUNT    = 'neeti_rl_count'
const LS_KEY_START    = 'neeti_rl_start'
const LS_KEY_BLOCKED  = 'neeti_rl_blocked_until'

/** Read & validate the current rate-limit state from localStorage. */
function getLocalRLState() {
  const blockedUntil = Number(localStorage.getItem(LS_KEY_BLOCKED) || 0)
  const count        = Number(localStorage.getItem(LS_KEY_COUNT)   || 0)
  const windowStart  = Number(localStorage.getItem(LS_KEY_START)   || 0)
  const now          = Date.now()

  // Hard block still active
  if (blockedUntil && now < blockedUntil) return { blocked: true, blockedUntil }

  // Window expired — reset
  if (now - windowStart >= CL_WINDOW_MS) {
    localStorage.removeItem(LS_KEY_COUNT)
    localStorage.removeItem(LS_KEY_START)
    localStorage.removeItem(LS_KEY_BLOCKED)
    return { blocked: false, blockedUntil: 0 }
  }

  return { blocked: false, blockedUntil: 0, count, windowStart }
}

/** Record a new submission attempt; returns true if now blocked. */
function recordAttempt() {
  const now         = Date.now()
  const windowStart = Number(localStorage.getItem(LS_KEY_START) || 0)
  let   count       = Number(localStorage.getItem(LS_KEY_COUNT) || 0)

  // Reset window if expired
  if (now - windowStart >= CL_WINDOW_MS) {
    count = 0
    localStorage.setItem(LS_KEY_START, String(now))
  } else if (count === 0) {
    localStorage.setItem(LS_KEY_START, String(now))
  }

  count += 1
  localStorage.setItem(LS_KEY_COUNT, String(count))

  if (count >= CL_MAX_ATTEMPTS) {
    const blockedUntil = Number(localStorage.getItem(LS_KEY_START)) + CL_WINDOW_MS
    localStorage.setItem(LS_KEY_BLOCKED, String(blockedUntil))
    return { blocked: true, blockedUntil }
  }

  return { blocked: false, blockedUntil: 0 }
}

export default function ConsultationForm() {
  const [status, setStatus]           = useState('idle') // 'idle'|'sending'|'success'|'error'|'blocked'
  const [blockedUntil, setBlockedUntil] = useState(0)     // Unix ms
  const [countdown, setCountdown]     = useState('')      // "HH:MM:SS"
  const timerRef                      = useRef(null)

  // ── Restore block state on mount ───────────────────────────────────────────
  useEffect(() => {
    const { blocked, blockedUntil: until } = getLocalRLState()
    if (blocked) {
      setStatus('blocked')
      setBlockedUntil(until)
    }
  }, [])

  // ── Live countdown ticker ───────────────────────────────────────────────────
  useEffect(() => {
    if (status !== 'blocked' || !blockedUntil) return

    function tick() {
      const remaining = blockedUntil - Date.now()
      if (remaining <= 0) {
        // Block window expired
        localStorage.removeItem(LS_KEY_BLOCKED)
        localStorage.removeItem(LS_KEY_COUNT)
        localStorage.removeItem(LS_KEY_START)
        setStatus('idle')
        setBlockedUntil(0)
        setCountdown('')
        clearInterval(timerRef.current)
        return
      }
      const h = Math.floor(remaining / 3_600_000)
      const m = Math.floor((remaining % 3_600_000) / 60_000)
      const s = Math.floor((remaining % 60_000) / 1_000)
      setCountdown(
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
      )
    }

    tick()
    timerRef.current = setInterval(tick, 1000)
    return () => clearInterval(timerRef.current)
  }, [status, blockedUntil])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    // ── Honeypot check — bots fill this field, humans never see it ──
    if (data.website) {
      // Silently succeed to not tip off the bot
      setStatus('success')
      return
    }

    // Client-side rate-limit guard
    const { blocked, blockedUntil: until } = recordAttempt()
    if (blocked) {
      setBlockedUntil(until)
      setStatus('blocked')
      return
    }

    setStatus('sending')
    try {
      await sendConsultationEmail(data)
      setStatus('success')
      reset()
    } catch (err) {
      if (err instanceof RateLimitError) {
        // Sync with server-returned timestamp
        localStorage.setItem(LS_KEY_BLOCKED, String(err.retryAfter))
        setBlockedUntil(err.retryAfter)
        setStatus('blocked')
      } else {
        console.error('Email send error:', err)
        setStatus('error')
      }
    }
  }

  /* ── Shared input style ─────────────────── */
  const inputClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-slate-800 text-sm placeholder:text-slate-400 bg-white transition-all duration-200 outline-none focus:ring-2 focus:ring-sage-400/40 ${
      hasError
        ? 'border-red-300 focus:border-red-400'
        : 'border-slate-200 focus:border-sage-400'
    }`

  const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider'
  const errorClass = 'mt-1 text-xs text-red-500 flex items-center gap-1'

  return (
    <section id="contact" className="section-pad bg-cream-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold tracking-widest uppercase mb-4">
            Book a Consultation
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Start Your <span className="gradient-text">Nutrition Journey</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Fill in the form below and Neeti will respond within 24 hours to schedule your personalised consultation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* ── Left: info sidebar ── */}
          <div className="lg:col-span-2 space-y-5">

            <div className="rounded-3xl bg-gradient-to-br from-sage-700 to-slate-900 p-7 text-white shadow-2xl shadow-sage-900/20">
              <h3 className="font-serif font-semibold text-lg mb-5">Get in Touch</h3>

              <div className="space-y-4">
                <a href="tel:+9779808531814" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4 text-sage-300" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Phone</p>
                    <p className="text-white text-sm font-medium">+977-9808531814</p>
                  </div>
                </a>

                <a href="mailto:neeti2020k@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Mail className="w-4 h-4 text-sage-300" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Email</p>
                    <p className="text-white text-sm font-medium">neeti2020k@gmail.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-sage-300" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] uppercase tracking-wider">Response Time</p>
                    <p className="text-white text-sm font-medium">Within 24 Hours</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-slate-400 text-xs leading-relaxed">
                  Consultations are available in-person (Kathmandu) and online via video call. All sessions are strictly confidential.
                </p>
              </div>
            </div>

            {/* What to expect */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="text-slate-800 font-semibold text-sm mb-4">What to Expect</h4>
              <ul className="space-y-3">
                {[
                  'Initial 45-minute deep-dive assessment',
                  'Comprehensive personalised nutrition plan',
                  'Follow-up support & plan adjustments',
                  'Evidence-based, medication-aware recommendations',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-500 text-xs leading-relaxed">
                    <CheckCircle className="w-3.5 h-3.5 text-sage-500 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">

              {/* ── Success state ── */}
              {status === 'success' && (
                <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-sage-50 border border-sage-200">
                  <CheckCircle className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sage-800 font-semibold text-sm">Consultation Request Sent!</p>
                    <p className="text-sage-600 text-xs mt-0.5">Thank you! Neeti will be in touch within 24 hours to confirm your appointment.</p>
                  </div>
                </div>
              )}

              {/* ── Error state ── */}
              {status === 'error' && (
                <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-semibold text-sm">Submission Failed</p>
                    <p className="text-red-600 text-xs mt-0.5">Please try again or email directly at neeti2020k@gmail.com</p>
                  </div>
                </div>
              )}

              {/* ── Rate-limit / blocked state ── */}
              {status === 'blocked' && (
                <div className="mb-6 flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-300">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-900 font-semibold text-sm">Too Many Requests</p>
                    <p className="text-amber-700 text-xs mt-0.5">
                      You have reached the maximum of {CL_MAX_ATTEMPTS} consultation requests.
                      Please try again in{' '}
                      <span className="font-mono font-bold text-amber-900">{countdown || '—'}</span>.
                    </p>
                    <p className="text-amber-600 text-xs mt-1">
                      Need urgent help? Call or email Neeti directly.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

                {/* ── Honeypot anti-bot field (hidden from humans, filled by bots) ── */}
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <label htmlFor="website">Leave this blank</label>
                  <input
                    id="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    {...register('website')}
                  />
                </div>

                {/* Row: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> Full Name</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className={inputClass(errors.name)}
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email Address</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass(errors.email)}
                      {...register('email', {
                        required: 'Email is required',
                        validate: validateEmail,
                      })}
                    />
                    {errors.email && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
                  </div>
                </div>

                {/* Row: Phone + Age */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Phone Number</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+977 9808531814"
                      className={inputClass(errors.phone)}
                      {...register('phone', {
                        required: 'Phone number is required',
                        validate: validatePhone,
                      })}
                    />
                    {errors.phone && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="age" className={labelClass}>Age</label>
                    <input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      placeholder="Your age"
                      className={inputClass(errors.age)}
                      {...register('age', { required: 'Age is required', min: { value: 1, message: 'Please enter a valid age' } })}
                    />
                    {errors.age && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.age.message}</p>}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className={labelClass}>Gender</label>
                  <select
                    id="gender"
                    className={inputClass(errors.gender)}
                    {...register('gender', { required: 'Please select your gender' })}
                  >
                    <option value="">Select gender</option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                  {errors.gender && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.gender.message}</p>}
                </div>

                {/* Consultation Type */}
                <div>
                  <label htmlFor="consultationType" className={labelClass}>Consultation Type</label>
                  <select
                    id="consultationType"
                    className={inputClass(errors.consultationType)}
                    {...register('consultationType', { required: 'Please select a consultation type' })}
                  >
                    <option value="">Select consultation type</option>
                    {consultationTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                  {errors.consultationType && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.consultationType.message}</p>}
                </div>

                {/* Health Goal */}
                <div>
                  <label htmlFor="healthGoal" className={labelClass}>Primary Health Goal</label>
                  <select
                    id="healthGoal"
                    className={inputClass(errors.healthGoal)}
                    {...register('healthGoal', { required: 'Please select your health goal' })}
                  >
                    <option value="">Select your primary goal</option>
                    {healthGoals.map(g => <option key={g}>{g}</option>)}
                  </select>
                  {errors.healthGoal && <p className={errorClass}><AlertCircle className="w-3 h-3" />{errors.healthGoal.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClass}>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Additional Information</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell Neeti about your current health situation, any medical conditions, medications, or specific concerns you'd like to address..."
                    className={`resize-none ${inputClass(errors.message)}`}
                    {...register('message')}
                  />
                </div>

                {/* Submit */}
                <button
                  id="submit-consultation-btn"
                  type="submit"
                  disabled={status === 'sending' || status === 'blocked'}
                  className="w-full flex items-center justify-center gap-2 px-7 py-4 bg-sage-600 hover:bg-sage-700 disabled:bg-slate-300 text-white font-semibold rounded-2xl shadow-lg shadow-sage-600/25 hover:shadow-sage-600/40 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : status === 'blocked' ? (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      Blocked — try again in {countdown}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit Consultation Request
                    </>
                  )}
                </button>

                <p className="text-center text-slate-400 text-xs">
                  Your information is kept strictly confidential and never shared with third parties.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
