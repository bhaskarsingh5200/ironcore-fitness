import { useEffect, useState } from 'react'
import { Loader2, Check } from 'lucide-react'
import { AdminPageHeader } from '../../components/admin/AdminUI'
import Field from '../../components/ui/Field'
import Button from '../../components/ui/Button'
import { getSettings, saveSettings } from '../../services/settings'
import { isSupabaseConfigured } from '../../lib/supabase'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const data = await getSettings()
      setSettings(data)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const set = (key, value) => setSettings((s) => ({ ...s, [key]: value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const { opening_hours, ...rest } = settings
      const patch = {
        ...rest,
        opening_hours: typeof opening_hours === 'string' ? opening_hours : opening_hours,
      }
      await saveSettings(patch)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (!settings) {
    return (
      <div>
        <AdminPageHeader title="Settings" subtitle="Site-wide configuration." />
        {error && (
          <p className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        <p className="text-sm text-steel">Loading settings…</p>
      </div>
    )
  }

  return (
    <div>
      <AdminPageHeader title="Settings" subtitle="Site-wide configuration stored in site_settings." />

      {error && (
        <p className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="card-surface max-w-2xl space-y-5 p-6">
        <h2 className="font-heading text-base font-bold text-white">Brand</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand Name" value={settings.brand_name} onChange={(e) => set('brand_name', e.target.value)} />
          <Field label="Tagline" value={settings.tagline} onChange={(e) => set('tagline', e.target.value)} />
        </div>

        <h2 className="pt-2 font-heading text-base font-bold text-white">Contact (placeholders)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email" value={settings.email} onChange={(e) => set('email', e.target.value)} />
          <Field label="Phone" value={settings.phone} onChange={(e) => set('phone', e.target.value)} />
          <Field label="WhatsApp" value={settings.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
          <Field label="Address" value={settings.address} onChange={(e) => set('address', e.target.value)} />
        </div>

        <h2 className="pt-2 font-heading text-base font-bold text-white">Social</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Instagram URL" value={settings.instagram} onChange={(e) => set('instagram', e.target.value)} />
          <Field label="YouTube URL" value={settings.youtube} onChange={(e) => set('youtube', e.target.value)} />
          <Field label="Facebook URL" value={settings.facebook} onChange={(e) => set('facebook', e.target.value)} />
        </div>

        <h2 className="pt-2 font-heading text-base font-bold text-white">Opening Hours</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mon–Sat" value={settings.opening_hours?.[0] || ''} onChange={(e) => set('opening_hours', [e.target.value, settings.opening_hours?.[1]])} />
          <Field label="Sunday" value={settings.opening_hours?.[1] || ''} onChange={(e) => set('opening_hours', [settings.opening_hours?.[0], e.target.value])} />
        </div>

        <h2 className="pt-2 font-heading text-base font-bold text-white">Homepage Content</h2>
        <p className="text-xs text-slate-500">
          Shown on the landing page hero and footer. The hero heading renders in three parts so the
          highlighted word keeps its gradient style.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Hero Heading (line 1)" value={settings.hero_heading} onChange={(e) => set('hero_heading', e.target.value)} placeholder="Build your" />
          <Field label="Hero Highlight" value={settings.hero_highlight} onChange={(e) => set('hero_highlight', e.target.value)} placeholder="strongest" />
          <Field label="Hero Tagline (line 2)" value={settings.hero_tagline} onChange={(e) => set('hero_tagline', e.target.value)} placeholder="self." />
        </div>
        <Field label="Hero Description" as="textarea" rows={2} value={settings.hero_subtitle} onChange={(e) => set('hero_subtitle', e.target.value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Primary CTA Label" value={settings.primary_cta_label} onChange={(e) => set('primary_cta_label', e.target.value)} placeholder="Start Your Journey" />
          <Field label="Primary CTA Link" value={settings.primary_cta_to} onChange={(e) => set('primary_cta_to', e.target.value)} placeholder="/membership" />
          <Field label="Secondary CTA Label" value={settings.secondary_cta_label} onChange={(e) => set('secondary_cta_label', e.target.value)} placeholder="Explore Programs" />
          <Field label="Secondary CTA Link" value={settings.secondary_cta_to} onChange={(e) => set('secondary_cta_to', e.target.value)} placeholder="/programs" />
        </div>
        <Field label="Footer Text" as="textarea" rows={2} value={settings.footer_text} onChange={(e) => set('footer_text', e.target.value)} />

        <h2 className="pt-2 font-heading text-base font-bold text-white">SEO / Meta</h2>
        <p className="text-xs text-slate-500">
          These values feed the page title, meta description, canonical URL, and social sharing
          tags. Plain text only — no HTML or scripts are rendered.
        </p>
        <Field label="Site Title" value={settings.site_title} onChange={(e) => set('site_title', e.target.value)} />
        <Field label="Meta Description" as="textarea" rows={2} value={settings.meta_description} onChange={(e) => set('meta_description', e.target.value)} />
        <Field label="Canonical URL" value={settings.canonical_url} onChange={(e) => set('canonical_url', e.target.value)} placeholder="https://ironcore.bhaskarbhardwaj.com" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Open Graph Title" value={settings.og_title} onChange={(e) => set('og_title', e.target.value)} />
          <Field label="Twitter/X Title" value={settings.twitter_title} onChange={(e) => set('twitter_title', e.target.value)} />
        </div>
        <Field label="Open Graph Description" as="textarea" rows={2} value={settings.og_description} onChange={(e) => set('og_description', e.target.value)} />
        <Field label="Twitter/X Description" as="textarea" rows={2} value={settings.twitter_description} onChange={(e) => set('twitter_description', e.target.value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Open Graph Image URL" value={settings.og_image} onChange={(e) => set('og_image', e.target.value)} />
          <Field label="Twitter/X Image URL" value={settings.twitter_image} onChange={(e) => set('twitter_image', e.target.value)} />
        </div>

        {!isSupabaseConfigured && (
          <p className="text-xs text-slate-500">
            Concept mode — settings are held in memory and reset on reload. Connect Supabase to
            persist them in the <code className="text-accent-bright">site_settings</code> table.
          </p>
        )}

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving…
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-sm text-emerald-400">
              <Check size={15} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
