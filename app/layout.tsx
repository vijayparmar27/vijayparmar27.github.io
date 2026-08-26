import type { Metadata, Viewport } from "next";
import "@/styles/fonts.css";
import "@/styles/site.css";
import { SITE } from "@/lib/content";
import { profileSchema } from "@/lib/structuredData";
import { SiteHeader } from "@/components/SiteHeader";
import { SectionRail } from "@/components/SectionRail";
import { MobileTabBar } from "@/components/MobileTabBar";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { PointerEffects } from "@/components/chrome/PointerEffects";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: `${SITE.name} — Portfolio`,
  category: "technology",
  alternates: { canonical: "/" },
  keywords: [
    "Vijay Parmar",
    "Full Stack Developer",
    "Backend Developer",
    "Node.js developer",
    "TypeScript developer",
    "Socket.IO",
    "Redis",
    "real-time systems",
    "multiplayer game backend",
    "WebSocket engineer",
    "MongoDB",
    "PostgreSQL",
    "React",
    "Next.js",
    "hire backend developer India",
    "remote backend developer",
    "Gujarat",
    "Rajkot",
    "vijay",
    "vijayparmar",
    "vijayparmar27",
    "vijay parmar",
    "vijay_parmar_",
    "_vijay__parmar_",
    "vijayparmar_",
    "_vijayparmar",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    title: SITE.title,
    description: SITE.ogDescription,
    url: SITE.url,
    images: [{ url: "/assets/img/portrait.jpg", width: 800, height: 800 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.ogDescription,
    images: ["/assets/img/portrait.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema()) }}
        />

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
