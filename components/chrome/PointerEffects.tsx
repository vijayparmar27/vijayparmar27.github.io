'use client';

import { useEffect } from 'react';
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Two pointer-driven effects, sharing one rAF-throttled mousemove listener:
 * a parallax tilt on the hero portrait ([data-tilt]) and a radial spotlight
 * that follows the cursor across project cards ([data-spot="1"]).
 *
 * Both write straight to element styles rather than React state — they run at
 * pointer rate and must never trigger a render.
 */
export function PointerEffects() {
  const finePointer = useFinePointer();
  const prefersReduced = usePrefersReducedMotion();
  const enabled = finePointer && !prefersReduced;

  useEffect(() => {
    if (!enabled) return;

    const tilt = document.querySelector<HTMLElement>('[data-tilt]');
    let mouseX = 0;
    let mouseY = 0;
    let rafPending = false;
    let currentSpotCard: HTMLElement | null = null;
    let activeSpotCard: HTMLElement | null = null;

    const update = () => {
      rafPending = false;

      if (tilt) {
        const t = tilt.getBoundingClientRect();
        const cx = t.left + t.width / 2;
        const cy = t.top + t.height / 2;
        const near =
          Math.abs(mouseX - cx) < t.width * 1.9 && Math.abs(mouseY - cy) < t.height * 1.4;

        if (near) {
          const ry = ((mouseX - cx) / t.width) * 7;
          const rx = ((cy - mouseY) / t.height) * 7;
          tilt.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        } else {
          tilt.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
        }
      }

      if (activeSpotCard && activeSpotCard !== currentSpotCard) {
        activeSpotCard.style.backgroundImage = '';
      }
      activeSpotCard = currentSpotCard;

      if (currentSpotCard) {
        const r = currentSpotCard.getBoundingClientRect();
        currentSpotCard.style.backgroundImage =
          `radial-gradient(420px circle at ${(mouseX - r.left).toFixed(1)}px ` +
          `${(mouseY - r.top).toFixed(1)}px, var(--accent-soft), transparent 62%)`;
      }
    };

    const onMouseMove = (ev: MouseEvent) => {
      mouseX = ev.clientX;
      mouseY = ev.clientY;
      const target = ev.target;
      currentSpotCard =
        target instanceof Element ? target.closest<HTMLElement>('[data-spot="1"]') : null;

      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(update);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (tilt) tilt.style.transform = '';
      if (activeSpotCard) activeSpotCard.style.backgroundImage = '';
    };
  }, [enabled]);

  return null;
}
