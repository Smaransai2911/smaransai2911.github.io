import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import Modal from './Modal'
import { books, experience, nav, site } from '../data/portfolioData'
import { projects } from '../data/projectsData'
import { scrollToSection } from '../utils/scroll'

export default function CommandPalette({ open, onClose }) {
  const [q, setQ] = useState('')
  const [idx, setIdx] = useState(0)
  const listRef = useRef(null)

  const items = useMemo(() => {
    const list = [
      ...nav.map((n) => ({ key: `n-${n.id}`, group: 'Go to', label: n.label, run: () => scrollToSection(n.id) })),
      { key: 'archive', group: 'Go to', label: 'Synaptic Archive (immersive experience)', run: () => { window.location.href = site.archiveUrl } },
      ...experience.map((e) => ({ key: `e-${e.id}`, group: 'Experience', label: `${e.organisation} · ${e.role}`, run: () => scrollToSection('experience') })),
      ...projects.map((p) => ({ key: `p-${p.id}`, group: 'Projects', label: p.title, run: () => scrollToSection('projects') })),
      ...books.filter((b) => !b.placeholder).map((b) => ({ key: `b-${b.id}`, group: 'Publications', label: b.title, run: () => scrollToSection('publications') })),
    ]
    const s = q.trim().toLowerCase()
    return s ? list.filter((i) => i.label.toLowerCase().includes(s) || i.group.toLowerCase().includes(s)) : list
  }, [q])

  useEffect(() => { setIdx(0) }, [q, open])
  useEffect(() => { if (!open) setQ('') }, [open])
  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [idx])

  const run = (item) => {
    if (!item) return
    onClose()
    setTimeout(item.run, 220)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, items.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); run(items[idx]) }
  }

  return (
    <Modal open={open} onClose={onClose} label="Command palette" className="max-w-xl" align="top" hideClose onKeyDownExtra={onKey}>
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search size={16} className="text-ink3" aria-hidden="true" />
        <input
          data-autofocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={items[idx] ? `cmd-${items[idx].key}` : undefined}
          aria-label="Search the portfolio"
          placeholder="Search projects, experience, books…"
          className="h-14 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink3"
        />
      </div>
      <ul id="cmd-list" ref={listRef} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {items.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink3">No matches</li>}
        {items.map((it, i) => (
          <li
            key={it.key}
            id={`cmd-${it.key}`}
            role="option"
            aria-selected={i === idx}
            onMouseEnter={() => setIdx(i)}
            onClick={() => run(it)}
            className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm ${i === idx ? 'bg-elevated text-ink' : 'text-ink2'}`}
          >
            <span>{it.label}</span>
            <span className="text-[0.65rem] uppercase tracking-widest text-ink3">{it.group}</span>
          </li>
        ))}
      </ul>
    </Modal>
  )
}
