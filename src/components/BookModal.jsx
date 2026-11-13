import { useState } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import Modal from './Modal'

function Excerpt({ book, onBack }) {
  const [reading, setReading] = useState(false)
  return (
    <div className={`p-6 sm:p-10 ${reading ? 'reading-mode min-h-[70vh]' : ''}`}>
      <div className="flex flex-wrap items-center gap-3 pr-10">
        <button type="button" onClick={onBack} className="text-sm text-ink2 underline-offset-4 hover:underline">← Back to book</button>
        <button type="button" aria-pressed={reading} onClick={() => setReading((v) => !v)} className="ml-auto rounded-full border border-gold/50 px-3 py-1.5 text-xs font-semibold text-amber">
          <BookOpen size={13} className="mr-1.5 inline" />Reading mode {reading ? 'on' : 'off'}
        </button>
      </div>
      <h2 className="mt-6 font-serif text-3xl italic text-amber">{book.title}</h2>
      <p className="mt-1 text-xs text-ink3">Excerpts in the author's own words, as featured in The Synaptic Archive.</p>
      <div className="mt-8 space-y-10">
        {book.excerpts.map((x) => (
          <figure key={x.label}>
            <figcaption className="eyebrow mb-3 text-gold">{x.label}</figcaption>
            <blockquote className={`${reading ? '' : 'font-serif text-lg leading-[1.9] text-ink sm:text-xl'}`}>{x.text}</blockquote>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function BookModal({ book, onClose }) {
  const [view, setView] = useState('details')
  const close = () => { setView('details'); onClose() }
  const hasExcerpt = book?.excerpts?.length > 0
  return (
    <Modal open={!!book} onClose={close} label={book ? `${book.title}` : 'Book'} className="max-w-3xl">
      {book && view === 'excerpt' && <Excerpt book={book} onBack={() => setView('details')} />}
      {book && view === 'details' && (
        <div className="grid gap-8 p-6 sm:grid-cols-[200px_1fr] sm:p-9">
          <div className={`aspect-[2/3] w-full max-w-[200px] overflow-hidden rounded-r-lg rounded-l-sm border border-white/10 bg-gradient-to-br ${book.hue}`}>
            {book.cover ? <img src={book.cover} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" /> : (
              <div className="flex h-full items-end p-4"><span className="font-serif text-lg italic text-amber">{book.title}</span></div>
            )}
          </div>
          <div>
            <p className="eyebrow text-gold">Kindle · self-published</p>
            <h2 className="mt-3 pr-10 font-serif text-3xl leading-tight sm:text-4xl">{book.title}</h2>
            {book.subtitle && <p className="mt-2 font-serif text-lg italic text-ink2">{book.subtitle}</p>}
            <p className="mt-3 text-sm text-ink3">By Sai Smaran · {book.year || 'Publication year to be confirmed'}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink2">
              {book.description || (book.placeholder ? 'This publication’s title and details will be added once confirmed.' : 'Description to be added by the author.')}
            </p>
            {book.archiveNote && <p className="mt-4 text-xs text-ink3">{book.archiveNote}</p>}
            <div className="mt-7 flex flex-wrap gap-3">
              {hasExcerpt && <button type="button" className="btn btn-primary" onClick={() => setView('excerpt')}>Read excerpt</button>}
              {book.amazon ? (
                <a className="btn btn-ghost" href={book.amazon} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> View on Amazon</a>
              ) : (
                <span className="btn btn-ghost cursor-not-allowed opacity-50" aria-disabled="true">Amazon link to be added</span>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
