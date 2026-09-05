import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { cn } from '../../lib/utils'
import { Link } from 'react-router-dom'

export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-steel">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function StatCard({ label, value, icon: Icon, tone = 'accent' }) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded border border-accent/30 bg-accent/10 text-accent-bright">
          <Icon size={18} />
        </span>
        <Badge tone={tone}>Live</Badge>
      </div>
      <p className="mt-4 font-heading text-3xl font-extrabold text-white">{value}</p>
      <p className="mt-1 text-sm text-steel">{label}</p>
    </div>
  )
}

export function StatusPill({ status }) {
  return status === 'published' ? (
    <Badge tone="good">Published</Badge>
  ) : (
    <Badge tone="warn">Draft</Badge>
  )
}

export function PublishToggle({ row, onToggle, isSaving }) {
  const published = row.status === 'published'
  return (
    <button
      onClick={() => onToggle(row)}
      disabled={isSaving}
      role="switch"
      aria-checked={published}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50',
        published ? 'bg-accent' : 'bg-ink-line',
      )}
    >
      <span
        className={cn(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
          published ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </button>
  )
}

export function ConfirmDialog({ open, onClose, onConfirm, title = 'Confirm action', message, isBusy }) {
  return (
    <Modal open={open} onClose={onClose} title={title} wide={false}>
      <p className="text-sm leading-relaxed text-steel">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm} className="!bg-red-600 hover:!bg-red-500" disabled={isBusy}>
          {isBusy ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </Modal>
  )
}

/**
 * Inline row actions. If `slug` is provided, a view-link is shown.
 */
export function RowActions({ onEdit, onDelete, slug, viewPath }) {
  return (
    <div className="flex items-center justify-end gap-1">
      {slug && viewPath && (
        <Link
          to={`${viewPath}/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View published page"
          className="rounded p-2 text-steel transition-colors hover:bg-ink-card hover:text-accent-bright"
        >
          <ExternalLink size={16} />
        </Link>
      )}
      <button
        onClick={onEdit}
        aria-label="Edit"
        className="rounded p-2 text-steel transition-colors hover:bg-ink-card hover:text-accent-bright"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={onDelete}
        aria-label="Delete"
        className="rounded p-2 text-steel transition-colors hover:bg-ink-card hover:text-red-400"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export function EmptyState({ message, action }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm text-steel">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
