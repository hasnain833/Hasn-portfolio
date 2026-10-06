import type { SiteData, Project, Job, Service } from './types';

const DB_NAME = process.env.MONGODB_DB || 'portfolio';

// Strip Mongo's ObjectId so the data can cross into client components.
function plain<T>(docs: unknown[]): T[] {
  return docs.map((d) => {
    const { _id, ...rest } = d as Record<string, unknown>;
    void _id;
    return rest as T;
  });
}

export async function getSiteData(): Promise<SiteData> {
  try {
    // Imported lazily: the module throws when MONGODB_URI is missing,
    // and the page should still render (empty) in that case.
    const { default: clientPromise } = await import('@/lib/mongodb');
    const db = (await clientPromise).db(DB_NAME);
    const [projects, experience, services, skills] = await Promise.all([
      db.collection('projects').find({}).toArray(),
      db.collection('experience').find({}).toArray(),
      db.collection('services').find({}).toArray(),
      db.collection('skills').findOne({}),
    ]);
    const tools = Array.isArray(skills?.additionalSkills) ? (skills!.additionalSkills as unknown[]).map(String) : [];
    return {
      projects: plain<Project>(projects),
      experience: plain<Job>(experience),
      services: plain<Service>(services),
      tools,
    };
  } catch (err) {
    console.error('[site] could not load data from MongoDB:', err);
    return { projects: [], experience: [], services: [], tools: [] };
  }
}

/** "HABIBI MARKET" -> "Habibi Market", leaves short acronyms like "AI" alone. */
export function tidyCase(s: string) {
  if (s !== s.toUpperCase()) return s;
  return s
    .split(' ')
    .map((w) => (w.length <= 2 ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(' ');
}

/** "Pink Pill - AI Dating Coach" -> { name: "Pink Pill", kind: "AI Dating Coach" } */
export function splitTitle(title: string) {
  const [name, ...rest] = title.split(/\s+[-–—]\s+/);
  return { name: tidyCase(name.trim()), kind: rest.join(' - ').trim() };
}

export function hostOf(url: string | null) {
  if (!url) return '';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/** "SEPT 2024 – NOV 2024" -> "Sept 2024 – Nov 2024", "PRESENT" -> "now" */
export function tidyPeriod(p: string) {
  return p
    .split(/(\s+)/)
    .map((w) => {
      if (/^present$/i.test(w)) return 'now';
      if (/^[A-Z]{3,}$/.test(w)) return w.charAt(0) + w.slice(1).toLowerCase();
      return w;
    })
    .join('');
}
