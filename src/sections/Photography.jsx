
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import Lightbox from '../components/Lightbox'
import { photoCategories, photography, photos } from '../data/portfolioData'
import { usePersona } from '../context/PersonaContext'

const WORKER_URL = 'https://smaran-unsplash-gallery.gsmaransai.workers.dev'

function Tile({ photo, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const ratio = photo.shape === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        onClick={() => onOpen(photo)}
        className={`group relative block w-full overflow-hidden rounded-xl border border-line bg-card ${ratio}`}
        aria-label={`Open photo: ${photo.caption}`}
      >
        {!failed && (
          <img
            src={photo.src}
            alt={photo.caption}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {failed && (
          <span className="absolute inset-0 grid place-items-center p-3 text-center text-xs text-ink3">
            Image unavailable
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left text-xs text-ink opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
          {photo.caption}
        </span>
      </button>
    </motion.div>
  )
}

export default function Photography() {
  const [cat, setCat] = useState('All')
  const [idx, setIdx] = useState(null)
  const [remotePhotos, setRemotePhotos] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { isDimmed } = usePersona()

  const gallery = remotePhotos ?? photos

  const categories = remotePhotos
    ? ['Unsplash uploads']
    : photoCategories

  const list = useMemo(
    () =>
      cat === 'All'
        ? gallery
        : gallery.filter((photo) => photo.category === cat),
    [cat, gallery]
  )

  const { stats } = photography

  async function fetchPhotos(requestedPage, replace = false) {
    if (loading) return

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${WORKER_URL}?page=${requestedPage}`)

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`)
      }

      const data = await response.json()

      if (!Array.isArray(data.photos)) {
        throw new Error('Invalid photo response')
      }

      const incoming = data.photos.map((photo) => ({
        id: photo.id,
        src: photo.src,
        caption: photo.caption,
        category: 'Unsplash uploads',
        shape: 'landscape',
        verified: true,
        link: photo.link,
        photographer: photo.photographer,
        photographerUrl: photo.photographerUrl,
        downloadLocation: photo.downloadLocation,
        createdAt: photo.createdAt,
      }))

      setRemotePhotos((previous) => {
        if (replace || !previous) return incoming

        const existingIds = new Set(previous.map((photo) => photo.id))
        const unique = incoming.filter(
          (photo) => !existingIds.has(photo.id)
        )

        return [...previous, ...unique]
      })

      setPage(requestedPage)
      setHasMore(data.hasMore)
      setCat('All')
      setIdx(null)

      setMessage(
        replace
          ? `${incoming.length} latest photographs loaded from Unsplash.`
          : `${incoming.length} photographs fetched.`
      )
    } catch (error) {
      console.error('Unsplash gallery error:', error)
      setMessage(
        'Unable to refresh Unsplash. Your existing gallery is still available.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="photography"
      className={`bg-bg2 px-4 py-24 transition-opacity duration-500 sm:px-6 sm:py-32 ${
        isDimmed('photography') ? 'opacity-80' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="photography"
          tone="lens"
          eyebrow="Photography"
          title={photography.heading}
          support={photography.support}
        >
          {stats.showStats && (
            <p className="mt-4 text-sm text-ink3">
              {stats.photoCount} photos · {stats.views} views on Unsplash
            </p>
          )}
        </SectionHeading>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fetchPhotos(1, true)}
            disabled={loading}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : '↻ Refresh from Unsplash'}
          </button>

          <span className="text-xs text-ink3">
            {remotePhotos
              ? `${gallery.length} Unsplash photographs`
              : `${gallery.length} photographs in the original gallery`}
          </span>
        </div>

        {message && (
          <p role="status" className="mb-5 text-sm text-ink2">
            {message}
          </p>
        )}

        <div
          role="group"
          aria-label="Filter photographs by theme"
          className="mb-8 flex flex-wrap gap-2"
        >
          {['All', ...categories].map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={cat === category}
              onClick={() => setCat(category)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                cat === category
                  ? 'border-amber bg-amber/10 text-ink'
                  : 'border-line text-ink2 hover:text-ink'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="masonry">
          <AnimatePresence mode="popLayout">
            {list.map((photo) => (
              <Tile
                key={photo.id}
                photo={photo}
                onOpen={() =>
                  setIdx(
                    list.findIndex((item) => item.id === photo.id)
                  )
                }
              />
            ))}
          </AnimatePresence>
        </div>

        {remotePhotos && hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => fetchPhotos(page + 1)}
              disabled={loading}
              className="btn btn-primary disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load more photographs'}
            </button>
          </div>
        )}

        <p className="mt-6 text-xs text-ink3">
          Every photograph is linked to its original Unsplash page.
          Explore the collection and discover each image.
        </p>

        <div className="mt-10">
          <a
            className="btn btn-primary"
            href={photography.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View photographs on Unsplash · {photography.handle}
          </a>
        </div>
      </div>

      <Lightbox
        photos={list}
        index={idx}
        onClose={() => setIdx(null)}
        onIndex={setIdx}
      />
    </section>
  )
}
