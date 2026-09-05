/** Small UI + data helpers. */

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatDateTime(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function formatTime(value) {
  if (!value) return ''
  const [h, m] = value.split(':').map(Number)
  const hour = h % 12 === 0 ? 12 : h % 12
  const suffix = h < 12 ? 'AM' : 'PM'
  return `${hour}:${String(m ?? 0).padStart(2, '0')} ${suffix}`
}

export function formatPrice(value) {
  if (value === null || value === undefined || value === '') return '—'
  const num = Number(value)
  if (Number.isNaN(num)) return '—'
  return `₹${num.toLocaleString('en-IN')}`
}

export function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', tone: 'accent' }
  if (bmi < 25) return { label: 'Healthy', tone: 'good' }
  if (bmi < 30) return { label: 'Overweight', tone: 'warn' }
  return { label: 'Obesity', tone: 'bad' }
}

export function todayName() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}

export function randomId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`
}

/** Resolve a value; used so concept-mode form handlers can await a delay. */
export function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
