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
import { Loader2, LogOut, User, Sparkles, Gamepad2, Zap, Clock, Trophy, Star } from "lucide-react";

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, team";
  if (hour < 17) return "Good afternoon, team";
  return "Good evening, team";
};

const getTimeBasedTagline = () => {
  const hour = new Date().getHours();
  if (hour < 15) {
    return "Quick games to energize your scrum or standup";
  }
  return "Wind down with a quick team game before you wrap up";
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
          <div className="flex-1">
            {/* Landing Section with I'm Feeling Lucky */}
            <div className="min-h-screen flex flex-col relative overflow-hidden">

              {/* Header with Auth */}
              <div className="flex justify-end p-4 sm:p-6 relative z-10">
                {isAuthenticated && (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span className="truncate max-w-32">{user?.email}</span>
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
                      className="flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign Out</span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Main Landing Content */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto w-full">
                  {/* Animated Welcome Badge */}
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in border border-primary/20">
                    <Sparkles className="w-4 h-4" />
                    Perfect for office teams
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 lg:mb-8 text-foreground leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    {getTimeBasedGreeting()}
                    <span className="inline-block animate-bounce ml-2" style={{ animationDelay: '2s' }}>👋</span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light mb-3 sm:mb-4 lg:mb-6 px-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {getTimeBasedTagline()}
                  </p>
                  
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground/80 mb-8 sm:mb-12 lg:mb-16 px-4 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    Skip the "what should we play?" debate • Perfect for 2-15 minute breaks
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12 lg:mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 hover:scale-105 transition-transform">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">2-15 min games</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 hover:scale-105 transition-transform">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">Team building</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">Energy booster</span>
                    </div>
                  </div>
                  
                  {/* I'm Feeling Lucky CTA */}
                  <div className="mb-8 sm:mb-12 lg:mb-16 animate-fade-in" style={{ animationDelay: '1s' }}>
                    <RandomGamePicker games={games} filteredGames={filteredGames} />
                  </div>

                  {/* Search and Filters */}
                  <div className="max-w-2xl mx-auto px-2 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                    <GameFilters filters={filters} onFiltersChange={setFilters} />
                  </div>

                  {/* Scroll indicator */}
                  <div className="mt-12 sm:mt-16 lg:mt-20 text-muted-foreground/60 animate-fade-in" style={{ animationDelay: '1.4s' }}>
                    <p className="text-sm mb-2">Or browse all games below</p>
                    <div className="animate-bounce">↓</div>
                  </div>
                </div>
              </div>
            </div>


            {/* Analytics Dashboard for authenticated users */}
            <div className="px-4 sm:px-6 lg:px-8">
              <AnalyticsDashboard />
            </div>

            {/* All Games Section */}
            <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-16 bg-gradient-to-b from-background to-muted/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-8 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    🎯
                  </div>
                  All Team Games
                </h2>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm sm:text-base text-muted-foreground">
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
              
              {/* Admin Contact Section */}
              <div className="mt-16 pt-8 border-t border-border text-center">
                <p className="text-sm text-muted-foreground">
                  Got a game idea perfect for office teams? Contact your admin to add it to the collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Index;
