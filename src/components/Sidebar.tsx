import { Gamepad2 } from "lucide-react";
import { GameFilters } from "./GameFilters";
import { FilterType } from "@/types/game";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface SidebarProps {
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
}

export const Sidebar = ({ filters, onFiltersChange }: SidebarProps) => {
  return (
    <SidebarComponent className="w-80">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <Gamepad2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">Funtime</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-6 pt-0">
        <GameFilters filters={filters} onFiltersChange={onFiltersChange} />
      </SidebarContent>
    </SidebarComponent>
  );
};