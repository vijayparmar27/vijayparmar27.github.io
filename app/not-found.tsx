import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/content';
import { Eyebrow } from '@/components/Eyebrow';

export const metadata: Metadata = {
  title: `Page not found — ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="shell notfound">
      <div className="notfound__glow" aria-hidden="true" />
      <Eyebrow num="404" text="Not found" />

      <h1 className="section-title">
        This page took a<br />
        <span className="serif">wrong turn.</span>
      </h1>

      <p className="notfound__lede">
        The link is broken, or the page moved. Everything worth seeing lives on the home page —
        the work, the timeline and the fastest way to reach me.
      </p>

      <div className="hero__actions">
        <Link className="btn btn--solid" href="/">
          Back to the start{' '}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </Link>
        <a className="btn btn--ghost" href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </div>
    </section>
  );
}
