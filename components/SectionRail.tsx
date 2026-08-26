'use client';

import { RAIL_LINKS } from '@/lib/content';
import { useActiveSection } from '@/hooks/useActiveSection';

const SECTION_IDS = RAIL_LINKS.map((link) => link.id);

export function SectionRail() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav className="rail" aria-label="Section">
      {RAIL_LINKS.map((link) => {
        const isActive = link.id === active;
        return (
          <a
            key={link.id}
            href={`#${link.id}`}
            className={isActive ? 'is-active' : undefined}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className="rail__label">{link.label}</span>
            <span className="rail__tick" />
          </a>
        );
      })}
    </nav>
  );
}
