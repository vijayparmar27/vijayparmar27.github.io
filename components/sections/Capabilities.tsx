import { CAPABILITIES } from '@/lib/content';
import { pad2 } from '@/lib/format';
import { Eyebrow } from '@/components/Eyebrow';
import { Reveal } from '@/components/Reveal';

export function Capabilities() {
  return (
    <section id="capabilities" className="shell">
      <Eyebrow num="03" text="Approach" />
      <h2 className="section-title">
        Where I’m <span className="serif">useful.</span>
      </h2>

      <div className="cap-grid">
        {CAPABILITIES.map((capability, i) => (
          <Reveal className="cap" key={capability.title}>
            <div className="cap__top">
              <span className="cap__num" aria-hidden="true">
                {pad2(i)}
              </span>
              <span className="cap__dot" aria-hidden="true" />
            </div>
            <h3 className="cap__title">{capability.title}</h3>
            <p className="cap__body">{capability.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
