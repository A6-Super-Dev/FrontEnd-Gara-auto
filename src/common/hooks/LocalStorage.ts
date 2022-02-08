import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, value: string) => {
  const [localValue, setLocalValue] = useState(value);

  return [localValue, setLocalValue];
};
