import { CAPABILITIES, EDUCATION, JOBS, SITE, STACK_GROUPS } from "./content";
import { PROJECTS } from "./projects";

const PERSON_ID = `${SITE.url}#person`;

/** Every technology named anywhere in the stack or the case studies, deduped. */
function allSkills() {
  return [
    ...new Set([
      ...STACK_GROUPS.flatMap((g) => g.items),
      ...PROJECTS.flatMap((p) => p.stack),
    ]),
  ];
}

/**
 * schema.org graph for the site.
 *
 * Modelled as a @graph of three node types so each fact hangs off the property
 * that actually accepts it:
 *
 *   ProfilePage  — the page, pointing at its subject (Google's documented
 *                  pattern for personal profiles)
 *   Person       — the entity: one Occupation describing the role, worksFor
 *                  OrganizationRoles carrying the dated history, and a Demand
 *                  stating that the person is open to work
 *   CreativeWork — one node per case study, authored by the Person
 *
 * Properties are kept to ones schema.org actually defines for their node type;
 * invalid ones are silently dropped by parsers, which is worse than absent
 * because it looks like the data is there.
 */
export function profileSchema() {
  const person = {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    givenName: "Vijay",
    familyName: "Parmar",
    jobTitle: SITE.role,
    description: SITE.description,
    disambiguatingDescription:
      "Backend-leaning full-stack developer specialising in real-time systems — Socket.IO, Redis and Node.js — with five years shipping multiplayer game engines, live tracking and logistics platforms to production.",
    email: `mailto:${SITE.email}`,
    telephone: SITE.phoneHref,
    url: SITE.url,
    image: new URL("assets/img/portrait.jpg", SITE.url).href,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rajkot",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    sameAs: SITE.socials.map((s) => s.url),
    knowsLanguage: ["English", "Hindi", "Gujarati"],
    knowsAbout: [
      ...allSkills(),
      ...CAPABILITIES.map((c) => c.title),
      "Real-time multiplayer game backends",
      "WebSocket architecture",
      "Distributed systems",
      "Low-latency systems",
      "vijay",
      "vijayparmar",
      "vijayparmar27",
      "vijay parmar",
      "vijay_parmar_",
      "_vijay__parmar_",
      "vijayparmar_",
      "_vijayparmar",
    ],

    /* One Occupation describing the role itself. Dates belong on worksFor. */
    hasOccupation: {
      "@type": "Occupation",
      name: SITE.role,
      occupationalCategory: "15-1252.00", // O*NET: Software Developers
      experienceRequirements: {
        "@type": "OccupationalExperienceRequirements",
        monthsOfExperience: 57,
      },
      skills: allSkills().join(", "),
      responsibilities: CAPABILITIES.map((c) => c.title).join(", "),
      occupationLocation: [
        { "@type": "City", name: "Rajkot" },
        { "@type": "Country", name: "India" },
      ],
    },

    /* Dated employment history — OrganizationRole is the node that takes dates. */
    worksFor: JOBS.map((job) => ({
      "@type": "OrganizationRole",
      roleName: job.role,
      startDate: job.startDate,
      ...(job.endDate ? { endDate: job.endDate } : {}),
      worksFor: {
        "@type": "Organization",
        name: job.company,
        address: { "@type": "PostalAddress", addressLocality: job.location },
      },
    })),

    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.school,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },

    /* The availability signal, stated as data rather than left in prose. */
    seeks: {
      "@type": "Demand",
      name: "Backend and full-stack engineering roles",
      description:
        "Open to backend and full-stack roles, and to contract work on real-time or high-throughput products. Remote, or Gujarat, India.",
      availability: "https://schema.org/InStock",
      eligibleCustomerType: "https://schema.org/Business",
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "AdministrativeArea", name: "Remote" },
      ],
    },
  };

  const works = PROJECTS.map((project) => ({
    "@type": "CreativeWork",
    "@id": `${SITE.url}#project-${project.id}`,
    name: project.title,
    abstract: project.blurb,
    description: project.details.join(" "),
    genre: project.category,
    keywords: project.stack.join(", "),
    author: { "@id": PERSON_ID },
    ...(project.org !== "Personal project"
      ? { sourceOrganization: { "@type": "Organization", name: project.org } }
      : {}),
    ...(project.links.length
      ? { sameAs: project.links.map((l) => l.url) }
      : {}),
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}#profile`,
        url: SITE.url,
        name: SITE.title,
        description: SITE.description,
        inLanguage: "en",
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: new URL("assets/img/portrait.jpg", SITE.url).href,
      },
      person,
      ...works,
    ],
  };
}
