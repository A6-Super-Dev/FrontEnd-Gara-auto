import { useEffect, useState } from 'react';
import { sampleTestApi } from '../../services/axiosConnection';
import { ErrorTypes } from '../../services/types';

export function useDataFetching(endPointFetch: Function) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined | object>(undefined);

  async function fetchData() {
    try {
      setLoading(!loading);
      const result = await endPointFetch();
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(!loading);
    }
  }
}
