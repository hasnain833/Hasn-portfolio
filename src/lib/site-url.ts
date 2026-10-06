// The public site's address. Used for link previews, the sitemap, and the
// admin's "View live site" links (the admin may run on a different domain).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.has-nain.dev').replace(/\/$/, '');
