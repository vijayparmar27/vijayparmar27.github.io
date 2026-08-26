import { MARQUEE_ITEMS } from '@/lib/content';

/** The track is duplicated so the -50% translate keyframe loops seamlessly. */
function Group() {
  return (
    <div className="marquee__group">
      {MARQUEE_ITEMS.map((item) => (
        <span className="marquee__item" key={item}>
          <span>{item}</span>
          <span className="marquee__dot" />
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
