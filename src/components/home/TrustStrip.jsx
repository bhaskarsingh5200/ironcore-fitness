import Reveal from '../ui/Reveal'
import { HERO_STATS } from '../../lib/constants'

export default function TrustStrip() {
  return (
    <section className="border-y border-ink-line bg-ink-surface">
      <div className="container-x grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
        {HERO_STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className="px-4 py-8 text-center md:px-6"
          >
            <p className="font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-steel">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
      <p className="border-t border-ink-line px-5 py-3 text-center text-[11px] uppercase tracking-widest text-slate-600">
        Demo figures for this concept installation
      </p>
    </section>
  )
}
