import { TrendingUp } from 'lucide-react'
import { usePopularGames } from '@/hooks/usePopularGames'
import { GameCard } from './GameCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const PopularGamesSection = () => {
  const { popularGames, loading, error } = usePopularGames()

  if (loading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Popular Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return null
  }

  if (popularGames.length === 0) {
    return null
  }

  const topGames = popularGames.slice(0, 6)

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Popular Games
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Most played games in the last 30 days
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topGames.map((game, index) => (
            <div key={game.id} className="relative">
              <GameCard game={game} />
              {index < 3 && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}