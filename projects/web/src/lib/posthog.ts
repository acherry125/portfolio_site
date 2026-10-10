import type { CaptureResult, PostHogConfig } from 'posthog-js';

const events = new Set([
  '$pageview',
  '$pageleave',
  'resume_request',
  'contact_click',
  'case_study_click',
]);
const properties = new Set([
  'token',
  'distinct_id',
  '$device_id',
  '$session_id',
  '$window_id',
  '$cookieless_mode',
  '$process_person_profile',
  '$lib',
  '$lib_version',
  '$insert_id',
  '$time',
  '$host',
  '$pathname',
  '$browser',
  '$browser_version',
  '$os',
  '$os_version',
  '$device_type',
  '$screen_height',
  '$screen_width',
  '$viewport_height',
  '$viewport_width',
  '$referring_domain',
  'page_path',
  'destination_path',
  '$pageview_id',
]);

export function sanitizeEvent(event: CaptureResult | null): CaptureResult | null {
  if (!event || !events.has(event.event)) return null;
  const cleaned = Object.fromEntries(
    Object.entries(event.properties).filter(([key]) => properties.has(key))
  );
  for (const key of ['$current_url', '$referrer']) {
    try {
      const url = new URL(event.properties[key]);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') continue;
      cleaned[key] = url.origin + (key === '$referrer' ? '/' : url.pathname);
    } catch {
      // Missing or malformed URLs do not belong in analytics.
    }
  }
  return { ...event, properties: cleaned };
}

export function posthogSettings(
  token: string | undefined,
  host: string | undefined,
  hostname: string
): Partial<PostHogConfig> | undefined {
  if (!token || !/^phc_[A-Za-z0-9]+$/.test(token)) return;
  if (!['alexandercherry.com', 'www.alexandercherry.com'].includes(hostname)) return;
  if (!host || !['https://us.i.posthog.com', 'https://eu.i.posthog.com'].includes(host)) return;
  return {
    api_host: host,
    defaults: '2026-05-30',
    cookieless_mode: 'always',
    person_profiles: 'never',
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: true,
    disable_session_recording: true,
    disable_surveys: true,
    disable_scroll_properties: true,
    capture_performance: false,
    capture_exceptions: false,
    capture_dead_clicks: false,
    rageclick: false,
    enable_heatmaps: false,
    advanced_disable_flags: true,
    before_send: sanitizeEvent,
  };
}
