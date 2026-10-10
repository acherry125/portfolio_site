import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, dirname } from "node:path";
const root = new URL("../projects/web/dist/", import.meta.url).pathname;
function pages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? pages(join(dir, entry.name))
      : entry.name === "index.html"
        ? [join(dir, entry.name)]
        : [],
  );
}
const urls = [];
for (const file of pages(root)) {
  const path = relative(root, dirname(file));
  const expected = `https://alexandercherry.com/${path ? path + "/" : ""}`;
  const html = readFileSync(file, "utf8");
  assert.ok(
    html.includes(`rel="canonical" href="${expected}"`),
    `Canonical missing or incorrect: ${expected}`,
  );
  assert.ok(html.includes(`property="og:url" content="${expected}"`));
  assert.ok(html.includes('property="og:image"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(!html.includes("UA-108515497-1"));
  const match = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(match, `Structured data missing: ${expected}`);
  const schema = JSON.parse(match[1]);
  assert.equal(schema["@context"], "https://schema.org");
  assert.ok(
    schema["@graph"].some(
      (item) => item["@type"] === "Person" && item.name === "Alexander Cherry",
    ),
  );
  urls.push(expected);
}
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert.deepEqual(
  locations.sort(),
  urls.sort(),
  "Sitemap must contain every canonical page exactly once",
);
const robots = readFileSync(join(root, "robots.txt"), "utf8");
assert.ok(robots.includes("Sitemap: https://alexandercherry.com/sitemap.xml"));
assert.ok(robots.includes("User-agent: OAI-SearchBot\nAllow: /"));
console.log(`SEO output checks passed for ${urls.length} canonical pages.`);
