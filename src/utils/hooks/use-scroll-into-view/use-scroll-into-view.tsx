import { useEffect, useRef } from 'react';

export const useScrollIntoView = ({ page }: { page: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prevPageRef = useRef(page);

  useEffect(() => {
    if (prevPageRef.current !== page) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
      prevPageRef.current = page;
    }
  }, [page]);

  return ref;
};
