import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, ArrowDown, ArrowUp, Loader2 } from 'lucide-react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import Field from '../ui/Field'
import Spinner from '../ui/Spinner'
import { AdminPageHeader, ConfirmDialog, EmptyState, PublishToggle, RowActions, StatusPill } from './AdminUI'
import { ArrayEditor, ImageInput, KeyValueEditor, TagEditor } from './formFields'
import { toSnake } from '../../services/client'
import { uploadImage } from '../../services/storage'
import { cn } from '../../lib/utils'

function defaultFor(field) {
  switch (field.type) {
    case 'array':
    case 'tags':
      return []
    case 'kv':
      return {}
    case 'image':
      return null
    case 'select':
      return field.options?.[0]?.value || field.options?.[0] || ''
    case 'number':
      return 0
    default:
      return ''
  }
}

function FieldControl({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea':
      return (
        <Field
          as="textarea"
          label={field.label}
          required={field.required}
          rows={field.rows || 3}
          placeholder={field.placeholder}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case 'number':
      return (
        <Field
          type="number"
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      )
    case 'date':
    case 'time':
      return (
        <Field
          type={field.type}
          label={field.label}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case 'select':
      return (
        <Field
          as="select"
          label={field.label}
          required={field.required}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.placeholder && <option value="">{field.placeholder}</option>}
          {(field.options || []).map((opt) =>
            typeof opt === 'string' ? (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ),
          )}
        </Field>
      )
    case 'array':
      return (
        <div>
          <label className="field-label">{field.label}</label>
          <ArrayEditor value={value || []} onChange={onChange} placeholder={field.placeholder} rows={field.rows} />
          {field.hint && <p className="mt-1 text-xs text-slate-500">{field.hint}</p>}
        </div>
      )
    case 'tags':
      return (
        <div>
          <label className="field-label">{field.label}</label>
          <TagEditor value={value || []} onChange={onChange} placeholder={field.placeholder} />
        </div>
      )
    case 'kv':
      return (
        <div>
          <label className="field-label">{field.label}</label>
          <KeyValueEditor
            value={value || {}}
            onChange={onChange}
            allowedKeys={field.allowedKeys}
            labels={field.labels}
          />
        </div>
      )
    case 'image':
      return (
        <ImageInput
          label={field.label}
          value={value}
          onChange={onChange}
          hint={field.hint}
        />
      )
    default:
      return (
        <Field
          type={field.type || 'text'}
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )
  }
}

/**
 * Generic CRUD resource manager for the admin dashboard.
 * Handles list/search/filter, create, edit, delete, publish toggle, reorder,
 * and image uploads — keeping every admin section consistent.
 */
export default function ResourceManager({
  service,
  title,
  subtitle,
  newLabel = 'New',
  columns,
  fields,
  storageBucket,
  storageFolder = '',
  makeSlug = null,
  viewPath = '',
  hasSortOrder = false,
  searchKeys = [],
}) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState({})
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [publishingId, setPublishingId] = useState(null)

  const load = async () => {
    setLoading(true)
    setLoadError('')
    try {
      const data = await service.list({ admin: true })
      setRows(data)
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = useMemo(() => {
    let out = [...rows]
    if (search) {
      const q = search.toLowerCase()
      out = out.filter((row) =>
        searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q)),
      )
    }
    if (statusFilter) out = out.filter((row) => row.status === statusFilter)
    if (hasSortOrder) out.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    return out
  }, [rows, search, statusFilter, hasSortOrder, searchKeys])

  const openCreate = () => {
    setEditing(null)
    const initial = {}
    fields.forEach((f) => {
      initial[f.name] = defaultFor(f)
    })
    if (hasSortOrder) {
      const max = rows.reduce((m, r) => Math.max(m, Number(r.sortOrder) || 0), 0)
      initial.sort_order = max + 1
    }
    setValues(initial)
    setFormError('')
    setFormOpen(true)
  }

  const openEdit = (row) => {
    setEditing(row)
    const db = toSnake(row)
    const initial = {}
    fields.forEach((f) => {
      initial[f.name] = db[f.name] ?? defaultFor(f)
    })
    // keep image storage path for cleanup later
    initial.__image_paths = {}
    fields.forEach((f) => {
      if (f.type === 'image' && db[f.name]) {
        initial[f.name] = { url: db[f.name], path: db[`${f.name}_path`] || '', file: null }
        initial.__image_paths[f.name] = db[`${f.name}_path`] || ''
      }
    })
    setValues(initial)
    setFormError('')
    setFormOpen(true)
  }

  const setField = (name, val) => setValues((v) => ({ ...v, [name]: val }))

  const buildPayload = async () => {
    const payload = {}
    for (const field of fields) {
      let val = values[field.name]
      if (field.type === 'image') {
        if (!val) {
          payload[field.name] = null
          payload[`${field.name}_path`] = null
          continue
        }
        if (val.file) {
          const result = await uploadImage(storageBucket, val.file, storageFolder)
          payload[field.name] = result.publicUrl
          payload[`${field.name}_path`] = result.path
        } else {
          payload[field.name] = val.url
          payload[`${field.name}_path`] = val.path || values.__image_paths?.[field.name] || null
        }
        continue
      }
      payload[field.name] = val
    }
    if (makeSlug && !editing) {
      const base = String(values[makeSlug] || '').trim()
      payload.slug = toSlug(base)
    }
    if (makeSlug && editing && !payload.slug) {
      payload.slug = editing.slug
    }
    delete payload.__image_paths
    return payload
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      const payload = await buildPayload()
      if (editing) {
        await service.update(editing.id, payload)
      } else {
        await service.create(payload)
      }
      setFormOpen(false)
      await load()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await service.remove(deleteTarget.id)
      setDeleteTarget(null)
      await load()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const togglePublish = async (row) => {
    setPublishingId(row.id)
    try {
      await service.update(row.id, { status: row.status === 'published' ? 'draft' : 'published' })
      await load()
    } catch (err) {
      setLoadError(err.message)
    } finally {
      setPublishingId(null)
    }
  }

  const move = async (row, dir) => {
    const idx = rows.findIndex((r) => r.id === row.id)
    const target = rows[idx + dir]
    if (!target) return
    const a = row.sortOrder ?? 0
    const b = target.sortOrder ?? 0
    try {
      await service.update(row.id, { sort_order: b })
      await service.update(target.id, { sort_order: a })
      await load()
    } catch (err) {
      setLoadError(err.message)
    }
  }

  return (
    <div>
      <AdminPageHeader
        title={title}
        subtitle={subtitle}
        action={
          <Button onClick={openCreate}>
            <Plus size={15} /> {newLabel}
          </Button>
        }
      />

      {loadError && (
        <p className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400" role="alert">
          {loadError}
        </p>
      )}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            aria-label="Search"
            className="field-input pl-9"
          />
        </div>
        <div className="flex gap-2">
          {['', 'published', 'draft'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
                statusFilter === s
                  ? 'border-accent bg-accent/15 text-accent-bright'
                  : 'border-ink-line text-steel hover:text-white',
              )}
            >
              {s === '' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-steel">
          <Spinner className="h-6 w-6" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          message="Nothing here yet. Create your first entry to get started."
          action={
            <Button variant="ghost" onClick={openCreate}>
              <Plus size={15} /> {newLabel}
            </Button>
          }
        />
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink-line text-xs uppercase tracking-wider text-slate-500">
                {hasSortOrder && <th className="px-4 py-3 w-16" aria-label="Reorder" />}
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {filtered.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-ink-card/50">
                  {hasSortOrder && (
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <button
                          onClick={() => move(row, -1)}
                          aria-label="Move up"
                          className="rounded p-0.5 text-slate-500 hover:text-accent-bright"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button
                          onClick={() => move(row, 1)}
                          aria-label="Move down"
                          className="rounded p-0.5 text-slate-500 hover:text-accent-bright"
                        >
                          <ArrowDown size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-slate-200">
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusPill status={row.status} />
                      <PublishToggle row={row} onToggle={togglePublish} isSaving={publishingId === row.id} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RowActions
                      slug={row.slug}
                      viewPath={viewPath}
                      onEdit={() => openEdit(row)}
                      onDelete={() => setDeleteTarget(row)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`} wide>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={cn(
                  field.type === 'textarea' || field.type === 'array' || field.type === 'image' || field.type === 'kv'
                    ? 'sm:col-span-2'
                    : '',
                  field.className,
                )}
              >
                <FieldControl
                  field={field}
                  value={values[field.name]}
                  onChange={(val) => setField(field.name, val)}
                />
              </div>
            ))}
          </div>

          {formError && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-400" role="alert">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Saving…
                </>
              ) : editing ? (
                'Save Changes'
              ) : (
                'Create'
              )}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isBusy={deleting}
        title="Delete entry"
        message="This will permanently remove the entry. This action cannot be undone."
      />
    </div>
  )
}

function toSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
