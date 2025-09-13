-- Create the games table
CREATE TABLE public.games (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  type TEXT NOT NULL,
  link TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  new BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access (since this is a public game directory)
CREATE POLICY "Anyone can view games" 
ON public.games 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert games" 
ON public.games 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update games" 
ON public.games 
FOR UPDATE 
USING (true);

-- Insert some sample games
INSERT INTO public.games (title, description, duration, type, link, upvotes, new) VALUES
('Icebreaker Bingo', 'A fun game to get to know your team better with personalized bingo cards.', '15 mins', 'Collaborate', 'https://example.com/icebreaker-bingo', 12, true),
('Two Truths and a Lie', 'Classic game where players share three statements about themselves.', '10 mins', 'Collaborate', 'https://example.com/two-truths', 8, false),
('Word Association', 'Fast-paced game where players say words related to the previous word.', '5 mins', 'Creative', 'https://example.com/word-association', 15, false),
('Team Trivia', 'Test your knowledge with fun trivia questions in teams.', '20 mins', 'Compete', 'https://example.com/team-trivia', 22, false),
('Drawing Challenge', 'Draw prompts and have others guess what you drew.', '15 mins', 'Creative', 'https://example.com/drawing-challenge', 18, true);