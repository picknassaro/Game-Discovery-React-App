import useData from "./useData";

// useGames is basically just useData with the /games endpoint specified (oversimplification but good enough for a noob). But it also has to declare a type for the Game object that it will return. This type is used in the GameCard component to shape the props that it receives.

interface TopLevelQuery {
  queryType: string;
}

interface GamesQueryParams {
  [key: string]: unknown;
}

const useQueryController = <T>(
  { queryType }: TopLevelQuery,
  queryParams: GamesQueryParams = {}
) => {
  const queryString = Object.entries(queryParams)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const endpoint = queryString
    ? `/${queryType}?${queryString}`
    : `/${queryType}`;

  return useData<T>(endpoint);
};

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

// The Genre interface will be exported and used by the GenreList component.
export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export default useQueryController;
