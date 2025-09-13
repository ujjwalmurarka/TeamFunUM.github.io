import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Game } from '@/types/game'

export const useGames = () => {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
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
    refetch: fetchGames
  }
}