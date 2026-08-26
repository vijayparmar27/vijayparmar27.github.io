'use client';

import { JOBS } from '@/lib/content';
import { pad2 } from '@/lib/format';
import type { Job } from '@/lib/types';
import { Eyebrow } from '@/components/Eyebrow';
import { useReveal } from '@/hooks/useReveal';

function JobEntry({ job, num }: { job: Job; num: string }) {
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <article ref={ref} className={`job ${revealClass}`.trim()} data-reveal>
      <div className="job__num">{num}</div>
      <div>
        <div className="job__period">{job.period}</div>
        <div className="job__location">{job.location}</div>
        <div className="job__length">{job.length}</div>
      </div>
      <div>
        <h3 className="job__role">{job.role}</h3>
        <div className="job__company">{job.company}</div>
        <ul className="bullets">
          {job.bullets.map((bullet) => (
            <li key={bullet}>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="chips">
          {job.chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function Experience() {
  return (
    <section id="experience" className="shell">
      <Eyebrow num="02" text="Experience" />
      <h2 className="section-title">
        Five years, <span className="serif">three teams.</span>
      </h2>

      <div className="timeline">
        {JOBS.map((job, i) => (
          <JobEntry key={job.company} job={job} num={pad2(i)} />
        ))}
        <div className="timeline__end" aria-hidden="true" />
      </div>
    </section>
  );
}
