import { useEffect, useRef, useState } from 'react';

export function useMinLoading(isLoading, minDuration = 400) {
  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // loading started
    if (isLoading) {
      startTimeRef.current = Date.now();

      // async state update (safe)
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
      }, 0);
    } else {
      // loading ended
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(minDuration - elapsed, 0);

      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, remaining);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isLoading, minDuration]);

  return visible;
}
