# Portfolio v5

`portfolio-v5.html` is the standalone v5 design reference for the portfolio homepage.

The production TSX adaptation uses local product images, semantic landmarks, responsive layouts, and the existing glasses emblem instead of an unavailable portrait. It omits the unavailable SALT screenshot. No résumé PDF was present, so Request résumé opens an email rather than pretending to download a file. Historical ShelfLife and FEMA platform figures are retained from the supplied board; they are not live measurements.

The existing The City and Worship routes and their assets remain available through secondary footer links. No infrastructure or deployment changes.

The TSX component uses a colocated scoped Portfolio.css stylesheet.

ShelfLife images match the first three carousel images on the marketing homepage, defined in `fisherbird-shelf/apps/marketing/src/components/Showcase.astro`: `screens/shelf-canvas.webp`, `screens/home-feed.webp`, and `screens/signal-hub.webp`, in that order. The standalone prototype references the same local assets.
