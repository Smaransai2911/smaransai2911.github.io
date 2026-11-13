import { motion } from 'framer-motion'
import { personas } from '../data/portfolioData'
import { usePersona } from '../context/PersonaContext'

export default function PersonaSwitcher({ className = '', idPrefix = 'ps' }) {
  const { persona, setPersona } = usePersona()
  return (
    <div role="radiogroup" aria-label="Emphasise portfolio content by interest" className={`inline-flex rounded-full border border-line bg-bg/60 p-1 ${className}`}>
      {personas.map((p) => {
        const on = persona === p.id
        return (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setPersona(p.id)}
            className={`relative rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] transition-colors sm:px-3.5 ${on ? 'text-bg' : 'text-ink2 hover:text-ink'}`}
          >
            {on && (
              <motion.span
                layoutId={`${idPrefix}-pill`}
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative z-10">{p.label}</span>
          </button>
        )
      })}
    </div>
  )
}
