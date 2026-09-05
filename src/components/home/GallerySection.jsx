import { useMemo, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Spinner from '../ui/Spinner'
import Image from '../ui/Image'
import Lightbox from '../ui/Lightbox'
import Button from '../ui/Button'
import { useAsync } from '../../hooks/useAsync'
import { gallery } from '../../services/content'
import { GALLERY_CATEGORIES } from '../../lib/constants'
import { cn } from '../../lib/utils'

export default function GallerySection({ heading = true, showAllLink = true }) {
  const { data, loading, error } = useAsync(() => gallery.list(), [])
  const [category, setCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const items = useMemo(() => {
    let rows = data || []
    if (category !== 'All') rows = rows.filter((g) => g.category === category)
    return rows
  }, [data, category])

  const openLightbox = (index) => setLightboxIndex(index)

  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {heading && (
            <SectionHeading
              eyebrow="Inside IronCore"
              title="A look inside."
              subtitle="Browse concept imagery across our training zones, community, and facilities."
            />
          )}
          {showAllLink && (
            <Button to="/gallery" variant="ghost" className="shrink-0">
              View Full Gallery
            </Button>
          )}
        </div>

        <Reveal>
          <div className="mt-9 flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
            {['All', ...GALLERY_CATEGORIES.map((c) => c.value)].map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors',
                  category === cat
                    ? 'border-accent bg-accent/15 text-accent-bright'
                    : 'border-ink-line text-steel hover:border-accent/40 hover:text-white',
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {loading && (
          <div className="mt-10 flex justify-center py-14 text-steel">
            <Spinner className="h-6 w-6" />
          </div>
        )}

        {error && (
          <p className="mt-10 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
            Couldn’t load gallery: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={Math.min(i * 0.04, 0.3)}>
                <button
                  onClick={() => openLightbox(i)}
                  className="group relative block w-full overflow-hidden rounded-md border border-ink-line text-left"
                  aria-label={`Open image: ${item.caption || 'Gallery image'}`}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || 'Gallery image'}
                    aspect="aspect-[4/3]"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Maximize2 size={22} className="text-white" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <p className="mt-8 text-xs text-slate-500">
            Concept imagery only — no real transformation claims are made on this project.
          </p>
        </Reveal>
      </div>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(-1)}
      />
    </section>
  )
}
