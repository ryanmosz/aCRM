import { createBrowserClient, createServerClient } from '@supabase/ssr'

export const createSupabaseClient = () => {
  return createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  )
}

// For server-side operations (if needed)
export const createSupabaseServerClient = (cookies) => {
  return createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    { cookies }
  )
} 