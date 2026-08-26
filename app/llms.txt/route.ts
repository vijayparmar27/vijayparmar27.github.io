import { CAPABILITIES, EDUCATION, JOBS, SITE, STACK_GROUPS } from '@/lib/content';
import { PROJECTS } from '@/lib/projects';

/* Required by `output: 'export'` — generated once at build time. */
export const dynamic = 'force-static';

/**
 * /llms.txt — the llmstxt.org convention: one flat Markdown file giving a
 * language model the whole picture without it having to render the page or
 * guess at layout. Built from the same content modules the site renders, so it
 * cannot drift out of sync.
 */
function build() {
  const socials = SITE.socials.map((s) => `- ${s.label}: ${s.url}`).join('\n');

  const experience = JOBS.map((job) => {
    const bullets = job.bullets.map((b) => `- ${b}`).join('\n');
    return [
      `### ${job.role} — ${job.company}`,
      `Dates: ${job.period} (${job.length})`,
      `Location: ${job.location}`,
      '',
      bullets,
      '',
      `Stack: ${job.chips.join(', ')}`,
    ].join('\n');
  }).join('\n\n');

  const work = PROJECTS.map((project) => {
    const details = project.details.map((d) => `- ${d}`).join('\n');
    const links = project.links.map((l) => `- ${l.label}: ${l.url}`).join('\n');
    return [
      `### ${project.title}`,
      `Category: ${project.category} | Org: ${project.org} | Years: ${project.years}`,
      ...(project.metric ? [`Headline result: ${project.metric} — ${project.metricLabel}`] : []),
      '',
      project.blurb,
      '',
      details,
      '',
      `Stack: ${project.stack.join(', ')}`,
      ...(links ? ['', links] : []),
    ].join('\n');
  }).join('\n\n');

  const stack = STACK_GROUPS.map((g) => `- **${g.name}**: ${g.items.join(', ')}`).join('\n');
  const strengths = CAPABILITIES.map((c) => `### ${c.title}\n${c.body}`).join('\n\n');

  return `# ${SITE.name} — ${SITE.role}

> ${SITE.description}

**Currently available** for backend and full-stack roles, and for contract work on
real-time or high-throughput products. Based in ${SITE.location}. Open to remote.

Five years of production experience (since 2021), concentrated in real-time and
high-throughput backends: multiplayer game engines, live driver tracking and
freight operations. Primary languages TypeScript and JavaScript on Node.js;
also Python (FastAPI).

## Contact

- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Website: ${SITE.url}
- Résumé (PDF): ${new URL(SITE.resumeUrl, SITE.url).href}
${socials}

## At a glance

- 5 years building production backends since 2021
- 12 white-label game platforms deployed from one standardized engine
- 10,000+ concurrent trips held live at peak over Socket.IO
- 40% faster freight quote turnaround after a carrier-selection redesign
- Kubernetes CKAD certified

## Experience

${experience}

## Selected work

${work}

## Where I'm strongest

${strengths}

## Technical stack

${stack}

## Education

${EDUCATION.school}
${EDUCATION.detail}
`;
}

export function GET() {
  return new Response(build(), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
