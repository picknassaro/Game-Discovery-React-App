import apiClients from "../services/apiClients";
import { CanceledError } from "axios";
import { useState, useEffect } from "react";
interface FetchDataResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    setLoading(true);

    apiClients
      .get<FetchDataResponse<T>>(endpoint, { signal: abortController.signal })
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        if (error instanceof CanceledError) return;
        setError(error.message);
        setLoading(false);
      });

    return () => abortController.abort();
  }, [endpoint]);

  return { data, error, isLoading };
};

export default useData;
