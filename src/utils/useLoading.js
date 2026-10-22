import { useEffect, useState } from 'react';

export function useLoading(ms = 700) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return loading;
}

export const SKELETONS = Array.from({ length: 8 }, (_, i) => ({ id: `sk-${i}`, skeleton: true }));
