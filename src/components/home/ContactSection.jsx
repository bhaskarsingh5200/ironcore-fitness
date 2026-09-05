import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import ContactForm from '../forms/ContactForm'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { SITE } from '../../lib/constants'

const WHATSAPP_MESSAGE = "Hi, I'd like to know more about IronCore Fitness membership options."

function waLink(number) {
  const digits = String(number).replace(/[^0-9]/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
}

export default function ContactSection({ heading = true }) {
  return (
    <section className="section-pad border-t border-ink-line bg-ink-surface">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          {heading && (
            <SectionHeading
              eyebrow="Contact"
              title="Ready to get stronger?"
              subtitle="Tell us what you’re working toward and we’ll help you find the right way to start."
            />
          )}

          <Reveal delay={0.1}>
            <div className="mt-8 space-y-4">
              <a
                href={waLink(SITE.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-md border border-ink-line bg-ink-card p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    WhatsApp
                  </p>
                  <p className="text-sm text-slate-200">{SITE.whatsapp}</p>
                </div>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 rounded-md border border-ink-line bg-ink-card p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <p className="text-sm text-slate-200">{SITE.email}</p>
                </div>
              </a>
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-3 rounded-md border border-ink-line bg-ink-card p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </p>
                  <p className="text-sm text-slate-200">{SITE.phone}</p>
                </div>
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Placeholder contact details for this concept installation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
