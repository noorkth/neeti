import { Leaf, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

const footerLinks = {
  Navigation: [
    { label: 'About',        href: '#about'       },
    { label: 'Services',     href: '#services'    },
    { label: 'Credentials',  href: '#credentials' },
    { label: 'Contact',      href: '#contact'     },
  ],
  Services: [
    'Therapeutic Nutrition',
    'Weight Management',
    'PMOS Management',
    'Prenatal Nutrition',
    'Sports Nutrition',
    'Metabolic Health',
  ],
}

/**
 * Site footer with contact info, nav links, services list, and legal copy.
 */
export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">

        {/* ── Top grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="font-serif font-bold text-base text-white">Neeti Kayastha</p>
                <p className="text-sage-400 text-[10px] font-medium tracking-widest uppercase">Clinical Dietician</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Clinical Dietician and Registered Nurse with over 8 years of experience transforming lives through personalised, evidence-based nutrition counselling.
            </p>

            <div className="space-y-2.5 pt-2">
              <a href="tel:+9779808531814" className="flex items-center gap-2.5 text-slate-400 hover:text-sage-400 transition-colors text-sm group">
                <Phone className="w-3.5 h-3.5 text-sage-600 group-hover:text-sage-400" />
                +977-9808531814
              </a>
              <a href="mailto:neeti2020k@gmail.com" className="flex items-center gap-2.5 text-slate-400 hover:text-sage-400 transition-colors text-sm group">
                <Mail className="w-3.5 h-3.5 text-sage-600 group-hover:text-sage-400" />
                neeti2020k@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-3.5 h-3.5 text-sage-600" />
                Kathmandu, Nepal
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Navigation</h4>
            <ul className="space-y-3">
              {footerLinks.Navigation.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(href)}
                    className="text-slate-400 hover:text-sage-400 text-sm transition-colors duration-150 flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 text-sage-400">→</span>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">Services</h4>
            <ul className="space-y-3">
              {footerLinks.Services.map(s => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-slate-400 hover:text-sage-400 text-sm transition-colors duration-150 text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Neeti Kayastha. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 text-xs">
              Nursing Council Reg No: <span className="text-slate-400 font-medium">27480</span>
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-600 text-xs">
              Valid until <span className="text-slate-400 font-medium">July 5, 2026</span>
            </span>
          </div>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            Built with <span className="text-red-400">♥</span> for better nutrition
          </p>
        </div>
      </div>
    </footer>
  )
}
