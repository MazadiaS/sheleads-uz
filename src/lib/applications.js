import { supabase, isConfigured } from './supabase'

// Current recruitment season — update each cycle.
export const CURRENT_SEASON = 'Season 6'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Validate applicant input before submission.
 * Returns a map of field -> i18n error key; empty object means valid.
 * Keys resolve under the `apply.*` namespace in the component.
 */
export function validateApplication({ name, email }) {
  const errors = {}
  if (!name || !name.trim()) {
    errors.name = 'errName'
  }
  if (!email || !email.trim()) {
    errors.email = 'errEmailRequired'
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'errEmailInvalid'
  }
  return errors
}

/**
 * Persist an application to Supabase.
 * Resolves to { ok: true } or { ok: false, errorKey } — never throws,
 * so the form can always show an honest state and never silently drop data.
 * `errorKey` resolves under the `apply.*` i18n namespace.
 */
export async function submitApplication({ name, email, phone }) {
  if (!isConfigured) {
    return { ok: false, errorKey: 'errNotConfigured' }
  }

  const { error } = await supabase.from('applications').insert({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    season: CURRENT_SEASON,
  })

  if (error) {
    console.error('Application submit failed:', error)
    return { ok: false, errorKey: 'errGeneric' }
  }

  return { ok: true }
}
