'use client';

import { useMemo, useState } from 'react';
import { PROJECTS, PROJECT_FILTERS } from '@/lib/projects';
import { indexLabel } from '@/lib/format';
import type { Project, ProjectCategory } from '@/lib/types';
import { FeaturedProject } from '@/components/work/FeaturedProject';
import { ProjectCard } from '@/components/work/ProjectCard';
import { ProjectDrawer } from '@/components/work/ProjectDrawer';

type Filter = 'All' | ProjectCategory;

export function Work() {
  const [filter, setFilter] = useState<Filter>('All');
  const [openProject, setOpenProject] = useState<Project | null>(null);

  /* The first match becomes the featured slot; the remainder fill the grid. */
  const [featured, ...rest] = useMemo(
    () => PROJECTS.filter((p) => filter === 'All' || p.category === filter),
    [filter],
  );

  return (
    <section id="work" className="shell">
      <div className="work-head">
        <div>
          <div className="eyebrow">
            <span className="eyebrow__num">01</span>
            <span className="eyebrow__rule" aria-hidden="true" />
            <span className="eyebrow__text">Selected work</span>
          </div>
          <h2 className="section-title">
            Things I shipped
            <br />
            to <span className="serif">production.</span>
          </h2>
        </div>

        <div className="filters" role="group" aria-label="Filter projects by category">
          {PROJECT_FILTERS.map((name) => (
            <button
              key={name}
              type="button"
              className="filter"
              aria-pressed={filter === name}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {featured ? <FeaturedProject project={featured} onOpen={setOpenProject} /> : null}

      {featured ? null : <p className="work-empty">No projects in this category.</p>}

      <div className="project-grid">
        {rest.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={indexLabel(i + 1)}
            onOpen={setOpenProject}
          />
        ))}
      </div>

      <ProjectDrawer project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
