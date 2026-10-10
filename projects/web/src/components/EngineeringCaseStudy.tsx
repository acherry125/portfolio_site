import GlassesLogo from './GlassesLogo';
import './EngineeringCaseStudy.css';

export type EngineeringProject = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  facts: { label: string; value: string }[];
  sections: { title: string; paragraphs: string[] }[];
  stack: string[];
};

export default function EngineeringCaseStudy({ project }: { project: EngineeringProject }) {
  return (
    <div className="engineering-case">
      <nav aria-label="Project navigation" className="engineering-nav">
        <a href="/" className="engineering-home">
          <GlassesLogo width={52} aria-hidden="true" />
          Alexander Cherry
        </a>
        <a href="/">Back to portfolio</a>
      </nav>
      <main id="project-content" tabIndex={-1}>
        <header className="engineering-hero">
          <p className="engineering-role">{project.role}</p>
          <h1>{project.name}</h1>
          <p className="engineering-headline">{project.headline}</p>
          <p className="engineering-summary">{project.summary}</p>
          <p className="engineering-byline">A case study by Alexander Cherry</p>
          <dl className="engineering-facts">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </header>
        <div className="engineering-sections">
          {project.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <section className="engineering-stack" aria-labelledby="technical-context">
          <h2 id="technical-context">Technical context</h2>
          <ul>
            {project.stack.map((tool) => (
              <li key={tool}>{tool}</li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="engineering-footer">
        <a href="/">Back to portfolio</a>
        <nav aria-label="Related case studies">
          <a href="/shelflife/">ShelfLife</a>
          <a href="/fema-go/">FEMA GO</a>
          <a href="/oneglobe/">OneGlobe</a>
        </nav>
      </footer>
    </div>
  );
}
