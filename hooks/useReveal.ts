'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Adds `is-revealed` the first time the element scrolls into view, matching the
 * `[data-reveal]` transition in site.css. Stops observing after the first hit —
 * the reveal only ever plays once.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return { ref, revealClass: revealed ? 'is-revealed' : '' };
}
