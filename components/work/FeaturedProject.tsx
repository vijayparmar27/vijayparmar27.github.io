'use client';

import Image from 'next/image';
import type { Project } from '@/lib/types';
import { metaLine } from '@/lib/format';
import { GlyphPanel } from './GlyphPanel';
import { openOnActivate } from './openOnActivate';

type Props = {
  project: Project;
  onOpen: (project: Project) => void;
};

/** The lead card of the work grid — the first project matching the active filter. */
export function FeaturedProject({ project, onOpen }: Props) {
  return (
    <article
      className="featured"
      data-spot="1"
      role="button"
      tabIndex={0}
      aria-label={`Open case study: ${project.title}`}
      {...openOnActivate(() => onOpen(project))}
    >
      {project.img ? (
        <div className="featured__media">
          <Image
            src={project.img.src}
            alt={project.img.alt}
            width={project.img.width}
            height={project.img.height}
            priority
          />
          <div className="featured__scrim" aria-hidden="true" />
        </div>
      ) : (
        <GlyphPanel project={project} variant="featured" />
      )}

      <div className="featured__body">
        <div className="featured__tags">
          <span className="pill-featured">Featured</span>
          <span className="featured__cat">{project.category}</span>
        </div>
        <h3 className="featured__title">{project.title}</h3>
        <p className="featured__blurb">{project.blurb}</p>

        {project.metric ? (
          <div className="featured__metric">
            <b>{project.metric}</b>
            <span>{project.metricLabel}</span>
          </div>
        ) : null}

        <div className="featured__foot">
          <span className="featured__meta">{metaLine(project)}</span>
          <span className="featured__more">Read case →</span>
        </div>
      </div>
    </article>
  );
}
