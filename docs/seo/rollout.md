# Portfolio SEO rollout

The site uses https://alexandercherry.com as its canonical origin. A shared page registry supplies canonical URLs, sitemap entries, identity markup, and six page-specific sharing cards. The homepage retains its approved product-engineer headline. The ShelfLife, FEMA GO and OneGlobe pages describe Alex's own work; platform scale and the SBA BPA ceiling are kept separate from individual contribution.

## Local checks

```sh
yarn web:build
node scripts/verify-seo.mjs
node --test projects/infra/canonical-redirect.test.cjs scripts/analytics-events.test.mjs
yarn --cwd projects/web lint
yarn workspace @portfolio/infra build
```

The build generates sharing cards and responsive screenshot files from existing source images. Generated files in public/seo and public/responsive are ignored in Git and copied into dist by Astro. The full-size screenshots remain available at their existing URLs. Dev startup also generates these assets.

## PostHog setup

Use a dedicated Portfolio project, separate from ShelfLife and WanderCrew. Set `PUBLIC_POSTHOG_KEY` to its public project token (`phc_...`) and `PUBLIC_POSTHOG_HOST` to `https://us.i.posthog.com` or `https://eu.i.posthog.com`, matching the project's region, in `projects/web/.env.production` or the build environment. Never use a personal API key (`phx_...`).

**Before deployment, enable cookieless event ingestion in that project's settings.** The SDK uses `cookieless_mode: 'always'`; PostHog ignores these events unless this setting is enabled. See [PostHog's configuration reference](https://posthog.com/docs/libraries/js/config).

Capture is disabled without a valid token/host and on local or preview hostnames. The browser SDK loads only on alexandercherry.com and www.alexandercherry.com. GA4 and Universal Analytics are removed.

The integration records page views, page leaves (for engagement reporting), and three intentional link actions:

- `resume_request` for a résumé email request
- `contact_click` for an ordinary email link
- `case_study_click` with a destination path for a portfolio case study

Autocapture, session recording, surveys, heatmaps, automatic performance/error collection, person profiles, and feature-flag requests are disabled. No `identify` calls are made. Query strings/fragments are removed from page URLs, referrers are reduced to their origin, and an event/property allowlist excludes email addresses, subjects, link text, and campaign parameters. Referring domains remain useful; detailed UTM campaign attribution is intentionally unavailable.

After deployment, verify real page views and each link action in the Portfolio project's activity feed. In Web Analytics, use the three custom events as conversion goals. Email clicks measure an attempted handoff, not a sent message or a completed recruiter conversation. Local checks do not prove live ingestion.

## Production changes requiring approval

1. Deploy the built website using the existing web deployment workflow. Stable assets, sitemap.xml, and robots.txt use a one-hour cache lifetime; HTML revalidates; fingerprinted Astro assets remain immutable.
2. Review a Pulumi preview. The intended infrastructure change is one new CloudFront Function and a viewer-request association on the existing distribution. No bucket or distribution replacement is intended.
3. After approval, apply the infrastructure change. www, CloudFront hostnames, known page URLs without trailing slashes, and index.html aliases redirect to canonical URLs. Query parameters are preserved, including duplicate and empty values. The old /salt URL redirects to the relevant homepage section. The retired /event-horizon prototype returns 410 with a link to current projects; unrelated missing URLs remain origin 404s.
4. Verify live redirects, page canonicals, JSON-LD, robots.txt, sitemap.xml, sharing-card images, and full-size/responsive screenshots. Confirm there are no redirect loops.

Rollback: remove the function association and restore the previous site build. Redirect cache headers are limited to five minutes. Do not delete the function while it is associated with a distribution.

## Search Console and external identity links

Submit https://alexandercherry.com/sitemap.xml in Search Console. Inspect the canonical homepage and the three engineering case-study URLs, then request recrawling after the deployed content is correct. Monitor branded queries and their canonical landing pages against the exported baseline; query tables omit anonymized rows, and page-group impression counts should not be summed as a site total.

Keep LinkedIn/GitHub website links pointed at the canonical origin. Add a factual link from Fisherbird's team/about content identifying Alexander Cherry as its engineer when updating that separate site. These account and company-site changes are outside this repository's deployment.

No ranking gains, AI citations, or rich-result eligibility are asserted by the local tests. Rendered browser/Rich Results verification and live PostHog delivery still need to be checked after deployment.
