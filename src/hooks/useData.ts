import apiClients from "../services/apiClients";
import { CanceledError } from "axios";
import { useState, useEffect } from "react";

// FetchDataResponse is a generic interface that represents the response of an API call. <T> is a generic type that represents the type of the data that the API returns.
interface FetchDataResponse<T> {
  count: number;
  // The results field contains an array of data of generic data type (T).
  results: T[];
}

// useData is a custom hook that fetches data from an API endpoint (provided by a specific hook such as useGames, useGenres, etc) and returns the data, error, and loading state.
const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Define an AbortController instance to cancel the API request when the component is unmounted.
    const abortController = new AbortController();

    // Set loading to true so we can activate the skeletons in the GameGrid component.
    setLoading(true);

    apiClients
      // The specific hook that is calling this generic hook will provide the endpoint to fetch data from.
      // FetchDataResponse<T> has to be used here to specify that the API response will contain an array of data of generic type (T) to be shaped by the above interface.
      .get<FetchDataResponse<T>>(endpoint, { signal: abortController.signal })
      .then((response) => {
        setData(response.data.results); //setData updates the data state (just reminding you how useState works).
        setLoading(false); // Set loading to false so we can kill the skeletons in the GameGrid component and replace them with the game cards.
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false); // Set loading to false so we can kill the skeletons in the GameGrid component and replace them with the error message.
      });

    // Cleanup function to cancel the API request when the component is unmounted.
    return () => abortController.abort();
    // The endpoint is a dependency of the useEffect hook. If the endpoint changes, the hook will refetch the data.
  }, [endpoint]);

  // Spit the following out to whichever specific hook called this generic hook.
  return { data, error, isLoading };
};

export default useData;
