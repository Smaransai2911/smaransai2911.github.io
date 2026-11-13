import useScrollProgress from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const p = useScrollProgress()
  return (
    <div className="fixed left-0 right-0 top-0 z-[90] h-[2px] bg-transparent" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-cyan via-indigo to-gold"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  )
}
