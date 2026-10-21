import { useEffect, useState } from 'react';

// Which tone ('day', 'dusk' or 'night') of the page sits under the top or
// bottom edge of the screen. Fixed chrome uses it to match Siddhant's
// day-to-night page; the tone classes only take effect on his side.
export function usePageTone(edge) {
  const [tone, setTone] = useState(null);

  useEffect(() => {
    const bands = [...document.querySelectorAll('[data-tone]')];
    const under = new Set();
    // A thin strip along the chosen edge of the viewport
    const rootMargin = edge === 'top' ? '0px 0px -94% 0px' : '-94% 0px 0px 0px';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) under.add(entry.target);
        else under.delete(entry.target);
      });
      // Where two bands meet inside the strip, the later one is taking over
      const current = bands.findLast((band) => under.has(band));
      setTone(current ? current.dataset.tone : null);
    }, { rootMargin });

    bands.forEach((band) => observer.observe(band));
    return () => observer.disconnect();
  }, [edge]);

  return tone;
}

// The token classes for a tone; dusk is daylight with deeper gold
export function toneClass(tone) {
  if (tone === 'night') return 'tone-night';
  if (tone === 'dusk') return 'tone-day tone-dusk';
  return tone === 'day' ? 'tone-day' : '';
}
