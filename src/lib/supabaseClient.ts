import { createClient } from '@supabase/supabase-js'

// The anon key is safe to expose in client code — it identifies the project,
// not a privileged user. Actual access control is enforced server-side by
// the RLS policies on each table (see supabase/schema.sql), not by keeping
// this key secret.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Copy .env.example to .env and fill in VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
