import { useState, useMemo } from "react";
import { Game, FilterType } from "@/types/game";

export const useGameFilters = (games: Game[]) => {
  const [filters, setFilters] = useState<FilterType>({
    duration: "all",
    category: "all",
    search: ""
  });

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesDuration = filters.duration === 'all' || game.duration === filters.duration;
      const matchesCategory = filters.category === 'all' || game.type === filters.category;
      const matchesSearch = !filters.search || 
        game.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        game.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesDuration && matchesCategory && matchesSearch;
    });
  }, [games, filters]);

  return {
    filters,
    setFilters,
    filteredGames
  };
};