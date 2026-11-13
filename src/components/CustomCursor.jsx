import { useEffect, useRef } from 'react'

// Desktop-only (fine pointer + hover), skipped for reduced motion.
export default function CustomCursor() {
  const ref = useRef(null)
  useEffect(() => {
    const ok = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = ref.current
    if (!ok || reduced || !el) return undefined
    el.style.display = 'block'
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const move = (e) => {
      x = e.clientX; y = e.clientY
      const t = e.target.closest?.('a,button,[role="button"],input,textarea,select')
      el.classList.toggle('big', !!t)
    }
    const tick = () => {
      cx += (x - cx) * 0.2
      cy += (y - cy) * 0.2
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={ref} className="cursor-ring" style={{ display: 'none' }} aria-hidden="true" />
}
