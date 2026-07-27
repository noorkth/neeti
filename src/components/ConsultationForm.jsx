import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { sendConsultationEmail } from '../services/emailService'
import { Send, CheckCircle, AlertCircle, User, Mail, Phone, Calendar, MessageSquare } from 'lucide-react'

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
export default function ConsultationForm() {
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setStatus('sending')
    try {
      await sendConsultationEmail(data)
      setStatus('success')
      reset()
    } catch (err) {
      console.error('Email send error:', err)
      setStatus('error')
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
                  'Follow-up support &amp; plan adjustments',
                  'Evidence-based, medication-aware recommendations',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-500 text-xs leading-relaxed">
                    <CheckCircle className="w-3.5 h-3.5 text-sage-500 mt-0.5 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
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

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

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
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
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
                      placeholder="+977 XXXX XXXXXX"
                      className={inputClass(errors.phone)}
                      {...register('phone', { required: 'Phone number is required' })}
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
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-7 py-4 bg-sage-600 hover:bg-sage-700 disabled:bg-slate-300 text-white font-semibold rounded-2xl shadow-lg shadow-sage-600/25 hover:shadow-sage-600/40 transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending…
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
