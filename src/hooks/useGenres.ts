import useData from "./useData";

const useGenres = () => useData<Genre>("/genres");

export interface Genre {
  id: number;
  name: string;
}

export default useGenres;
