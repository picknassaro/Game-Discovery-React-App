import { useState, useEffect } from "react";
import apiClients from "../services/apiClients";
import { CanceledError } from "axios";

export interface Game {
  id: number;
  name: string;
  background_image: string;
}

interface FetchGameResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    apiClients
      .get<FetchGameResponse>("/games", { signal: abortController.signal })
      .then((response) => setGames(response.data.results))
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
      });

    return () => abortController.abort();
  }, []);

  return { games, error };
};

export default useGames;
