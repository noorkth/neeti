import { Heart, Stethoscope, BookOpen, Leaf } from 'lucide-react'

const highlights = [
  {
    icon: Stethoscope,
    title: 'Dual Clinical Background',
    desc: 'Uniquely trained as both a Registered Nurse (B.Sc. Nursing) and a Clinical Nutritionist — bringing a holistic, medical-grade perspective to every consultation.',
  },
  {
    icon: BookOpen,
    title: 'Academic Researcher',
    desc: 'Currently pursuing MPhil-PhD in Nutrition at Tribhuvan University, ensuring every recommendation is grounded in the latest peer-reviewed evidence.',
  },
  {
    icon: Heart,
    title: 'Compassionate Counsellor',
    desc: '8+ years of hands-on experience in diet counselling across corporate wellness, clinical, and freelance settings — meeting each client where they are.',
  },
  {
    icon: Leaf,
    title: 'Integrative Approach',
    desc: 'Combines clinical diagnostics with personalised lifestyle coaching, creating sustainable nutrition plans that work for real life.',
  },
]

/**
 * About section: professional biography with credential highlights.
 */
export default function AboutSection() {
  return (
    <section id="about" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage-50 text-sage-700 text-xs font-semibold tracking-widest uppercase mb-4">
            About
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Where Nursing Meets <span className="gradient-text">Nutrition</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A rare dual-qualified clinician who understands both the medical and the nutritional dimensions of your health.
          </p>
        </div>

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left: bio text */}
          <div className="space-y-6">
            {/* Visual accent card */}
            <div className="rounded-3xl bg-gradient-to-br from-sage-700 to-slate-900 p-8 text-white shadow-2xl shadow-sage-900/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                  <span className="font-serif font-bold text-2xl">NK</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl">Neeti Kayastha</h3>
                  <p className="text-sage-300 text-sm">Clinical Dietician & Registered Nurse</p>
                </div>
              </div>

              <p className="text-slate-200 leading-relaxed text-sm mb-6">
                Neeti Kayastha is a multidimensional healthcare professional whose career bridges the precision of clinical nursing with the transformative power of evidence-based nutrition. With a Bachelor of Science in Nursing from Sri Krishna Rukmini College of Nursing (Bangalore) and a Master of Arts in Food & Nutrition from Padma Kanya Multiple Campus, she is now advancing research as an MPhil-PhD Scholar at Tribhuvan University.
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                Over more than 8 years, Neeti has counselled hundreds of clients — from corporate professionals to post-operative patients — helping them achieve sustainable health through deeply personalised dietary strategies.
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Freelancer', 'Corporate Wellness', 'Clinical Practice', 'Research Scholar'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-sage-200 border border-white/10">{t}</span>
                ))}
              </div>
            </div>

            {/* Current roles */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 space-y-4">
              <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wider">Current Positions</h4>
              {[
                { org: 'National Center for Reproductive Health Pvt. Ltd.', role: 'Clinical Nutritionist' },
                { org: 'NERC Project', role: 'Project Coordinator – Nutrition Education & Research Capacity Building' },
                { org: 'Fuse Machines Pvt. Ltd.', role: 'Clinical Nutritionist / Nursing Supervisor' },
              ].map(({ org, role }) => (
                <div key={org} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-sage-500 shrink-0" />
                  <div>
                    <p className="text-slate-800 text-sm font-semibold">{org}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: highlight cards */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl hover:shadow-sage-200/30 hover:border-sage-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-sage-50 group-hover:bg-sage-100 flex items-center justify-center mb-4 transition-colors duration-200">
                  <Icon className="w-5 h-5 text-sage-600" />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-2">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}

            {/* Nursing licence badge */}
            <div className="sm:col-span-2 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 p-5 flex items-center gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center shrink-0 border border-gold-400/30">
                <span className="text-gold-400 text-xl">🏅</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Nursing Council Registration</p>
                <p className="text-slate-400 text-xs">Reg No: 27480 — Valid until July 5, 2026</p>
              </div>
              <span className="ml-auto px-3 py-1 rounded-full bg-sage-500/20 text-sage-300 text-xs font-medium border border-sage-500/30">Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
