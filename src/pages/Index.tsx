import { useState } from "react";

import { GameCard } from "@/components/GameCard";
import { GameCardList } from "@/components/GameCardList";
import { RandomGamePicker } from "@/components/RandomGamePicker";

import { GameFilters } from "@/components/GameFilters";
import { AuthForm } from "@/components/AuthForm";

import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { ViewToggle } from "@/components/ViewToggle";
import { useGames } from "@/hooks/useGames";
import { useGameFilters } from "@/hooks/useGameFilters";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Loader2, LogOut, User } from "lucide-react";

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const getTimeBasedTagline = () => {
  const hour = new Date().getHours();
  if (hour < 15) {
    return "Play a game to start your day";
  }
  return "Play a game to wrap up your day";
};

const Index = () => {
  const { games, loading, error, refetch, isUsingDatabase } = useGames();
  const { filters, setFilters, filteredGames } = useGameFilters(games);
  const { user, loading: authLoading, signOut, isAuthenticated } = useAuth();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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


          {/* Main Content Area */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 sm:p-8 lg:p-12 mb-8 text-white">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 lg:mb-4">{getTimeBasedGreeting()}</h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 font-light">{getTimeBasedTagline()}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 self-start">
                  {isAuthenticated && (
                    <>
                      <div className="flex items-center gap-2 text-sm text-white/80">
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
                        className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Button>
                    </>
                  )}
                  
                  <RandomGamePicker games={games} filteredGames={filteredGames} />
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Filters */}
            <div className="block lg:hidden mb-6">
              <GameFilters filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Desktop Filters Top Bar - Sticky */}
            <div className="hidden lg:block sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border p-4 mb-6">
              <GameFilters filters={filters} onFiltersChange={setFilters} />
            </div>


            {/* Analytics Dashboard for authenticated users */}
            <AnalyticsDashboard />

            {/* All Games */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 lg:mb-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground">🎯 Games</h2>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} found
                  </div>
                  <ViewToggle view={viewMode} onViewChange={setViewMode} />
                </div>
              </div>
              
              {filteredGames.length === 0 ? (
                <div className="text-center py-12 lg:py-16">
                  <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                    <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-2">No games found</h3>
                    <p className="text-sm lg:text-base text-muted-foreground">Try adjusting your search terms or filters to find what you're looking for.</p>
                  </div>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredGames.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredGames.map(game => (
                    <GameCardList key={game.id} game={game} />
                  ))}
                </div>
              )}
            </div>
            
            {/* Admin Contact Section */}
            <div className="mt-12 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                Want to add a new game? Contact the admin team for submissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Index;
