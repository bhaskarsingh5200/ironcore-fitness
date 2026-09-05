import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Dumbbell } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { NAV_LINKS } from '../../lib/constants'
import { cn } from '../../lib/utils'
import Button from '../ui/Button'

function Wordmark() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2.5"
      aria-label="IronCore Fitness — home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent-bright transition-colors group-hover:border-accent">
        <Dumbbell size={18} strokeWidth={2.25} />
      </span>
      <span className="font-heading text-lg font-bold tracking-tight text-white">
        Iron<span className="text-accent-bright">Core</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-ink-line bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav
        className="container-x flex h-16 items-center justify-between md:h-20"
        aria-label="Primary"
      >
        <Wordmark />

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-white',
                  isActive ? 'text-accent-bright' : 'text-steel',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button to="/membership">Join Now</Button>
        </div>

        <button
          className="rounded-md border border-ink-line p-2 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-b border-ink-line bg-ink/95 px-5 pb-6 pt-2 backdrop-blur-md">
              <div className="flex flex-col divide-y divide-ink-line">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'py-3.5 font-heading text-base font-semibold transition-colors',
                        isActive ? 'text-accent-bright' : 'text-white',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <Button to="/membership" className="mt-5 w-full">
                Join Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
