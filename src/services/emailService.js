/**
 * Sends a consultation request email via the Vercel serverless API route.
 * The API route (/api/send-email) uses Gmail SMTP with Nodemailer server-side.
 *
 * Throws a RateLimitError (with .retryAfter Unix-ms timestamp) when the server
 * returns HTTP 429, so the UI can show a countdown to the user.
 *
 * @param {object} formData - The consultation form data
 * @returns {Promise}
 */

export class RateLimitError extends Error {
  constructor(retryAfter) {
    super('Rate limit exceeded')
    this.name = 'RateLimitError'
    this.retryAfter = retryAfter  // Unix ms timestamp when block lifts
  }
}

export async function sendConsultationEmail(formData) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (response.status === 429) {
    const body = await response.json().catch(() => ({}))
    throw new RateLimitError(body.retryAfter ?? Date.now() + 60 * 60 * 1000)
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to send email')
  }

  return response.json()
}
