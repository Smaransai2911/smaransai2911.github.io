import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import { bookSection, books } from '../data/portfolioData'
import { usePersona } from '../context/PersonaContext'

export default function Bookshelf() {
  const [open, setOpen] = useState(null)
  const { isDimmed } = usePersona()
  return (
    <section id="publications" className={`relative overflow-hidden bg-gradient-to-b from-bg via-[#100c06] to-bg px-4 py-24 transition-opacity duration-500 sm:px-6 sm:py-32 ${isDimmed('publications') ? 'opacity-80' : ''}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="publications" tone="literary" eyebrow="Books & publications" title={bookSection.heading} support={bookSection.support} />
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {books.map((b) => <BookCard key={b.id} book={b} onOpen={setOpen} />)}
        </ul>
        <div className="mt-14">
          {bookSection.authorPageUrl ? (
            <a className="btn btn-ghost" href={bookSection.authorPageUrl} target="_blank" rel="noopener noreferrer">View all books · Amazon author page</a>
          ) : (
            <p className="text-sm text-ink3">Amazon author page link to be added in <code>portfolioData.js</code>.</p>
          )}
        </div>
      </div>
      <BookModal book={open} onClose={() => setOpen(null)} />
    </section>
  )
}
