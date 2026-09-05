import { Link } from 'react-router-dom'
import { Dumbbell, Mail, MapPin, Phone } from 'lucide-react'
import { SITE } from '../../lib/constants'
import ConceptNotice from '../ConceptNotice'
import { useSettings } from '../../context/SettingsContext'

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Programs', to: '/programs' },
      { label: 'Trainers', to: '/trainers' },
      { label: 'Membership', to: '/membership' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Class Schedule', to: '/schedule' },
      { label: 'Classes', to: '/classes' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Admin Dashboard', to: '/admin' },
    ],
  },
]

export default function Footer() {
  const { settings } = useSettings()

  return (
    <footer className="border-t border-ink-line bg-ink-surface">
      <div className="container-x py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent-bright">
                <Dumbbell size={20} strokeWidth={2.25} />
              </span>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                Iron<span className="text-accent-bright">Core</span> Fitness
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel">
              {settings.tagline || SITE.tagline}
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
              {settings.footer_text}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-steel transition-colors hover:text-accent-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-slate-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-steel">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                {settings.address || SITE.city}
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                {settings.email || SITE.email}
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
                {settings.phone || SITE.phone}
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Placeholder contact details — no real business operates at these addresses.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-ink-line pt-6">
          <ConceptNotice />
          <p className="mt-6 text-center text-xs text-slate-600">
            © {new Date().getFullYear()} IronCore Fitness — A premium fitness center. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
