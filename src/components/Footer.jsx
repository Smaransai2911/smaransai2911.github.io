import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { socialIcons } from './Icons'
import { person, site, social } from '../data/portfolioData'
import { scrollToTop } from '../utils/scroll'

export default function Footer() {
  const y = new Date().getFullYear()
  const years = y > site.copyrightStartYear ? `${site.copyrightStartYear}–${y}` : `${site.copyrightStartYear}`
  return (
    <footer className="border-t border-line bg-bg2 px-4 py-12 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card font-serif text-sm font-semibold tracking-wider text-amber">GSS</span>
          <p className="text-xs leading-relaxed text-ink3">© {years} {person.name} · The Synaptic Archive · All rights reserved.</p>
        </div>
        <ul className="flex items-center gap-2" aria-label="Profiles">
          {Object.entries(social).filter(([, s]) => s.url).map(([k, s]) => {
            const Icon = socialIcons[k]
            return (
              <li key={k}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink2 transition hover:text-ink"><Icon /></a>
              </li>
            )
          })}
        </ul>
        <button type="button" onClick={scrollToTop} className="btn btn-ghost !min-h-[40px] text-xs">Back to top <ArrowUp size={14} /></button>
      </motion.div>
    </footer>
  )
}
