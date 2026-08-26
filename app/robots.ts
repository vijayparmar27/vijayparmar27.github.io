import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

/* Required by `output: 'export'` — the route is generated at build time. */
export const dynamic = 'force-static';

/**
 * AI crawlers are named explicitly rather than left to the `*` rule. They are
 * already allowed by the wildcard; listing them states the intent plainly, and
 * some (Google-Extended, Applebot-Extended) are consulted as a separate opt-in
 * signal from ordinary search indexing.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'meta-externalagent',
  'CCBot',
  'cohere-ai',
  'DuckAssistBot',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: new URL('sitemap.xml', SITE.url).href,
    host: SITE.url,
  };
}
