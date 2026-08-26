import { SITE } from '@/lib/content';
import { Eyebrow } from '@/components/Eyebrow';

export function Contact() {
  return (
    <section id="contact" className="shell contact">
      <div className="contact__box">
        <div className="contact__glow" aria-hidden="true" />
        <div className="contact__inner">
          <Eyebrow num="05" text="Contact" />
          <h2 className="contact__title">
            Got a system that has to <span className="serif">stay up?</span>
          </h2>
          <p className="contact__lede">
            I’m open to backend and full-stack roles, and to contract work on real-time or
            high-throughput products. Fastest way to reach me is email.
          </p>

          <div className="contact__actions">
            <a className="btn btn--solid btn--lg" href={`mailto:${SITE.email}`}>
              {SITE.email}{' '}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a className="btn btn--ghost btn--lg" href={`tel:${SITE.phoneHref}`}>
              {SITE.phone}
            </a>
            <a
              className="btn btn--ghost btn--lg"
              href={SITE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé{' '}
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>

          <div className="socials">
            {SITE.socials.map((social) => (
              <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="colophon">
        <span>
          {SITE.name} · {SITE.role}
        </span>
        <span>{SITE.location}</span>
      </div>
    </section>
  );
}
