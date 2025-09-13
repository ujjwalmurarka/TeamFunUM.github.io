import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Game } from '@/types/game'

interface PopularGame extends Game {
  view_count: number
  recent_views: number
}

export const usePopularGames = () => {
  const [popularGames, setPopularGames] = useState<PopularGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPopularGames = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('popular_games')
        .select('*')
        .limit(10)

      if (error) throw error

      setPopularGames(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPopularGames()
  }, [])

  return {
    popularGames,
    loading,
    error,
    refetch: fetchPopularGames
  }
}