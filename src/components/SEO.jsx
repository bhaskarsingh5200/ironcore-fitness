import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SEO_BASE_URL } from '../lib/constants'
import { useSettings } from '../context/SettingsContext'

/**
 * SEO head manager. Injects unique title, description, canonical, Open Graph
 * and Twitter meta tags per route. Overwrites the values set in index.html.
 * Page-level props take precedence; otherwise the values defined on the
 * Admin → Settings → SEO page are used. The canonical base resolves to the
 * configured canonical URL, then to SEO_BASE_URL, then to the deployed origin,
 * so it works on local preview, Vercel, and the custom domain alike.
 */
export default function SEO({ title, description, image, type = 'website' }) {
  const location = useLocation()
  const { settings } = useSettings()

  useEffect(() => {
    const siteTitle = settings.site_title || 'IronCore Fitness'
    const fullTitle = title
      ? `${title} | ${settings.brand_name || 'IronCore Fitness'}`
      : siteTitle
    const pageDesc =
      description || settings.meta_description || siteTitle
    const baseUrl =
      settings.canonical_url || SEO_BASE_URL || window.location.origin
    const url = `${baseUrl}${location.pathname}`
    const canonical = `${url}${location.search}`
    const ogImage = image || settings.og_image || ''
    const twTitle = title
      ? `${title} | ${settings.brand_name || 'IronCore Fitness'}`
      : settings.twitter_title || siteTitle
    const twDesc = description || settings.twitter_description || pageDesc

    const meta = (attr, key, value) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', value)
    }

    document.title = fullTitle
    meta('name', 'description', pageDesc)
    meta('property', 'og:title', settings.og_title || fullTitle)
    meta('property', 'og:description', pageDesc)
    meta('property', 'og:url', canonical)
    meta('property', 'og:type', type)
    meta('property', 'og:site_name', settings.brand_name || 'IronCore Fitness')
    meta('name', 'twitter:title', twTitle)
    meta('name', 'twitter:description', twDesc)

    if (ogImage) {
      meta('property', 'og:image', ogImage)
      meta('name', 'twitter:card', 'summary_large_image')
      meta('name', 'twitter:image', settings.twitter_image || ogImage)
    } else {
      meta('name', 'twitter:card', 'summary')
    }

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  }, [
    title,
    description,
    image,
    type,
    location.pathname,
    location.search,
    settings,
  ])

  return null
}