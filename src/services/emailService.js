/**
 * EmailJS service module
 * Replace the placeholder values below with your actual EmailJS credentials.
 * Sign up at https://www.emailjs.com to get your Service ID, Template ID, and Public Key.
 */

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',       // e.g. 'service_abc123'
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',     // e.g. 'template_xyz789'
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY',       // e.g. 'user_aBcDeFgHiJk'
}

/**
 * Sends a consultation request email via EmailJS.
 * @param {import('@emailjs/browser')} emailjs - The EmailJS browser SDK instance
 * @param {object} formData - The consultation form data
 * @returns {Promise}
 */
export async function sendConsultationEmail(emailjs, formData) {
  const templateParams = {
    from_name:      formData.name,
    from_email:     formData.email,
    phone:          formData.phone,
    age:            formData.age,
    gender:         formData.gender,
    health_goal:    formData.healthGoal,
    consultation:   formData.consultationType,
    message:        formData.message,
  }

  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    templateParams,
    EMAILJS_CONFIG.PUBLIC_KEY,
  )
}
