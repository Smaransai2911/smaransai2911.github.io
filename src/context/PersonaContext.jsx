import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { personas } from '../data/portfolioData'

const PersonaContext = createContext({ persona: 'all', setPersona: () => {}, isFocused: () => false })
const KEY = 'gss-persona'

export function PersonaProvider({ children }) {
  const [persona, setPersona] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return personas.some((p) => p.id === saved) ? saved : 'all'
    } catch {
      return 'all'
    }
  })

  useEffect(() => {
    try { localStorage.setItem(KEY, persona) } catch { /* storage unavailable */ }
  }, [persona])

  const value = useMemo(() => {
    const current = personas.find((p) => p.id === persona)
    return {
      persona,
      setPersona,
      // true when this persona brings the section into focus
      isFocused: (sectionId) => !!current?.sections && current.sections.includes(sectionId),
      // true when a persona is active and this section is outside it
      isDimmed: (sectionId) => !!current?.sections && !current.sections.includes(sectionId),
    }
  }, [persona])

  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>
}

export const usePersona = () => useContext(PersonaContext)
