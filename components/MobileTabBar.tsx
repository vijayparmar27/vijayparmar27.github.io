'use client';

import { RAIL_LINKS } from '@/lib/content';
import { useActiveSection } from '@/hooks/useActiveSection';
import {
  BriefcaseIcon,
  GridIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
} from '@/components/icons';

const TABS = [
  { id: 'top', label: 'Intro', Icon: HomeIcon },
  { id: 'work', label: 'Work', Icon: GridIcon },
  { id: 'experience', label: 'Experience', Icon: BriefcaseIcon },
  { id: 'stack', label: 'Stack', Icon: LayersIcon },
  { id: 'contact', label: 'Contact', Icon: MailIcon },
] as const;

/* Observe every section, including Approach, which has no tab of its own —
   scrolling through it should clear the highlight, not leave Experience on. */
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
