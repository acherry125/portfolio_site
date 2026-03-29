import { useEffect, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';
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

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" aria-label="Hero section">
      <ParticleCanvas />

      <div className="hero-inner">
        {/* Nav */}
        <nav className="hero-nav" aria-label="Main navigation">
          <a href="/" className="logo-link" aria-label="Home">
            <GlassesLogo width={44} aria-label="AC glasses logo" />
            <span className="logo-monogram" aria-hidden="true">
              AC
            </span>
          </a>
          <ul className="nav-links" role="list">
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Main headline */}
        <div className={`hero-body ${visible ? 'visible' : ''}`}>
          <div className="hero-eyebrow reveal r1">
            Solution Architect&nbsp;&nbsp;/&nbsp;&nbsp;Product
            Builder&nbsp;&nbsp;/&nbsp;&nbsp;Developer
          </div>
          <h1 className="hero-headline">
            <span className="hero-name-line reveal r2">Alexander</span>
            <span className="hero-name-line red reveal r3">
              Cherry
              <span className="hero-est" aria-hidden="true">
                est. 2016
              </span>
            </span>
          </h1>
          <p className="hero-tagline reveal r4">
            I build federal-scale systems, ship products from zero to launch,
            <br />
            and architect solutions that serve millions. Currently at OneGlobe.
          </p>
        </div>

        {/* Footer bar */}
        <div className="hero-footer">
          <div className="social-links">
            <a
              href="https://github.com/acherry125"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alexander-cherry"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>
          <span className="scroll-hint" aria-hidden="true">
            Scroll to explore
          </span>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: var(--cream);
          cursor: crosshair;
          overflow: hidden;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100svh;
          padding: 2rem 2.5rem;
          pointer-events: none;
        }

        /* Nav */
        .hero-nav {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          pointer-events: auto;
        }

        .logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .logo-monogram {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 300;
          color: var(--ink);
          opacity: 0.4;
          letter-spacing: 0.05em;
        }

        .nav-links {
          display: flex;
          gap: 24px;
          list-style: none;
        }

        .nav-links a {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--ink);
          opacity: 0.4;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: opacity 200ms var(--ease-out), color 200ms var(--ease-out);
        }

        .nav-links a:hover {
          opacity: 1;
          color: var(--cherry);
        }

        /* Body */
        .hero-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-left: 1rem;
        }

        .hero-eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--cherry);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-weight: 400;
          margin-bottom: 6px;
          overflow: hidden;
        }

        .hero-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
          font-family: var(--font-serif);
          font-size: clamp(52px, 9vw, 96px);
          line-height: 0.92;
          font-weight: 400;
          letter-spacing: -0.02em;
        }

        .hero-name-line {
          display: block;
          color: var(--ink);
          overflow: hidden;
        }

        .hero-name-line.red {
          color: var(--cherry);
          display: flex;
          align-items: baseline;
          gap: 20px;
        }

        .hero-est {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(16px, 2.5vw, 26px);
          color: var(--ink);
          opacity: 0.15;
          letter-spacing: 0;
        }

        .hero-tagline {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--ink);
          opacity: 0.45;
          line-height: 1.75;
          font-weight: 300;
          margin-top: 28px;
          max-width: 440px;
          overflow: hidden;
        }

        /* Footer */
        .hero-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          pointer-events: auto;
        }

        .social-links {
          display: flex;
          gap: 20px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.05em;
          color: var(--ink);
          opacity: 0.4;
          transition: opacity 200ms var(--ease-out), color 200ms var(--ease-out);
        }

        .social-link:hover {
          opacity: 1;
          color: var(--cherry);
        }

        .scroll-hint {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--ink);
          opacity: 0.2;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* Reveal animations */
        .reveal {
          transform: translateY(110%);
          opacity: 0;
          transition: transform 0.8s var(--ease-out), opacity 0.8s var(--ease-out);
        }

        .hero-body.visible .reveal {
          transform: translateY(0);
          opacity: 1;
        }

        .hero-body.visible .r1 { transition-delay: 0.3s; }
        .hero-body.visible .r2 { transition-delay: 0.5s; }
        .hero-body.visible .r3 { transition-delay: 0.65s; }
        .hero-body.visible .r4 { transition-delay: 0.9s; }

        @media (max-width: 640px) {
          .hero-inner {
            padding: 1.5rem;
          }
          .hero-headline {
            font-size: clamp(44px, 14vw, 72px);
          }
          .scroll-hint { display: none; }
        }
      `}</style>
    </section>
  );
}
