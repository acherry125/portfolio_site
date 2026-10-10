import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { pages } from '../src/lib/site.mjs';
import { screenshots, responsiveImagePath } from '../src/lib/images.mjs';
const root = fileURLToPath(new URL('../public/', import.meta.url));
const escape = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
await mkdir(join(root, 'seo'), { recursive: true });
const logo = (
  await readFile(new URL('../src/assets/glasses.svg', import.meta.url), 'utf8')
).replace(/<\?xml[^>]*>/, '');
for (const page of pages) {
  const title = page.lines
    .map(
      (line, i) =>
        `<text x="80" y="${230 + i * 80}" font-family="sans-serif" font-size="58" font-weight="700" fill="#1c1917">${escape(line)}</text>`
    )
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f3f1ec"/><rect x="0" y="0" width="1200" height="16" fill="#c0392b"/><svg x="80" y="70" width="90" height="34" viewBox="0 0 180 64">${logo.replace(/<svg[^>]*>|<\/svg>/g, '')}</svg>${title}<text x="80" y="542" font-family="sans-serif" font-size="25" fill="#57504a">${page.path === '/' ? 'Engineering · Architecture · UI/UX' : 'A case study by Alexander Cherry'}</text><text x="80" y="582" font-family="sans-serif" font-size="21" fill="#7a1f2b">alexandercherry.com${page.path === '/' ? '' : page.path}</text></svg>`;
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(root, 'seo', `${page.image}.png`));
}
for (const src of screenshots) {
  const input = join(root, src);
  const { width: originalWidth } = await sharp(input).metadata();
  for (const width of [320, 640]) {
    if (width >= originalWidth) continue;
    const output = join(root, responsiveImagePath(src, width));
    await mkdir(dirname(output), { recursive: true });
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(output);
  }
}
console.log(
  `Generated ${pages.length} sharing cards and responsive versions of ${screenshots.length} screenshots.`
);
