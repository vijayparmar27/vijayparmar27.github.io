'use client';

import { EDUCATION, STACK_GROUPS } from '@/lib/content';
import type { StackGroup } from '@/lib/types';
import { Eyebrow } from '@/components/Eyebrow';
import { useReveal } from '@/hooks/useReveal';

function Group({ group }: { group: StackGroup }) {
  const { ref, revealClass } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={`stack-group ${revealClass}`.trim()} data-reveal>
      <div className="stack-group__head">
        <span className="stack-group__tick" aria-hidden="true" />
        <h3 className="stack-group__name">{group.name}</h3>
      </div>
      <ul>
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function Stack() {
  return (
    <section id="stack" className="shell">
      <Eyebrow num="04" text="Stack" />
      <h2 className="section-title">
        Tools I <span className="serif">reach for.</span>
      </h2>

      <div className="stack-grid">
        {STACK_GROUPS.map((group) => (
          <Group key={group.name} group={group} />
        ))}
      </div>

      <div className="education">
        <div className="education__label">Education</div>
        <div>
          <h3 className="education__school">{EDUCATION.school}</h3>
          <div className="education__detail">{EDUCATION.detail}</div>
        </div>
      </div>
    </section>
  );
}
