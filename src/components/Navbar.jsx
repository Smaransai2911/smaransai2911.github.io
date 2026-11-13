import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Search, X } from 'lucide-react'
import { nav, site } from '../data/portfolioData'
import useActiveSection from '../hooks/useActiveSection'
import { scrollToSection } from '../utils/scroll'
import PersonaSwitcher from './PersonaSwitcher'

const ids = nav.map((n) => n.id)

export default function Navbar({ onOpenPalette }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => {
    setOpen(false)
    // wait a tick so the menu collapse does not fight the scroll
    setTimeout(() => scrollToSection(id), 20)
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-[95] transition-colors duration-300 ${scrolled || open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); go('home') }}
          className="flex items-center gap-3"
          aria-label="Ganaparthi Sai Smaran, back to home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-card font-serif text-sm font-semibold tracking-wider text-amber">GSS</span>
          <span className="hidden whitespace-nowrap text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink2 min-[1500px]:block">The Synaptic Archive</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.filter((n) => n.id !== 'home').map((n) => {
            const on = active === n.id
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => { e.preventDefault(); go(n.id) }}
                  aria-current={on ? 'true' : undefined}
                  className={`relative block whitespace-nowrap px-3 py-2 text-[0.8rem] font-medium transition-colors ${on ? 'text-ink' : 'text-ink2 hover:text-ink'}`}
                >
                  {n.label}
                  {on && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-cyan to-indigo" />}
                </a>
              </li>
            )
          })}
          <li>
            <a href={site.archiveUrl} className="ml-1 block whitespace-nowrap rounded-full border border-gold/50 px-3.5 py-1.5 text-[0.8rem] font-medium text-amber transition hover:bg-gold/10">
              Synaptic Archive
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <PersonaSwitcher idPrefix="nav" className="hidden xl:inline-flex" />
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label="Open command palette"
            className="hidden h-10 items-center gap-2 whitespace-nowrap rounded-full border border-line px-3 text-xs text-ink2 transition hover:text-ink xl:flex"
          >
            <Search size={14} /> <kbd className="font-sans">Ctrl K</kbd>
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line px-4 pb-6 pt-4 lg:hidden">
          <PersonaSwitcher idPrefix="mob" className="mb-4 flex w-full justify-between overflow-x-auto" />
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => { e.preventDefault(); go(n.id) }}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`block rounded-lg px-3 py-3 text-base ${active === n.id ? 'bg-elevated text-ink' : 'text-ink2'}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.archiveUrl} className="mt-2 block rounded-lg border border-gold/50 px-3 py-3 text-base text-amber">Synaptic Archive →</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
