import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Only create the client if credentials exist (prevents build-time errors)
export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('[Shemous] Supabase credentials not set. Returning mock client.')
    return {
      from: () => ({ select: () => Promise.resolve({ data: [], error: null }) }),
      channel: () => ({ on: () => ({ subscribe: () => ({}) }) }),
      removeChannel: () => {},
      storage: { from: () => ({ upload: () => Promise.resolve({ data: null, error: null }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) },
    } as any
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
