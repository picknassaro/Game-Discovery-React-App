import useData from "./useData";

interface QueryControllerParams {
  queryType: string;
  genres?: number;
  page_size?: number;
  parent_platforms?: number;
  ordering?: string;
  search?: string;
}

const useQueryController = <T>({
  queryType,
  genres,
  page_size,
  parent_platforms,
  ordering,
  search,
}: QueryControllerParams) => {
  let endpoint = `/${queryType}?`;

  if (genres) {
    endpoint += `genres=${genres}&`;
  }
  if (page_size) {
    endpoint += `page_size=${page_size}&`;
  }
  if (parent_platforms) {
    endpoint += `parent_platforms=${parent_platforms}&`;
  }
  if (ordering) {
    endpoint += `ordering=${ordering}&`;
  }
  if (search) {
    endpoint += `search=${search}&search_precise=true&`;
  }

  if (endpoint.endsWith("&")) {
    endpoint = endpoint.slice(0, -1);
  }
  return useData<T>(endpoint);
};

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

export default useQueryController;
