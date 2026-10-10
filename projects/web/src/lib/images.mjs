export const screenshots = [
  '/portfolio/shelflife-shelf-canvas.webp',
  '/portfolio/shelflife-home-feed.webp',
  '/portfolio/shelflife-book-signal.webp',
  '/shelflife/shelf-arranging.webp',
  '/shelflife/shelf-arranged.webp',
  '/shelflife/backdrop-picker.webp',
  '/shelflife/decor-picker.webp',
  '/shelflife/profile.webp',
  '/shelflife/community.webp',
  '/shelflife/signal-compose-mood.webp',
  '/shelflife/feat-examples.webp',
  '/shelflife/feats.webp',
];
export function responsiveImagePath(src, width) {
  return '/responsive' + src.replace(/\.webp$/, `-${width}.webp`);
}
export function responsiveSrcSet(src, originalWidth) {
  if (!screenshots.includes(src)) return undefined;
  return [320, 640]
    .filter((width) => width < originalWidth)
    .map((width) => `${responsiveImagePath(src, width)} ${width}w`)
    .concat(`${src} ${originalWidth}w`)
    .join(', ');
}
