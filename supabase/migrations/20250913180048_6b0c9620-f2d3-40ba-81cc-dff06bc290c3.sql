-- Update RLS policies to require authentication for INSERT and UPDATE operations
DROP POLICY IF EXISTS "Anyone can insert games" ON public.games;
DROP POLICY IF EXISTS "Anyone can update games" ON public.games;

-- Create new policies requiring authentication
CREATE POLICY "Authenticated users can insert games" 
ON public.games 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update games" 
ON public.games 
FOR UPDATE 
TO authenticated
USING (true);

-- Keep the public read access
-- The "Anyone can view games" policy already exists and should remain