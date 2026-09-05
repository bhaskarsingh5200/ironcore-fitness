import PageHero from '../components/ui/PageHero'
import ClassSchedule from '../components/home/ClassSchedule'
import ContactSection from '../components/home/ContactSection'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import SEO from '../components/SEO'
import { CalendarClock } from 'lucide-react'

const categories = [
  {
    name: 'Strength Training',
    description: 'Barbell, dumbbell, and rack work focused on progressive overload and sound technique.',
  },
  {
    name: 'Functional Fitness',
    description: 'Full-body movement — kettlebells, bodyweight, and engine work that transfers to real life.',
  },
  {
    name: 'HIIT',
    description: 'High-intensity interval circuits for conditioning and work capacity in under an hour.',
  },
  {
    name: 'Mobility',
    description: 'Stretch, foam roll, and reset — a low-impact session to recover and move better.',
  },
  {
    name: 'Personal Training',
    description: 'One-on-one sessions with a dedicated coach, run by appointment in the PT studio.',
  },
]

export default function SchedulePage() {
  return (
    <>
      <SEO
        title="Class Schedule"
        description="Browse the IronCore Fitness concept class schedule — filter by day and class type."
      />
      <PageHero
        eyebrow="Class schedule"
        title="Train on your time."
        subtitle="Filter by day or class type to plan your training week."
      />
      <div className="pt-20">
        <ClassSchedule heading={false} />
      </div>

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading
            align="center"
            eyebrow="Class types"
            title="Find your format."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {categories.map((cat, i) => (
              <Reveal key={cat.name} delay={i * 0.05}>
                <div className="card-surface h-full p-5">
                  <h3 className="font-heading text-base font-bold text-white">{cat.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{cat.description}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={0.25}>
              <div className="flex h-full flex-col justify-center gap-2 rounded-md border border-accent/30 bg-accent/10 p-5">
                <p className="flex items-center gap-2 font-heading text-sm font-bold text-accent-bright">
                  <CalendarClock size={16} /> Note
                </p>
                <p className="text-sm leading-relaxed text-slate-200">
                  Personal Training is by appointment. Book a slot with your coach or drop a
                  message from the contact section below.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
