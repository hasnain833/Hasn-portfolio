import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/session';


const ADMIN_HOST = (process.env.ADMIN_HOST || '').toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '').split(':')[0];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0];
  const onAdminHost = ADMIN_HOST !== '' && host === ADMIN_HOST;
  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');

  if (ADMIN_HOST && !onAdminHost && isAdminPath) {
    return NextResponse.rewrite(new URL('/404-admin-hidden', req.url));
  }

  if (pathname.startsWith('/admin/dashboard') && !(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  const res = NextResponse.next();
  if (onAdminHost) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  // Public pages, assets and APIs do not need session middleware.
  // Admin-host redirects and noindex headers live in next.config.js.
  matcher: ['/admin/:path*'],
};
