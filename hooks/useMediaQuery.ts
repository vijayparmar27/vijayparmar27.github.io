'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query. The server snapshot is always false so the
 * prerendered markup matches the first client render; the real value arrives
 * on the next commit.
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
