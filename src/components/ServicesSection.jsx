import {
  Activity, Baby, Scale, Brain, Dumbbell, Heart,
  Stethoscope, Users
} from 'lucide-react'

const services = [
  {
    icon: Activity,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Therapeutic Nutrition',
    desc: 'Medical nutrition therapy for chronic conditions including diabetes, hypertension, kidney disease, and gastrointestinal disorders. Evidence-based plans tailored to clinical parameters.',
    tags: ['Diabetes', 'Hypertension', 'Renal Nutrition'],
  },
  {
    icon: Baby,
    color: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
    iconColor: 'text-pink-600',
    title: 'Prenatal & Postnatal Nutrition',
    desc: 'Specialised dietary guidance for every stage of pregnancy and the postpartum period, ensuring optimal maternal and foetal health outcomes.',
    tags: ['Prenatal', 'Postnatal', 'Breastfeeding Support'],
  },
  {
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    title: 'Metabolic Disease Management',
    desc: 'Comprehensive nutrition strategies for metabolic syndrome, insulin resistance, and thyroid disorders — targeting root causes through diet.',
    tags: ['Metabolic Syndrome', 'Thyroid', 'Insulin Resistance'],
  },
  {
    icon: Heart,
    color: 'from-rose-400 to-red-500',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    title: 'PMOS Management',
    desc: 'Hormone-balancing nutrition plans designed specifically for women with Polycystic Ovary Syndrome (PCOS) — addressing inflammation, insulin resistance, and holistic lifestyle factors for long-term management.',
    tags: ['Hormonal Balance', 'Anti-Inflammatory', 'PMOS'],
  },
  {
    icon: Scale,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    title: 'Weight Management',
    desc: 'Sustainable, science-backed weight loss and gain programs. No fad diets — just personalised, realistic plans that fit your lifestyle and metabolic profile.',
    tags: ['Weight Loss', 'Weight Gain', 'Sustainable Habits'],
  },
  {
    icon: Dumbbell,
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    title: 'Sports Nutrition',
    desc: 'Performance-optimised dietary strategies for athletes and active individuals — covering pre/post-workout fuelling, recovery nutrition, and body composition goals.',
    tags: ['Performance', 'Recovery', 'Body Composition'],
  },
  {
    icon: Users,
    color: 'from-lime-500 to-green-600',
    bg: 'bg-lime-50',
    iconColor: 'text-lime-700',
    title: 'Pediatric Nutrition',
    desc: 'Age-appropriate nutrition guidance for children from infancy through adolescence, supporting healthy growth, development, and lifelong eating habits.',
    tags: ['Infants', 'Children', 'Adolescents'],
  },
  {
    icon: Stethoscope,
    color: 'from-slate-500 to-slate-700',
    bg: 'bg-slate-50',
    iconColor: 'text-slate-600',
    title: 'Geriatric Nutrition',
    desc: 'Specialised nutritional support for elderly individuals, addressing age-related physiological changes, sarcopenia, micronutrient deficiencies, and chronic disease management.',
    tags: ['Elderly Care', 'Sarcopenia', 'Chronic Disease'],
  },
]

/**
 * Services section: responsive masonry-style card grid.
 */
export default function ServicesSection() {
  const scrollTo = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="services" className="section-pad bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold tracking-widest uppercase mb-4">
            Services
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Areas of <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            From metabolic disorders to sports performance — every plan is built around your unique biology, lifestyle, and goals.
          </p>
        </div>

        {/* ── Services grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map(({ icon: Icon, bg, iconColor, title, desc, tags }) => (
            <div
              key={title}
              className="group relative rounded-3xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-400 hover:-translate-y-2 cursor-default"
            >
              {/* Subtle hover gradient overlay */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(145deg, rgba(78,126,78,0.03) 0%, transparent 100%)' }}
              />

              {/* Icon */}
              <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-5.5 h-5.5 ${iconColor}`} />
              </div>

              {/* Content */}
              <h3 className="font-serif font-semibold text-slate-900 text-base mb-2 leading-snug">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-500 text-[10px] font-medium border border-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA strip ── */}
        <div className="mt-14 text-center">
          <p className="text-slate-500 mb-6 text-sm">Not sure which service fits your needs? Let's talk it through.</p>
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-3.5 bg-sage-600 hover:bg-sage-700 text-white font-semibold rounded-2xl shadow-lg shadow-sage-600/25 hover:shadow-sage-600/40 transition-all duration-200 hover:-translate-y-0.5"
          >
            Request a Free Diet Consultation
          </button>
        </div>
      </div>
    </section>
  )
}
