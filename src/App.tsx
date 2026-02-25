import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SizzlingBrownie from './components/SizzlingBrownie'
import About from './components/About'
import Flavors from './components/Flavors'
import SocialGrid from './components/SocialGrid'
import Location from './components/Location'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative w-full h-full">
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
