import { Clock, MapPin } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'
import { SITE, OPENING_HOURS } from '../../lib/constants'

export default function LocationSection() {
  return (
    <section className="section-pad border-t border-ink-line bg-ink-surface">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Find us"
            title="Located in the heart of the city."
            subtitle="A demonstration location for this concept installation — no real facility exists here."
          />

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-accent-bright" />
                <div>
                  <p className="font-heading text-sm font-bold text-white">{SITE.city}</p>
                  <p className="text-sm text-steel">
                    Concept address — 4th Floor, Example Tower, MG Road, Bengaluru 560001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 shrink-0 text-accent-bright" />
                <div>
                  <p className="font-heading text-sm font-bold text-white">Opening Hours</p>
                  <ul className="mt-2 space-y-1.5">
                    {OPENING_HOURS.map((row) => (
                      <li key={row.day} className="flex justify-between gap-6 text-sm text-steel">
                        <span>{row.day}</span>
                        <span className="text-slate-300">{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Badge tone="muted">Demo location — not a real business address</Badge>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-md border border-ink-line bg-ink-card">
            <div
              className="absolute inset-0 bg-grid-faint [background-size:40px_40px] opacity-70"
              aria-hidden="true"
            />
            <div className="relative flex aspect-[4/3] flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent-bright">
                <MapPin size={22} />
              </span>
              <p className="font-heading text-lg font-bold text-white">{SITE.city}</p>
              <p className="max-w-xs text-sm text-steel">
                Map placeholder — an embedded map can be wired to a real location before launch.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
