import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Check, Target } from 'lucide-react'
import SEO from '../components/SEO'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Image from '../components/ui/Image'
import Spinner from '../components/ui/Spinner'
import Accordion from '../components/ui/Accordion'
import { useAsync } from '../hooks/useAsync'
import { programs, faqs } from '../services/content'
import { getProgramIcon } from '../lib/icons'

export default function ProgramDetailPage() {
  const { slug } = useParams()
  const { data: program, loading, error } = useAsync(() => programs.getBySlug(slug), [slug])
  const { data: faqList } = useAsync(() => faqs.list(), [])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-steel">
        <Spinner className="h-6 w-6" />
      </div>
    )
  }

  if (error || !program) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-heading text-2xl font-bold text-white">Program not found</h1>
        <p className="mt-2 text-sm text-steel">This program may have been unpublished or removed.</p>
        <Button to="/programs" variant="ghost" className="mt-6">
          Back to Programs
        </Button>
      </div>
    )
  }

  const Icon = getProgramIcon(program.icon)

  return (
    <>
      <SEO
        title={program.title}
        description={program.shortDescription}
        image={program.image}
        type="article"
      />
      <PageHero eyebrow="Program" title={program.title} subtitle={program.shortDescription} />

      <section className="section-pad">
        <div className="container-x">
          <Link
            to="/programs"
            className="mb-10 inline-flex items-center gap-2 text-sm text-steel transition-colors hover:text-accent-bright"
          >
            <ArrowLeft size={16} /> All programs
          </Link>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Image src={program.image} alt={program.title} aspect="aspect-[4/3]" className="rounded-lg border border-ink-line" />
            </Reveal>
            <div>
              <Reveal>
                <span className="flex h-12 w-12 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                  <Icon size={22} />
                </span>
                <h2 className="mt-5 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                  Overview
                </h2>
                <p className="mt-4 text-base leading-relaxed text-steel">{program.description}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Level', value: program.level },
                    { label: 'Duration', value: program.durationWeeks ? `${program.durationWeeks} weeks` : null },
                    { label: 'Sessions / week', value: program.sessionsPerWeek },
                    { label: 'Group size', value: program.groupSize },
                  ]
                    .filter((spec) => spec.value)
                    .map((spec) => (
                      <div key={spec.label} className="rounded-md border border-ink-line bg-ink-card p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                          {spec.label}
                        </p>
                        <p className="mt-1.5 font-heading text-sm font-bold text-white">{spec.value}</p>
                      </div>
                    ))}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h3 className="mt-8 font-heading text-lg font-bold uppercase tracking-tight text-white">
                  Benefits
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {(program.benefits || []).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm text-slate-200">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent-bright" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {program.approach && (
        <section className="border-t border-ink-line bg-ink-surface">
          <div className="container-x section-pad grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Method" title="Our training approach." />
            </div>
            <Reveal>
              <p className="text-base leading-relaxed text-steel">{program.approach}</p>
            </Reveal>
          </div>
        </section>
      )}

      {program.whoFor && (
        <section className="section-pad">
          <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading eyebrow="Eligibility" title="Who it’s for." />
            </div>
            <Reveal>
              <div className="flex gap-4 rounded-md border border-ink-line bg-ink-card p-6">
                <Target size={20} className="mt-1 shrink-0 text-accent-bright" />
                <p className="text-base leading-relaxed text-steel">{program.whoFor}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <section className="border-t border-ink-line bg-ink-surface">
        <div className="container-x section-pad">
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <div className="mt-10 max-w-3xl">
            <Accordion items={faqList || []} />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <Reveal className="rounded-lg border border-accent/30 bg-ink-card p-8 text-center shadow-glow-sm md:p-12">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              Ready to start {program.title.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-steel">
              Enquire about this program and our team will help you find the right plan to begin.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Button to="/membership">Enquire Now</Button>
              <Button to="/contact" variant="ghost">
                Contact Us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
