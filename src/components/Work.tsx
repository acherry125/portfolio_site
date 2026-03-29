import { useEffect, useRef, useState } from 'react';

// ─── Mock browser visuals ────────────────────────────────────────────────────

function MockFemaGO() {
  return (
    <div className="mock-browser">
      <div className="mock-bar">
        <span className="mock-dot red" />
        <span className="mock-dot yellow" />
        <span className="mock-dot green" />
        <span className="mock-url">go.fema.gov</span>
      </div>
      <div className="mock-content mock-fema">
        {/* App header */}
        <div className="fema-header">
          <div className="fema-header-brand">
            <div className="fema-wordmark">FEMA</div>
            <div className="fema-go-badge">GO</div>
          </div>
          <div className="fema-header-right">
            <div className="fema-user-dot" />
            <div className="fema-user-label">State Admin</div>
          </div>
        </div>
        {/* App body: sidebar + main */}
        <div className="fema-body">
          <div className="fema-sidebar">
            <div className="fema-nav-item active">Dashboard</div>
            <div className="fema-nav-item">Applications</div>
            <div className="fema-nav-item">Awards</div>
            <div className="fema-nav-item">Reports</div>
            <div className="fema-nav-item">Payments</div>
          </div>
          <div className="fema-main">
            <div className="fema-main-title">Grant Dashboard</div>
            <div className="fema-stat-row">
              <div className="fema-stat">
                <div className="fema-stat-val">12</div>
                <div className="fema-stat-lbl">Active</div>
              </div>
              <div className="fema-stat">
                <div className="fema-stat-val fema-orange">4</div>
                <div className="fema-stat-lbl">Pending</div>
              </div>
              <div className="fema-stat">
                <div className="fema-stat-val fema-green">31</div>
                <div className="fema-stat-lbl">Closed</div>
              </div>
            </div>
            <div className="fema-table-head">
              <span>Grant Name</span>
              <span>Status</span>
              <span>Amount</span>
            </div>
            <div className="fema-table-row">
              <span>BRIC 2023</span>
              <span className="fema-badge active">Active</span>
              <span>$4.2M</span>
            </div>
            <div className="fema-table-row">
              <span>HMGP DR-4776</span>
              <span className="fema-badge pending">Pending</span>
              <span>$1.8M</span>
            </div>
            <div className="fema-table-row faint">
              <span>PDM 2022</span>
              <span className="fema-badge closed">Closed</span>
              <span>$900K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockOneGlobe() {
  return (
    <div className="mock-browser">
      <div className="mock-bar">
        <span className="mock-dot red" />
        <span className="mock-dot yellow" />
        <span className="mock-dot green" />
        <span className="mock-url">oneglobeit.com</span>
      </div>
      <div className="mock-content mock-og">
        {/* Nav */}
        <div className="og-nav">
          <div className="og-logo-wrap">
            <div className="og-logo-mark" />
            <span className="og-logo">OneGlobe</span>
          </div>
          <div className="og-links">
            <span>Capabilities</span>
            <span>Customers</span>
            <span>Careers</span>
            <span className="og-btn">Contact</span>
          </div>
        </div>
        {/* Hero */}
        <div className="og-hero">
          <div className="og-eyebrow">Federal IT Services</div>
          <div className="og-hero-text">
            Strategy.
            <br />
            Technology.
            <br />
            Execution.
          </div>
          <div className="og-hero-sub">
            Forward-thinking software for a forward-thinking government.
          </div>
        </div>
        {/* Capabilities */}
        <div className="og-caps-section">
          <div className="og-caps-label">What we do</div>
          <div className="og-caps">
            <div className="og-cap">
              <div className="og-cap-icon" />
              Agile DevSecOps
            </div>
            <div className="og-cap">
              <div className="og-cap-icon" />
              Customer Experience
            </div>
            <div className="og-cap">
              <div className="og-cap-icon" />
              Cloud Services
            </div>
            <div className="og-cap">
              <div className="og-cap-icon" />
              Artificial Intelligence
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface WorkProject {
  id: string;
  title: string;
  titleAccent?: string;
  period: string;
  tags: string[];
  description: string;
  impact?: { num: string; label: string }[];
  url?: string;
  urlLabel?: string;
  visual: React.ReactNode;
  flip?: boolean;
}

const PROJECTS: WorkProject[] = [
  {
    id: 'fema-go',
    title: 'FEMA',
    titleAccent: 'GO',
    period: '2020 — 2024',
    tags: ['Architecture', 'Full-stack dev', 'Product', 'AWS', 'FedRAMP High'],
    description:
      'Federal grants management platform serving every state, tribal, and territorial government in the U.S. I developed core modules of the system that processes billions in disaster and preparedness grant funding.',
    impact: [
      { num: '$3B+', label: 'Grants processed' },
      { num: '50', label: 'States served' },
    ],
    url: 'https://go.fema.gov',
    urlLabel: 'Visit go.fema.gov',
    visual: <MockFemaGO />,
    flip: false,
  },
  {
    id: 'oneglobeit',
    title: 'OneGlobe',
    titleAccent: 'corporate website',
    period: '2020 — 2022',
    tags: ['Design', 'Development', 'Branding', 'CMS'],
    description:
      "Lead the design and development of my employer's corporate website for a federal IT services company. The site communicates technical depth while remaining approachable to government buyers and prospective employees.",
    url: 'https://oneglobeit.com',
    urlLabel: 'Visit oneglobeit.com',
    visual: <MockOneGlobe />,
    flip: true,
  },
];

// ─── Card ────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: WorkProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`project-card ${project.flip ? 'flip' : ''} ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="project-meta">
        <div>
          <div className="project-title">
            {project.title}{' '}
            <span className={project.flip ? 'title-ghost' : 'title-cherry'}>
              {project.titleAccent}
            </span>
          </div>
          <p className="project-desc">{project.description}</p>
        </div>

        {project.impact && (
          <div className="impact-row">
            {project.impact.map((stat) => (
              <div key={stat.label} className="impact-stat">
                <div className="impact-num">{stat.num}</div>
                <div className="impact-label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="project-tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        {project.url && (
          <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer">
            {project.urlLabel}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        )}
      </div>

      <div className="project-visual">{project.visual}</div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Work() {
  const headRef = useRef<HTMLDivElement>(null);
  const [headVisible, setHeadVisible] = useState(false);

  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeadVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="work" className="work-section" aria-labelledby="work-heading">
      <div className="work-container">
        <div ref={headRef} className={`section-header-row ${headVisible ? 'visible' : ''}`}>
          <span className="section-label">Selected work</span>
          <span className="section-num" aria-hidden="true">
            01
          </span>
        </div>

        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <style>{`
        .work-section {
          width: 100%;
          background: var(--cream);
          padding: 0 0 80px;
          border-top: 1px solid rgba(26,26,26,0.08);
        }

        .work-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 1rem;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
        }

        .section-header-row.visible {
          opacity: 1;
          transform: translateY(0);
        }

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

        /* ─ Card ─ */
        .project-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          padding: 4rem 0;
          border-bottom: 1px solid rgba(26,26,26,0.08);
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
        }

        .project-card.flip {
          direction: rtl;
        }
        .project-card.flip > * {
          direction: ltr;
        }

        .project-card.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .project-meta {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 1.5rem;
        }

        .project-title {
          font-family: var(--font-serif);
          font-size: clamp(32px, 5vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--ink);
        }

        .title-cherry { color: var(--cherry); }
        .title-ghost {
          font-style: italic;
          opacity: 0.2;
          font-size: 0.45em;
          vertical-align: middle;
          letter-spacing: 0;
        }

        .project-desc {
          font-family: var(--font-mono);
          font-size: 12px;
          line-height: 1.8;
          color: var(--ink);
          opacity: 0.45;
          max-width: 400px;
          font-weight: 300;
        }

        .impact-row {
          display: flex;
          gap: 2rem;
        }

        .impact-stat {
          display: flex;
          flex-direction: column;
        }

        .impact-num {
          font-family: var(--font-serif);
          font-size: clamp(28px, 4vw, 42px);
          color: var(--cherry);
          line-height: 1;
        }

        .impact-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ink);
          opacity: 0.3;
          margin-top: 4px;
          letter-spacing: 0.03em;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tag {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 12px;
          border: 1px solid rgba(26,26,26,0.1);
          border-radius: 100px;
          color: var(--ink);
          opacity: 0.4;
        }

        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
          color: var(--cherry);
          text-decoration: none;
          transition: gap 200ms var(--ease-out);
        }

        .project-link:hover { gap: 10px; }

        .project-link svg {
          transition: transform 200ms var(--ease-out);
          flex-shrink: 0;
        }

        .project-link:hover svg { transform: translateX(2px); }

        /* ─ Visual pane ─ */
        .project-visual {
          position: relative;
          background: #F0EBE3;
          border-radius: 12px;
          min-height: 320px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        /* ─ Mock browser ─ */
        .mock-browser {
          width: 88%;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(26,26,26,0.08);
        }

        .mock-bar {
          height: 28px;
          background: #F8F6F3;
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 5px;
          border-bottom: 1px solid rgba(26,26,26,0.05);
        }

        .mock-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; }
        .mock-dot.red    { background: #FF5F57; }
        .mock-dot.yellow { background: #FEBC2E; }
        .mock-dot.green  { background: #28C840; }

        .mock-url {
          font-family: var(--font-mono);
          font-size: 9px;
          color: var(--ink);
          opacity: 0.25;
          margin-left: 8px;
        }

        /* ─ FEMA GO mock ─ */
        .mock-fema {
          background: #f4f6f9;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .fema-header {
          background: #003087;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .fema-header-brand {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .fema-wordmark {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: 11px;
          color: #fff;
          letter-spacing: 0.12em;
        }

        .fema-go-badge {
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 8px;
          font-weight: 700;
          color: #fff;
          padding: 1px 5px;
          letter-spacing: 0.08em;
        }

        .fema-header-right {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .fema-user-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        .fema-user-label {
          font-family: var(--font-mono);
          font-size: 7px;
          color: rgba(255,255,255,0.6);
        }

        .fema-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .fema-sidebar {
          width: 72px;
          background: #fff;
          border-right: 1px solid rgba(0,48,135,0.08);
          padding: 8px 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-shrink: 0;
        }

        .fema-nav-item {
          font-family: var(--font-mono);
          font-size: 7px;
          color: #555;
          padding: 5px 10px;
          cursor: default;
          letter-spacing: 0.02em;
        }

        .fema-nav-item.active {
          color: #003087;
          background: rgba(0,48,135,0.06);
          border-left: 2px solid #003087;
          font-weight: 700;
        }

        .fema-main {
          flex: 1;
          padding: 10px 10px;
          overflow: hidden;
        }

        .fema-main-title {
          font-family: var(--font-sans);
          font-size: 9px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .fema-stat-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 5px;
          margin-bottom: 8px;
        }

        .fema-stat {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 4px;
          padding: 6px;
          text-align: center;
        }

        .fema-stat-val {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 700;
          color: #003087;
          line-height: 1;
        }

        .fema-stat-val.fema-orange { color: #C55A11; }
        .fema-stat-val.fema-green  { color: #2E7D32; }

        .fema-stat-lbl {
          font-family: var(--font-mono);
          font-size: 6px;
          color: #888;
          margin-top: 2px;
        }

        .fema-table-head {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 6.5px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0 4px 4px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .fema-table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 4px;
          align-items: center;
          padding: 5px 4px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          font-family: var(--font-mono);
          font-size: 7px;
          color: #333;
        }

        .fema-table-row.faint { opacity: 0.5; }

        .fema-badge {
          font-family: var(--font-mono);
          font-size: 6px;
          font-weight: 600;
          padding: 2px 5px;
          border-radius: 3px;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .fema-badge.active  { background: rgba(46,125,50,0.1);  color: #2E7D32; }
        .fema-badge.pending { background: rgba(197,90,17,0.1);  color: #C55A11; }
        .fema-badge.closed  { background: rgba(0,0,0,0.06);     color: #888; }

        /* ─ OneGlobe mock ─ */
        .mock-og {
          background: #fff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .og-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          flex-shrink: 0;
        }

        .og-logo-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .og-logo-mark {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1B3A6B 0%, #2E6BC4 100%);
          flex-shrink: 0;
        }

        .og-logo {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 10px;
          color: #0D1B2E;
          letter-spacing: -0.01em;
        }

        .og-links {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 7px;
          color: #555;
        }

        .og-btn {
          background: #1B3A6B;
          color: #fff !important;
          padding: 3px 8px;
          border-radius: 3px;
          font-size: 7px;
        }

        .og-hero {
          background: #0D1B2E;
          padding: 18px 14px 16px;
          flex-shrink: 0;
        }

        .og-eyebrow {
          font-family: var(--font-mono);
          font-size: 7px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .og-hero-text {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .og-hero-sub {
          font-family: var(--font-mono);
          font-size: 7px;
          color: rgba(255,255,255,0.4);
          margin-top: 7px;
          line-height: 1.5;
        }

        .og-caps-section {
          padding: 10px 12px;
          flex: 1;
        }

        .og-caps-label {
          font-family: var(--font-mono);
          font-size: 7px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }

        .og-caps {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }

        .og-cap {
          background: #f7f9fc;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 4px;
          padding: 7px 8px;
          font-family: var(--font-mono);
          font-size: 7px;
          color: #1B3A6B;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .og-cap-icon {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: linear-gradient(135deg, #1B3A6B, #2E6BC4);
          flex-shrink: 0;
        }

        @media (max-width: 720px) {
          .project-card {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .project-card.flip {
            direction: ltr;
          }
          .project-visual {
            min-height: 220px;
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .work-container { padding: 4rem 1.5rem; }
        }
      `}</style>
    </section>
  );
}
