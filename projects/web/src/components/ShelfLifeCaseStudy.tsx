import GlassesLogo from './GlassesLogo';
import './ShelfLifeCaseStudy.css';

type Screen = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type Feature = {
  id: string;
  title: string;
  description: string;
  decision: string;
  tone: 'paper' | 'wine' | 'navy';
  screens: Screen[];
};

const features: Feature[] = [
  {
    id: 'arrangement',
    title: 'Make room for the way you read.',
    description:
      'Books can stand as spines, face out, or lie flat in stacks. Readers drag them into place, add rows, and build shelves around a mood, a memory, or a collection.',
    decision:
      'An explicit Arrange mode keeps editing separate from browsing. Short gesture hints sit beside the canvas, and Done gives the interaction a clear finish.',
    tone: 'paper',
    screens: [
      {
        src: '/shelflife/shelf-arranging.webp',
        alt: 'ShelfLife Arrange mode with standing books, a flat stack, gesture hints, and book, decor and backdrop tools',
        caption: 'Arrange mode: drag, stack, add a row.',
        width: 660,
        height: 1435,
      },
      {
        src: '/shelflife/shelf-arranged.webp',
        alt: 'The Crying in Public shelf with standing and stacked book spines, a plant, and a framed painting',
        caption: 'A shelf with its own composition.',
        width: 660,
        height: 1434,
      },
    ],
  },
  {
    id: 'customization',
    title: 'Keep the shelf in view while changing it.',
    description:
      'Backdrops and decor turn a shelf into a personal space. Readers can try a different room, browse plants and art, and place objects among their books.',
    decision:
      'Bottom sheets keep the shelf visible behind the controls. Backdrop previews have Apply and Cancel actions; decor supports a quick tap or a deliberate hold to place.',
    tone: 'wine',
    screens: [
      {
        src: '/shelflife/backdrop-picker.webp',
        alt: 'A backdrop preview over the shelf, with thumbnail choices and Cancel and Apply controls in a bottom sheet',
        caption: 'Preview a backdrop in context.',
        width: 660,
        height: 1435,
      },
      {
        src: '/shelflife/decor-picker.webp',
        alt: 'A decor bottom sheet with category filters and illustrated plants, a clock, a typewriter and framed art',
        caption: 'Browse objects without leaving the canvas.',
        width: 660,
        height: 1435,
      },
    ],
  },
  {
    id: 'community',
    title: 'Let a bookshelf introduce its reader.',
    description:
      'A Top 12 shelf puts favorite books at the center of a profile. Public shelves give readers another way to find people whose taste interests them.',
    decision:
      'Discovery cards show the actual shelf, its owner, and books in common. Follow, like, and save sit beside that context, so readers can act on what caught their eye.',
    tone: 'paper',
    screens: [
      {
        src: '/shelflife/profile.webp',
        alt: 'A ShelfLife reader profile with a Top 12 shelf of favorite books and currently reading section',
        caption: 'A profile built around taste.',
        width: 820,
        height: 1782,
      },
      {
        src: '/shelflife/community.webp',
        alt: 'Community shelves with reader names, books in common, and follow, like and save actions',
        caption: 'Discover a shelf, then meet its owner.',
        width: 820,
        height: 1782,
      },
    ],
  },
  {
    id: 'book-signal',
    title: 'Ask for the book you cannot quite name.',
    description:
      'Book Signal lets readers describe a mood in their own words and add reference books. Other readers answer with a recommendation that fits the request.',
    decision:
      'A short compose screen invites the request. In the hub, one card brings the mood and reference books together, with distinct actions to pass, save for later, or answer.',
    tone: 'navy',
    screens: [
      {
        src: '/shelflife/signal-compose-mood.webp',
        alt: 'Book Signal compose screen with a mood description, optional reference books and Send Signal button',
        caption: 'Describe the feeling; add a reference.',
        width: 660,
        height: 898,
      },
      {
        src: '/portfolio/shelflife-book-signal.webp',
        alt: 'Book Signal hub showing a reader request, three reference books and Pass, Later and Answer actions',
        caption: 'One request, three clear next steps.',
        width: 820,
        height: 1782,
      },
    ],
  },
  {
    id: 'reading-goals',
    title: 'Give different goals their own shape.',
    description:
      'Feats can be a reading target between two dates, a recurring commitment, a particular list of books, or a book from every country.',
    decision:
      'Examples help readers choose a goal before filling out a form. Progress uses the shape that fits: a bar for a count, periods for a recurring goal, and countries for Read the World.',
    tone: 'paper',
    screens: [
      {
        src: '/shelflife/feat-examples.webp',
        alt: 'Create a Feat screen offering timeframe, recurring, list and Read the World goals with examples',
        caption: 'Start with an example that makes sense.',
        width: 660,
        height: 1406,
      },
      {
        src: '/shelflife/feats.webp',
        alt: 'Reading goals with count progress bars, countries completed, and month-by-month recurring progress',
        caption: 'Progress that matches the commitment.',
        width: 820,
        height: 1782,
      },
    ],
  },
];

function Screenshot({ screen, eager = false }: { screen: Screen; eager?: boolean }) {
  return (
    <figure className="sl-screen">
      <a
        href={screen.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${screen.caption} Open full-size screenshot in a new tab.`}
      >
        <img
          src={screen.src}
          alt={screen.alt}
          width={screen.width}
          height={screen.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </a>
      <figcaption>{screen.caption}</figcaption>
    </figure>
  );
}

export default function ShelfLifeCaseStudy() {
  return (
    <div className="sl-case">
      <nav className="sl-nav" aria-label="Project navigation">
        <a href="/" className="sl-home">
          <GlassesLogo width={52} aria-hidden="true" />
          <span>Alexander Cherry</span>
        </a>
        <a href="/">Back to portfolio</a>
      </nav>
      <main id="shelflife-content" tabIndex={-1}>
        <header className="sl-hero">
          <div className="sl-hero-copy">
            <p className="sl-project-meta">Fisherbird Software · iOS, Android &amp; web</p>
            <h1>ShelfLife</h1>
            <p className="sl-hero-line">A library with a life of its own.</p>
            <p className="sl-lead">
              A social reading app that turns a reader’s library into a space they can arrange,
              personalize, and share.
            </p>
            <p className="sl-role">
              I lead engineering, architecture and UI/UX at Fisherbird. I built and launched
              ShelfLife as its only engineer, from the shelf canvas to the apps and AWS backend.
            </p>
            <div className="sl-actions">
              <a className="sl-visit" href="https://theshelflifeapp.com">
                Visit ShelfLife
              </a>
              <a href="#arrangement">Explore the interfaces</a>
            </div>
          </div>
          <div className="sl-hero-art">
            <Screenshot
              eager
              screen={{
                src: '/portfolio/shelflife-shelf-canvas.webp',
                alt: 'ShelfLife’s Crying in Public shelf with arranged spines, horizontal stacks, plants and art',
                caption: 'A reader’s shelf, arranged their way.',
                width: 820,
                height: 1782,
              }}
            />
          </div>
        </header>
        <nav className="sl-index" aria-label="ShelfLife interface examples">
          <a href="#arrangement">Arrangement</a>
          <a href="#customization">Customization</a>
          <a href="#community">Community</a>
          <a href="#book-signal">Book Signal</a>
          <a href="#reading-goals">Reading goals</a>
        </nav>
        <p className="sl-image-note">Select any screen to view it at full size.</p>
        {features.map((feature) => (
          <section
            key={feature.id}
            id={feature.id}
            className={`sl-feature sl-feature--${feature.tone}`}
            aria-labelledby={`${feature.id}-heading`}
          >
            <div className="sl-feature-copy">
              <h2 id={`${feature.id}-heading`}>{feature.title}</h2>
              <p>{feature.description}</p>
              <div className="sl-design-note">
                <h3>The interaction</h3>
                <p>{feature.decision}</p>
              </div>
            </div>
            <div className="sl-gallery">
              {feature.screens.map((screen) => (
                <Screenshot key={screen.src} screen={screen} />
              ))}
            </div>
          </section>
        ))}
        <section className="sl-engineering" aria-labelledby="engineering-heading">
          <h2 id="engineering-heading">The engineering behind the experience.</h2>
          <p>
            React Native and Expo on mobile, a React web client, and shared shelf-layout and export
            logic. The shelf canvas uses Skia on mobile; the backend runs on AWS Lambda and
            DynamoDB, with infrastructure defined in Pulumi.
          </p>
          <p>
            Library imports, reading history, public shelves, recommendation requests, and app-store
            releases are all part of the same shipped product.
          </p>
          <a href="https://theshelflifeapp.com">Explore the live product</a>
        </section>
      </main>
      <footer className="sl-footer" aria-label="More projects">
        <a href="/">Back to portfolio</a>
        <div>
          <a href="/the-city">The City</a>
          <a href="/worship">Worship</a>
        </div>
      </footer>
    </div>
  );
}
