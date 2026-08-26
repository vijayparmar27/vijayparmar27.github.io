'use client';

import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS, SITE } from '@/lib/content';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  /* Below 780px the nav is an overlay panel — dismiss it on an outside click. */
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (ev: MouseEvent) => {
      const target = ev.target as Node;
      if (navRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('click', onPointerDown);
    return () => document.removeEventListener('click', onPointerDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true">
            VP
          </span>
          <span className="brand__name">{SITE.name}</span>
        </a>

        <button
          type="button"
          className="site-header__toggle"
          ref={toggleRef}
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label="Toggle menu"
          onClick={(ev) => {
            ev.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <span className="toggle-bar" />
          <span className="toggle-bar" />
          <span className="toggle-bar" />
        </button>

        <nav
          className={`site-nav${open ? ' is-open' : ''}`}
          id="primary-nav"
          ref={navRef}
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a className="cta" href="#contact" onClick={() => setOpen(false)}>
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
