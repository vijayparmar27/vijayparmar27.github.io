import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/content';

/**
 * Sticky top bar. The nav is desktop-only — below 780px the floating
 * MobileTabBar takes over, so there is no menu to toggle here.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/#top">
          <span className="brand__mark" aria-hidden="true">
            VP
          </span>
          <span className="brand__name">{SITE.name}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="cta" href="/#contact">
            Hire me
          </Link>
        </nav>
      </div>
    </header>
  );
}
