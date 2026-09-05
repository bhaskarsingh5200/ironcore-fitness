import PageHero from '../components/ui/PageHero'
import ContactSection from '../components/home/ContactSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import SEO from '../components/SEO'
import { SITE, OPENING_HOURS } from '../lib/constants'
import { TrainFront, Car, Bus, Instagram, Youtube, Facebook } from 'lucide-react'

const gettingHere = [
  {
    icon: TrainFront,
    title: 'By metro',
    description: 'MG Road metro station is a 4-minute walk from the Example Tower entrance.',
  },
  {
    icon: Car,
    title: 'By car',
    description: 'Paid basement parking is available under Example Tower — enter from the service lane.',
  },
  {
    icon: Bus,
    title: 'By bus',
    description: 'The MG Road bus stop is right outside the building, with stops across the city.',
  },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: SITE.instagram },
  { icon: Youtube, label: 'YouTube', href: SITE.youtube },
  { icon: Facebook, label: 'Facebook', href: SITE.facebook },
]

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Contact IronCore Fitness — tell us what you’re working toward and we’ll help you find the right way to start. Concept project."
      />
      <PageHero
        eyebrow="Contact"
        title="Ready to get stronger?"
        subtitle="Tell us what you’re working toward and we’ll help you find the right way to start."
      />
      <ContactSection heading={false} />
      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              Concept location & hours
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="card-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Concept address
                </p>
                <p className="mt-2 font-heading text-lg font-bold text-white">{SITE.city}</p>
                <p className="mt-1 text-sm text-steel">
                  4th Floor, Example Tower, MG Road, Bengaluru 560001
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  Demo location — no real business operates here.
                </p>
              </div>
              <div className="card-surface p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Opening hours
                </p>
                <ul className="mt-3 space-y-2">
                  {OPENING_HOURS.map((row) => (
                    <li key={row.day} className="flex justify-between gap-6 text-sm text-slate-200">
                      <span>{row.day}</span>
                      <span className="text-steel">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-card">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="Getting here"
            title="Easy to reach."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {gettingHere.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="card-surface h-full p-5 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                    <item.icon size={20} />
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-steel">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-10 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Follow the concept
              </p>
              <div className="mt-4 flex justify-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded border border-ink-line text-steel transition-colors hover:border-accent hover:text-accent-bright"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
