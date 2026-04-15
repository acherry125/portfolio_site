import { useEffect, useRef, useState } from 'react';

const PROJECTS = [
  {
    id: 'the-city',
    type: 'Game',
    title: 'The City',
    desc: 'A text-adventure game set in a war-torn Boston City Hall. Built in React — a narrative experiment with branching storylines and original writing.',
    tech: 'React / Narrative Design',
    url: '/the-city',
  },
  {
    id: 'worship',
    type: 'Game',
    title: 'Worship',
    desc: 'A village-god simulator in Java. Play as a deity managing a civilization — resource allocation, belief systems, natural disasters. Built for fun.',
    tech: 'Java / Simulation',
    url: '/worship',
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function SideProjects() {
  const { ref: headRef, visible: headVisible } = useInView(0.2);

  return (
    <section id="side-projects" className="side-section" aria-labelledby="side-heading">
      <div className="side-container">
        <div ref={headRef} className={`section-header-row ${headVisible ? 'visible' : ''}`}>
          <span className="section-label" id="side-heading">
            Experiments &amp; side projects
          </span>
          <span className="section-num" aria-hidden="true">
            04
          </span>
        </div>

        <div className="exp-grid" role="list">
          {PROJECTS.map((p, i) => (
            <ExpCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .side-section {
          border-top: 1px solid rgba(26,26,26,0.08);
          background: var(--cream);
        }

        .side-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 2rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
        }

        .section-header-row.visible { opacity: 1; transform: translateY(0); }

        .section-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cherry);
        }

        .section-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--ink);
          opacity: 0.2;
        }

        /* ── Grid ── */
        .exp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(26,26,26,0.06);
          border-radius: 12px;
          overflow: hidden;
        }

        .exp-card {
          background: var(--cream);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          opacity: 0;
          transform: translateY(12px);
          /* background transition separate so hover works immediately */
          background-color: var(--cream);
          transition:
            opacity 0.5s var(--ease-out),
            transform 0.5s var(--ease-out),
            background-color 250ms var(--ease-out);
          cursor: default;
        }

        .exp-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .exp-card:hover {
          background-color: #F5EFE7;
        }

        .exp-card:active {
          background-color: #ede7df;
        }

        .exp-card-link {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex: 1;
          text-decoration: none;
          color: inherit;
        }

        .exp-type {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--cherry);
        }

        .exp-title {
          font-family: var(--font-serif);
          font-size: clamp(20px, 3vw, 26px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ink);
        }

        .exp-desc {
          font-family: var(--font-mono);
          font-size: 11px;
          line-height: 1.7;
          color: var(--ink);
          opacity: 0.85;
          font-weight: 300;
        }

        .exp-tech {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--ink);
          opacity: 0.85;
          letter-spacing: 0.03em;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        @media (max-width: 680px) {
          .exp-grid { grid-template-columns: 1fr; }
          .side-container { padding: 4rem 1.5rem; }
        }
      `}</style>
    </section>
  );
}

function ExpCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const { ref, visible } = useInView(0.1);

  const inner = (
    <>
      <div className="exp-type">{project.type}</div>
      <div className="exp-title">{project.title}</div>
      <p className="exp-desc">{project.desc}</p>
      <div className="exp-tech">{project.tech}</div>
    </>
  );

  return (
    <div
      ref={ref}
      className={`exp-card ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
      role="listitem"
    >
      {project.url ? (
        <a href={project.url} className="exp-card-link" aria-label={project.title}>
          {inner}
        </a>
      ) : (
        inner
      )}
    </div>
  );
}
