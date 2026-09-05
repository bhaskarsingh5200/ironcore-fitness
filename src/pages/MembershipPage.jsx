import PageHero from '../components/ui/PageHero'
import MembershipSection from '../components/home/MembershipSection'
import FaqSection from '../components/home/FaqSection'
import ContactSection from '../components/home/ContactSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import SEO from '../components/SEO'
import { ClipboardList, Mail, CalendarCheck, Dumbbell } from 'lucide-react'

const enrolment = [
  {
    icon: ClipboardList,
    title: 'Pick a plan',
    description: 'Choose the membership that fits your goals and budget — no hidden terms.',
  },
  {
    icon: Mail,
    title: 'Send an enquiry',
    description: 'Use the form on this page and tell us what you’re working toward.',
  },
  {
    icon: CalendarCheck,
    title: 'Book a first session',
    description: 'We’ll schedule a free intro session and walk you through the floor.',
  },
  {
    icon: Dumbbell,
    title: 'Start training',
    description: 'Your coach gets you set up with a plan and your first session on the books.',
  },
]

export default function MembershipPage() {
  return (
    <>
      <SEO
        title="Membership"
        description="Choose your IronCore Fitness membership — Starter, Performance, or Elite. Concept pricing for this demo installation; no real payments are processed."
      />
      <PageHero
        eyebrow="Membership"
        title="Choose your membership."
        subtitle="Simple plans with no hidden terms. Upgrade, downgrade, or cancel anytime. Concept pricing — no real payments are processed on this project."
      />
      <div className="pt-20">
        <MembershipSection />
      </div>
      <Reveal className="container-x">
        <p className="rounded-md border border-ink-line bg-ink-card px-4 py-3 text-center text-xs text-steel">
          All prices and plans are concept/demo values for this demo installation. Enquiries are
          stored privately and never processed as payments.
        </p>
      </Reveal>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="Joining is simple."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {enrolment.map((step, i) => (
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
        </div>
      </section>

      <FaqSection />
      <ContactSection />
    </>
  )
}
