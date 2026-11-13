import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { scrollToTop } from '../utils/scroll'

export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center rounded-full border border-line bg-card/90 text-ink shadow-lg backdrop-blur transition duration-300 hover:border-gold hover:text-amber ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <ArrowUp size={18} />
    </button>
  )
}
