import { useEffect, useState } from 'react'
import { PersonaProvider } from './context/PersonaContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import CustomCursor from './components/CustomCursor'
import CommandPalette from './components/CommandPalette'
import NeuralMemoryMap from './components/NeuralMemoryMap'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Bookshelf from './sections/Bookshelf'
import Photography from './sections/Photography'
import Contact from './sections/Contact'

export default function App() {
  const [palette, setPalette] = useState(false)
  const [map, setMap] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <PersonaProvider>
      <a href="#about" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar onOpenPalette={() => setPalette(true)} />
      <main>
        <Hero onOpenMap={() => setMap(true)} />
        <About />
        <Experience />
        <Projects />
        <Bookshelf />
        <Photography />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette open={palette} onClose={() => setPalette(false)} />
      <NeuralMemoryMap open={map} onClose={() => setMap(false)} />
    </PersonaProvider>
  )
}
