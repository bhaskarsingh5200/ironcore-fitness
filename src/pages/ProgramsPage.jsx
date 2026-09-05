import PageHero from '../components/ui/PageHero'
import ProgramsSection from '../components/home/ProgramsSection'
import FaqSection from '../components/home/FaqSection'
import ContactSection from '../components/home/ContactSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import SEO from '../components/SEO'
import { ClipboardList, CalendarCheck, TrendingUp, Award } from 'lucide-react'

const steps = [
  {
    icon: ClipboardList,
    title: 'Assessment',
    description:
      'Every path starts with a goal conversation and movement assessment, so your plan fits your body and your baseline.',
  },
  {
    icon: CalendarCheck,
    title: 'Structured plan',
    description:
      'Your coach maps out a weekly schedule, session focus, and progression milestones — clear and easy to follow.',
  },
  {
    icon: TrendingUp,
    title: 'Coached sessions',
    description:
      'Show up, train hard, and get feedback in real time. Coaches correct form, adjust loads, and keep you accountable.',
  },
  {
    icon: Award,
    title: 'Measured progress',
    description:
      'We review your numbers regularly — lifts, consistency, body composition — so progress is visible, not guessed.',
  },
]

export default function ProgramsPage() {
  return (
    <>
      <SEO
        title="Programs"
        description="Explore IronCore Fitness training paths: Strength Training, Personal Training, Functional Fitness, and the Transformation Program."
      />
      <PageHero
        eyebrow="Programs"
        title="Train with purpose."
        subtitle="Choose a training path designed around your goals — from first-time lifting to complete transformation."
      />
      <div className="pt-20">
        <ProgramsSection showAllLink={false} />
      </div>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From sign-up to strength."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="card-surface relative h-full p-6">
                  <span className="absolute right-5 top-5 font-heading text-3xl font-extrabold text-white/5">
                    0{i + 1}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                    <step.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/schedule">See the Class Schedule</Button>
              <Button to="/membership" variant="ghost">View Membership</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />
      <ContactSection />
    </>
  )
}
