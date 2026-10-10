export function analyticsEvent(href: string): string | undefined {
  let url: URL;
  try {
    url = new URL(href, 'https://alexandercherry.com');
  } catch {
    return undefined;
  }
  if (url.protocol === 'mailto:') {
    return /r[eé]sum[eé]/i.test(url.searchParams.get('subject') || '')
      ? 'resume_request'
      : 'contact_click';
  }
  if (
    url.origin === 'https://alexandercherry.com' &&
    /^\/(shelflife|fema-go|oneglobe|the-city|worship)\/?$/.test(url.pathname)
  )
    return 'case_study_click';
  return undefined;
}
