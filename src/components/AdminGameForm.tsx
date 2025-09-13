import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Loader2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface GameFormData {
  title: string
  description: string
  duration: string
  type: string
  link: string
  
}

export const AdminGameForm = ({ onGameAdded }: { onGameAdded?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const [formData, setFormData] = useState<GameFormData>({
    title: '',
    description: '',
    duration: '5 mins',
    type: 'Collaborate',
    link: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('games')
        .insert([formData])

      if (error) throw error

      toast({
        title: "Success!",
        description: "Game added successfully.",
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        duration: '5 mins',
        type: 'Collaborate',
        link: ''
      })

      setIsOpen(false)
      onGameAdded?.()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add game.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof GameFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Game
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Game</DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Game Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter game title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the game"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration</Label>
                <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5 mins">5 mins</SelectItem>
                    <SelectItem value="10 mins">10 mins</SelectItem>
                    <SelectItem value="15 mins">15 mins</SelectItem>
                    <SelectItem value="20 mins">20 mins</SelectItem>
                    <SelectItem value="30 mins">30 mins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Game Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Collaborate">Collaborate</SelectItem>
                    <SelectItem value="Compete">Compete</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Puzzle">Puzzle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="link">Game Link</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="https://example.com"
                  required
                />
              </div>


              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Game...
                  </>
                ) : (
                  'Add Game'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}