import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { delay } from '../lib/utils'

function toCamel(row) {
  const out = {}
  for (const key of Object.keys(row)) {
    out[key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = row[key]
  }
  return out
}

function snakeCase(key) {
  return key.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
}

export function mapRows(data) {
  return (data || []).map(toCamel)
}

export function toSnake(row) {
  const out = {}
  for (const key of Object.keys(row)) {
    out[snakeCase(key)] = row[key]
  }
  return out
}

export function isAdminRequest() {
  return isSupabaseConfigured
}

/** Runs a supabase call, or falls back to concept data when unconfigured. */
export async function run(operation, fallback) {
  if (!isSupabaseConfigured) {
    await delay()
    return fallback
  }
  const result = await operation()
  if (result.error) throw new Error(result.error.message)
  return result.data
}

/**
 * Generic fetch wrapper that applies RLS-friendly filters.
 * Public calls read only `status = published`.
 * `fallback` supplies concept data when Supabase is not configured.
 */
export function listAll(table, { admin = false, orderBy = 'sort_order', fallback = [] } = {}) {
  const fallbackRows = admin
    ? [...fallback]
    : [...fallback].filter((row) => row.status === 'published')
  return run(
    () => {
      let query = supabase.from(table).select('*').order(orderBy, { ascending: true })
      if (!admin) query = query.eq('status', 'published')
      return query
    },
    fallbackRows,
  ).then((rows) => mapRows(rows))
}

export function getOne(table, slug, { admin = false, fallback = [] } = {}) {
  const match = fallback.find((row) => row.slug === slug && (admin || row.status === 'published'))
  return run(
    () => {
      let query = supabase.from(table).select('*').eq('slug', slug).single()
      if (!admin) query = supabase.from(table).select('*').eq('slug', slug).eq('status', 'published').single()
      return query
    },
    match || null,
  ).then((row) => (row ? toCamel(row) : null))
}

export function getById(table, id, fallback = []) {
  const match = fallback.find((row) => row.id === id)
  return run(() => supabase.from(table).select('*').eq('id', id).single(), match || null).then((row) =>
    row ? toCamel(row) : null,
  )
}

export async function insertRow(table, payload) {
  if (!isSupabaseConfigured) {
    await delay()
    return { id: `local-${Date.now()}`, ...payload }
  }
  const { data, error } = await supabase.from(table).insert(payload).select().single()
  if (error) throw new Error(error.message)
  return toCamel(data)
}

export async function updateRow(table, id, payload) {
  if (!isSupabaseConfigured) {
    await delay()
    return { id, ...payload }
  }
  const { data, error } = await supabase
    .from(table)
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return toCamel(data)
}

export async function deleteRow(table, id) {
  if (!isSupabaseConfigured) {
    await delay()
    return { success: true }
  }
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw new Error(error.message)
  return { success: true }
}
