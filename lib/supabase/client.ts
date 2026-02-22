import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("[v0] Supabase not configured - features requiring database will not work")
    // Return a minimal mock to prevent crashes
    return {
      auth: {
        signUp: async () => ({ data: null, error: new Error("Supabase not configured") }),
        signIn: async () => ({ data: null, error: new Error("Supabase not configured") }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: new Error("Supabase not configured") }),
        update: () => ({ data: null, error: new Error("Supabase not configured") }),
        delete: () => ({ data: null, error: new Error("Supabase not configured") }),
      }),
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
