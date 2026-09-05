import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Lightbox viewer for the gallery. Supports next/previous/close and
 * keyboard navigation (arrow keys, Escape).
 * The displayed image is derived from the `index` prop plus an internal
 * navigation offset, so it is never stale for one render after opening.
 */
export default function Lightbox({ items, index, onClose }) {
  const [offset, setOffset] = useState(0)

  useEffect(() => setOffset(0), [index])

  const count = items.length
  const next = useCallback(() => {
    setOffset((o) => (o + 1) % count)
  }, [count])
  const prev = useCallback(() => {
    setOffset((o) => (o - 1 + count) % count)
  }, [count])

  useEffect(() => {
    if (index < 0) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, next, prev, onClose])

  if (typeof document === 'undefined' || index < 0 || count === 0) return null

  const displayed = (offset + index) % count
  const item = items[displayed]

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label={item?.caption || 'Gallery image'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute right-4 top-4 z-10 rounded-full border border-white/15 p-2.5 text-white transition-colors hover:bg-white/10"
        >
          <X size={22} />
        </button>

        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 p-2.5 text-white transition-colors hover:bg-white/10 sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/15 p-2.5 text-white transition-colors hover:bg-white/10 sm:right-6"
        >
          <ChevronRight size={22} />
        </button>

        <AnimatePresence mode="wait">
          <motion.figure
            key={displayed}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="max-h-full max-w-4xl"
          >
            <img
              src={item?.imageUrl}
              alt={item?.caption || 'Gallery image'}
              className="max-h-[78vh] w-auto max-w-full rounded-md object-contain"
            />
            {item && item.caption && (
              <figcaption className="mt-4 text-center text-sm text-steel">
                {item.caption}
                <span className="ml-2 text-slate-600">
                  {displayed + 1} / {count}
                </span>
              </figcaption>
            )}
          </motion.figure>
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>,
    document.body,
  )
}