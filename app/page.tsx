import Site from '@/components/site/Site';
import { getSiteData } from '@/components/site/data';
import { fontVars } from '@/lib/fonts';
import '@/components/site/site.css';

// Admin saves invalidate this page; the next visit regenerates it.
// Daily revalidation is a fallback for changes made directly in MongoDB.
export const revalidate = 86400;

export default async function Home() {
  const data = await getSiteData();
  return (
    <div className={`site ${fontVars}`}>
      <Site {...data} />
    </div>
  );
}
