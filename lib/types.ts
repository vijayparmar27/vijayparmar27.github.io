export type ProjectCategory =
  | 'Real-time Games'
  | 'Platforms'
  | 'Mobile'
  | 'Experiments';

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  years: string;
  org: string;
  blurb: string;
  details: string[];
  stack: string[];
  links: ProjectLink[];
  /** Card/drawer artwork. Projects without a screenshot render a glyph panel instead. */
  img?: ProjectImage;
  glyph?: string;
  glyphLabel?: string;
  /** Overrides the first four stack entries on the glyph panel. */
  chips?: string[];
  metric?: string;
  metricLabel?: string;
};

export type Job = {
  period: string;
  location: string;
  length: string;
  role: string;
  company: string;
  bullets: string[];
  chips: string[];
};

export type Capability = {
  title: string;
  body: string;
};

export type StackGroup = {
  name: string;
  items: string[];
};

export type Metric = {
  value: string;
  label: string;
};
