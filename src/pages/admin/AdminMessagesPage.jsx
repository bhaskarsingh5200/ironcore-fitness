import { useEffect, useMemo, useState } from 'react'
import { Inbox, MailOpen, Trash2, User, Mail, Phone } from 'lucide-react'
import { AdminPageHeader, ConfirmDialog, EmptyState } from '../../components/admin/AdminUI'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import { listAllInbox, contactMessages, membershipEnquiries } from '../../services/messages'
import { formatDateTime } from '../../lib/utils'
import { cn } from '../../lib/utils'

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'contact', label: 'Contact Messages' },
  { key: 'membership', label: 'Membership Enquiries' },
]

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('all')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listAllInbox()
      setMessages(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    if (tab === 'all') return messages
    return messages.filter((m) => m.kind === tab)
  }, [messages, tab])

  const setStatus = async (m, status) => {
    try {
      if (m.kind === 'membership') await membershipEnquiries.update(m.id, { status })
      else await contactMessages.update(m.id, { status })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      if (deleteTarget.kind === 'membership') await membershipEnquiries.remove(deleteTarget.id)
      else await contactMessages.remove(deleteTarget.id)
      setDeleteTarget(null)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        subtitle="Contact messages and membership enquiries. Private — never exposed publicly."
      />

      {error && (
        <p className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Message types">
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors',
              tab === t.key ? 'border-accent bg-accent/15 text-accent-bright' : 'border-ink-line text-steel hover:text-white',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-steel">
          <Spinner className="h-6 w-6" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState message="No messages in this folder yet." />
      ) : (
        <div className="space-y-4">
          {filtered.map((m) => (
            <article
              key={m.id}
              className={cn(
                'card-surface p-5 transition-colors',
                m.status === 'new' && 'border-accent/40',
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded',
                      m.status === 'new' ? 'bg-accent/15 text-accent-bright' : 'bg-ink text-slate-500',
                    )}
                  >
                    {m.status === 'new' ? <Inbox size={17} /> : <MailOpen size={17} />}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-heading text-base font-bold text-white">{m.name}</h2>
                      {m.kind === 'membership' ? (
                        <Badge tone="accent">Enquiry · {m.plan}</Badge>
                      ) : (
                        <Badge tone="muted">Contact</Badge>
                      )}
                      {m.kind === 'membership' && m.status !== 'new' ? (
                        <Badge tone={m.status === 'closed' ? 'muted' : m.status === 'contacted' ? 'warn' : 'good'}>
                          {m.status[0].toUpperCase() + m.status.slice(1)}
                        </Badge>
                      ) : (
                        m.status === 'new' && <Badge tone="warn">Unread</Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{formatDateTime(m.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {m.kind === 'membership' ? (
                    <select
                      aria-label="Enquiry status"
                      value={m.status}
                      onChange={(e) => setStatus(m, e.target.value)}
                      className="rounded-md border border-ink-line bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-wider text-steel outline-none transition-colors hover:border-accent focus:border-accent"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="closed">Closed</option>
                    </select>
                  ) : (
                    <button
                      onClick={() => setStatus(m, m.status === 'new' ? 'read' : 'new')}
                      className="rounded px-3 py-2 text-xs font-semibold uppercase tracking-wider text-steel transition-colors hover:bg-ink-card hover:text-accent-bright"
                    >
                      Mark {m.status === 'new' ? 'read' : 'unread'}
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTarget(m)}
                    aria-label="Delete message"
                    className="rounded p-2 text-steel transition-colors hover:bg-ink-card hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid gap-2 text-sm text-steel sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-accent-bright" /> {m.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-accent-bright" /> {m.phone || '—'}
                </span>
                {m.kind === 'membership' && (
                  <span className="flex items-center gap-2">
                    <User size={14} className="text-accent-bright" /> Start: {m.startDate || '—'}
                  </span>
                )}
                {m.kind === 'contact' && (
                  <span className="flex items-center gap-2">
                    <User size={14} className="text-accent-bright" /> Goal: {m.goal}
                  </span>
                )}
                {m.kind === 'contact' && (
                  <span className="flex items-center gap-2 sm:col-span-2">
                    <User size={14} className="text-accent-bright" /> Preferred: {m.preferredContact}
                  </span>
                )}
              </div>

              {(m.message || (m.kind === 'membership' && m.message)) && (
                <p className="mt-3 rounded-md border border-ink-line bg-ink p-3 text-sm leading-relaxed text-slate-300">
                  {m.message}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isBusy={deleting}
        title="Delete message"
        message="This permanently removes the message. This action cannot be undone."
      />
    </div>
  )
}
