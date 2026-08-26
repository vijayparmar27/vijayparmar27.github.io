'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '@/lib/types';
import { metaLine } from '@/lib/format';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

type Props = {
  project: Project | null;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button, [tabindex]:not([tabindex="-1"])';

/**
 * Slide-over case study. Modal: scroll-locked, focus-trapped, Escape closes.
 *
 * Rendered into <body> through a portal rather than in place. `section.shell`
 * sets `position: relative; z-index: 2`, creating a stacking context — inside
 * it the drawer's z-index 150 is scoped beneath that 2, so root-level fixed
 * chrome (the mobile tab bar, z-index 90) would paint over the open drawer.
 */
export function ProjectDrawer({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useBodyScrollLock(project !== null);

  /* Move focus into the drawer on open and hand it back to the opener on close. */
  useEffect(() => {
    if (!project) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    panelRef.current?.scrollTo(0, 0);

    return () => {
      if (opener?.isConnected) opener.focus();
    };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  /* Keep Tab cycling inside the panel while it is open. */
  const trapFocus = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key !== 'Tab' || !panelRef.current) return;

    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => el.offsetParent !== null);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  };

  if (!project) return null;

  return createPortal(
    <div
      className="drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onKeyDown={trapFocus}
      onClick={(ev) => {
        if (ev.target === ev.currentTarget) onClose();
      }}
    >
      <div className="drawer__panel" ref={panelRef}>
        <div className="drawer__bar">
          <span className="drawer__cat">{project.category}</span>
          <button
            type="button"
            className="drawer__close"
            ref={closeRef}
            aria-label="Close case study"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {project.img ? (
          <div className="drawer__media">
            <Image
              src={project.img.src}
              alt={project.img.alt}
              width={project.img.width}
              height={project.img.height}
            />
          </div>
        ) : null}

        <div className="drawer__body">
          <h2 className="drawer__title" id="drawer-title">
            {project.title}
          </h2>
          <div className="drawer__meta">{metaLine(project)}</div>

          {project.metric ? (
            <div className="drawer__metric">
              <b>{project.metric}</b>
              <span>{project.metricLabel}</span>
            </div>
          ) : null}

          <ul className="bullets">
            {project.details.map((detail) => (
              <li key={detail}>
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          <div className="drawer__label">Stack</div>
          <div className="drawer__stack">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          {project.links.length > 0 ? (
            <div className="drawer__links">
              {project.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                  <span>{link.label}</span>
                  <span>Visit ↗</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
