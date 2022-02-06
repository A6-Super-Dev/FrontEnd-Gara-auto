import { useEffect, useRef, useState } from 'react';

export function useDataFetch(fetch: boolean, endPointFetch: Function) {
  const [loading, setLoading] = useState(fetch);
  const [error, setError] = useState<string | undefined | object>(undefined);
  const [result, setResult] = useState<any | undefined>(undefined);
  const fetchData = useRef(() => {});
  // fix eslint React Hook useEffect has a missing dependency: 'endPointFetch'. Either
  // include it or remove the dependency array. If 'endPointFetch' changes too
  // often, find the parent component that defines it and wrap that definition in useCallback

  fetchData.current = async () => {
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

  useEffect(() => {
    if (loading) {
      fetchData.current();
    }
  }, [loading]);

  return [loading, setLoading, error, result];
}
