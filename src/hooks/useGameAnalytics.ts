import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'

interface GameAnalytics {
  id: string
  game_id: number
  event_type: string
  user_id?: string
  ip_address?: string
  user_agent?: string
  created_at: string
}

export const useGameAnalytics = () => {
  const { user } = useAuth()

  const trackGameView = async (gameId: number) => {
    try {
      const { error } = await supabase
        .from('game_analytics')
        .insert([{
          game_id: gameId,
          event_type: 'view',
          user_id: user?.id || null,
          user_agent: navigator.userAgent
        }])

      if (error) {
        console.error('Error tracking game view:', error)
      }
    } catch (error) {
      console.error('Error tracking game view:', error)
    }
  }

  const trackGameClick = async (gameId: number) => {
    try {
      const { error } = await supabase
        .from('game_analytics')
        .insert([{
          game_id: gameId,
          event_type: 'click',
          user_id: user?.id || null,
          user_agent: navigator.userAgent
        }])

      if (error) {
        console.error('Error tracking game click:', error)
      }
    } catch (error) {
      console.error('Error tracking game click:', error)
    }
  }

  return {
    trackGameView,
    trackGameClick
  }
}