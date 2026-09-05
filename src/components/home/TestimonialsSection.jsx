import { Quote, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Spinner from '../ui/Spinner'
import Badge from '../ui/Badge'
import { useAsync } from '../../hooks/useAsync'
import { testimonials } from '../../services/content'

export default function TestimonialsSection({ heading = true }) {
  const { data, loading, error } = useAsync(() => testimonials.list(), [])

  return (
    <section className="section-pad border-t border-ink-line bg-ink-surface">
      <div className="container-x">
        {heading && (
          <SectionHeading
            align="center"
            eyebrow="Member stories"
            title="Sample member stories."
            subtitle="Fictional demo stories for this concept installation — not real customer feedback."
          />
        )}

        {loading && (
          <div className="mt-12 flex justify-center py-14 text-steel">
            <Spinner className="h-6 w-6" />
          </div>
        )}

        {error && (
          <p className="mt-12 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
            Couldn’t load stories: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(data || []).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <figure className="card-surface relative flex h-full flex-col p-6">
                  <Quote size={28} className="text-accent/50" />
                  <div className="mt-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={14}
                        className={s < t.rating ? 'text-accent-bright' : 'text-ink-line'}
                        fill={s < t.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-200">
                    “{t.content}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-ink-line pt-4">
                    <p className="font-heading text-sm font-bold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-steel">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-8 flex justify-center">
            <Badge tone="muted">Concept testimonials — fictional content</Badge>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
