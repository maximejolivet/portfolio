import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export const useSupabase = (): SupabaseClient => {
  if (!client) {
    const config = useRuntimeConfig()
    client = createClient(config.public.supabaseUrl, config.public.supabaseKey)
  }

  return client
}
