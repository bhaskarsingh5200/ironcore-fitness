import { Link } from 'react-router-dom'
import { ArrowRight, Award, Dumbbell, ListChecks, Users } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Image from '../ui/Image'
import { IMG } from '../../data/images'

const features = [
  {
    number: '01',
    title: 'Expert Coaching',
    description: 'Certified coaches who correct technique and build your progress.',
    icon: Award,
  },
  {
    number: '02',
    title: 'Modern Equipment',
    description: 'A full strength, cardio, and functional floor in one space.',
    icon: Dumbbell,
  },
  {
    number: '03',
    title: 'Structured Programs',
    description: 'Clear training paths built around measurable outcomes.',
    icon: ListChecks,
  },
  {
    number: '04',
    title: 'Supportive Community',
    description: 'Train with people who push you forward, session after session.',
    icon: Users,
  },
]

export default function AboutSection() {
  return (
    <section className="section-pad">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 h-full w-full rounded-lg border border-accent/25"
          />
          <Image
            src={IMG.aboutMain}
            alt="Strength equipment at IronCore Fitness"
            aspect="aspect-[4/5]"
            className="relative rounded-lg border border-ink-line"
          />
          <div className="absolute -bottom-6 -right-4 hidden w-44 md:block">
            <Image
              src={IMG.aboutSecondary}
              alt="Cardio zone detail"
              aspect="aspect-square"
              className="rounded-md border border-ink-line shadow-card"
            />
          </div>
        </Reveal>

        <div>
          <SectionHeading eyebrow="Who we are" title="More than a gym." />
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">
              IronCore Fitness is built around purposeful training, expert coaching, and an
              environment designed to help you become stronger — physically and mentally.
            </p>
          </Reveal>

          <div className="mt-9 space-y-5">
            {features.map((feature, i) => (
              <Reveal key={feature.number} delay={0.08 * i}>
                <div className="group flex gap-4 rounded-md border border-transparent p-3 transition-colors hover:border-ink-line hover:bg-ink-card">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                    <feature.icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-heading text-xs font-bold text-accent">
                        {feature.number}
                      </span>
                      <h3 className="font-heading text-base font-bold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-steel">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link
              to="/about"
              className="mt-9 inline-flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wider text-accent-bright transition-colors hover:text-white"
            >
              Why IronCore? <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
