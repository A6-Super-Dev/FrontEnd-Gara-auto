import { useEffect, useState } from 'react';

export function useDataFetch(fetch: boolean, endPointFetch: Function) {
  const [loading, setLoading] = useState(fetch);
  const [error, setError] = useState<string | undefined | object>(undefined);
  const [result, setResult] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (loading && endPointFetch) {
      const fetchData = async () => {
        try {
          const tmp = await endPointFetch();
          setResult(tmp);
        } catch (error: any) {
          console.log(error);
          setError(error.message);
        } finally {
          setLoading(!loading);
        }
      };
      fetchData();
    }
  }, [loading, endPointFetch]);

  return [loading, setLoading, error, result];
}
