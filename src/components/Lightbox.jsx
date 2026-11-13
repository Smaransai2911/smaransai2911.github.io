import { ChevronLeft, ChevronRight } from 'lucide-react'
import Modal from './Modal'

export default function Lightbox({ photos, index, onClose, onIndex }) {
  const open = index !== null && index >= 0
  const p = open ? photos[index] : null
  const go = (d) => onIndex((index + d + photos.length) % photos.length)
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  return (
    <Modal open={open} onClose={onClose} label="Photo viewer" className="max-w-5xl !bg-black/60" backdropClass="bg-black/92" onKeyDownExtra={onKey}>
      {p && (
        <figure className="p-3 sm:p-6">
          <img src={p.src} alt={p.caption} className="mx-auto max-h-[72vh] w-auto max-w-full rounded-lg object-contain" />
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-sm">
            <span>
              <span className="text-ink">{p.caption}</span>
              <span className="block text-xs text-ink3">{p.category}{p.location ? ` · ${p.location}` : ''}{p.verified ? '' : ' · attribution to be confirmed'}</span>
              {p.link && <a className="text-xs text-cyan underline" href={p.link} target="_blank" rel="noopener noreferrer">View on Unsplash</a>}
            </span>
            <span className="text-xs text-ink3">{index + 1} / {photos.length}</span>
          </figcaption>
          <div className="mt-3 flex justify-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-gold"><ChevronLeft /></button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-gold"><ChevronRight /></button>
          </div>
        </figure>
      )}
    </Modal>
  )
}
