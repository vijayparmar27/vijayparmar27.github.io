import type { Metadata, Viewport } from 'next';
import '@/styles/fonts.css';
import '@/styles/site.css';
import { SITE } from '@/lib/content';
import { SiteHeader } from '@/components/SiteHeader';
import { SectionRail } from '@/components/SectionRail';
import { MobileTabBar } from '@/components/MobileTabBar';
import { ScrollProgress } from '@/components/chrome/ScrollProgress';
import { PointerEffects } from '@/components/chrome/PointerEffects';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.name }],
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    type: 'website',
    title: SITE.title,
    description: SITE.ogDescription,
    url: SITE.url,
    images: [{ url: '/assets/img/portrait.jpg', width: 800, height: 800 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.ogDescription,
    images: ['/assets/img/portrait.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: SITE.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" aria-hidden="true" />
        <ScrollProgress />
        <PointerEffects />

        <a className="sr-only" href="#work">
          Skip to work
        </a>

        <SiteHeader />
        <SectionRail />

        <main>{children}</main>

        <MobileTabBar />
      </body>
    </html>
  );
}
