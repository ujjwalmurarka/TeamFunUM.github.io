import { Sidebar } from "@/components/Sidebar";
import { GameCard } from "@/components/GameCard";
import { RandomGamePicker } from "@/components/RandomGamePicker";
import { games } from "@/data/games";
import { useGameFilters } from "@/hooks/useGameFilters";

const Index = () => {
  const { filters, setFilters, filteredGames } = useGameFilters(games);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-0 z-10">
        <Sidebar filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80 lg:pl-6 p-4 sm:p-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-3">Discover Games</h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Find the perfect game for your team building session</p>
            </div>
            <div className="flex-shrink-0 self-start">
              <RandomGamePicker games={games} filteredGames={filteredGames} />
            </div>
          </div>
        </div>

        {/* All Games */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4 lg:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">🎯 Games</h2>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found
            </div>
          </div>
          
          {filteredGames.length === 0 ? (
            <div className="text-center py-12 lg:py-16">
              <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">No games found</h3>
                <p className="text-sm lg:text-base text-muted-foreground">Try adjusting your search terms or filters to find what you're looking for.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
