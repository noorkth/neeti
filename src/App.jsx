import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import CredentialsSection from './components/CredentialsSection'
import ConsultationForm from './components/ConsultationForm'
import Footer from './components/Footer'

/**
 * Root application component.
 * Renders all page sections in order, wrapped by the sticky Navbar and Footer.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CredentialsSection />
        <ConsultationForm />
      </main>
      <Footer />
    </div>
  )
}
