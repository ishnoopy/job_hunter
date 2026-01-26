import { createBrowserClient } from '@supabase/ssr'

/**
 * Creates a Supabase client for client-side operations
 * @returns Supabase client instance
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createBrowserClient(supabaseUrl, supabaseKey)
}
