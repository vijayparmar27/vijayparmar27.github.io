import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

/* Required by `output: 'export'` — the route is generated at build time. */
export const dynamic = 'force-static';

/** Emitted as /robots.txt at build time. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: new URL('sitemap.xml', SITE.url).href,
  };
}
