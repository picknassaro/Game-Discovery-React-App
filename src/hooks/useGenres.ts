import apiClients from "../services/apiClients";
import { CanceledError } from "axios";
import { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

interface FetchGenreResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);

    apiClients
      .get<FetchGenreResponse>("/genres", { signal: abortController.signal })
      .then((response) => {
        setGenres(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, []);

  return { genres, error, isLoading };
};

export default useGenres;
