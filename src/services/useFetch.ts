import { useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};
