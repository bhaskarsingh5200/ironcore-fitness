import { useEffect, useState } from 'react'
import { Plus, Loader2, Trash2 } from 'lucide-react'
import { AdminPageHeader, ConfirmDialog, EmptyState, PublishToggle, StatusPill } from '../../components/admin/AdminUI'
import { ImageInput } from '../../components/admin/formFields'
import Field from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import { gallery } from '../../services/content'
import { uploadImage } from '../../services/storage'
import { GALLERY_CATEGORIES } from '../../lib/constants'
import { cn } from '../../lib/utils'

export default function AdminGalleryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0].value)
  const [uploading, setUploading] = useState(false)

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await gallery.list({ admin: true })
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!image?.file) return
    setUploading(true)
    setError('')
    try {
      const result = await uploadImage('gallery-images', image.file, 'gallery')
      await gallery.create({
        image_url: result.publicUrl,
        image_path: result.path,
        caption,
        category,
        status: 'published',
        sort_order: (items.length || 0) + 1,
      })
      setImage(null)
      setCaption('')
      setCategory(GALLERY_CATEGORIES[0].value)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const togglePublish = async (item) => {
    try {
      await gallery.update(item.id, { status: item.status === 'published' ? 'draft' : 'published' })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await gallery.remove(deleteTarget.id)
      setDeleteTarget(null)
      await load()
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  const filtered = filter ? items.filter((i) => i.category === filter) : items

  return (
    <div>
      <AdminPageHeader title="Gallery" subtitle="Upload images to Supabase Storage and organise them by category." />

      {error && (
        <p className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={handleUpload} className="card-surface mb-8 p-6">
        <h2 className="font-heading text-base font-bold text-white">Upload new image</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ImageInput label="Image" value={image} onChange={setImage} hint="WebP, AVIF, JPEG, PNG · max 4 MB" />
          <div className="space-y-4">
            <Field label="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="e.g. The strength floor" />
            <Field label="Category" as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <Button type="submit" disabled={uploading || !image?.file} className="mt-5">
          {uploading ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Uploading…
            </>
          ) : (
            <>
              <Plus size={15} /> Upload & Publish
            </>
          )}
        </Button>
      </form>

      <div className="mb-4 flex flex-wrap gap-2">
        {['', ...GALLERY_CATEGORIES.map((c) => c.value)].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              'rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors',
              filter === cat ? 'border-accent bg-accent/15 text-accent-bright' : 'border-ink-line text-steel hover:text-white',
            )}
          >
            {cat || 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-steel">
          <Spinner className="h-6 w-6" />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState message="No images in this category yet." />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-md border border-ink-line bg-ink-card">
              <div className="relative">
                <img src={item.imageUrl} alt={item.caption} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                <Badge tone="muted" className="absolute left-2 top-2">
                  {item.category}
                </Badge>
              </div>
              <div className="space-y-3 p-3">
                <p className="truncate text-sm text-slate-200">{item.caption || 'Untitled'}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusPill status={item.status} />
                    <PublishToggle row={item} onToggle={togglePublish} isSaving={false} />
                  </div>
                  <button
                    onClick={() => setDeleteTarget(item)}
                    aria-label="Delete image"
                    className="rounded p-2 text-steel transition-colors hover:bg-ink hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        isBusy={deleting}
        title="Delete image"
        message="This permanently removes the image from the gallery."
      />
    </div>
  )
}
