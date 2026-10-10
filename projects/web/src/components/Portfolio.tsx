import GlassesLogo from './GlassesLogo';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <>
      <div className="portfolio">
        <header className="portfolio-header">
          <a href="/" aria-label="Alexander Cherry home" className="portfolio-logo">
            <GlassesLogo width={62} aria-hidden="true" />
            <span>AC</span>
          </a>
          <nav aria-label="Main navigation" className="portfolio-nav">
            <a href="#work">Work</a>
            <a href="#history">History</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>
        <main id="main-content" tabIndex={-1} className="portfolio-grid">
          <section aria-labelledby="identity-title" className="portfolio-tile identity">
            <div aria-hidden="true" className="identity-mark">
              <GlassesLogo width={64} aria-hidden="true" />
            </div>
            <h1 id="identity-title" className="portfolio-name">
              Alexander Cherry
            </h1>
            <p className="portfolio-role">Product engineer &amp; technical leader</p>
            <p className="portfolio-bio">
              I work directly with customers and stakeholders to turn problems into shipped
              products. My work spans engineering, architecture and UI/UX, across federal platforms
              and consumer apps.
            </p>
            <p className="portfolio-location">Arlington, VA</p>
            <div className="portfolio-actions">
              <a
                href="mailto:alexcherry.dev@gmail.com.com?subject=R%C3%A9sum%C3%A9%20request"
                className="portfolio-primary"
              >
                Request resume
              </a>
              <a href="mailto:alexcherry.dev@gmail.com.com" className="portfolio-secondary">
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/alexander-cherry"
                className="portfolio-secondary"
              >
                LinkedIn
              </a>
              <a href="https://github.com/acherry125" className="portfolio-secondary">
                GitHub
              </a>
            </div>
          </section>
          <section id="work" aria-labelledby="studio-title" className="portfolio-tile studio">
            <div className="studio-header">
              <div>
                <p className="portfolio-eyebrow studio-eyebrow">
                  Founder &amp; lead engineer · 2026 — now
                </p>
                <h2 id="studio-title" className="portfolio-heading">
                  Fisherbird Software
                </h2>
                <p className="studio-intro">
                  A two-person software studio I started with my wife. I lead the engineering,
                  architecture and UI/UX for our apps, and build custom software for businesses.
                </p>
              </div>
              <a href="https://www.fisherbirdsoftware.com" className="product-link">
                fisherbirdsoftware.com →
              </a>
            </div>
            <div className="studio-products">
              <article className="product product-shelflife">
                <div>
                  <p className="product-status">Live · iOS, Android, web</p>
                  <h3 className="product-name">ShelfLife</h3>
                  <p className="product-description">
                    A social book-tracking app, built and launched as the only engineer on a
                    serverless AWS backend.
                  </p>
                  <a href="https://theshelflifeapp.com" className="product-link">
                    theshelflifeapp.com →
                  </a>
                </div>
                <div className="product-screenshots">
                  <img
                    src="/portfolio/shelflife-shelf-canvas.webp"
                    alt="ShelfLife shelf canvas with book spines, stacks and decor"
                    className="product-photo"
                    loading="eager"
                    decoding="async"
                    width={820}
                    height={1782}
                  />
                  <img
                    src="/portfolio/shelflife-home-feed.webp"
                    alt="ShelfLife home feed"
                    className="product-photo"
                    loading="lazy"
                    decoding="async"
                    width={820}
                    height={1782}
                  />
                  <img
                    src="/portfolio/shelflife-book-signal.webp"
                    alt="ShelfLife Book Signal hub with requests from other readers"
                    className="product-photo"
                    loading="lazy"
                    decoding="async"
                    width={820}
                    height={1782}
                  />
                </div>
                <div className="product-proof">
                  <div>
                    <p className="product-proof-value">4.8★</p>
                    <p>App Store rating</p>
                  </div>
                  <div>
                    <p className="product-proof-value">~3,500</p>
                    <p>installs in the two months after v1</p>
                  </div>
                </div>
              </article>
              <article className="product">
                <img
                  src="/portfolio/wandercrew-badge.webp"
                  alt="WanderCrew"
                  style={{ width: '64px', marginBottom: '14px' }}
                  className="product-badge"
                  loading="lazy"
                  decoding="async"
                  width={64}
                  height={64}
                />
                <p className="product-status">Near beta</p>
                <h3 className="product-name">WanderCrew</h3>
                <p className="product-description">
                  An offline-first trip planner for groups, from idea to near-beta in under a month.
                </p>
                <a href="https://wandercrewapp.com/waitlist/" className="product-link">
                  Join the waitlist →
                </a>
              </article>
            </div>
            <div className="portfolio-chips">
              <span className="portfolio-chip">React Native / Expo</span>
              <span className="portfolio-chip">TypeScript</span>
              <span className="portfolio-chip">AWS Lambda</span>
              <span className="portfolio-chip">DynamoDB</span>
              <span className="portfolio-chip">Pulumi</span>
              <span className="portfolio-chip">App Store &amp; Google Play releases</span>
            </div>
          </section>
          <section aria-labelledby="oneglobe-title" className="portfolio-tile oneglobe">
            <p className="portfolio-eyebrow">
              OneGlobe LLC · 2022–2026 · Business Development Solution Architect
            </p>
            <h2 id="oneglobe-title" className="portfolio-heading">
              From federal requirements to working software
            </h2>
            <p className="portfolio-bio">
              I worked with federal stakeholders to shape technical proposals and built working
              applications for live evaluations.
            </p>
            <div className="oneglobe-projects">
              <div>
                <h3>SBA evaluation application</h3>
                <p>
                  Built the demo application that helped OneGlobe win a seat on the SBA Enterprise
                  Agile Delivery Services BPA. The first call order followed a week later.
                </p>
                <div className="oneglobe-award">
                  <strong>$200M</strong>
                  <span>BPA ceiling · OneGlobe awarded a seat</span>
                </div>
              </div>
              <div>
                <h3>Tech Challenge Platform</h3>
                <p>
                  Top contributor to a reusable reference architecture for government technical
                  challenges, with a React client, Java Spring services, and deployment through
                  Terraform, Pulumi or AWS CDK.
                </p>
              </div>
            </div>
            <div className="portfolio-chips">
              <span className="portfolio-chip">React</span>
              <span className="portfolio-chip">TypeScript</span>
              <span className="portfolio-chip">Java Spring</span>
              <span className="portfolio-chip">USWDS</span>
              <span className="portfolio-chip">Infrastructure as code</span>
            </div>
          </section>
          <section aria-labelledby="fema-title" className="portfolio-tile fema">
            <p className="portfolio-eyebrow fema-eyebrow">
              OneGlobe LLC · 2018–2021 · Workstream technical lead
            </p>
            <h2 id="fema-title" className="portfolio-heading-large">
              FEMA GO
            </h2>
            <p className="fema-intro">
              FEMA's grants management platform, built to FedRAMP High. I oversaw UI delivery across
              the platform and led the fire-grants workstream.
            </p>
            <div className="fema-scope">
              <div>
                <strong>6 people</strong>
                <span>cross-functional agile team I led</span>
              </div>
              <div>
                <strong>20 people</strong>
                <span>fire-grants workstream I supervised</span>
              </div>
            </div>
            <p className="portfolio-eyebrow fema-eyebrow platform-scale">Platform scale</p>
            <div className="platform-metrics">
              <div className="platform-metric">
                <p className="platform-value">$7B+</p>
                <p className="platform-label">grants processed</p>
              </div>
              <div className="platform-metric">
                <p className="platform-value">50</p>
                <p className="platform-label">states served</p>
              </div>
              <div className="platform-metric">
                <p className="platform-value">40+</p>
                <p className="platform-label">grant programs</p>
              </div>
            </div>
            <ol>
              <li className="fema-contribution">
                <span aria-hidden="true" className="fema-number">
                  1
                </span>
                <span>Oversaw all UI work and served as the final reviewer of all UI code.</span>
              </li>
              <li className="fema-contribution">
                <span aria-hidden="true" className="fema-number">
                  2
                </span>
                <span>
                  Delivered the COVID-19 CARES Act funding opportunity in under a week, helping FEMA
                  meet its congressional deadline.
                </span>
              </li>
              <li className="fema-contribution">
                <span aria-hidden="true" className="fema-number">
                  3
                </span>
                <span>
                  Worked directly with federal product owners and mentored engineers through 1:1s
                  and code review.
                </span>
              </li>
            </ol>
            <div className="portfolio-chips">
              <span className="portfolio-chip">React / Redux</span>
              <span className="portfolio-chip">Java Spring</span>
              <span className="portfolio-chip">Vert.x</span>
              <span className="portfolio-chip">PostgreSQL</span>
              <span className="portfolio-chip">AWS</span>
              <span className="portfolio-chip">Section 508</span>
            </div>
          </section>
          <section aria-labelledby="salt-title" className="portfolio-tile salt">
            <div>
              <p className="portfolio-eyebrow salt-eyebrow">
                American Student Assistance · 2016–2018
              </p>
              <h2 id="salt-title" className="portfolio-heading">
                saltmoney.org
              </h2>
              <p className="salt-description">
                Delivered the saltmoney.org rebrand as a front-end engineer, then stepped into the
                design role after a design team reorg. Prototyped React and React Native apps using
                OCR, AR and chatbot technology.
              </p>
              <div className="portfolio-chips">
                <span className="portfolio-chip">Front end</span>
                <span className="portfolio-chip">Design</span>
                <span className="portfolio-chip">React Native</span>
              </div>
            </div>
          </section>
          <section aria-labelledby="history" className="portfolio-tile history">
            <h2 id="history" className="portfolio-eyebrow">
              History
            </h2>
            <div className="history-row">
              <span className="history-year">2026 — now</span>
              <span>
                Founder &amp; Lead Engineer{' '}
                <span className="history-detail">· Fisherbird Software</span>
              </span>
            </div>
            <div className="history-row">
              <span className="history-year">2022 — 26</span>
              <span>
                BD Solution Architect <span className="history-detail">· OneGlobe LLC</span>
              </span>
            </div>
            <div className="history-row">
              <span className="history-year">2021 — 22</span>
              <span>
                Career break <span className="history-detail">· Travel, 25+ countries</span>
              </span>
            </div>
            <div className="history-row">
              <span className="history-year">2018 — 21</span>
              <span>
                Workstream Technical Lead{' '}
                <span className="history-detail">· OneGlobe LLC, FEMA GO</span>
              </span>
            </div>
            <div className="history-row">
              <span className="history-year">2016 — 18</span>
              <span>
                Front-End Engineer{' '}
                <span className="history-detail">· American Student Assistance</span>
              </span>
            </div>
            <div className="history-row">
              <span className="history-year">2018</span>
              <span>
                B.S. Computer Science{' '}
                <span className="history-detail">· Northeastern University</span>
              </span>
            </div>
          </section>
          <section id="contact" aria-labelledby="contact-title" className="portfolio-tile contact">
            <h2
              style={{
                font: "800 30px/1.1 'Manrope',sans-serif",
                letterSpacing: '-.03em',
                margin: '0',
              }}
              id="contact-title"
            >
              Get in touch.
            </h2>
            <div className="contact-links">
              <a href="mailto:alexcherry.dev@gmail.com.com">alexcherry.dev@gmail.com.com</a>
              <a href="https://www.linkedin.com/in/alexander-cherry">LinkedIn</a>
              <a href="https://github.com/acherry125">GitHub</a>
              <a href="mailto:alexcherry.dev@gmail.com.com?subject=R%C3%A9sum%C3%A9%20request">
                Request résumé
              </a>
            </div>
          </section>
        </main>
        <footer className="portfolio-experiments">
          <span>Earlier experiments</span>
          <a href="/the-city">The City</a>
          <a href="/worship">Worship</a>
        </footer>
      </div>
    </>
  );
}
