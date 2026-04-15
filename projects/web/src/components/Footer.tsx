import { useEffect, useRef, useState } from 'react';
import GlassesLogo from './GlassesLogo';

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 6L2 7" />
  </svg>
);

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer id="contact" aria-label="Contact and footer">
      {/* ── Dark Contact Card ── */}
      <div
        ref={sectionRef}
        className={`contact-card ${visible ? 'visible' : ''}`}
        role="region"
        aria-labelledby="contact-heading"
      >
        {/* Ghosted background text for depth */}
        <div className="contact-bg-text" aria-hidden="true">
          Let's talk
        </div>

        <div className="contact-label">Get in touch</div>

        <h2 id="contact-heading" className="contact-heading">
          Got something<br />
          <span className="contact-cherry">to build?</span>
        </h2>

        <p className="contact-sub">
          App, feature, automation — whatever it is, let's talk about it.
          I work end to end and I'm easy to work with.
        </p>

        <nav className="contact-links" aria-label="Contact links">
          <a
            className="contact-link"
            href="https://github.com/acherry125"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            className="contact-link"
            href="https://www.linkedin.com/in/alexander-cherry"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a className="contact-link" href="mailto:acherry125@gmail.com" aria-label="Send email">
            <EmailIcon /> Email
          </a>
        </nav>
      </div>

      {/* ── Thin strip footer ── */}
      <div className="footer-strip">
        <div className="footer-left">
          <GlassesLogo width={32} opacity={0.3} aria-hidden="true" />
          <span className="footer-name">Alexander Cherry</span>
        </div>
        <span className="footer-copy">&copy; {new Date().getFullYear()}</span>
      </div>

      <style>{`
        footer {
          background: var(--cream);
          padding: 0 1.5rem 1.5rem;
        }

        /* ── Dark card ── */
        .contact-card {
          background: #1A1A1A;
          border-radius: 16px;
          padding: 5rem 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
        }

        .contact-card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Ghosted depth text */
        .contact-bg-text {
          position: absolute;
          font-family: var(--font-serif);
          font-size: clamp(120px, 20vw, 240px);
          color: rgba(192,57,43,0.04);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          pointer-events: none;
          letter-spacing: -0.04em;
          user-select: none;
        }

        .contact-label {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--cherry);
          position: relative;
        }

        .contact-heading {
          font-family: var(--font-serif);
          font-size: clamp(36px, 6vw, 64px);
          color: #F5F0EB;
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-weight: 400;
          position: relative;
        }

        .contact-cherry { color: var(--cherry); }

        .contact-sub {
          font-family: var(--font-mono);
          font-size: 12px;
          color: #F5F0EB;
          opacity: 0.3;
          max-width: 400px;
          line-height: 1.7;
          font-weight: 300;
          position: relative;
        }

        .contact-links {
          display: flex;
          gap: 1.25rem;
          position: relative;
          flex-wrap: wrap;
          justify-content: center;
        }

        .contact-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #F5F0EB;
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.05em;
          opacity: 0.5;
          padding: 12px 24px;
          border: 1px solid rgba(245,240,235,0.1);
          border-radius: 100px;
          transition:
            opacity 200ms var(--ease-out),
            border-color 200ms var(--ease-out),
            color 200ms var(--ease-out),
            transform 200ms var(--ease-out);
        }

        .contact-link:hover {
          opacity: 1;
          border-color: var(--cherry);
          color: var(--cherry);
          transform: translateY(-2px);
        }

        .contact-link:active {
          transform: scale(0.97) translateY(-2px);
        }

        /* ── Footer strip ── */
        .footer-strip {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0.5rem 0;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-name {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink);
          opacity: 0.85;
          letter-spacing: 0.05em;
        }

        .footer-copy {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ink);
          opacity: 0.15;
          letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
          .contact-card {
            padding: 4rem 1.5rem;
            border-radius: 12px;
          }
          footer {
            padding: 0 1rem 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
