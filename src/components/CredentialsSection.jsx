import { GraduationCap, Briefcase, Award, CheckCircle2 } from 'lucide-react'

const education = [
  {
    degree: 'PhD Scholar – Food and Nutrition',
    institution: 'Tribhuvan University',
    period: '2024 – Present',
    status: 'In Progress',
    statusColor: 'bg-amber-100 text-amber-700 border-amber-200',
    dotColor: 'bg-amber-500',
  },
  {
    degree: 'MPhil in Food and Nutrition',
    institution: 'Tribhuvan University',
    period: '2023 – 2024',
    status: 'Completed',
    statusColor: 'bg-sage-100 text-sage-700 border-sage-200',
    dotColor: 'bg-sage-500',
  },
  {
    degree: 'Masters in Food and Nutrition',
    institution: 'Tribhuvan University',
    period: '2016 – 2018',
    status: 'Completed',
    statusColor: 'bg-sage-100 text-sage-700 border-sage-200',
    dotColor: 'bg-sage-500',
  },
  {
    degree: 'B.Sc. Nursing',
    institution: 'Rajiv Gandhi University of Health Sciences',
    period: '2010 – 2014',
    status: 'Completed',
    statusColor: 'bg-sage-100 text-sage-700 border-sage-200',
    dotColor: 'bg-sage-500',
  },
]

const experience = [
  {
    role: 'Consultant Dietician',
    org: 'National Center for Reproductive Health Pvt. Ltd.',
    period: '2025 – Present',
    desc: 'Providing specialised clinical nutrition and dietetic services with a focus on reproductive, maternal, and infant health.',
  },
  {
    role: 'Project Coordinator',
    org: 'NERC Project – Strengthening Nutrition Education & Research Capacity in Universities in Nepal',
    period: '2024 – Present',
    desc: 'Leading capacity-building initiatives in nutrition education and academic research across national institutions.',
  },
  {
    role: 'Clinical Dietician / Registered Nurse',
    org: 'Fusemachines Nepal Pvt. Ltd.',
    period: '2023 – Present',
    desc: 'Corporate wellness nutrition counselling and clinical dietetic services for a leading AI technology company.',
  },
  {
    role: 'Nutrition Consultant',
    org: 'NIDP – Nutrition and Dietary Improvement Project',
    period: '2024 – Present',
    desc: 'Providing expert nutrition consultancy to improve dietary practices and nutritional outcomes.',
  },
  {
    role: 'Trainer – Training Dieticians in Nepal',
    org: 'NERC Project',
    period: '2024 – Present',
    desc: 'Training and capacity building for dieticians across Nepal under the NERC project framework.',
  },
  {
    role: 'Freelance Diet Counsellor',
    org: 'Independent Practice',
    period: '2018 – Present',
    desc: 'One-on-one diet counselling across therapeutic, weight management, PCOS, and sports nutrition domains for 3,000+ clients.',
  },
  {
    role: 'Clinical Nutritionist',
    org: 'Medpro International',
    period: '2022 – 2023',
    desc: 'Clinical nutrition assessment and therapeutic dietary management for patients across diverse medical conditions.',
  },
  {
    role: 'Nutrition Coach',
    org: 'Fitness Studio',
    period: '2018 – 2019',
    desc: 'Sports and performance nutrition coaching, body composition planning, and fitness-oriented diet programmes.',
  },
]

const certBadges = [
  'Registered Nurse (Reg No: 27480)',
  'Consultant Dietician',
  'PhD Scholar – Food & Nutrition',
  'PCOS Management Specialist',
  'Prenatal & Postnatal Nutrition',
  'Sports Nutrition Coach',
]

/**
 * Experience & Credentials section:
 * timeline-style education and experience columns, plus certification badges.
 */
export default function CredentialsSection() {
  return (
    <section id="credentials" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold tracking-widest uppercase mb-4">
            Credentials
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Education &amp; <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            A decade of academic rigour and clinical practice, united by a passion for evidence-based nutrition.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-14">

          {/* ── Education Timeline ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-sage-100 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-sage-700" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Academic Background</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-sage-100 space-y-8">
              {education.map(({ degree, institution, period, status, statusColor, dotColor }) => (
                <div key={degree} className="relative">
                  {/* Timeline dot */}
                  <span className={`absolute -left-[1.45rem] top-1.5 w-3.5 h-3.5 rounded-full ${dotColor} border-2 border-white shadow-md`} />

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-sage-200 hover:bg-sage-50/30 transition-all duration-200">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h4 className="font-serif font-semibold text-slate-800 text-sm leading-snug">{degree}</h4>
                      <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${statusColor}`}>{status}</span>
                    </div>
                    <p className="text-sage-700 text-xs font-medium mb-1">{institution}</p>
                    <p className="text-slate-400 text-xs">{period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Experience Timeline ── */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-slate-700" />
              </div>
              <h3 className="font-semibold text-slate-900 text-base">Professional Experience</h3>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
              {experience.map(({ role, org, period, desc }) => (
                <div key={role} className="relative">
                  <span className="absolute -left-[1.45rem] top-1.5 w-3.5 h-3.5 rounded-full bg-slate-400 border-2 border-white shadow-sm" />

                  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200">
                    <p className="text-slate-800 font-semibold text-sm">{role}</p>
                    <p className="text-sage-600 text-xs font-medium mt-0.5 mb-1">{org}</p>
                    <p className="text-slate-400 text-[10px] mb-2">{period}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Certification badge row ── */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 to-sage-900 p-8">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-gold-400" />
            <h3 className="text-white font-semibold text-sm">Certifications &amp; Specialisations</h3>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {certBadges.map(badge => (
              <div
                key={badge}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-200"
              >
                <CheckCircle2 className="w-4 h-4 text-sage-400 shrink-0" />
                <span className="text-slate-200 text-xs font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
