import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Image from '../components/ui/Image'
import ConceptNotice from '../components/ConceptNotice'
import SEO from '../components/SEO'
import { Check } from 'lucide-react'
import { IMG } from '../data/images'
import { conceptFacilities } from '../data/concept'
import { check, values, quickFacts, milestones } from './aboutContent'

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About"
        description="IronCore Fitness is built around purposeful training, expert coaching, and an environment designed to help you become stronger — physically and mentally. Concept project."
      />
      <PageHero
        eyebrow="About IronCore"
        title="More than a gym."
        subtitle="Purposeful training, expert coaching, and an environment designed around becoming stronger — physically and mentally."
      />

      <section className="section-pad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative">
            <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-lg border border-accent/25" />
            <Image src={IMG.aboutMain} alt="Strength training at IronCore" aspect="aspect-[4/5]" className="relative rounded-lg border border-ink-line" />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our story" title="Strength as a practice." />
            <Reveal delay={0.1}>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-steel">
                <p>
                  IronCore Fitness began with a simple idea: most people don’t need a bigger gym —
                  they need a better one. A place where training is planned, coached, and measured.
                  Today the club runs a full training floor with strength, cardio, functional,
                  mobility, and personal-training zones under one roof.
                </p>
                <p>
                  Every program here is built around progressive structure, honest feedback, and
                  coaching that treats technique as the foundation. The result is an environment
                  where beginners learn safely, and experienced lifters keep progressing.
                </p>
                <p>
                  This website is a concept / demo installation — trainers, member stories,
                  testimonials, prices, and statistics shown are fictional demo content.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ConceptNotice className="mt-8" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-card">
        <div className="container-x py-10">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {quickFacts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05}>
                <div className="text-center">
                  <p className="font-heading text-3xl font-extrabold text-white">{f.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {f.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Milestones"
            title="How we got here."
          />
          <div className="relative mx-auto mt-12 max-w-2xl">
            <div aria-hidden="true" className="absolute left-4 top-0 h-full w-px bg-ink-line sm:left-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.08}>
                  <div className="relative flex gap-5 sm:w-1/2 sm:px-6 sm:odd:mr-auto sm:odd:flex-row-reverse sm:even:ml-auto sm:even:text-right">
                    <span className="absolute left-1.5 top-1.5 h-[9px] w-[9px] shrink-0 rounded-full bg-accent sm:left-auto" />
                    <div className="ml-8 sm:ml-0">
                      <p className="font-heading text-sm font-extrabold tracking-wider text-accent-bright">{m.year}</p>
                      <h3 className="mt-1 font-heading text-base font-bold text-white">{m.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-steel">{m.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="Values"
            title="What we stand for."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="card-surface h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                    {check}
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Facilities"
            title="Zones for every goal."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {conceptFacilities.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.06}>
                <div className="group overflow-hidden rounded-md border border-ink-line">
                  <Image src={f.image} alt={f.name} aspect="aspect-[16/10]" imgClassName="transition-transform duration-500 group-hover:scale-[1.05]" />
                  <div className="bg-ink-card p-5">
                    <h3 className="font-heading text-base font-bold text-white">{f.name}</h3>
                    <p className="mt-1.5 text-sm text-steel">{f.description}</p>
                    {f.highlights?.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {f.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check size={12} className="mt-0.5 shrink-0 text-accent-bright" /> {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad text-center">
          <SectionHeading
            align="center"
            eyebrow="Get started"
            title="Your strongest self starts here."
          />
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/programs">Explore Programs</Button>
              <Button to="/membership" variant="ghost">View Membership</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
