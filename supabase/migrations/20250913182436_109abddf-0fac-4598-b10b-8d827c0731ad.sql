-- Create game analytics table to track interactions
CREATE TABLE public.game_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id BIGINT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL DEFAULT 'view',
  user_id UUID,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.game_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics tracking
CREATE POLICY "Anyone can insert analytics events" 
ON public.game_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Only authenticated users can view analytics" 
ON public.game_analytics 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Create index for better performance on queries
CREATE INDEX idx_game_analytics_game_id_created_at ON public.game_analytics(game_id, created_at DESC);
CREATE INDEX idx_game_analytics_event_type ON public.game_analytics(event_type);

-- Create a view for popular games based on views in the last 30 days
CREATE OR REPLACE VIEW public.popular_games AS
SELECT 
  g.*,
  COALESCE(analytics.view_count, 0) as view_count,
  COALESCE(analytics.recent_views, 0) as recent_views
FROM public.games g
LEFT JOIN (
  SELECT 
    game_id,
    COUNT(*) as view_count,
    COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as recent_views
  FROM public.game_analytics 
  WHERE event_type = 'view'
  GROUP BY game_id
) analytics ON g.id = analytics.game_id
ORDER BY recent_views DESC, view_count DESC;