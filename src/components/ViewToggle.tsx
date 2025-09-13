import { Button } from '@/components/ui/button'
import { Grid3X3, List } from 'lucide-react'

interface ViewToggleProps {
  view: 'grid' | 'list'
  onViewChange: (view: 'grid' | 'list') => void
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center border rounded-lg p-1 bg-muted/50">
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="h-8 px-2"
      >
        <Grid3X3 className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">Grid</span>
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="h-8 px-2"
      >
        <List className="w-4 h-4" />
        <span className="ml-1 hidden sm:inline">List</span>
      </Button>
    </div>
  )
}