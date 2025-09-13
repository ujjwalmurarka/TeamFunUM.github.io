export interface Game {
  id: number;
  title: string;
  description: string;
  duration: string;
  type: string;
  link: string;
  new?: boolean;
}

export type FilterType = {
  duration: string;
  category: string;
  search: string;
};