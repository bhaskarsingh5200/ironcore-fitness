/** Site settings service — read/write key/value pairs from site_settings. */
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { delay } from '../lib/utils'
import { SITE, OPENING_HOURS } from '../lib/constants'

export const DEFAULT_SETTINGS = {
  brand_name: SITE.name,
  tagline: SITE.tagline,
  email: SITE.email,
  phone: SITE.phone,
  whatsapp: SITE.whatsapp,
  address: SITE.city,
  instagram: SITE.instagram,
  youtube: SITE.youtube,
  facebook: SITE.facebook,
  opening_hours: OPENING_HOURS,
  hero_heading: 'Build your',
  hero_highlight: 'strongest',
  hero_tagline: 'self.',
  hero_subtitle:
    'Train smarter. Move stronger. Become the version of yourself you’ve been working toward.',
  primary_cta_label: 'Start Your Journey',
  primary_cta_to: '/membership',
  secondary_cta_label: 'Explore Programs',
  secondary_cta_to: '/programs',
  footer_text:
    'A premium fitness center built around purposeful training, expert coaching, and sustainable transformation.',
  site_title: 'IronCore Fitness — Build Your Strongest Self.',
  meta_description:
    'IronCore Fitness — a premium fitness center built around purposeful training, expert coaching, and sustainable transformation.',
  canonical_url: '',
  og_title: 'IronCore Fitness — Build Your Strongest Self.',
  og_description:
    'IronCore Fitness — a premium fitness center built around purposeful training, expert coaching, and sustainable transformation.',
  og_image: '',
  twitter_title: 'IronCore Fitness — Build Your Strongest Self.',
  twitter_description:
    'IronCore Fitness — a premium fitness center built around purposeful training, expert coaching, and sustainable transformation.',
  twitter_image: '',
}

export async function getSettings() {
  if (!isSupabaseConfigured) {
    await delay(80)
    return { ...DEFAULT_SETTINGS }
  }
  const { data, error } = await supabase.from('site_settings').select('key, value')
  if (error) throw new Error(error.message)
  const settings = { ...DEFAULT_SETTINGS }
  for (const row of data) {
    settings[row.key] = row.value
  }
  return settings
}

export async function saveSettings(patch) {
  if (!isSupabaseConfigured) {
    await delay()
    return patch
  }
  for (const [key, value] of Object.entries(patch)) {
    const { error } = await supabase.from('site_settings').upsert(
      { key, value },
      { onConflict: 'key' },
    )
    if (error) throw new Error(error.message)
  }
  return patch
}
