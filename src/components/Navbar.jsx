import { useState, useEffect } from 'react'
import { Menu, X, Leaf, Phone } from 'lucide-react'

const navLinks = [
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact',     href: '#contact' },
]

/**
 * Sticky top navigation bar.
 * Becomes opaque + adds shadow on scroll.
 * Collapses to a hamburger menu on mobile.
 */
export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [activeSection, setActiveSection] = useState('')

  /* ── Detect scroll ────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/60'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">

          {/* ── Logo ── */}
          <a
            href="#hero"
            onClick={e => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-500 to-sage-700 flex items-center justify-center shadow-md group-hover:shadow-sage-400/40 transition-shadow duration-300">
              <Leaf className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className={`font-serif font-semibold text-base leading-tight transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Neeti Kayastha
              </p>
              <p className={`text-[10px] font-medium tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-sage-600' : 'text-sage-300'}`}>
                Clinical Dietician
              </p>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-sage-600 bg-sage-50'
                    : scrolled
                      ? 'text-slate-600 hover:text-sage-700 hover:bg-sage-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── CTA Button ── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+9779808531814"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${
                scrolled ? 'text-slate-500 hover:text-sage-600' : 'text-white/70 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              +977 980 853 1814
            </a>
            <a
              href="#contact"
              onClick={e => handleNavClick(e, '#contact')}
              className="px-5 py-2.5 bg-sage-600 hover:bg-sage-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-sage-600/25 hover:shadow-sage-600/40 transition-all duration-200 hover:-translate-y-0.5 pulse-glow"
            >
              Book Consultation
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(v => !v)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => handleNavClick(e, link.href)}
              className="px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:text-sage-700 hover:bg-sage-50 transition-all duration-150"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={e => handleNavClick(e, '#contact')}
            className="mt-2 px-5 py-3 bg-sage-600 text-white text-sm font-semibold rounded-xl text-center shadow-md"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </header>
  )
}
