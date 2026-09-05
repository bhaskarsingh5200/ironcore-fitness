/**
 * IronCore Fitness — site-wide constants.
 * Contact details are intentionally placeholders. No real business claims.
 */

export const SITE = {
  name: 'IronCore Fitness',
  wordmark: 'IronCore',
  tagline: 'BUILD YOUR STRONGEST SELF.',
  description:
    'IronCore Fitness is a premium concept fitness center focused on strength training, personal coaching, functional fitness, and sustainable transformation.',
  city: 'MG Road, Bengaluru',
  email: 'hello@ironcorefitness.example',
  phone: '+91 90000 00000',
  whatsapp: '+91 90000 00000',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com',
  facebook: 'https://facebook.com',
}

/**
 * Canonical site URL. Leave empty to auto-detect window.location.origin.
 * Set to the production custom domain to pin canonicals in all environments.
 */
export const SEO_BASE_URL = 'https://ironcore.bhaskarbhardwaj.com'

export const CONCEPT_NOTICE =
  'Concept / demo installation — trainers, member stories, testimonials, prices, and statistics are fictional demo content for evaluation purposes.'

export const CONCEPT_LABEL = 'CONCEPT / DEMO INSTALLATION'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Programs', to: '/programs' },
  { label: 'Trainers', to: '/trainers' },
  { label: 'Membership', to: '/membership' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

export const CLASS_CATEGORIES = [
  'Strength Training',
  'Functional Fitness',
  'HIIT',
  'Mobility',
  'Personal Training',
  'Cardio',
]

export const GALLERY_CATEGORIES = [
  { value: 'Strength', label: 'Strength', description: 'Barbells, racks, and heavy iron — the heart of the strength floor.' },
  { value: 'Training', label: 'Training', description: 'Coached sessions in action — technique, conditioning, and effort.' },
  { value: 'Community', label: 'Community', description: 'The people who train together, celebrate PRs, and keep each other honest.' },
  { value: 'Facilities', label: 'Facilities', description: 'The zones that make IronCore tick — from turf to recovery.' },
]

export const CONTACT_METHODS = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Email', label: 'Email' },
  { value: 'Phone', label: 'Phone' },
]

export const OPENING_HOURS = [
  { day: 'Monday – Saturday', hours: '05:30 AM – 10:00 PM' },
  { day: 'Sunday', hours: '07:00 AM – 02:00 PM' },
]

export const HERO_STATS = [
  { value: '500+', label: 'Members' },
  { value: '12+', label: 'Expert Trainers' },
  { value: '8+', label: 'Years Experience' },
  { value: '20+', label: 'Weekly Classes' },
]
