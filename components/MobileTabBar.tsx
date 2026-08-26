'use client';

import { RAIL_LINKS } from '@/lib/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import {
  BriefcaseIcon,
  CompassIcon,
  GridIcon,
  LayersIcon,
  MailIcon,
} from '@/components/icons';

const TABS = [
  { id: 'work', label: 'Work', Icon: GridIcon },
  { id: 'experience', label: 'Experience', Icon: BriefcaseIcon },
  { id: 'capabilities', label: 'Approach', Icon: CompassIcon },
  { id: 'stack', label: 'Stack', Icon: LayersIcon },
  { id: 'contact', label: 'Contact', Icon: MailIcon },
] as const;

/* Observe every section, including the hero, so scrolling back to the top
   clears the highlight rather than leaving Work stuck on. */
const SECTION_IDS = RAIL_LINKS.map((link) => link.id);

/**
 * Floating bottom tab bar, shown below 780px in place of the header nav.
 * Highlights whichever section is in view, the same signal the desktop rail uses.
 */
export function MobileTabBar() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav className="tabbar" aria-label="Sections">
      <ul className="tabbar__list">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`tabbar__tab${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="tabbar__icon">
                  <Icon />
                </span>
                <span className="tabbar__label">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
