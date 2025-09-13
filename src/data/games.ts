import { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: 1,
    title: "Connections",
    description: "Find groups of four items that share something in common. A fun daily puzzle game from The New York Times.",
    duration: "5 mins",
    type: "Collaborate",
    upvotes: 42,
    link: "https://www.nytimes.com/games/connections"
  },
  {
    id: 2,
    title: "Drawbattle",
    description: "Real-time drawing battle where teams compete to create the best artwork based on prompts.",
    duration: "15 mins",
    type: "Compete",
    upvotes: 47,
    link: "https://drawbattle.io"
  },
  {
    id: 3,
    title: "Drawsaurus",
    description: "Online drawing and guessing game similar to Pictionary. One player draws while others guess.",
    duration: "10 mins",
    type: "Compete",
    upvotes: 35,
    link: "https://www.drawasaurus.org"
  },
  {
    id: 4,
    title: "Guess my word",
    description: "A word guessing game where you try to figure out the secret word through strategic guessing.",
    duration: "10 mins",
    type: "Collaborate",
    upvotes: 25,
    link: "https://hryanjones.com/guess-my-word/"
  },
  {
    id: 5,
    title: "Mini Crossword",
    description: "A bite-sized crossword puzzle that can be solved quickly. Perfect for team collaboration.",
    duration: "5 mins",
    type: "Collaborate",
    upvotes: 38,
    link: "https://www.nytimes.com/crosswords/game/mini"
  },
  {
    id: 6,
    title: "Scattegories",
    description: "Come up with words that fit specific categories and start with a given letter. Race against time!",
    duration: "10 mins",
    type: "Compete",
    upvotes: 29,
    link: "https://really.boring.website/lobby"
  },
  {
    id: 7,
    title: "TimeGuessr",
    description: "Look at historical photos and guess what year they were taken. Test your historical knowledge!",
    duration: "15 mins",
    type: "Collaborate",
    upvotes: 31,
    link: "https://timeguessr.com"
  },
  {
    id: 8,
    title: "Wordle",
    description: "Get 6 chances to guess a 5-letter word",
    duration: "5 mins",
    type: "Collaborate",
    upvotes: 52,
    link: "https://www.nytimes.com/games/wordle/index.html"
  }
];
