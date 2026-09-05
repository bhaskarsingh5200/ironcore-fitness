/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { getSettings, DEFAULT_SETTINGS } from '../services/settings'

const SettingsContext = createContext({ settings: DEFAULT_SETTINGS, ready: false })

/**
 * Loads site settings once and exposes them to layout components
 * (Hero, Footer, SEO). Renders defaults immediately so the hero and
 * footer are never blocked on a network request.
 */
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let mounted = true
    getSettings()
      .then((data) => {
        if (mounted) setSettings((prev) => ({ ...prev, ...data }))
      })
      .catch(() => {
        /* keep defaults on failure */
      })
      .finally(() => {
        if (mounted) setReady(true)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, ready }}>{children}</SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}