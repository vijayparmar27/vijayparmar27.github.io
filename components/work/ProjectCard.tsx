'use client';

import Image from 'next/image';
import type { Project } from '@/lib/types';
import { metaLine } from '@/lib/format';
import { useReveal } from '@/hooks/useReveal';
import { GlyphPanel } from './GlyphPanel';
import { openOnActivate } from './openOnActivate';

type Props = {
  project: Project;
  /** Running number within the current filter, already formatted as /02. */
  index: string;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, index, onOpen }: Props) {
  const { ref, revealClass } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`card ${revealClass}`.trim()}
      data-reveal
      data-spot="1"
      role="button"
      tabIndex={0}
      aria-label={`Open case study: ${project.title}`}
      {...openOnActivate(() => onOpen(project))}
    >
      {project.img ? (
        <div className="card__media">
          <Image
            src={project.img.src}
            alt={project.img.alt}
            width={project.img.width}
            height={project.img.height}
            loading="lazy"
          />
        </div>
      ) : (
        <GlyphPanel project={project} variant="card" />
      )}

      <div className="card__body">
        <div className="card__top">
          <span className="card__cat">{project.category}</span>
          <span className="card__idx" aria-hidden="true">
            {index}
          </span>
        </div>
        <h3 className="card__title">{project.title}</h3>
        <p className="card__blurb">{project.blurb}</p>
        <div className="card__foot">
          <span className="card__meta">{metaLine(project)}</span>
          <span className="card__more">Open →</span>
        </div>
      </div>
    </article>
  );
}
