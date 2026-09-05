import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import {
  Dumbbell,
  LayoutDashboard,
  Users,
  Tag,
  CalendarDays,
  Images,
  MessageSquareQuote,
  HelpCircle,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/programs', label: 'Programs', icon: Dumbbell },
  { to: '/admin/trainers', label: 'Trainers', icon: Users },
  { to: '/admin/memberships', label: 'Memberships', icon: Tag },
  { to: '/admin/classes', label: 'Classes', icon: CalendarDays },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
  { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/messages', label: 'Messages', icon: Inbox },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  const { profile, signOutAdmin } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-ink-line px-5 py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded border border-accent/40 bg-accent/10 text-accent-bright">
          <Dumbbell size={17} />
        </span>
        <div>
          <p className="font-heading text-sm font-bold text-white">IronCore Admin</p>
          <p className="text-[11px] text-steel">CMS Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="Admin navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                'mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent/15 text-accent-bright'
                  : 'text-steel hover:bg-ink-card hover:text-white',
              )
            }
          >
            <item.icon size={17} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-ink-line p-3">
        <p className="px-3 py-1 text-[11px] text-slate-500">
          Signed in as {profile?.full_name || profile?.role || 'admin'}
        </p>
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-ink-card hover:text-white"
        >
          <ExternalLink size={17} /> View Website
        </Link>
        <button
          onClick={signOutAdmin}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-ink-card hover:text-red-400"
        >
          <LogOut size={17} /> Sign out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-ink">
      <aside className="hidden w-64 shrink-0 border-r border-ink-line bg-ink-surface lg:block">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-ink-line bg-ink-surface">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close admin menu"
              className="absolute right-3 top-3 rounded p-1.5 text-steel hover:text-white"
            >
              <X size={18} />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-ink-line bg-ink/85 px-4 backdrop-blur-md lg:hidden">
          <p className="font-heading text-sm font-bold text-white">IronCore Admin</p>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open admin menu"
            className="rounded p-1.5 text-steel hover:text-white"
          >
            <Menu size={20} />
          </button>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
