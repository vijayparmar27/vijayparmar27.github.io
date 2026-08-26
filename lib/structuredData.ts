import { EDUCATION, JOBS, SITE } from "./content";

/**
 * schema.org Person graph. Lets search engines and recruiter tooling read the
 * role, employers and skills as data rather than inferring them from prose.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    telephone: SITE.phoneHref,
    url: SITE.url,
    image: new URL("assets/img/portrait.jpg", SITE.url).href,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: SITE.socials.map((social) => social.url),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.school,
    },
    worksFor: JOBS.map((job) => ({
      "@type": "Organization",
      name: job.company,
    })),
    knowsAbout: [
      "Node.js",
      "TypeScript",
      "Socket.IO",
      "Redis",
      "MongoDB",
      "PostgreSQL",
      "React.js",
      "Next.js",
      "Real-time systems",
      "Distributed systems",
      "AWS",
      "Docker",
      "Kubernetes",
      "vijay",
      "vijayparmar",
      "vijayparmar27",
      "vijay parmar",
      "vijay_parmar_",
      "_vijay__parmar_",
      "vijayparmar_",
      "_vijayparmar",
    ],
  };
}
