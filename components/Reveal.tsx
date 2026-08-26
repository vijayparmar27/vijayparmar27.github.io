'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';

type Props = {
  /** `article` where the content is a standalone entry, `div` otherwise. */
  as?: 'div' | 'article';
  className?: string;
  children: ReactNode;
};

/**
 * Fades its contents in on first scroll into view.
 *
 * Deliberately thin: it is the only client component in the chain, so the
 * sections that use it stay server-rendered and their markup never ships as
 * JavaScript. `children` arrives already rendered from the server.
 */
export function Reveal({ as = 'div', className, children }: Props) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();
  const props = {
    ref,
    className: className ? `${className} ${revealClass}`.trim() : revealClass,
    'data-reveal': true,
    children,
  };

  return as === 'article' ? <article {...props} /> : <div {...props} />;
}
