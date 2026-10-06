import type { MetadataRoute } from 'next';
import { SITE_URL as SITE } from '@/lib/site-url';


export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
