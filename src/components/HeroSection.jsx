import { ArrowDown, Star, Award, Users, Clock } from 'lucide-react'

const stats = [
  { icon: Clock,  value: '8+',   label: 'Years Experience' },
  { icon: Users,  value: '500+', label: 'Clients Served'   },
  { icon: Award,  value: 'MPhil',label: 'PhD Scholar'      },
  { icon: Star,   value: '100%', label: 'Personalised Care' },
]

/**
 * Full-viewport hero section with dark botanical gradient,
 * floating decorative orbs, animated stats, and dual CTAs.
 */
export default function HeroSection() {
  const scrollTo = href => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-bg"
    >
      {/* ── Decorative orbs ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="float-anim absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-sage-500/10 blur-3xl" />
        <div className="float-anim-slow absolute bottom-1/3 left-1/6 w-96 h-96 rounded-full bg-sage-400/8 blur-3xl" />
        <div className="float-anim absolute top-1/2 right-1/8 w-48 h-48 rounded-full bg-gold-400/8 blur-2xl" />
        {/* fine grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #a3c0a3 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: copy ───────────────────────── */}
        <div className="space-y-8">

          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sage-400/30 bg-sage-400/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sage-400 animate-pulse" />
            <span className="text-sage-300 text-xs font-semibold tracking-widest uppercase">
              Clinical Dietician & Registered Nurse
            </span>
          </div>

          {/* Headline */}
          <div className="animate-fade-up delay-100 space-y-3">
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1]">
              Neeti
              <br />
              <span className="gradient-text">Kayastha</span>
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl font-light leading-relaxed max-w-lg">
              Transforming lives through <strong className="text-white font-semibold">evidence-based nutrition</strong> and compassionate clinical care — 8+ years of personalised diet counselling.
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-200 flex flex-wrap gap-4">
            <button
              id="hero-book-cta"
              onClick={() => scrollTo('#contact')}
              className="group px-7 py-3.5 bg-sage-500 hover:bg-sage-600 text-white font-semibold rounded-2xl shadow-xl shadow-sage-700/40 hover:shadow-sage-600/60 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              Book a Consultation
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
            <button
              id="hero-services-cta"
              onClick={() => scrollTo('#services')}
              className="px-7 py-3.5 border border-white/20 hover:border-white/50 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/8 transition-all duration-300"
            >
              View Services
            </button>
          </div>

          {/* Stats row */}
          <div className="animate-fade-up delay-300 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-4 text-center hover:scale-105 transition-transform duration-300"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <Icon className="w-5 h-5 text-sage-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white font-serif">{value}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: visual card ───────────────── */}
        <div className="animate-fade-up delay-400 hidden lg:flex justify-center">
          <div className="relative w-[380px]">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-sage-500/30 to-transparent blur-2xl" />

            {/* Main card */}
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(145deg, rgba(78,126,78,0.25) 0%, rgba(15,23,42,0.6) 100%)', border: '1px solid rgba(163,192,163,0.3)' }}
            >
              {/* Decorative icon top */}
              <div className="p-8 text-center">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-sage-400 to-sage-700 flex items-center justify-center shadow-xl shadow-sage-700/50 mb-6">
                  <span className="text-5xl font-serif font-bold text-white">NK</span>
                </div>
                <h2 className="text-white font-serif font-bold text-2xl">Neeti Kayastha</h2>
                <p className="text-sage-300 text-sm mt-1 font-medium">MPhil-PhD Scholar • Clinical Dietician</p>

                {/* Specialty pills */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {['Therapeutic Nutrition', 'PCOS Diet', 'Weight Management', 'Prenatal Nutrition', 'Metabolic Health', 'Sports Nutrition'].map(s => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-xs font-medium text-sage-200 border border-sage-400/30"
                      style={{ background: 'rgba(78,126,78,0.2)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Affiliation */}
                <div className="mt-6 pt-6 border-t border-white/10 text-left space-y-2">
                  {[
                    'Tribhuvan University – MPhil/PhD',
                    'National Center for Reproductive Health',
                    'NERC Project Coordinator',
                  ].map(affil => (
                    <div key={affil} className="flex items-center gap-2 text-slate-300 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                      {affil}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────── */}
      <button
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-sage-300 transition-colors duration-200 animate-fade-up delay-600"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  )
}
