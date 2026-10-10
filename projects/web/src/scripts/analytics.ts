import { analyticsEvent } from '../lib/analytics-events';

type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };

export function initializeAnalytics(measurementId?: string) {
  if (!measurementId || !/^G-[A-Z0-9]+$/.test(measurementId)) return;
  const analytics = window as AnalyticsWindow;
  if (analytics.gtag) return;
  analytics.dataLayer = analytics.dataLayer || [];
  analytics.gtag = function () {
    analytics.dataLayer!.push(arguments);
  };
  analytics.gtag('js', new Date());
  analytics.gtag('config', measurementId, { page_location: location.origin + location.pathname });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(script);
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a') : null;
    if (!link) return;
    const name = analyticsEvent(link.getAttribute('href') || '');
    if (name) analytics.gtag?.('event', name, { page_path: location.pathname });
  });
}
