import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

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