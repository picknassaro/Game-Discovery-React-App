import { useState, useEffect } from "react";
import apiClients from "../services/apiClients";
import { CanceledError } from "axios";

// Define the shape of the Game object. Basically, "shape" means what information are we receiving from our data. In this case, we're hitting an API to get a list of games. The API returns objects like the game's name, a background image for the game, etc. Some returned objects contain more objects. In the case of parent_platforms, it's an array of objects, each containing a platform object. Each platform object therein contains an id, name, slug, and more. Making an interface allows us to pass this obtained data into a component's render area. Exporting an interface lets us use it in other files, as long as we import this file in those other files.
//Also, as far as I know, imports don't carry through imports. Imagine you have three files: A, B, and C. A imports B, and B imports C. A can't access C's exports. Only B can access C's exports. A can only access B's exports. This is why we need to import this file in other files to use the Game interface.
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[]; // An array of objects, each object being an object shaped by the Platform interface below.
  metacritic: number;
}
// In the case of games from rawg.io, parent_platforms doesn't mean Xbox One or PlayStation 4, it means Xbox, PlayStation, Nintendo, PC, etc. Not specific consoles or OSes. We're obtaining parent platforms, because listing every single console and OS these games are supported on would clutter the UI. In this case, that's just a personal choice.
export interface Platform {
  id: number;
  name: string;
  slug: string;
}

// Define the shape of the response we get from the API. We're getting an object with a count and an array of objects. The count is the number of games we're getting, and the array of objects is the list of games we're getting. We're using the Game interface above to define the shape of the objects in the results array.
interface FetchGameResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  // the games variable will be an array, and it can only be an array of objects defined by the Game interface, which is itself an array. Typescript requires that these things be explicitly declared.
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    apiClients
      .get<FetchGameResponse>("/games", { signal: abortController.signal }) // We're hitting the /games endpoint of the API defined in apiClients.ts. We're passing the signal property to the get method, which is an object that contains an AbortController's signal property. This signal property is used to cancel the request if the component is unmounted before the request is completed.
      .then((response) => setGames(response.data.results)) // Tap into useState() to set the games variable to the results array of the response object. The response object is the object we get from the API.
      .catch((error) => {
        if (error instanceof CanceledError) return; // Do nothing if the error is an instance of CanceledError. This is a custom error thrown by axios when the request is canceled. This is a way to prevent the component from updating the state if the component is unmounted before the request is completed.
        setError(error.message); // If the error is not an instance of CanceledError, set the error variable to the error message.
      });

    return () => abortController.abort(); // Return a function that aborts the request when the component is unmounted. This is a cleanup function that runs when the component is unmounted.
  }, []);

  return { games, error }; // Return an object with the games and error variables. This object is what the component that uses this hook will receive.
};

export default useGames;
