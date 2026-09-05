import ResourceManager from '../../components/admin/ResourceManager'
import { programs } from '../../services/content'
import { PROGRAM_ICONS } from '../../lib/icons'

const iconOptions = Object.keys(PROGRAM_ICONS)

const columns = [
  {
    key: 'title',
    label: 'Program',
    render: (row) => (
      <div className="flex items-center gap-3">
        {row.image && (
          <img
            src={row.image}
            alt=""
            className="h-10 w-14 shrink-0 rounded object-cover"
            loading="lazy"
          />
        )}
        <div>
          <p className="font-medium text-white">{row.title}</p>
          <p className="text-xs text-steel">/{row.slug}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'short_description',
    label: 'Summary',
    render: (row) => <p className="max-w-xs truncate text-steel">{row.shortDescription}</p>,
  },
  { key: 'sort_order', label: 'Order', render: (row) => <span className="text-steel">{row.sortOrder}</span> },
]

const fields = [
  { name: 'title', label: 'Title', required: true, placeholder: 'e.g. Strength Training' },
  { name: 'slug', label: 'Slug (auto-generated from title)' },
  { name: 'short_description', label: 'Short Description', type: 'textarea', rows: 2, placeholder: 'One-line summary shown on cards.' },
  { name: 'description', label: 'Long Description', type: 'textarea', rows: 5, placeholder: 'Full overview for the detail page.' },
  { name: 'approach', label: 'Training Approach', type: 'textarea', rows: 4, placeholder: 'How the program is delivered.' },
  { name: 'who_for', label: 'Who It’s For', type: 'textarea', rows: 2, placeholder: 'Who should join this program.' },
  { name: 'benefits', label: 'Benefits (one per line)', type: 'array', rows: 4, placeholder: 'Progressive, coach-guided programming' },
  { name: 'level', label: 'Level', placeholder: 'e.g. Beginner to advanced' },
  { name: 'duration_weeks', label: 'Duration (weeks)', type: 'number', placeholder: 'e.g. 8' },
  { name: 'sessions_per_week', label: 'Sessions per week', type: 'number', placeholder: 'e.g. 3' },
  { name: 'group_size', label: 'Group size', placeholder: 'e.g. Up to 8' },
  {
    name: 'image',
    label: 'Program Image',
    type: 'image',
    hint: 'WebP, AVIF, JPEG, PNG · max 4 MB',
    className: 'sm:col-span-2',
  },
  { name: 'icon', label: 'Icon', type: 'select', options: iconOptions },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
]

export default function AdminProgramsPage() {
  return (
    <ResourceManager
      service={programs}
      title="Programs"
      subtitle="Create, edit, publish, and reorder training programs."
      newLabel="New Program"
      columns={columns}
      fields={fields}
      storageBucket="program-images"
      storageFolder="programs"
      makeSlug="title"
      viewPath="/programs"
      hasSortOrder
      searchKeys={['title', 'slug']}
    />
  )
}
