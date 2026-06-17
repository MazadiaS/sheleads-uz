import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// `isConfigured` lets the UI fail honestly when env vars are missing
// (e.g. local preview without secrets) instead of throwing on import.
export const isConfigured = Boolean(url && anonKey)

export const supabase = isConfigured ? createClient(url, anonKey) : null
