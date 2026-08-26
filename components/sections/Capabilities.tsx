'use client';

import { CAPABILITIES } from '@/lib/content';
import { pad2 } from '@/lib/format';
import type { Capability } from '@/lib/types';
import { Eyebrow } from '@/components/Eyebrow';
import { useReveal } from '@/hooks/useReveal';

function CapabilityCard({ capability, num }: { capability: Capability; num: string }) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`cap ${revealClass}`.trim()} data-reveal>
      <div className="cap__top">
        <span className="cap__num">{num}</span>
        <span className="cap__dot" aria-hidden="true" />
      </div>
      <h3 className="cap__title">{capability.title}</h3>
      <p className="cap__body">{capability.body}</p>
    </div>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="shell">
      <Eyebrow num="03" text="Approach" />
      <h2 className="section-title">
        Where I’m <span className="serif">useful.</span>
      </h2>

      <div className="cap-grid">
        {CAPABILITIES.map((capability, i) => (
          <CapabilityCard key={capability.title} capability={capability} num={pad2(i)} />
        ))}
      </div>
    </section>
  );
}
