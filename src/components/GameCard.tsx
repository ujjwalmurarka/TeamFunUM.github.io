import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Game } from "@/types/game";

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleGameClick = () => {
    if (game.link) {
      window.open(game.link, '_blank', 'noopener,noreferrer');
    }
  };

  const getThumbnailUrl = (url: string) => {
    // Using a reliable thumbnail service
    return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
  };

  return (
    <Card className="game-card group" onClick={handleGameClick}>
      {game.new && (
        <Badge className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground">
          New
        </Badge>
      )}
      
      <div className="relative h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 overflow-hidden">
        {!imageError && (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <img
              src={getThumbnailUrl(game.link)}
              alt={`${game.title} website thumbnail`}
              className="game-thumbnail"
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
              style={{ display: imageLoading ? 'none' : 'block' }}
            />
          </>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <ExternalLink className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Website Preview</p>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {game.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {game.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {game.duration}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {game.type}
            </Badge>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
};