import { useEffect, useState } from 'react';
import GlassesLogo from './GlassesLogo';

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollY > window.innerHeight * 0.7);
      setProgress(docH > 0 ? scrollY / docH : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`sticky-nav ${visible ? 'visible' : ''}`}
      role="navigation"
      aria-label="Scroll navigation"
    >
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div className="sticky-nav-inner">
        <a href="/" className="sticky-logo" aria-label="Back to top">
          <GlassesLogo width={32} aria-hidden="true" />
        </a>

        <nav>
          <ul className="sticky-links" role="list">
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

        <div className="sticky-social">
          <a
            href="https://github.com/acherry125"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href="https://www.linkedin.com/in/alexander-cherry"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            LI
          </a>
        </div>
      </div>

      <style>{`
        .sticky-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(250,247,242,0.88);
          backdrop-filter: blur(16px) saturate(1.5);
          -webkit-backdrop-filter: blur(16px) saturate(1.5);
          border-bottom: 1px solid rgba(26,26,26,0.08);
          transform: translateY(-100%);
          transition: transform 350ms var(--ease-out);
          will-change: transform;
        }

        .sticky-nav.visible {
          transform: translateY(0);
        }

        .progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--cherry);
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 60ms linear;
        }

        .sticky-nav-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2.5rem;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .sticky-logo {
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: opacity 180ms var(--ease-out);
        }

        .sticky-logo:hover {
          opacity: 1;
        }

        .sticky-links {
          display: flex;
          gap: 28px;
          list-style: none;
        }

        .sticky-links a {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink);
          opacity: 0.85;
          text-decoration: none;
          transition: opacity 180ms var(--ease-out), color 180ms var(--ease-out);
        }

        .sticky-links a:hover {
          opacity: 1;
          color: var(--cherry);
        }

        .sticky-social {
          display: flex;
          gap: 16px;
        }

        .sticky-social a {
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--ink);
          opacity: 0.85;
          text-decoration: none;
          transition: opacity 180ms var(--ease-out), color 180ms var(--ease-out);
        }

        .sticky-social a:hover {
          opacity: 1;
          color: var(--cherry);
        }

        @media (max-width: 480px) {
          .sticky-social { display: none; }
          .sticky-nav-inner { padding: 0 1.5rem; }
        }
      `}</style>
    </div>
  );
}
