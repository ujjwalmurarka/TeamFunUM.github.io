import { Sidebar } from "@/components/Sidebar";
import { GameCard } from "@/components/GameCard";
import { RandomGamePicker } from "@/components/RandomGamePicker";
import { games } from "@/data/games";
import { useGameFilters } from "@/hooks/useGameFilters";

const Index = () => {
  const { filters, setFilters, filteredGames } = useGameFilters(games);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar filters={filters} onFiltersChange={setFilters} />

      {/* Main Content */}
      <div className="flex-1 ml-80 p-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Discover Games</h1>
              <p className="text-lg text-muted-foreground">Find the perfect game for your team building session</p>
            </div>
            <RandomGamePicker games={games} filteredGames={filteredGames} />
          </div>
        </div>

        {/* All Games */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">🎯 All Games</h2>
            <div className="text-sm text-muted-foreground">
              {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found
            </div>
          </div>
          
          {filteredGames.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-card border border-border rounded-xl p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">No games found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters to find what you're looking for.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
