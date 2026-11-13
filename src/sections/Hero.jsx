import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import NeuralBackground from '../components/NeuralBackground'
import Magnetic from '../components/Magnetic'
import { socialIcons } from '../components/Icons'
import { person, social } from '../data/portfolioData'
import { fadeUp, stagger } from '../utils/motionVariants'
import { scrollToSection } from '../utils/scroll'
import useReducedMotion from '../hooks/useReducedMotion'

export default function Hero({ onOpenMap }) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 90])
  const opacity = useTransform(scrollY, [0, 520], [1, reduced ? 1 : 0.2])

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_20%,rgba(34,211,238,0.10),transparent),radial-gradient(50%_45%_at_85%_30%,rgba(129,140,248,0.12),transparent),radial-gradient(40%_40%_at_70%_95%,rgba(214,168,95,0.10),transparent)]" aria-hidden="true" />
      <NeuralBackground className="opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" aria-hidden="true" />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-7xl">
        <motion.div variants={stagger(0.12, 0.1)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="eyebrow glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-ink2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            {person.badge}
          </motion.p>

          <h1 className="display-serif text-[clamp(3.2rem,12vw,9.5rem)]">
            <motion.span variants={fadeUp} className="block">{person.firstLine}</motion.span>
            <motion.span variants={fadeUp} className="gold-text block italic">{person.accentLine}</motion.span>
          </h1>

          <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl">
            {person.tagline}
          </motion.p>

          <motion.ul variants={fadeUp} className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink2">
            {person.philosophy.map((p) => (
              <li key={p.word}><strong className="font-semibold text-ink">{p.word}</strong> {p.verb}</li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <button type="button" className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                View technical work
              </button>
            </Magnetic>
            <Magnetic>
              <button type="button" className="btn btn-ghost" onClick={onOpenMap}>
                Open the neural map
              </button>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="/archive/">Enter The Synaptic Archive</a>
            </Magnetic>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3" aria-label="Profiles">
            {Object.entries(social).filter(([, s]) => s.url).map(([k, s]) => {
              const Icon = socialIcons[k]
              return (
                <li key={k}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink2 transition hover:border-cyan hover:text-ink"
                  >
                    <Icon />
                  </a>
                </li>
              )
            })}
          </motion.ul>
        </motion.div>
      </motion.div>

      <button
        type="button"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-ink3 transition hover:text-ink sm:block"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </button>
    </section>
  )
}
