import { analyticsEvent } from '../lib/analytics-events';
import { posthogSettings } from '../lib/posthog';

let initialized = false;

export async function initializeAnalytics(token?: string, host?: string) {
  const config = posthogSettings(token, host, location.hostname);
  if (!config || initialized) return;
  initialized = true;
  try {
    const { default: posthog } = await import('posthog-js');
    posthog.init(token!, config);
    posthog.capture('$pageview', { page_path: location.pathname });
    document.addEventListener('click', (event) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const name = analyticsEvent(href);
      if (!name) return;
      const properties: Record<string, string> = { page_path: location.pathname };
      if (name === 'case_study_click')
        properties.destination_path = new URL(href, location.origin).pathname;
      posthog.capture(name, properties);
    });
  } catch {
    // Analytics must not prevent the portfolio from working.
    initialized = false;
  }
}
