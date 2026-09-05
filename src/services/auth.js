/**
 * Auth + admin-role services.
 * Uses Supabase Auth for sessions and the `profiles.role` column for
 * authorization. Every authenticated user is NOT an admin — only profiles
 * with role = 'admin' may access the management dashboard.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { delay } from '../lib/utils'

function toCamel(row) {
  const out = {}
  for (const key of Object.keys(row)) {
    out[key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = row[key]
  }
  return out
}

function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to a .env file to enable authentication.',
    )
  }
}

export async function signIn(email, password) {
  requireSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return data
}

export async function signOut() {
  if (!isSupabaseConfigured) {
    await delay()
    return null
  }
  const { error } = await supabase.auth.signOut()
  if (error) throw new Error(error.message)
  return null
}

export async function getSession() {
  if (!isSupabaseConfigured) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthStateChange(callback) {
  if (!isSupabaseConfigured) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return () => data.subscription.unsubscribe()
}

/** Fetch the caller's profile. Public users never see other profiles. */
export async function getProfile(userId) {
  if (!isSupabaseConfigured) return null
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
  if (error) return null
  return toCamel(data)
}

export async function isAdminUser(userId) {
  const profile = await getProfile(userId)
  return profile?.role === 'admin'
}
