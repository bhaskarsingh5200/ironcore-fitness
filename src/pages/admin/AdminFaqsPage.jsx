import ResourceManager from '../../components/admin/ResourceManager'
import { faqs } from '../../services/content'

const columns = [
  {
    key: 'question',
    label: 'Question',
    render: (row) => <p className="max-w-md truncate font-medium text-white">{row.question}</p>,
  },
  {
    key: 'category',
    label: 'Category',
    render: (row) => <span className="text-steel">{row.category || '—'}</span>,
  },
  {
    key: 'answer',
    label: 'Answer',
    render: (row) => <p className="max-w-xs truncate text-steel">{row.answer}</p>,
  },
  { key: 'sort_order', label: 'Order', render: (row) => <span className="text-steel">{row.sortOrder}</span> },
]

const fields = [
  { name: 'question', label: 'Question', required: true, className: 'sm:col-span-2' },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: ['Getting started', 'Training', 'Membership', 'Other'],
  },
  { name: 'answer', label: 'Answer', type: 'textarea', rows: 4, required: true, className: 'sm:col-span-2' },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
]

export default function AdminFaqsPage() {
  return (
    <ResourceManager
      service={faqs}
      title="FAQs"
      subtitle="Manage frequently asked questions shown across the site."
      newLabel="New FAQ"
      columns={columns}
      fields={fields}
      hasSortOrder
      searchKeys={['question']}
    />
  )
}
