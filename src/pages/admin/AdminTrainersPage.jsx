import ResourceManager from '../../components/admin/ResourceManager'
import { trainers } from '../../services/content'

const columns = [
  {
    key: 'name',
    label: 'Trainer',
    render: (row) => (
      <div className="flex items-center gap-3">
        {row.image && (
          <img
            src={row.image}
            alt=""
            className="h-10 w-10 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
        )}
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-xs text-steel">{row.role}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'specialization',
    label: 'Specialization',
    render: (row) => (
      <p className="max-w-xs truncate text-steel">
        {(row.specialization || []).join(' · ') || '—'}
      </p>
    ),
  },
  { key: 'experience', label: 'Experience', render: (row) => <span className="text-steel">{row.experience}</span> },
]

const fields = [
  { name: 'name', label: 'Name', required: true, placeholder: 'e.g. Alex Morgan' },
  { name: 'slug', label: 'Slug (auto-generated from name)' },
  { name: 'role', label: 'Role', required: true, placeholder: 'e.g. Head Strength Coach' },
  { name: 'bio', label: 'Bio', type: 'textarea', rows: 3, placeholder: 'Short professional bio.' },
  { name: 'specialization', label: 'Specialization (tags)', type: 'tags', placeholder: 'e.g. Strength Training' },
  { name: 'experience', label: 'Experience', placeholder: 'e.g. 10+ years' },
  { name: 'certifications', label: 'Certifications (tags)', type: 'tags', placeholder: 'e.g. CSCS — Certified Strength & Conditioning Specialist' },
  { name: 'focus', label: 'Coaching Focus', type: 'textarea', rows: 2, placeholder: 'One-line coaching philosophy.' },
  { name: 'quote', label: 'Quote', type: 'textarea', rows: 2, placeholder: 'A short quote shown on the profile.' },
  {
    name: 'image',
    label: 'Profile Image',
    type: 'image',
    hint: 'WebP, AVIF, JPEG, PNG · max 4 MB',
    className: 'sm:col-span-2',
  },
  {
    name: 'social_links',
    label: 'Social Links',
    type: 'kv',
    allowedKeys: ['instagram', 'linkedin', 'youtube', 'x'],
    labels: { instagram: 'Instagram', linkedin: 'LinkedIn', youtube: 'YouTube', x: 'X / Twitter' },
    className: 'sm:col-span-2',
  },
  { name: 'status', label: 'Status', type: 'select', options: ['draft', 'published'] },
]

export default function AdminTrainersPage() {
  return (
    <ResourceManager
      service={trainers}
      title="Trainers"
      subtitle="Manage concept trainer profiles shown on the public site."
      newLabel="New Trainer"
      columns={columns}
      fields={fields}
      storageBucket="trainer-images"
      storageFolder="trainers"
      makeSlug="name"
      viewPath="/trainers"
      searchKeys={['name', 'role']}
    />
  )
}
