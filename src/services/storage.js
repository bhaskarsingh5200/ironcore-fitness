/**
 * Storage service — Supabase Storage for trainer/program/gallery images.
 * Client-side validation restricts uploads to WebP, AVIF, JPEG, PNG ≤ 4 MB.
 * Public objects are readable by everyone; writes require an authenticated
 * admin (enforced by storage policies server-side).
 */
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from '../lib/supabase'

export function validateImage(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Unsupported file type. Allowed: WebP, AVIF, JPEG, PNG.'
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return 'File is too large. Maximum size is 4 MB.'
  }
  return null
}

export function publicUrl(bucket, path) {
  if (!isSupabaseConfigured) return ''
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data?.publicUrl || ''
}

/**
 * Upload an image to a bucket. Returns { publicUrl, path }.
 * path may be a folder prefix (e.g. 'trainers').
 */
export async function uploadImage(bucket, file, folder = '') {
  const validationError = validateImage(file)
  if (validationError) throw new Error(validationError)

  if (!isSupabaseConfigured) {
    // Concept mode: return a local object URL so uploads preview immediately.
    const objectUrl = URL.createObjectURL(file)
    return { publicUrl: objectUrl, path: '', preview: objectUrl }
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeFolder = folder ? `${folder.replace(/^\/+|\/+$/g, '')}/` : ''
  const path = `${safeFolder}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  })
  if (error) throw new Error(error.message)

  return { publicUrl: publicUrl(bucket, path), path }
}

export async function deleteImage(bucket, path) {
  if (!isSupabaseConfigured) return { success: true }
  if (!path) return { success: true }
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw new Error(error.message)
  return { success: true }
}
