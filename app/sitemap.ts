import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

/* Required by `output: 'export'` — the route is generated at build time. */
export const dynamic = 'force-static';

/** Emitted as /sitemap.xml at build time. Single-page site, so one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
