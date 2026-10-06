import Site from '@/components/site/Site';
import { getSiteData } from '@/components/site/data';
import { fontVars } from '@/lib/fonts';
import '@/components/site/site.css';

// Saving in /admin refreshes this page instantly (see the data API route).
// This is only a safety net in case that refresh is missed.
export const revalidate = 3600;

export default async function Home() {
  const data = await getSiteData();
  return (
    <div className={`site ${fontVars}`}>
      <Site {...data} />
    </div>
  );
}
