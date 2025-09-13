import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterType } from "@/types/game";

interface GameFiltersProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

export const GameFilters = ({ filters, onFiltersChange }: GameFiltersProps) => {
  const updateFilter = (key: keyof FilterType, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="filter-section">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-accent border-border focus:border-primary"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="filter-section">
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">
          Filters
        </Label>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="duration" className="text-sm font-medium text-foreground mb-2 block">
              Duration
            </Label>
            <Select value={filters.duration} onValueChange={(value) => updateFilter('duration', value)}>
              <SelectTrigger className="bg-accent border-border focus:border-primary">
                <SelectValue placeholder="All Durations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Durations</SelectItem>
                <SelectItem value="5 mins">5 minutes</SelectItem>
                <SelectItem value="10 mins">10 minutes</SelectItem>
                <SelectItem value="15 mins">15 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-medium text-foreground mb-2 block">
              Category
            </Label>
            <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
              <SelectTrigger className="bg-accent border-border focus:border-primary">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Collaborate">Collaborate</SelectItem>
                <SelectItem value="Compete">Compete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};