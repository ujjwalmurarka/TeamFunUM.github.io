import { useState } from "react";
import { Shuffle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GameCard } from "./GameCard";
import { Game } from "@/types/game";

interface RandomGamePickerProps {
  games: Game[];
  filteredGames: Game[];
}

export const RandomGamePicker = ({ games, filteredGames }: RandomGamePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandomGame = () => {
    if (filteredGames.length === 0) return;
    
    setIsSpinning(true);
    
    // Add a fun spinning delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredGames.length);
      setSelectedGame(filteredGames[randomIndex]);
      setIsSpinning(false);
    }, 1000);
  };

  const handleOpenPicker = () => {
    setIsOpen(true);
    setSelectedGame(null);
  };

  const handleTryAgain = () => {
    setSelectedGame(null);
    pickRandomGame();
  };

  return (
    <>
      <Button
        onClick={handleOpenPicker}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-game hover:shadow-hover transition-all duration-300 text-lg px-8 py-6 rounded-xl border border-primary/20 hover:scale-105"
        size="lg"
      >
        <Shuffle className="w-6 h-6 mr-3 animate-pulse" />
        I'm Feeling Lucky ✨
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-primary" />
              Random Game Picker
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {!selectedGame ? (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center mb-4 ${isSpinning ? 'animate-spin' : ''}`}>
                    <Shuffle className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {isSpinning ? "Picking your perfect game..." : "Ready to discover something new?"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isSpinning 
                      ? "Hold tight while we find you an amazing game!" 
                      : `Choose from ${filteredGames.length} available games`
                    }
                  </p>
                </div>
                
                {!isSpinning && (
                  <Button 
                    onClick={pickRandomGame}
                    disabled={filteredGames.length === 0}
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    size="lg"
                  >
                    <Shuffle className="w-5 h-5 mr-2" />
                    Pick Random Game
                  </Button>
                )}
                
                {filteredGames.length === 0 && (
                  <p className="text-muted-foreground mt-4">
                    No games match your current filters. Try adjusting your search criteria.
                  </p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Your Random Pick!
                  </h3>
                  <p className="text-muted-foreground">Perfect for your next team session</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  <GameCard game={selectedGame} />
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={handleTryAgain}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Try Another
                  </Button>
                  <Button 
                    onClick={() => setIsOpen(false)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Let's Play This!
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};