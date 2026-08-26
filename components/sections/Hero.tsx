import Image from 'next/image';
import { HERO_METRICS, SITE } from '@/lib/content';
import { pad2 } from '@/lib/format';

export function Hero() {
  return (
    <section id="top" className="shell hero">
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__grid">
        <div>
          <div className="status">
            <span className="status__dot" aria-hidden="true" />
            <span className="status__text">Available · Backend &amp; Full-Stack</span>
          </div>

          <h1 className="hero__title">
            I build the
            <br />
            real-time layer
            <br />
            <span className="serif">underneath</span> apps.
          </h1>

          <p className="hero__lede">
            Full Stack Developer, five years deep in Node.js, TypeScript, Socket.IO and Redis. I
            work on the systems where a dropped connection is not acceptable — multiplayer
            card-game engines, live driver tracking, freight operations at scale.
          </p>

          <div className="hero__actions">
            <a className="btn btn--solid" href="#work">
              Selected work{' '}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="btn btn--ghost" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="portrait">
          <div className="portrait__glow" aria-hidden="true" />
          <div className="portrait__tilt" data-tilt="1">
            <div className="portrait__frame" aria-hidden="true" />
            <span className="corner corner--tl" aria-hidden="true" />
            <span className="corner corner--tr" aria-hidden="true" />
            <span className="corner corner--bl" aria-hidden="true" />
            <span className="corner corner--br" aria-hidden="true" />

            <div className="portrait__card">
              <Image
                src="/assets/img/portrait.jpg"
                alt="Portrait of Vijay Parmar"
                width={800}
                height={800}
                priority
              />
              <div className="portrait__wash" aria-hidden="true" />
              <div className="portrait__fade" aria-hidden="true" />

              <div className="portrait__tags">
                <span className="tag">Full Stack Dev</span>
                <span className="tag tag--accent">2021 —</span>
              </div>

              <div className="portrait__meta">
                <div className="portrait__rule" aria-hidden="true" />
                <div className="portrait__row">
                  <div>
                    <div className="portrait__name">{SITE.name}</div>
                    <div className="portrait__pronoun">he / him</div>
                  </div>
                  <div className="portrait__place">
                    Gujarat
                    <br />
                    IN · Remote
                  </div>
                </div>
              </div>
            </div>

            <div className="badge-float">
              <span className="badge-float__num">12</span>
              <span className="badge-float__label">
                platforms
                <br />
                shipped
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics">
        {HERO_METRICS.map((metric, i) => (
          <div className="metric" key={metric.label}>
            <div className="metric__num">{pad2(i)}</div>
            <div className="metric__value">{metric.value}</div>
            <div className="metric__label">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="scroll-cue">
        <a href="#work">
          <span className="scroll-cue__word">Scroll</span>
          <span className="scroll-cue__arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
