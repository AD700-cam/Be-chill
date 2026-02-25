import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
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

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false, // Critical for mobile performance (use native scroll)
      touchMultiplier: 2,
      infinite: false,
    } as any)

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis's request animation frame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Turn off GSAP's lag smoothing to prevent desyncing during heavy loads
    gsap.ticker.lagSmoothing(0)

    return () => lenis.destroy();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  )
}

export default App
