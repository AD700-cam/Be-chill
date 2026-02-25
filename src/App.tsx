import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SizzlingBrownie from './components/SizzlingBrownie'
import About from './components/About'
import Flavors from './components/Flavors'
import SocialGrid from './components/SocialGrid'
import Location from './components/Location'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
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

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy();
  }, [])

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

export default App
