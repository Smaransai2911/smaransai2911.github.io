import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Lightbox from '../components/Lightbox'
import { photoCategories, photography, photos } from '../data/portfolioData'
import { usePersona } from '../context/PersonaContext'

function Tile({ photo, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const ratio = photo.shape === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <button type="button" onClick={() => onOpen(photo)} className={`group relative block w-full overflow-hidden rounded-xl border border-line bg-card ${ratio}`} aria-label={`Open photo: ${photo.caption}`}>
        {!failed && (
          <img
            src={photo.src}
            alt={photo.caption}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        {failed && <span className="absolute inset-0 grid place-items-center p-3 text-center text-xs text-ink3">Image unavailable</span>}
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-xs text-ink opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">{photo.caption}</span>
      </button>
    </motion.div>
  )
}

export default function Photography() {
  const [cat, setCat] = useState('All')
  const [idx, setIdx] = useState(null)
  const { isDimmed } = usePersona()
  const list = useMemo(() => (cat === 'All' ? photos : photos.filter((p) => p.category === cat)), [cat])
  const { stats } = photography

  return (
    <section id="photography" className={`bg-bg2 px-4 py-24 transition-opacity duration-500 sm:px-6 sm:py-32 ${isDimmed('photography') ? 'opacity-80' : ''}`}>
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="photography" tone="lens" eyebrow="Photography" title={photography.heading} support={photography.support}>
          {stats.showStats && (
            <p className="mt-4 text-sm text-ink3">{stats.photoCount} photos · {stats.views} views on Unsplash</p>
          )}
        </SectionHeading>

        <div role="group" aria-label="Filter photographs by theme" className="mb-8 flex flex-wrap gap-2">
          {['All', ...photoCategories].map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${cat === c ? 'border-amber bg-amber/10 text-ink' : 'border-line text-ink2 hover:text-ink'}`}>{c}</button>
          ))}
        </div>

        <div className="masonry">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => <Tile key={p.id} photo={p} onOpen={() => setIdx(i)} />)}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-xs text-ink3">Images carried over from the original archive. Attribution is marked as unconfirmed until each photograph is verified in the data file.</p>

        <div className="mt-10">
          <a className="btn btn-primary" href={photography.profileUrl} target="_blank" rel="noopener noreferrer">
            View photographs on Unsplash · {photography.handle}
          </a>
        </div>
      </div>
      <Lightbox photos={list} index={idx} onClose={() => setIdx(null)} onIndex={setIdx} />
    </section>
  )
}
