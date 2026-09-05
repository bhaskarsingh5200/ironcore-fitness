import ResourceManager from '../../components/admin/ResourceManager'
import { testimonials } from '../../services/content'
import { Star } from 'lucide-react'

const columns = [
  {
    key: 'name',
    label: 'Member',
    render: (row) => (
      <div>
        <p className="font-medium text-white">{row.name}</p>
        <p className="text-xs text-steel">{row.role}</p>
      </div>
    ),
  },
  {
    key: 'content',
    label: 'Story',
    render: (row) => <p className="max-w-xs truncate text-steel">{row.content}</p>,
  },
  {
    key: 'rating',
    label: 'Rating',
    render: (row) => (
      <span className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < (row.rating || 0) ? 'text-accent-bright' : 'text-ink-line'}
            fill={i < (row.rating || 0) ? 'currentColor' : 'none'}
          />
        ))}
      </span>
    ),
  },
]

const fields = [
  { name: 'name', label: 'Name', required: true, placeholder: 'e.g. Rahul Sharma' },
  { name: 'role', label: 'Role', placeholder: 'e.g. Sample Member Story' },
  { name: 'content', label: 'Story', type: 'textarea', rows: 4, required: true },
  { name: 'rating', label: 'Rating (1–5)', type: 'number', min: 1, max: 5 },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
]

export default function AdminTestimonialsPage() {
  return (
    <ResourceManager
      service={testimonials}
      title="Testimonials"
      subtitle="Fictional concept member stories — clearly labelled as sample content on the public site."
      newLabel="New Story"
      columns={columns}
      fields={fields}
      searchKeys={['name']}
    />
  )
}
