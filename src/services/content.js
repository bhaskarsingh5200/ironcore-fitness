/**
 * Content services — programs, trainers, memberships, classes, gallery,
 * FAQs, and testimonials. Public reads are limited to published rows by RLS
 * (and by an explicit filter here). Admin CRUD goes through the same services.
 */
import {
  listAll,
  getOne,
  getById,
  insertRow,
  updateRow,
  deleteRow,
} from './client'
import {
  conceptPrograms,
  conceptTrainers,
  conceptMemberships,
  conceptClasses,
  conceptGallery,
  conceptFaqs,
  conceptTestimonials,
} from '../data/concept'

export const programs = {
  list: (opts) => listAll('programs', { ...opts, fallback: conceptPrograms }),
  getBySlug: (slug, opts) => getOne('programs', slug, { ...opts, fallback: conceptPrograms }),
  getById: (id) => getById('programs', id, conceptPrograms),
  create: (payload) => insertRow('programs', payload),
  update: (id, payload) => updateRow('programs', id, payload),
  remove: (id) => deleteRow('programs', id),
}

export const trainers = {
  list: (opts) => listAll('trainers', { ...opts, fallback: conceptTrainers }),
  getBySlug: (slug, opts) => getOne('trainers', slug, { ...opts, fallback: conceptTrainers }),
  getById: (id) => getById('trainers', id, conceptTrainers),
  create: (payload) => insertRow('trainers', payload),
  update: (id, payload) => updateRow('trainers', id, payload),
  remove: (id) => deleteRow('trainers', id),
}

export const memberships = {
  list: (opts) => listAll('memberships', { ...opts, fallback: conceptMemberships }),
  getById: (id) => getById('memberships', id, conceptMemberships),
  create: (payload) => insertRow('memberships', payload),
  update: (id, payload) => updateRow('memberships', id, payload),
  remove: (id) => deleteRow('memberships', id),
}

export const classes = {
  list: (opts) => listAll('classes', { ...opts, fallback: conceptClasses }),
  getById: (id) => getById('classes', id, conceptClasses),
  create: (payload) => insertRow('classes', payload),
  update: (id, payload) => updateRow('classes', id, payload),
  remove: (id) => deleteRow('classes', id),
}

export const gallery = {
  list: (opts) => listAll('gallery', { ...opts, fallback: conceptGallery }),
  getById: (id) => getById('gallery', id, conceptGallery),
  create: (payload) => insertRow('gallery', payload),
  update: (id, payload) => updateRow('gallery', id, payload),
  remove: (id) => deleteRow('gallery', id),
}

export const faqs = {
  list: (opts) => listAll('faqs', { ...opts, fallback: conceptFaqs }),
  getById: (id) => getById('faqs', id, conceptFaqs),
  create: (payload) => insertRow('faqs', payload),
  update: (id, payload) => updateRow('faqs', id, payload),
  remove: (id) => deleteRow('faqs', id),
}

export const testimonials = {
  list: (opts) => listAll('testimonials', { ...opts, fallback: conceptTestimonials }),
  getById: (id) => getById('testimonials', id, conceptTestimonials),
  create: (payload) => insertRow('testimonials', payload),
  update: (id, payload) => updateRow('testimonials', id, payload),
  remove: (id) => deleteRow('testimonials', id),
}

export const conceptCounts = {
  programs: conceptPrograms.filter((p) => p.status === 'published').length,
  trainers: conceptTrainers.filter((t) => t.status === 'published').length,
  memberships: conceptMemberships.filter((m) => m.status === 'published').length,
}
