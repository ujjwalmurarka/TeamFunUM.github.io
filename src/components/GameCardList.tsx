import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Clock, Users } from 'lucide-react'
import { Game } from '@/types/game'

interface GameCardListProps {
  game: Game
}

export const GameCardList = ({ game }: GameCardListProps) => {
  return (
    <div className="flex items-center p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground truncate">{game.title}</h3>
              {game.new && (
                <Badge variant="secondary" className="text-xs">
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {game.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {game.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {game.type}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className="text-xs">
              {game.type}
            </Badge>
            <Button size="sm" variant="outline" asChild>
              <a
                href={game.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden sm:inline">Play</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}