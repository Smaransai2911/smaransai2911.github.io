import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../utils/motionVariants'
import { usePersona } from '../context/PersonaContext'

export default function SectionHeading({ id, eyebrow, title, support, tone = 'tech', align = 'left', children }) {
  const { isFocused } = usePersona()
  const color = tone === 'literary' ? 'text-gold' : tone === 'lens' ? 'text-amber' : 'text-cyan'
  return (
    <motion.header
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={`mb-12 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <motion.p variants={fadeUp} className={`eyebrow ${color} mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        {eyebrow}
        {isFocused(id) && (
          <span className="rounded-full border border-current px-2 py-0.5 text-[0.6rem] tracking-[0.18em]">In focus</span>
        )}
      </motion.p>
      <motion.h2 variants={fadeUp} className="h-section">{title}</motion.h2>
      {support && <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-ink2 sm:text-lg">{support}</motion.p>}
      {children}
    </motion.header>
  )
}
