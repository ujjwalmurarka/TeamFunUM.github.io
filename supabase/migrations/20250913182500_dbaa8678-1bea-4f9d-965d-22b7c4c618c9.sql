-- Fix the security definer view issue by creating a regular view instead
DROP VIEW IF EXISTS public.popular_games;

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