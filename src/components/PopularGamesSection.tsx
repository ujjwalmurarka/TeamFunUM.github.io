import { TrendingUp } from 'lucide-react'
import { usePopularGames } from '@/hooks/usePopularGames'
import { GameCard } from './GameCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

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
            {Array.from({ length: 5 }).map((_, i) => (
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

  const topGames = popularGames.slice(0, 5)

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top 5 Popular Games
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Most played games in the last 30 days
        </p>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {topGames.map((game, index) => (
              <CarouselItem key={game.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="relative">
                  <GameCard game={game} />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </CardContent>
    </Card>
  )
}