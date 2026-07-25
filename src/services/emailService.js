/**
 * Sends a consultation request email via the Vercel serverless API route.
 * The API route (/api/send-email) uses Gmail SMTP with Nodemailer server-side.
 *
 * @param {object} formData - The consultation form data
 * @returns {Promise}
 */
export async function sendConsultationEmail(formData) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to send email')
  }

  return response.json()
}
