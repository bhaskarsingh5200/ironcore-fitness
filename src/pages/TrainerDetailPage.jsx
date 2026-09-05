import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Award, Instagram, Linkedin, Youtube, Mail, Check, Quote } from 'lucide-react'
import SEO from '../components/SEO'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Image from '../components/ui/Image'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import { useAsync } from '../hooks/useAsync'
import { trainers } from '../services/content'

const socialIcons = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Mail,
  x: Mail,
}

export default function TrainerDetailPage() {
  const { slug } = useParams()
  const { data: trainer, loading, error } = useAsync(() => trainers.getBySlug(slug), [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-steel">
        <Spinner className="h-6 w-6" />
      </div>
    )
  }

  if (error || !trainer) {
    return (
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-heading text-2xl font-bold text-white">Trainer not found</h1>
        <p className="mt-2 text-sm text-steel">This trainer may have been unpublished or removed.</p>
        <Button to="/trainers" variant="ghost" className="mt-6">
          Back to Trainers
        </Button>
      </div>
    )
  }

  const socials = trainer.socialLinks || {}

  return (
    <>
      <SEO
        title={trainer.name}
        description={`${trainer.name} — ${trainer.role} at IronCore Fitness (concept profile). ${trainer.bio}`}
        image={trainer.image}
      />
      <section className="border-b border-ink-line pb-16 pt-28 md:pt-36">
        <div className="container-x">
          <Link
            to="/trainers"
            className="inline-flex items-center gap-2 text-sm text-steel transition-colors hover:text-accent-bright"
          >
            <ArrowLeft size={16} /> All trainers
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal className="mx-auto w-full max-w-md">
              <div className="relative">
                <div aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full rounded-lg border border-accent/25" />
                <Image
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.role}`}
                  aspect="aspect-[4/5]"
                  className="relative rounded-lg border border-ink-line"
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone="accent">{trainer.role}</Badge>
                  <Badge tone="muted">{trainer.experience} experience</Badge>
                </div>
                <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                  {trainer.name}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-steel">{trainer.bio}</p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8">
                  <h2 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-slate-300">
                    <Award size={16} className="text-accent-bright" /> Specialization
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(trainer.specialization || []).map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center gap-1.5 rounded border border-ink-line bg-ink-card px-3 py-1.5 text-sm text-slate-200"
                      >
                        <Check size={13} className="text-accent-bright" /> {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {trainer.certifications?.length > 0 && (
                <Reveal delay={0.12}>
                  <div className="mt-8">
                    <h2 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-[0.2em] text-slate-300">
                      <Award size={16} className="text-accent-bright" /> Certifications
                    </h2>
                    <ul className="mt-4 space-y-2">
                      {trainer.certifications.map((cert) => (
                        <li key={cert} className="flex items-start gap-2.5 text-sm text-slate-200">
                          <Check size={15} className="mt-0.5 shrink-0 text-accent-bright" /> {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {trainer.focus && (
                <Reveal delay={0.14}>
                  <div className="mt-8 rounded-md border border-ink-line bg-ink-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Coaching focus
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">{trainer.focus}</p>
                  </div>
                </Reveal>
              )}

              {trainer.quote && (
                <Reveal delay={0.16}>
                  <blockquote className="mt-8 flex gap-3 border-l-2 border-accent pl-4">
                    <Quote size={18} className="mt-1 shrink-0 text-accent" />
                    <p className="text-base italic leading-relaxed text-slate-200">“{trainer.quote}”</p>
                  </blockquote>
                </Reveal>
              )}

              <Reveal delay={0.15}>
                <div className="mt-8 flex items-center gap-3">
                  {Object.entries(socialIcons)
                    .filter(([key]) => socials[key])
                    .map(([key, Icon]) => (
                      <a
                        key={key}
                        href={socials[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${trainer.name} on ${key}`}
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-line text-steel transition-colors hover:border-accent hover:text-accent-bright"
                      >
                        <Icon size={17} />
                      </a>
                    ))}
                </div>
                <p className="mt-6 text-xs text-slate-500">
                  Concept trainer profile — this person is fictional and does not represent a real
                  individual.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-x">
          <Reveal className="rounded-lg border border-accent/30 bg-ink-card p-8 text-center shadow-glow-sm md:p-12">
            <h2 className="font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
              Train with {trainer.name.split(' ')[0]}.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-steel">
              Personal training and program enquiries are handled through the membership team.
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
