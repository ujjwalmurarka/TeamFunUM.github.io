import { useState } from "react";

import { GameCard } from "@/components/GameCard";
import { RandomGamePicker } from "@/components/RandomGamePicker";
import { AdminGameForm } from "@/components/AdminGameForm";
import { GameFilters } from "@/components/GameFilters";
import { AuthForm } from "@/components/AuthForm";
import { useGames } from "@/hooks/useGames";
import { useGameFilters } from "@/hooks/useGameFilters";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Filter, LogOut, User } from "lucide-react";

const Index = () => {
  const { games, loading, error, refetch, isUsingDatabase } = useGames();
  const { filters, setFilters, filteredGames } = useGameFilters(games);
  const { user, loading: authLoading, signOut, isAuthenticated } = useAuth();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading games...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Error loading games</h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    
      <div className="flex min-h-screen w-full bg-background">

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header with Filters Toggle */}
          <div className="lg:hidden bg-background border-b p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Funtime</h1>
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <GameFilters filters={filters} onFiltersChange={setFilters} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Quick filters for mobile */}
            <div className="space-y-3">
              <GameFilters 
                filters={filters} 
                onFiltersChange={setFilters} 
                compact={true}
              />
            </div>
          </div>


          {/* Main Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 lg:mb-3">Discover Games</h1>
                  <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">Find the perfect game for your team building session</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 self-start">
                  {isAuthenticated && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {user?.email}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            await signOut()
                          } catch (error) {
                            console.error('Error signing out:', error)
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Button>
                    </>
                  )}
                  <AdminGameForm onGameAdded={refetch} />
                  <RandomGamePicker games={games} filteredGames={filteredGames} />
                </div>
              </div>
            </div>

            {/* Desktop Filters Top Bar - Sticky */}
            <div className="hidden lg:block sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border p-4 mb-6">
              <GameFilters filters={filters} onFiltersChange={setFilters} />
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
      </div>
    
  );
};

export default Index;
