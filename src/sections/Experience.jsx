import { motion } from 'framer-motion'
import { Award, Briefcase, GraduationCap, MapPin } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { certifications, education, experience, skills } from '../data/portfolioData'
import { fadeUp, stagger } from '../utils/motionVariants'
import { usePersona } from '../context/PersonaContext'

const card = 'rounded-2xl border border-line bg-card p-6 sm:p-7'

export default function Experience() {
  const { isFocused } = usePersona()
  const focus = isFocused('experience') ? 'ring-1 ring-cyan/40' : ''
  return (
    <section id="experience" className="bg-bg2 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="experience" eyebrow="Experience & education" title="A journey in progress." support="Early-career, and described as such: exposure and learning, not claimed deliverables." />

        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid gap-4 lg:grid-cols-6">
          {experience.map((e) => (
            <motion.article key={e.id} variants={fadeUp} className={`${card} ${focus} lg:col-span-4`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow flex items-center gap-2 text-cyan"><Briefcase size={14} /> Current</p>
                  <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{e.organisation}</h3>
                  <p className="mt-1 text-ink">{e.role}</p>
                  <p className="text-sm text-ink2">Association: {e.association}</p>
                </div>
                <p className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-ink2">{e.start} – {e.end}</p>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-ink3"><MapPin size={13} /> {e.location}</p>
              <div className="mt-6 border-t border-line pt-5">
                <p className="eyebrow mb-3 text-ink3">Exposure & learning areas</p>
                <ul className="flex flex-wrap gap-2">
                  {e.exposure.map((x) => <li key={x} className="tag">{x}</li>)}
                </ul>
                <p className="mt-4 text-xs text-ink3">{e.note}</p>
              </div>
            </motion.article>
          ))}

          {education.map((ed) => (
            <motion.article key={ed.id} variants={fadeUp} className={`${card} lg:col-span-2`}>
              <p className="eyebrow flex items-center gap-2 text-indigo"><GraduationCap size={14} /> Education</p>
              <h3 className="mt-3 text-xl font-semibold">{ed.institution}</h3>
              <p className="mt-1 text-ink2">{ed.degree}</p>
              <p className="mt-1 text-sm text-ink3">{ed.period}</p>
            </motion.article>
          ))}

          <motion.article variants={fadeUp} className={`${card} ${isFocused('skills') ? 'ring-1 ring-cyan/40' : ''} lg:col-span-3`}>
            <p className="eyebrow text-cyan">Skills & areas of interest</p>
            <div className="mt-4 space-y-4">
              {skills.map((g) => (
                <div key={g.group}>
                  <p className="mb-2 text-xs text-ink3">{g.group}</p>
                  <ul className="flex flex-wrap gap-2">{g.items.map((i) => <li key={i} className="tag">{i}</li>)}</ul>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article variants={fadeUp} className={`${card} lg:col-span-3`}>
            <p className="eyebrow flex items-center gap-2 text-gold"><Award size={14} /> Certifications</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {certifications.items.map((c) => {
                const inner = (
                  <>
                    <span className="block text-sm font-semibold text-ink">{c.issuer}</span>
                    <span className="mt-0.5 block text-xs text-ink3">{c.title || 'Details to be added'}{c.year ? ` · ${c.year}` : ''}</span>
                  </>
                )
                return (
                  <li key={c.issuer}>
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-line bg-elevated p-4 transition hover:border-gold">{inner}</a>
                    ) : (
                      <div className="rounded-xl border border-line bg-elevated p-4">{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          </motion.article>
        </motion.div>
      </div>
    </section>
  )
}
