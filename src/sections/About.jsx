import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { about } from '../data/portfolioData'
import { fadeUp, stagger } from '../utils/motionVariants'

export default function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="about" eyebrow="About" title={about.heading} />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="space-y-5 text-base leading-[1.85] text-ink2 sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className={i === 0 ? 'text-ink' : ''}>{p}</motion.p>
            ))}
          </motion.div>

          {/* Split composition: build / express / observe */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-4">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-card p-6">
              <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
                <g stroke="#818CF8" strokeWidth=".4" fill="none">
                  <path d="M10 20L60 50L110 15L170 60L190 25M60 50L90 85L170 60M110 15L130 90" />
                </g>
                <g fill="#22D3EE">
                  {[[10, 20], [60, 50], [110, 15], [170, 60], [190, 25], [90, 85], [130, 90]].map(([x, y]) => <circle key={x + y} cx={x} cy={y} r="2" />)}
                </g>
              </svg>
              <p className="eyebrow relative text-cyan">How I build</p>
              <p className="relative mt-2 font-sans text-xl font-medium text-ink">Technology</p>
              <p className="relative mt-1 text-sm text-ink2">Data, workflows, Python and SQL.</p>
            </div>
            <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-[#1a140a] to-card p-6">
              <p className="eyebrow text-gold">How I express</p>
              <p className="mt-2 font-serif text-3xl italic text-amber">Literature</p>
              <p className="mt-1 text-sm text-ink2">Self-published books on Kindle.</p>
            </div>
            <div className="rounded-2xl border border-line bg-card p-6">
              <p className="eyebrow text-amber">How I observe</p>
              <p className="mt-2 font-serif text-3xl text-ink">Photography</p>
              <p className="mt-1 text-sm text-ink2">Light, distance and quiet moments.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
