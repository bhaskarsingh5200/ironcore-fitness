import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import Image from '../ui/Image'
import Badge from '../ui/Badge'
import { useAsync } from '../../hooks/useAsync'
import { trainers } from '../../services/content'

export default function TrainersSection({ limit, showAllLink = true }) {
  const { data, loading, error } = useAsync(() => trainers.list(), [])
  const items = (data || []).slice(0, limit || undefined)

  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Coaching team"
            title="Meet your coaches."
            subtitle="A coaching team built on technique, progression, and real care for your goals."
          />
          {showAllLink && (
            <Button to="/trainers" variant="ghost" className="shrink-0">
              View All Trainers
            </Button>
          )}
        </div>

        {loading && (
          <div className="mt-12 flex justify-center py-16 text-steel">
            <Spinner className="h-6 w-6" />
          </div>
        )}

        {error && (
          <p className="mt-12 rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400" role="alert">
            Couldn’t load trainers: {error.message}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((trainer, i) => (
                <Reveal key={trainer.id} delay={i * 0.08}>
                  <Link
                    to={`/trainers/${trainer.slug}`}
                    className="group block overflow-hidden rounded-md border border-ink-line bg-ink-card transition-colors duration-300 hover:border-accent/50"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={trainer.image}
                        alt={`${trainer.name}, ${trainer.role}`}
                        aspect="aspect-[4/3]"
                        imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-heading text-lg font-bold text-white">{trainer.name}</h3>
                        <Badge tone="muted">{trainer.role}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-steel">
                        {trainer.specialization?.join(' · ') || trainer.bio}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-widest text-slate-500">
                        {trainer.experience} experience
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-xs text-slate-500">
              Concept trainers — no real people are represented on this project.
            </p>
          </>
        )}
      </div>
    </section>
  )
}
