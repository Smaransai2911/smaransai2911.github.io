import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../hooks/useReducedMotion'

export default function BookCard({ book, onOpen }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 })

  const move = (e) => {
    if (reduced || e.pointerType === 'touch' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setT({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 16, gx: px * 100, gy: py * 100 })
  }
  const reset = () => setT({ rx: 0, ry: 0, gx: 50, gy: 50 })

  return (
    <motion.li initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6 }} className="[perspective:1000px]">
      <button type="button" onClick={() => onOpen(book)} onPointerMove={move} onPointerLeave={reset} className="group block w-full text-left" aria-label={`Open details: ${book.title}`}>
        <div
          ref={ref}
          className={`relative aspect-[2/3] w-full overflow-hidden rounded-r-lg rounded-l-sm border border-white/10 bg-gradient-to-br ${book.hue} shadow-[0_24px_50px_-18px_rgba(0,0,0,0.9)] transition-transform duration-150`}
          style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transformStyle: 'preserve-3d' }}
        >
          {book.cover ? (
            <img src={book.cover} alt={`Cover of ${book.title}`} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col justify-between p-5">
              <span className="eyebrow text-[0.55rem] text-gold/80">Cover placeholder</span>
              <div>
                <p className="font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] italic leading-tight text-amber">{book.title}</p>
                {book.subtitle && <p className="mt-2 text-[0.65rem] leading-snug text-ink2">{book.subtitle}</p>}
              </div>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-ink3">Sai Smaran</span>
            </div>
          )}
          <span className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/50 to-transparent" aria-hidden="true" />
          <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(245,199,122,0.22), transparent 55%)` }} aria-hidden="true" />
        </div>
        <h3 className="mt-4 font-serif text-xl leading-snug text-ink">{book.title}</h3>
        <p className="mt-1 text-xs text-ink3">{book.year || 'Year to be confirmed'}</p>
      </button>
    </motion.li>
  )
}
