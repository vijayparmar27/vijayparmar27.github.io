import type { Project } from '@/lib/types';
import { chipsOf } from '@/lib/format';

type Props = {
  project: Project;
  /** Cards show four chips in a tighter panel; the featured slot shows the full stack. */
  variant: 'featured' | 'card';
};

/** Stand-in artwork for projects with no screenshot: wordmark plus tech chips. */
export function GlyphPanel({ project, variant }: Props) {
  const chips = variant === 'card' ? chipsOf(project) : project.stack;

  return (
    <div className={variant === 'card' ? 'card__glyph' : 'glyph-panel'}>
      <div className="glyph-panel__head">
        <span className="glyph-panel__dot" aria-hidden="true" />
        <span className="glyph-panel__label">{project.glyphLabel}</span>
      </div>
      <div>
        <div className="glyph-panel__rule" aria-hidden="true" />
        <div className="glyph-panel__glyph">{project.glyph}</div>
      </div>
      <div className="glyph-panel__chips">
        {chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>
    </div>
  );
}
