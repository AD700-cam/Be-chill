import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SizzlingBrownie from './components/SizzlingBrownie'
import About from './components/About'
import Flavors from './components/Flavors'
import SocialGrid from './components/SocialGrid'
import { Routes, Route } from 'react-router-dom'
import Location from './components/Location'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import WhatsAppButton from './components/WhatsAppButton'
import LeadCapturePopup from './components/LeadCapturePopup'

function Home() {
  return (
    <div className="relative w-full h-full gradient-bg">
      <Navbar />
      <Hero />
      <SizzlingBrownie />
      <About />
      <Flavors />
      <SocialGrid />
      <Location />
      <Footer />
    </div>
  )
}

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Turn off GSAP's lag smoothing to maintain animation consistency across natural scroll events
    gsap.ticker.lagSmoothing(0)

    // Cleanup animations if component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [])

  return (
    <>
      <WhatsAppButton />
      <LeadCapturePopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  )
}

export default App
