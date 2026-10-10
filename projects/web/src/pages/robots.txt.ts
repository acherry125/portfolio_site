import { SITE_URL } from '../lib/site.mjs';

export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
}
