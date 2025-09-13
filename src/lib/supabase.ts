import { createClient } from '@supabase/supabase-js'

// For Lovable's Supabase integration, these should be auto-configured
// If they're not available, we'll provide fallback handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create a conditional export to prevent runtime errors
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Helper to check if Supabase is available
export const isSupabaseConfigured = () => Boolean(supabaseUrl && supabaseKey)

export type Database = {
  public: {
    Tables: {
      games: {
        Row: {
          id: number
          title: string
          description: string
          duration: string
          type: string
          upvotes: number
          link: string
          new?: boolean
          created_at: string
        }
        Insert: {
          title: string
          description: string
          duration: string
          type: string
          upvotes?: number
          link: string
          new?: boolean
        }
        Update: {
          title?: string
          description?: string
          duration?: string
          type?: string
          upvotes?: number
          link?: string
          new?: boolean
        }
      }
    }
  }
}