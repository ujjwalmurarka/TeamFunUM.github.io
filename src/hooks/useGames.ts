import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Game } from '@/types/game'
import { games as staticGames } from '@/data/games'

export const useGames = () => {
  const [games, setGames] = useState<Game[]>(staticGames)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchGames = async () => {

    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('title', { ascending: true })

      if (error) throw error

      setGames(data || [])
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching games:', err)
      // Fallback to static games on error
      setGames(staticGames)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [])

  return {
    games,
    loading,
    error,
    refetch: fetchGames,
    isUsingDatabase: true
  }
}