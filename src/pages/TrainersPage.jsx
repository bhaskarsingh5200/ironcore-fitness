import PageHero from '../components/ui/PageHero'
import TrainersSection from '../components/home/TrainersSection'
import ContactSection from '../components/home/ContactSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import { GraduationCap } from 'lucide-react'

const principles = [
  'Form before load — we build skill before we chase numbers.',
  'Programming is personalised, not copied from the internet.',
  'You get feedback every single session, not once a month.',
  'Progress is measured, reviewed, and adjusted regularly.',
]

export default function TrainersPage() {
  return (
    <>
      <SEO
        title="Trainers"
        description="Meet the IronCore Fitness coaching team — concept trainers demonstrating strength coaching, performance coaching, and personal training."
      />
      <PageHero
        eyebrow="Trainers"
        title="Meet your coaches."
        subtitle="A coaching team built on technique, progression, and real care for your goals."
      />
      <div className="pt-20">
        <TrainersSection showAllLink={false} />
      </div>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="Coaching philosophy"
            title="How our coaches coach."
          />
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                  <GraduationCap size={20} />
                </span>
                <p className="text-base leading-relaxed text-slate-200">
                  Every IronCore coach trains under the same four principles. They are why your
                  plan is safe, structured, and actually works.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {principles.map((p, i) => (
                  <Reveal key={p} delay={0.1 + i * 0.05}>
                    <li className="flex items-start gap-3 rounded-md border border-ink-line bg-ink-card p-4 text-sm leading-relaxed text-steel">
                      <span className="mt-0.5 font-heading text-xs font-extrabold text-accent-bright">
                        0{i + 1}
                      </span>
                      {p}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/schedule">Train With Them</Button>
              <Button to="/membership" variant="ghost">Join IronCore</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
