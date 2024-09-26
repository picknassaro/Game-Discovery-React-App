import useData from "./useData";

// useGenres is just useData with the /genres endpoint specified (oversimplification but good enough for a noob). But it also has to declare a type for the Genre object that it will return. This type is used in the GenreList component to shape the props that it receives.
const useGenres = () => useData<Genre>("/genres");

// The Genre interface will be exported and used by the GenreList component.
export interface Genre {
  id: number;
  name: string;
}

export default useGenres;
