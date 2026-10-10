export const SITE_URL = 'https://alexandercherry.com';
export const pages = [
  {
    path: '/',
    name: 'Alexander Cherry',
    title: 'Alexander Cherry — Product engineer & technical leader',
    description:
      'Alexander Cherry works directly with customers and stakeholders to turn problems into shipped products, spanning engineering, architecture and UI/UX.',
    image: 'home',
    imageAlt: 'Alexander Cherry product engineer and technical leader',
    lines: ['Alexander Cherry', 'Product engineer and', 'technical leader'],
    kind: 'profile',
  },
  {
    path: '/shelflife/',
    name: 'ShelfLife',
    title: 'ShelfLife UI/UX and Product Engineering — Alexander Cherry',
    description:
      'Explore ShelfLife’s shelf canvas, reader discovery, Book Signal and reading goals. A product engineering and UI/UX case study by Alexander Cherry.',
    image: 'shelflife',
    imageAlt: 'ShelfLife UI UX and product engineering case study by Alexander Cherry',
    lines: ['ShelfLife', 'UI/UX and product engineering'],
    kind: 'case-study',
  },
  {
    path: '/fema-go/',
    name: 'FEMA GO',
    title: 'FEMA GO UI Architecture — Alexander Cherry',
    description:
      'Alexander Cherry’s FEMA GO work: platform-wide UI review, agile team leadership and delivery of CARES Act funding on a federal grants platform.',
    image: 'fema-go',
    imageAlt: 'FEMA GO UI architecture and technical leadership case study by Alexander Cherry',
    lines: ['FEMA GO', 'UI architecture and delivery'],
    kind: 'case-study',
  },
  {
    path: '/oneglobe/',
    name: 'OneGlobe',
    title: 'OneGlobe Solution Architecture — Alexander Cherry',
    description:
      'Working software for federal evaluations: Alexander Cherry’s SBA demo application and reusable Tech Challenge Platform at OneGlobe.',
    image: 'oneglobe',
    imageAlt: 'OneGlobe solution architecture case study by Alexander Cherry',
    lines: ['OneGlobe', 'From federal requirements', 'to working software'],
    kind: 'case-study',
  },
  {
    path: '/the-city/',
    name: 'The City',
    title: 'The City React Game — Alexander Cherry',
    description:
      'The City is Alexander Cherry’s React text-adventure game set in a war-torn Boston City Hall, with branching stories and original writing.',
    image: 'the-city',
    imageAlt: 'The City React narrative game by Alexander Cherry',
    lines: ['The City', 'A branching narrative in React'],
    kind: 'case-study',
  },
  {
    path: '/worship/',
    name: 'Worship',
    title: 'Worship Java Simulation Game — Alexander Cherry',
    description:
      'Worship is Alexander Cherry’s Java village-god simulator: resource allocation, belief systems, natural disasters and a civilization shaped by its deity.',
    image: 'worship',
    imageAlt: 'Worship Java simulation game by Alexander Cherry',
    lines: ['Worship', 'A village-god simulator in Java'],
    kind: 'case-study',
  },
];

export function canonicalPath(pathname) {
  const path = pathname.replace(/\/index\.html$/, '/');
  return path.endsWith('/') ? path : path + '/';
}

export function getPage(pathname) {
  const page = pages.find((page) => page.path === canonicalPath(pathname));
  if (!page) throw new Error(`Missing SEO metadata for ${pathname}`);
  return page;
}

export function pageSchema(page) {
  const url = SITE_URL + page.path;
  const personId = SITE_URL + '/#person';
  const person = {
    '@type': 'Person',
    '@id': personId,
    name: 'Alexander Cherry',
    alternateName: 'Alex Cherry',
    url: SITE_URL + '/',
    jobTitle: 'Product engineer and technical leader',
    sameAs: ['https://www.linkedin.com/in/alexander-cherry', 'https://github.com/acherry125'],
    worksFor: {
      '@type': 'Organization',
      name: 'Fisherbird Software',
      url: 'https://www.fisherbirdsoftware.com/',
    },
    knowsAbout: [
      'Product engineering',
      'Software architecture',
      'UI/UX',
      'React',
      'React Native',
      'AWS',
    ],
  };
  const webPage = {
    '@type': page.kind === 'profile' ? 'ProfilePage' : 'WebPage',
    '@id': url + '#webpage',
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': SITE_URL + '/#website' },
    mainEntity: { '@id': page.kind === 'profile' ? personId : url + '#case-study' },
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE_URL + `/seo/${page.image}.png` },
  };
  const graph = [
    person,
    {
      '@type': 'WebSite',
      '@id': SITE_URL + '/#website',
      url: SITE_URL + '/',
      name: 'Alexander Cherry',
      publisher: { '@id': personId },
    },
    webPage,
  ];
  if (page.kind !== 'profile') {
    graph.push({
      '@type': 'CreativeWork',
      '@id': url + '#case-study',
      name: page.title,
      description: page.description,
      url,
      author: { '@id': personId },
      about: { '@type': 'Thing', name: page.name },
      image: SITE_URL + `/seo/${page.image}.png`,
      inLanguage: 'en-US',
    });
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Alexander Cherry', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: page.name, item: url },
      ],
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
