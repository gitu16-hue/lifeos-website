import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if environment variables are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Using mock data.')
    // Return a mock client for development
    return {
      from: () => ({
        select: () => Promise.resolve({ count: 5000, error: null }),
        insert: () => Promise.resolve({ data: null, error: null })
      }),
      channel: () => ({
        on: () => ({ subscribe: () => {} })
      })
    } as any
  }

  // Validate URL format
  try {
    new URL(supabaseUrl)
  } catch {
    throw new Error(`Invalid supabaseUrl: ${supabaseUrl}. Must be a valid HTTP or HTTPS URL.`)
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}