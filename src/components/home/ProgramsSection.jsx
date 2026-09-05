import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import Image from '../ui/Image'
import { useAsync } from '../../hooks/useAsync'
import { programs } from '../../services/content'
import { getProgramIcon } from '../../lib/icons'

export default function ProgramsSection({ limit, showAllLink = true }) {
  const { data, loading, error } = useAsync(() => programs.list(), [])
  const items = (data || []).slice(0, limit || undefined)

  return (
    <section className="section-pad border-t border-ink-line bg-ink-surface">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Programs"
            title="Train with purpose."
            subtitle="Choose a training path designed around your goals."
          />
          {showAllLink && (
            <Button to="/programs" variant="ghost" className="shrink-0">
              View All Programs
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
            Couldn’t load programs: {error.message}
          </p>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((program, i) => {
              const Icon = getProgramIcon(program.icon)
              return (
                <Reveal key={program.id} delay={i * 0.07}>
                  <Link
                    to={`/programs/${program.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-md border border-ink-line bg-ink-card transition-colors duration-300 hover:border-accent/50"
                  >
                    <div className="relative">
                      <Image
                        src={program.image}
                        alt={program.title}
                        aspect="aspect-[16/10]"
                        imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-4 top-4 font-heading text-2xl font-extrabold text-white/25">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded border border-accent/30 bg-ink/80 text-accent-bright backdrop-blur-sm">
                        <Icon size={17} />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-heading text-lg font-bold text-white">{program.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-steel">
                        {program.shortDescription}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-wider text-accent-bright transition-colors group-hover:text-white">
                        Explore Program <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
