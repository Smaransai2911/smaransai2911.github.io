import { useEffect, useRef } from 'react'

/**
 * Lightweight canvas particle network. Mouse-responsive, pauses when off-screen or
 * tab hidden, fewer particles on small screens, static single frame for reduced motion.
 */
export default function NeuralBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0, h = 0, raf = 0, running = false, visible = true
    const mouse = { x: -999, y: -999 }
    let pts = []

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, Math.max(24, (w * h) / (w < 640 ? 16000 : 14000))))
      pts = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        gold: i % 11 === 0,
      }))
    }

    const LINK = 120
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        if (!reduced) {
          p.x += p.vx; p.y += p.vy
          if (p.x < 0 || p.x > w) p.vx *= -1
          if (p.y < 0 || p.y > h) p.vy *= -1
          const dx = p.x - mouse.x, dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 14000) { const f = 0.012; p.x += dx * f; p.y += dy * f }
        }
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const dx = p.x - q.x, dy = p.y - q.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const a = (1 - Math.sqrt(d2) / LINK) * 0.28
            ctx.strokeStyle = p.gold || q.gold ? `rgba(214,168,95,${a})` : `rgba(129,140,248,${a})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
          }
        }
        ctx.fillStyle = p.gold ? 'rgba(245,199,122,0.9)' : 'rgba(34,211,238,0.75)'
        ctx.beginPath(); ctx.arc(p.x, p.y, p.gold ? 2 : 1.4, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = () => { draw(); raf = requestAnimationFrame(loop) }
    const start = () => { if (!running && !reduced && visible && !document.hidden) { running = true; raf = requestAnimationFrame(loop) } }
    const stop = () => { running = false; cancelAnimationFrame(raf) }

    const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const onLeave = () => { mouse.x = -999; mouse.y = -999 }
    const onVis = () => (document.hidden ? stop() : start())

    resize()
    draw()
    start()
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop() })
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    canvas.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      stop(); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}
