import { NAV_LINKS, SITE } from '@/lib/content';

/**
 * Sticky top bar. The nav is desktop-only — below 780px the floating
 * MobileTabBar takes over, so there is no menu to toggle here.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true">
            VP
          </span>
          <span className="brand__name">{SITE.name}</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="cta" href="#contact">
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
