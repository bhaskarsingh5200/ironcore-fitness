import { useEffect, useRef, useState } from 'react'
import { ImagePlus, Trash2, Plus, X } from 'lucide-react'
import Image from '../ui/Image'

/**
 * Image upload field with preview. Holds a URL or a pending file.
 * onChange(value) where value = { url, path, file } — file is a pending upload.
 */
export function ImageInput({ label, value, onChange, hint }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(value?.url || '')
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    setPreview(value?.url || '')
  }, [value?.url])

  const handleFile = (file) => {
    if (!file) return
    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
    onChange({ url: '', path: '', file })
  }

  const clear = () => {
    setPreview('')
    setFileName('')
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      {label && <label className="field-label">{label}</label>}
      <div className="flex items-start gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md border border-ink-line bg-ink">
          {preview ? (
            <Image src={preview} alt="" eager aspect="aspect-[4/3]" className="h-full w-full" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-600">
              <ImagePlus size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="btn cursor-pointer border border-ink-line px-4 py-2 text-xs uppercase tracking-wider text-white transition-colors hover:border-accent hover:text-accent-bright">
            Choose image
            <input
              ref={inputRef}
              type="file"
              accept="image/webp,image/avif,image/jpeg,image/png"
              className="sr-only"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </label>
          {preview && (
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 transition-colors hover:text-red-300"
            >
              <Trash2 size={13} /> Remove
            </button>
          )}
          <p className="text-xs text-slate-500">{fileName || hint || 'WebP, AVIF, JPEG, PNG · max 4 MB'}</p>
        </div>
      </div>
    </div>
  )
}

/** Comma / newline separated list editor for arrays (benefits, features). */
export function ArrayEditor({ value, onChange, placeholder, rows = 3 }) {
  const text = (value || []).join('\n')
  return (
    <textarea
      value={text}
      rows={rows}
      onChange={(e) =>
        onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))
      }
      placeholder={placeholder}
      className="field-input"
    />
  )
}

/** Key-value editor for social links or similar JSON maps. */
export function KeyValueEditor({ value, onChange, allowedKeys, labels = {} }) {
  const update = (key, val) => {
    const next = { ...(value || {}) }
    if (val) next[key] = val
    else delete next[key]
    onChange(next)
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {allowedKeys.map((key) => (
        <div key={key}>
          <label className="field-label">{labels[key] || key}</label>
          <input
            type="url"
            value={value?.[key] || ''}
            placeholder={`https://`}
            onChange={(e) => update(key, e.target.value)}
            className="field-input"
          />
        </div>
      ))}
    </div>
  )
}

/** Adds/removes string chips (used for specialization tags). */
export function TagEditor({ value, onChange, placeholder = 'Type and press Enter' }) {
  const [input, setInput] = useState('')
  const tags = value || []

  const add = () => {
    const tag = input.trim()
    if (tag && !tags.includes(tag)) onChange([...tags, tag])
    setInput('')
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
          className="field-input"
        />
        <button
          type="button"
          onClick={add}
          aria-label="Add tag"
          className="shrink-0 rounded-md border border-ink-line px-3 text-steel transition-colors hover:border-accent hover:text-accent-bright"
        >
          <Plus size={16} />
        </button>
      </div>
      {tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent-bright"
            >
              {tag}
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="text-steel hover:text-white"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
