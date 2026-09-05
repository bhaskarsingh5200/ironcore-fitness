import { useMemo } from 'react'
import {
  Dumbbell,
  Users,
  Tag,
  CalendarDays,
  Inbox,
  MailOpen,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AdminPageHeader, StatCard } from '../../components/admin/AdminUI'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import { useAsync } from '../../hooks/useAsync'
import { programs, trainers, memberships, classes } from '../../services/content'
import { listAllInbox } from '../../services/messages'
import { formatDateTime, todayName } from '../../lib/utils'
import { DAYS } from '../../lib/constants'

export default function DashboardPage() {
  const programsQ = useAsync(() => programs.list({ admin: true }), [])
  const trainersQ = useAsync(() => trainers.list({ admin: true }), [])
  const membershipsQ = useAsync(() => memberships.list({ admin: true }), [])
  const classesQ = useAsync(() => classes.list({ admin: true }), [])
  const inboxQ = useAsync(() => listAllInbox(), [])

  const todayIndex = DAYS.indexOf(todayName())

  const upcomingClasses = useMemo(() => {
    const rows = classesQ.data || []
    return rows
      .filter((c) => DAYS.indexOf(c.day) >= todayIndex && c.status === 'published')
      .sort((a, b) => {
        const dayDiff = DAYS.indexOf(a.day) - DAYS.indexOf(b.day)
        if (dayDiff !== 0) return dayDiff
        return a.startTime.localeCompare(b.startTime)
      })
      .slice(0, 6)
  }, [classesQ.data, todayIndex])

  const unreadContactCount = useMemo(
    () => (inboxQ.data || []).filter((m) => m.status === 'new' && m.kind === 'contact').length,
    [inboxQ.data],
  )

  const unreadEnquiryCount = useMemo(
    () => (inboxQ.data || []).filter((m) => m.status === 'new' && m.kind === 'membership').length,
    [inboxQ.data],
  )

  const publishedPrograms = useMemo(
    () => (programsQ.data || []).filter((p) => p.status === 'published').length,
    [programsQ.data],
  )

  const recentEnquiries = (inboxQ.data || []).slice(0, 6)

  const loading = programsQ.loading || trainersQ.loading || membershipsQ.loading || classesQ.loading || inboxQ.loading

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Live statistics calculated from the database — nothing hardcoded."
      />

      {loading ? (
        <div className="flex justify-center py-20 text-steel">
          <Spinner className="h-6 w-6" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Unread Enquiries" value={unreadEnquiryCount} icon={Inbox} tone={unreadEnquiryCount > 0 ? 'warn' : 'good'} />
            <StatCard label="Unread Messages" value={unreadContactCount} icon={MailOpen} tone={unreadContactCount > 0 ? 'warn' : 'good'} />
            <StatCard label="Published Programs" value={publishedPrograms} icon={Dumbbell} />
            <StatCard label="Total Programs" value={programsQ.data?.length ?? 0} icon={Dumbbell} tone="muted" />
            <StatCard label="Total Trainers" value={trainersQ.data?.length ?? 0} icon={Users} tone="muted" />
            <StatCard label="Membership Plans" value={membershipsQ.data?.length ?? 0} icon={Tag} tone="muted" />
            <StatCard label="Upcoming Classes" value={upcomingClasses.length} icon={CalendarDays} tone="muted" />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="card-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-bold text-white">Recent Enquiries</h2>
                <Link
                  to="/admin/messages"
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent-bright hover:text-white"
                >
                  View all <ArrowRight size={13} />
                </Link>
              </div>
              {recentEnquiries.length === 0 ? (
                <p className="mt-4 text-sm text-steel">No enquiries yet.</p>
              ) : (
                <ul className="mt-4 divide-y divide-ink-line">
                  {recentEnquiries.map((m) => (
                    <li key={m.id} className="flex items-center gap-3 py-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded ${m.status === 'new' ? 'bg-accent/15 text-accent-bright' : 'bg-ink text-slate-500'}`}>
                        {m.status === 'new' ? <Inbox size={15} /> : <MailOpen size={15} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{m.name}</p>
                        <p className="truncate text-xs text-steel">
                          {m.kind === 'membership' ? `Enquiry — ${m.plan}` : m.goal || m.message}
                        </p>
                      </div>
                      <span className="hidden text-xs text-slate-500 sm:block">
                        {formatDateTime(m.createdAt)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="card-surface p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-base font-bold text-white">Upcoming Classes</h2>
                <Link
                  to="/admin/classes"
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent-bright hover:text-white"
                >
                  Manage <ArrowRight size={13} />
                </Link>
              </div>
              {upcomingClasses.length === 0 ? (
                <p className="mt-4 text-sm text-steel">
                  No classes scheduled from {todayName()} onwards.
                </p>
              ) : (
                <ul className="mt-4 divide-y divide-ink-line">
                  {upcomingClasses.map((c) => (
                    <li key={c.id} className="flex items-center gap-3 py-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-accent/15 text-accent-bright">
                        <CalendarDays size={15} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{c.name}</p>
                        <p className="text-xs text-steel">{c.category}</p>
                      </div>
                      <Badge tone="muted">{c.day}</Badge>
                      <span className="text-xs text-steel">{c.startTime}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
