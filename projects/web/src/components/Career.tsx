import { useEffect, useRef, useState } from 'react';

const TIMELINE = [
  {
    id: 't1',
    period: '2022 — Present',
    role: 'Solution Architect & Business Development',
    roleAccent: '&',
    company: 'OneGlobe, LLC',
    description:
      'Driving innovation inside a federal IT firm. Leading AI platform development, internal tooling, and corporate products while owning solution architecture across multiple proposals.',
    highlights: ['Dozens of Solutions & Proposals', 'Cloud Architecture', 'Data Engineering', 'AI/RAG Platform'],
    active: true,
  },
  {
    id: 't1b',
    period: '2018 — 2021',
    role: 'Workstream Technical Lead & Full-Stack Developer',
    roleAccent: '&',
    company: 'FEMA GO — OneGlobe, LLC',
    description:
      'Seven years on a federal grants management platform. Grew into technical lead overseeing three agile development teams, and the primary SME and go-to voice on UI decisions across a system processing billions in federal funding.',
    highlights: ['UI Architecture', 'Workstream Technical Lead', 'Federal Grant Systems', 'AWS'],
    active: false,
  },
  {
    id: 't2',
    period: '2016 — 2018',
    role: 'Software Developer',
    company: 'American Student Assistance (SALT)',
    description:
      "Built features for SALT's financial aid platform helping students navigate loan repayment and financial literacy. First professional engineering role.",
    highlights: ['saltmoney.org', 'Frontend', 'Financial Tech'],
    active: false,
  },
];

const CAPABILITIES = [
  {
    id: 'c1',
    num: '01',
    title: 'System',
    titleAccent: 'Architecture',
    desc: 'Designing cloud-native systems that scale. From data pipelines to microservices to infrastructure — I spec it, build it, and keep it running.',
    tools: ['AWS', 'FedRAMP', 'FISMA', 'Terraform', 'CI/CD'],
  },
  {
    id: 'c2',
    num: '02',
    title: 'Product',
    titleAccent: 'Management',
    desc: 'Turning vague conversations into shipped software. I take what you need, translate it into requirements, and own the process all the way to launch.',
    tools: ['Agile', 'User Research', 'Roadmapping', 'Stakeholder Mgmt'],
  },
  {
    id: 'c3',
    num: '03',
    title: 'Full-Stack',
    titleAccent: 'Development',
    desc: 'Building the whole thing. React, Node, Python, databases, APIs — pixel-perfect frontends to solid backend services. I do design and writing too. I ship.',
    tools: ['React', 'TypeScript', 'Node', 'Python', 'PostgreSQL', 'Java', 'Go'],
  },
  {
    id: 'c4',
    num: '04',
    title: 'AI &',
    titleAccent: 'Innovation',
    desc: 'Building AI features, RAG pipelines, and ML-powered products that actually work. Making emerging tech useful in real applications, not just demos.',
    tools: ['Bedrock', 'RAG', 'MLOps', 'LLMs', 'On-device ML'],
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

export default function Career() {
  const { ref: tlHeaderRef, visible: tlHeaderVisible } = useInView(0.2);
  const { ref: capHeaderRef, visible: capHeaderVisible } = useInView(0.2);

  return (
    <>
      {/* ── Career Timeline ──────────────────────────────────────── */}
      <section id="career" className="career-section" aria-labelledby="career-heading">
        <div className="career-container">
          <div
            ref={tlHeaderRef}
            className={`section-header-row ${tlHeaderVisible ? 'visible' : ''}`}
          >
            <span className="section-label" id="career-heading">
              Career arc
            </span>
            <span className="section-num" aria-hidden="true">
              02
            </span>
          </div>

          <div className="timeline" role="list">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ────────────────────────────────────── */}
      <section id="capabilities" className="cap-section" aria-labelledby="cap-heading">
        <div className="cap-container">
          <div
            ref={capHeaderRef}
            className={`section-header-row ${capHeaderVisible ? 'visible' : ''}`}
          >
            <span className="section-label" id="cap-heading">
              What I do
            </span>
            <span className="section-num" aria-hidden="true">
              03
            </span>
          </div>

          <div className="cap-grid" role="list">
            {CAPABILITIES.map((cap, i) => (
              <CapCell key={cap.id} cap={cap} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ── Shared ── */
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
          font-weight: 400;
        }

        .section-num {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--ink);
          opacity: 0.2;
        }

        /* ── Timeline ── */
        .career-section {
          border-top: 1px solid rgba(26,26,26,0.08);
          background: var(--cream);
        }

        .career-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }

        .timeline {
          position: relative;
          padding-left: 2rem;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: rgba(192,57,43,0.15);
        }

        .tl-item {
          position: relative;
          padding-bottom: 3rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
        }

        .tl-item:last-child { padding-bottom: 0; }
        .tl-item.visible { opacity: 1; transform: translateY(0); }

        .tl-dot {
          position: absolute;
          left: -2rem;
          top: 6px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          border: 2px solid var(--cherry);
          background: var(--cream);
          z-index: 1;
        }

        .tl-dot.active { background: var(--cherry); }

        .tl-cherry { color: var(--cherry); }

        .tl-year {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--cherry);
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }

        .tl-role {
          font-family: var(--font-serif);
          font-size: clamp(22px, 3.5vw, 32px);
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: var(--ink);
        }

        .tl-company {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--ink);
          opacity: 0.85;
          margin-top: 2px;
        }

        .tl-desc {
          font-family: var(--font-mono);
          font-size: 11px;
          line-height: 1.8;
          color: var(--ink);
          opacity: 0.85;
          max-width: 500px;
          margin-top: 0.75rem;
          font-weight: 300;
        }

        .tl-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 0.75rem;
        }

        .tl-hl {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          background: rgba(192,57,43,0.06);
          border-radius: 100px;
          color: var(--cherry);
        }

        /* ── Capabilities ── */
        .cap-section {
          border-top: 1px solid rgba(26,26,26,0.08);
          background: var(--cream);
        }

        .cap-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }

        .cap-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(26,26,26,0.06);
          border-radius: 12px;
          overflow: hidden;
        }

        .cap-cell {
          background: var(--cream);
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.5s var(--ease-out),
            transform 0.5s var(--ease-out);
        }

        .cap-cell.visible { opacity: 1; transform: translateY(0); }

        .cap-num {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--cherry);
          letter-spacing: 0.08em;
        }

        .cap-title {
          font-family: var(--font-serif);
          font-size: clamp(22px, 3vw, 30px);
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: var(--ink);
        }

        .cap-title-accent { color: var(--cherry); }

        .cap-desc {
          font-family: var(--font-mono);
          font-size: 11px;
          line-height: 1.8;
          color: var(--ink);
          opacity: 0.85;
          font-weight: 300;
        }

        .cap-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: auto;
        }

        .cap-tool {
          font-family: var(--font-mono);
          font-size: 9px;
          padding: 3px 8px;
          border: 1px solid rgba(26,26,26,0.08);
          border-radius: 4px;
          color: var(--ink);
          opacity: 0.85;
          letter-spacing: 0.03em;
        }

        @media (max-width: 680px) {
          .cap-grid { grid-template-columns: 1fr; }
          .career-container,
          .cap-container { padding: 4rem 1.5rem; }
        }
      `}</style>
    </>
  );
}

function TimelineItem({ item, index }: { item: (typeof TIMELINE)[0]; index: number }) {
  const { ref, visible } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`tl-item ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      role="listitem"
    >
      <div className={`tl-dot ${item.active ? 'active' : ''}`} aria-hidden="true" />
      <div className="tl-year">{item.period}</div>
      <div className="tl-role">
        {item.role.includes(' & ') ? (
          <>
            {item.role.split(' & ')[0]}
            <span className="tl-cherry"> &amp; </span>
            {item.role.split(' & ')[1]}
          </>
        ) : (
          item.role
        )}
      </div>
      <div className="tl-company">{item.company}</div>
      <p className="tl-desc">{item.description}</p>
      <div className="tl-highlights" aria-label="Key projects">
        {item.highlights.map((h) => (
          <span key={h} className="tl-hl">
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}

function CapCell({ cap, index }: { cap: (typeof CAPABILITIES)[0]; index: number }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`cap-cell ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      role="listitem"
    >
      <div className="cap-num">{cap.num}</div>
      <div className="cap-title">
        {cap.title} <span className="cap-title-accent">{cap.titleAccent}</span>
      </div>
      <p className="cap-desc">{cap.desc}</p>
      <div className="cap-tools">
        {cap.tools.map((t) => (
          <span key={t} className="cap-tool">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
