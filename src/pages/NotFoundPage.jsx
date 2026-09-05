import SEO from '../components/SEO'
import Button from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const popular = [
  { label: 'Programs', to: '/programs' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Membership', to: '/membership' },
  { label: 'Class Schedule', to: '/schedule' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Page Not Found" />
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-heading text-7xl font-extrabold text-accent-bright">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 max-w-sm text-sm text-steel">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button to="/" className="mt-8">
          Back Home
        </Button>
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Popular pages
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
            {popular.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-flex items-center gap-1 text-sm text-slate-300 transition-colors hover:text-accent-bright"
                >
                  <ChevronRight size={14} className="text-accent" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
