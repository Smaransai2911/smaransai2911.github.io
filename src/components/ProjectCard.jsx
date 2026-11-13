import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'

export default function ProjectCard({ project, onOpen }) {
  const p = project
  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="group relative h-full">
      <div className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${p.featured ? 'opacity-60' : ''}`} style={{ background: 'linear-gradient(135deg, rgba(34,211,238,.5), rgba(129,140,248,.5), rgba(214,168,95,.4))' }} aria-hidden="true" />
      <button
        type="button"
        onClick={() => onOpen(p)}
        className="relative flex h-full w-full flex-col rounded-2xl border border-line bg-card p-6 text-left transition group-hover:-translate-y-0.5"
        aria-label={`Open details: ${p.title}`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow text-[0.62rem] text-cyan">{p.category.split(' / ')[0]}</span>
          <span className="flex items-center gap-1.5">
            {p.featured && <Star size={13} className="text-amber" aria-label="Featured" />}
            {p.sample && <span className="rounded-full border border-amber/50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-amber">Sample</span>}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-snug">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink2">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">{p.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
        <span className="mt-5 flex items-center justify-between text-xs text-ink3">
          {p.status}
          <ArrowUpRight size={16} className="transition group-hover:text-ink" />
        </span>
      </button>
    </motion.article>
  )
}
