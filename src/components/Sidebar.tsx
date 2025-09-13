import { Gamepad2 } from "lucide-react";
import { GameFilters } from "./GameFilters";
import { FilterType } from "@/types/game";

interface SidebarProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

export const Sidebar = ({ filters, onFiltersChange }: SidebarProps) => {
  return (
    <div className="w-80 min-h-screen bg-sidebar border-r border-sidebar-border p-6 sidebar-gradient">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
          <Gamepad2 className="w-6 h-6 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold text-sidebar-foreground">TeamPlay</h1>
      </div>

      {/* Filters */}
      <GameFilters filters={filters} onFiltersChange={onFiltersChange} />
    </div>
  );
};