import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Eye, Mouse } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'

interface AnalyticsData {
  totalViews: number
  totalClicks: number
  popularGames: Array<{
    title: string
    view_count: number
    recent_views: number
  }>
}

export const AnalyticsDashboard = () => {
  const { isAuthenticated } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics()
    }
  }, [isAuthenticated])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Get total views and clicks
      const { data: viewData } = await supabase
        .from('game_analytics')
        .select('*', { count: 'exact' })
        .eq('event_type', 'view')

      const { data: clickData } = await supabase
        .from('game_analytics')
        .select('*', { count: 'exact' })
        .eq('event_type', 'click')

      // Get popular games
      const { data: popularData } = await supabase
        .from('popular_games')
        .select('title, view_count, recent_views')
        .gt('view_count', 0)
        .limit(5)

      setAnalytics({
        totalViews: viewData?.length || 0,
        totalClicks: clickData?.length || 0,
        popularGames: popularData || []
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Analytics Dashboard
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Game interaction statistics and popular content
        </p>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground mt-2">Loading analytics...</p>
          </div>
        ) : analytics ? (
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Views</p>
                      <p className="text-2xl font-bold">{analytics.totalViews}</p>
                    </div>
                    <Eye className="w-8 h-8 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Clicks</p>
                      <p className="text-2xl font-bold">{analytics.totalClicks}</p>
                    </div>
                    <Mouse className="w-8 h-8 text-primary opacity-60" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Games */}
            {analytics.popularGames.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Games by Views
                </h3>
                <div className="space-y-3">
                  {analytics.popularGames.map((game, index) => (
                    <div key={game.title} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium">{game.title}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{game.view_count} total</div>
                        <div className="text-xs text-muted-foreground">{game.recent_views} recent</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}