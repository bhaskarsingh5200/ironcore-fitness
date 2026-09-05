import ResourceManager from '../../components/admin/ResourceManager'
import { memberships } from '../../services/content'
import { formatPrice } from '../../lib/utils'
import Badge from '../../components/ui/Badge'

const columns = [
  {
    key: 'name',
    label: 'Plan',
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-white">{row.name}</span>
        {row.featured && <Badge tone="accent">Popular</Badge>}
      </div>
    ),
  },
  { key: 'price', label: 'Price', render: (row) => <span className="font-medium text-white">{formatPrice(row.price)}</span> },
  { key: 'billing_period', label: 'Billing', render: (row) => <span className="text-steel">{row.billingPeriod}</span> },
  { key: 'sort_order', label: 'Order', render: (row) => <span className="text-steel">{row.sortOrder}</span> },
]

const fields = [
  { name: 'name', label: 'Plan Name', required: true, placeholder: 'e.g. Performance' },
  { name: 'price', label: 'Price (₹)', type: 'number', required: true },
  { name: 'billing_period', label: 'Billing Period', type: 'select', options: ['month', 'year', 'one-time'] },
  { name: 'description', label: 'Description', type: 'textarea', rows: 2, placeholder: 'Short plan summary.' },
  { name: 'features', label: 'Features (one per line)', type: 'array', rows: 4, placeholder: 'Unlimited Gym Access' },
  { name: 'featured', label: 'Featured', type: 'select', options: [
    { value: false, label: 'No' },
    { value: true, label: 'Yes (Most Popular)' },
  ] },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
]

export default function AdminMembershipsPage() {
  return (
    <ResourceManager
      service={memberships}
      title="Memberships"
      subtitle="Manage membership plans, pricing, and features."
      newLabel="New Plan"
      columns={columns}
      fields={fields}
      hasSortOrder
      searchKeys={['name']}
    />
  )
}
