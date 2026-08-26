import type { KeyboardEvent } from 'react';

/**
 * Click and keyboard handlers for the card elements, which carry role="button"
 * rather than being real buttons (site.css styles them as articles). Enter and
 * Space have to be wired by hand for those.
 */
export function openOnActivate(open: () => void) {
  return {
    onClick: open,
    onKeyDown: (ev: KeyboardEvent<HTMLElement>) => {
      if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') return;
      ev.preventDefault();
      open();
    },
  };
}
