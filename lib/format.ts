import type { Project } from './types';

/** "Artoon Solutions  ·  2021 — 2024" — the org/years line under every card. */
export const metaLine = (project: Project) => `${project.org}  ·  ${project.years}`;

/** Glyph panels show at most four technologies; fall back to the head of the stack. */
export const chipsOf = (project: Project) => project.chips ?? project.stack.slice(0, 4);

/** Two-digit ordinal used for section, job and metric numbering: 01, 02, … */
export const pad2 = (i: number) => String(i + 1).padStart(2, '0');

/** Zero-padded running index shown in the card corner: /01, /02, … */
export const indexLabel = (i: number) => `/${pad2(i)}`;
