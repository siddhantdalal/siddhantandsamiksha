import { useCallback, useSyncExternalStore } from 'react';

// Live boolean for a CSS media query, so JS can follow the same breakpoints as the CSS
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}
