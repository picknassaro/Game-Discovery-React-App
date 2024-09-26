import useData from "./useData";

// useGames is basically just useData with the /games endpoint specified (oversimplification but good enough for a noob). But it also has to declare a type for the Game object that it will return. This type is used in the GameCard component to shape the props that it receives.
const useGames = () => useData<Game>("/games");

// The Game interface will be exported and used by the GameCard component.
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

// The Platform interface will be exported and used by the GameCard component as well.
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export default useGames;
