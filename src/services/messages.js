/**
 * Message services — contact enquiries and membership enquiries.
 * These records are private and admin-only; RLS blocks public reads.
 * In concept mode (no Supabase), messages persist to localStorage so the
 * admin panel remains demo-able without a backend.
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { delay, randomId, formatDateTime } from '../lib/utils'

const LS_KEY = 'ironcore_concept_messages_v1'

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || {}
  } catch {
    return {}
  }
}

function writeLocal(store) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(store))
  } catch {
    /* storage unavailable */
  }
}

function fallbackList() {
  const store = readLocal()
  const all = [
    ...(store.contact || []),
    ...(store.enquiries || []).map((e) => ({ ...e, kind: 'membership' })),
  ]
  return all
    .map(toCamel)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

function toCamel(row) {
  const out = {}
  for (const key of Object.keys(row)) {
    out[key.replace(/_([a-z])/g, (_, c) => c.toUpperCase())] = row[key]
  }
  return out
}

export const contactMessages = {
  async create(payload) {
    if (!isSupabaseConfigured) {
      await delay()
      const store = readLocal()
      const record = {
        ...payload,
        id: `msg-${randomId()}`,
        status: 'new',
        created_at: new Date().toISOString(),
      }
      store.contact = [...(store.contact || []), record]
      writeLocal(store)
      return record
    }
    const { data, error } = await supabase.from('contact_messages').insert(payload).select().single()
    if (error) throw new Error(error.message)
    return toCamel(data)
  },

  async list() {
    if (!isSupabaseConfigured) {
      await delay()
      return fallbackList().filter((m) => m.kind !== 'membership')
    }
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data.map(toCamel)
  },

  async update(id, patch) {
    if (!isSupabaseConfigured) {
      await delay()
      const store = readLocal()
      store.contact = (store.contact || []).map((m) => (m.id === id ? { ...m, ...patch } : m))
      writeLocal(store)
      return patch
    }
    const { data, error } = await supabase.from('contact_messages').update(patch).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    return toCamel(data)
  },

  async remove(id) {
    if (!isSupabaseConfigured) {
      await delay()
      const store = readLocal()
      store.contact = (store.contact || []).filter((m) => m.id !== id)
      writeLocal(store)
      return { success: true }
    }
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return { success: true }
  },
}

export const membershipEnquiries = {
  async create(payload) {
    if (!isSupabaseConfigured) {
      await delay()
      const store = readLocal()
      const record = {
        ...payload,
        id: `enq-${randomId()}`,
        status: 'new',
        created_at: new Date().toISOString(),
      }
      store.enquiries = [...(store.enquiries || []), record]
      writeLocal(store)
      return record
    }
    const { data, error } = await supabase.from('membership_enquiries').insert(payload).select().single()
    if (error) throw new Error(error.message)
    return toCamel(data)
  },

  async list() {
    if (!isSupabaseConfigured) {
      await delay()
      return fallbackList().filter((m) => m.kind === 'membership')
    }
    const { data, error } = await supabase
      .from('membership_enquiries')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw new Error(error.message)
    return data.map(toCamel)
  },

  async update(id, patch) {
    if (!isSupabaseConfigured) {
      await delay()
      const store = readLocal()
      store.enquiries = (store.enquiries || []).map((m) => (m.id === id ? { ...m, ...patch } : m))
      writeLocal(store)
      return patch
    }
    const { data, error } = await supabase.from('membership_enquiries').update(patch).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    return toCamel(data)
  },

  async remove(id) {
    if (!isSupabaseConfigured) {
      await delay()
      const store = readLocal()
      store.enquiries = (store.enquiries || []).filter((m) => m.id !== id)
      writeLocal(store)
      return { success: true }
    }
    const { error } = await supabase.from('membership_enquiries').delete().eq('id', id)
    if (error) throw new Error(error.message)
    return { success: true }
  },
}

/** Combined inbox used by the admin Messages panel. */
export async function listAllInbox() {
  const [contact, enquiries] = await Promise.all([
    contactMessages.list(),
    membershipEnquiries.list(),
  ])
  const tagged = [
    ...contact.map((m) => ({ ...m, kind: 'contact' })),
    ...enquiries.map((m) => ({ ...m, kind: 'membership' })),
  ]
  return tagged.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

/** Returns a human label for a message's origin timestamp. */
export function messageMeta(m) {
  return {
    createdLabel: formatDateTime(m.createdAt),
    isNew: m.status === 'new',
  }
}
