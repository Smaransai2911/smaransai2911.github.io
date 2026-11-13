import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Modal from './Modal'
import { site } from '../data/portfolioData'
import { scrollToSection } from '../utils/scroll'

// Content comes from portfolioData via `target` ids; descriptions stay factual.
const NODES = [
  { id: 'intelligence', label: 'Intelligence', x: 18, y: 28, color: '#22D3EE', target: 'projects', action: 'See projects',
    text: 'Computer science, data tooling and AI/ML as an area of study and exploration.' },
  { id: 'innovation', label: 'Innovation', x: 50, y: 14, color: '#818CF8', target: 'experience', action: 'See experience',
    text: 'The professional journey: an apprenticeship at Volvo Group India working with enterprise data tools.' },
  { id: 'words', label: 'Words', x: 82, y: 30, color: '#D6A85F', target: 'publications', action: 'See publications',
    text: 'Self-published books on Kindle: poetry and prose about memory, weather and feeling.' },
  { id: 'frames', label: 'Frames', x: 70, y: 74, color: '#F5C77A', target: 'photography', action: 'See photography',
    text: 'Photographs shared on Unsplash: light, distance, rain, movement and night.' },
  { id: 'memory', label: 'Memory', x: 30, y: 74, color: '#FAFAFA', target: null, action: 'Enter the full Archive',
    text: 'Where the other four meet. The full Synaptic Archive is an experimental, five-act space of words and images.' },
]
const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3], [1, 4]]

export default function NeuralMemoryMap({ open, onClose }) {
  const [sel, setSel] = useState(null)
  const [found, setFound] = useState([])
  const node = NODES.find((n) => n.id === sel)

  const choose = (id) => {
    setSel(id)
    // Easter egg: visit every node in order of the five acts' themes to unlock the archive note.
    setFound((f) => (f.includes(id) ? f : [...f, id]))
  }
  const all = found.length === NODES.length

  const act = () => {
    if (!node) return
    onClose()
    if (node.target) setTimeout(() => scrollToSection(node.target), 250)
    else window.location.href = site.archiveUrl
  }

  return (
    <Modal open={open} onClose={onClose} label="The neural map of memory" className="max-w-4xl !bg-bg2">
      <div className="p-5 sm:p-9">
        <p className="eyebrow text-cyan mb-2">The Synaptic Archive</p>
        <h2 className="h-section mb-6">The neural map of memory</h2>

        <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-xl border border-line bg-bg">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {EDGES.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y}
                stroke="rgba(161,161,170,0.35)" strokeWidth="0.25" vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.1 * i }}
              />
            ))}
          </svg>
          {NODES.map((n) => (
            <button
              key={n.id}
              type="button"
              data-autofocus={n.id === 'intelligence' ? '' : undefined}
              onClick={() => choose(n.id)}
              aria-pressed={sel === n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <motion.span
                animate={{ scale: sel === n.id ? 1.35 : 1 }}
                className="mx-auto block h-5 w-5 rounded-full sm:h-6 sm:w-6"
                style={{ background: n.color, boxShadow: `0 0 ${sel === n.id ? 28 : 12}px ${n.color}` }}
              />
              <span className="mt-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink sm:text-xs">{n.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 min-h-[8.5rem]" aria-live="polite">
          <AnimatePresence mode="wait">
            {node ? (
              <motion.div key={node.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
                <h3 className="font-serif text-3xl" style={{ color: node.color }}>{node.label}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink2">{node.text}</p>
                <button type="button" onClick={act} className="btn btn-ghost mt-4">{node.action} <ArrowRight size={16} /></button>
              </motion.div>
            ) : (
              <p className="text-ink2">Select a node. Each one opens a part of the portfolio.</p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {all && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 rounded-xl border border-gold/40 bg-gold/5 p-4 text-sm text-amber">
              You have visited every node.{' '}
              <a className="underline underline-offset-4" href={site.archiveUrl}>The full Archive is waiting →</a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  )
}
