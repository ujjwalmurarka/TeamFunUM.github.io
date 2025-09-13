-- Create games table
CREATE TABLE IF NOT EXISTS public.games (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    duration TEXT NOT NULL,
    type TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    link TEXT NOT NULL,
    new BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read games
CREATE POLICY "Anyone can view games" ON public.games
    FOR SELECT USING (true);

-- Create policy to allow anyone to insert games (you can restrict this later)
CREATE POLICY "Anyone can insert games" ON public.games
    FOR INSERT WITH CHECK (true);

-- Create policy to allow anyone to update games (you can restrict this later)
CREATE POLICY "Anyone can update games" ON public.games
    FOR UPDATE USING (true);

-- Insert the existing games data
INSERT INTO public.games (title, description, duration, type, upvotes, link) VALUES
('Connections', 'Find groups of four items that share something in common. A fun daily puzzle game from The New York Times.', '5 mins', 'Collaborate', 42, 'https://www.nytimes.com/games/connections'),
('Drawbattle', 'Real-time drawing battle where teams compete to create the best artwork based on prompts.', '15 mins', 'Compete', 47, 'https://drawbattle.io'),
('Drawsaurus', 'Online drawing and guessing game similar to Pictionary. One player draws while others guess.', '10 mins', 'Compete', 35, 'https://www.drawasaurus.org'),
('Guess my word', 'A word guessing game where you try to figure out the secret word through strategic guessing.', '10 mins', 'Collaborate', 25, 'https://hryanjones.com/guess-my-word/'),
('Mini Crossword', 'A bite-sized crossword puzzle that can be solved quickly. Perfect for team collaboration.', '5 mins', 'Collaborate', 38, 'https://www.nytimes.com/crosswords/game/mini'),
('Scattegories', 'Come up with words that fit specific categories and start with a given letter. Race against time!', '10 mins', 'Compete', 29, 'https://really.boring.website/lobby'),
('TimeGuessr', 'Look at historical photos and guess what year they were taken. Test your historical knowledge!', '15 mins', 'Collaborate', 31, 'https://timeguessr.com'),
('Wordle', 'Get 6 chances to guess a 5-letter word', '5 mins', 'Collaborate', 52, 'https://www.nytimes.com/games/wordle/index.html');