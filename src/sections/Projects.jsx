import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import { projectCategories, projects } from '../data/projectsData'
import { usePersona } from '../context/PersonaContext'

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(null)
  const { isDimmed } = usePersona()

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return projects.filter((p) => (cat === 'All' || p.category === cat) &&
      (!s || [p.title, p.description, ...p.stack].join(' ').toLowerCase().includes(s)))
      .sort((a, b) => Number(b.featured) - Number(a.featured))
  }, [cat, q])

  const hasSample = projects.some((p) => p.sample)

  return (
    <section id="projects" className={`px-4 py-24 transition-opacity duration-500 sm:px-6 sm:py-32 ${isDimmed('projects') ? 'opacity-75' : ''}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="projects" eyebrow="Technical work" title="Projects & practice." support="Organised by discipline. Project entries live in a single data file so real work can replace the placeholders." />

        {hasSample && (
          <p className="mb-6 rounded-xl border border-amber/40 bg-amber/5 px-4 py-3 text-sm text-amber" role="note">
            The cards below are labelled samples awaiting real projects. They are not completed work.
          </p>
        )}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {['All', ...projectCategories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${cat === c ? 'border-cyan bg-cyan/10 text-ink' : 'border-line text-ink2 hover:text-ink'}`}
              >
                {c === 'Artificial Intelligence / Machine Learning' ? 'AI / ML' : c}
              </button>
            ))}
          </div>
          <label className="relative block md:w-64">
            <span className="sr-only">Search projects</span>
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink3" aria-hidden="true" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects" className="h-10 w-full rounded-full border border-line bg-card pl-9 pr-4 text-sm outline-none placeholder:text-ink3 focus:border-cyan" />
          </label>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => <ProjectCard key={p.id} project={p} onOpen={setOpen} />)}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-12 text-center text-ink3">No projects match your filters.</p>}
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
