import ResourceManager from '../../components/admin/ResourceManager'
import { classes } from '../../services/content'
import { DAYS, CLASS_CATEGORIES } from '../../lib/constants'

const columns = [
  { key: 'name', label: 'Class', render: (row) => <span className="font-medium text-white">{row.name}</span> },
  { key: 'day', label: 'Day', render: (row) => <span className="text-steel">{row.day}</span> },
  {
    key: 'time',
    label: 'Time',
    render: (row) => (
      <span className="text-steel">
        {row.startTime} – {row.endTime}
      </span>
    ),
  },
  { key: 'category', label: 'Category', render: (row) => <span className="text-steel">{row.category}</span> },
  { key: 'capacity', label: 'Capacity', render: (row) => <span className="text-steel">{row.capacity || '—'}</span> },
]

const fields = [
  { name: 'name', label: 'Class Name', required: true, placeholder: 'e.g. HIIT' },
  { name: 'trainer', label: 'Trainer', placeholder: 'e.g. Alex Morgan' },
  { name: 'day', label: 'Day', type: 'select', options: DAYS, required: true },
  { name: 'start_time', label: 'Start Time', type: 'time', required: true },
  { name: 'end_time', label: 'End Time', type: 'time', required: true },
  { name: 'category', label: 'Category', type: 'select', options: CLASS_CATEGORIES, required: true },
  { name: 'capacity', label: 'Capacity', type: 'number' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
]

export default function AdminClassesPage() {
  return (
    <ResourceManager
      service={classes}
      title="Classes"
      subtitle="Manage the weekly class schedule — database-driven and filterable."
      newLabel="New Class"
      columns={columns}
      fields={fields}
      searchKeys={['name', 'day', 'category', 'trainer']}
    />
  )
}
