import useData from "./useData";

interface QueryControllerParams {
  queryType: string;
  genres?: number;
  page_size?: number;
  parent_platforms?: number;
}

const useQueryController = <T>({
  queryType,
  genres,
  page_size,
  parent_platforms,
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
