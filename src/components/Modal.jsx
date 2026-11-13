import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { modalBackdrop, modalPanel, still } from '../utils/motionVariants'
import useReducedMotion from '../hooks/useReducedMotion'

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Accessible dialog: portal, aria-modal, focus moves in and is restored,
 * Tab is trapped, Escape closes, body scroll locked.
 * Key handling is attached to the panel so stacked modals only react when focused.
 */
export default function Modal({
  open,
  onClose,
  label,
  children,
  className = '',
  align = 'center',
  hideClose = false,
  backdropClass = 'bg-black/80 backdrop-blur-md',
  onKeyDownExtra,
}) {
  const panelRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!open) return undefined
    const previous = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      const el = panelRef.current
      if (!el) return
      const first = el.querySelector('[data-autofocus]') || el.querySelector(FOCUSABLE)
      ;(first || el).focus()
    }, 30)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prevOverflow
      if (previous && previous.focus) previous.focus()
    }
  }, [open])

  // Keep latest callbacks without re-subscribing the document listener.
  const cbRef = useRef({ onClose, onKeyDownExtra })
  cbRef.current = { onClose, onKeyDownExtra }

  // Document-level so Escape / arrows still work if focus was lost
  // (e.g. the focused button unmounted when the dialog content changed).
  useEffect(() => {
    if (!open) return undefined
    const handler = (e) => {
      const panel = panelRef.current
      if (!panel) return
      if (e.key === 'Escape') {
        e.preventDefault()
        cbRef.current.onClose()
        return
      }
      cbRef.current.onKeyDownExtra?.(e)
      if (e.key === 'Tab') {
        const nodes = panel.querySelectorAll(FOCUSABLE)
        if (!nodes.length) { e.preventDefault(); panel.focus(); return }
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        const active = document.activeElement
        if (!panel.contains(active)) { e.preventDefault(); first.focus() }
        else if (e.shiftKey && active === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const bd = reduced ? still : modalBackdrop
  const pn = reduced ? still : modalPanel

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          variants={bd}
          initial="hidden"
          animate="show"
          exit="exit"
          className={`fixed inset-0 z-[200] flex ${align === 'top' ? 'items-start pt-[12vh]' : 'items-center'} justify-center p-3 sm:p-6 ${backdropClass}`}
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            variants={pn}
            initial="hidden"
            animate="show"
            exit="exit"
            className={`relative w-full max-h-[92vh] overflow-y-auto rounded-2xl border border-line bg-card shadow-2xl shadow-black/60 outline-none ${className}`}
          >
            {!hideClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center rounded-full border border-line bg-bg/70 text-ink2 transition hover:text-ink"
              >
                <X size={18} />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
