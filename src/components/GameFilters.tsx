import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterType } from "@/types/game";

interface GameFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  compact?: boolean;
}

export const GameFilters = ({ filters, onFiltersChange, compact = false }: GameFiltersProps) => {
  const updateFilter = (key: keyof FilterType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters Row */}
        <div className="flex gap-3">
          <Select value={filters.duration} onValueChange={(value) => updateFilter('duration', value)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Durations</SelectItem>
              <SelectItem value="5 mins">5 minutes</SelectItem>
              <SelectItem value="10 mins">10 minutes</SelectItem>
              <SelectItem value="15 mins">15 minutes</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Collaborate">Collaborate</SelectItem>
              <SelectItem value="Compete">Compete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search games..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Duration Filter */}
      <Select value={filters.duration} onValueChange={(value) => updateFilter('duration', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Durations</SelectItem>
          <SelectItem value="5 mins">5 minutes</SelectItem>
          <SelectItem value="10 mins">10 minutes</SelectItem>
          <SelectItem value="15 mins">15 minutes</SelectItem>
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Collaborate">Collaborate</SelectItem>
          <SelectItem value="Compete">Compete</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};