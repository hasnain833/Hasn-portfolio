import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/session';


const ADMIN_HOST = (process.env.ADMIN_HOST || '').toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

const SHARED = /^\/(api|_next|favicon\.ico|icon|apple-icon|manifest\.webmanifest|robots\.txt|img)/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get('host') || '').toLowerCase().split(':')[0];
  const onAdminHost = ADMIN_HOST !== '' && host === ADMIN_HOST;
  const isAdminPath = pathname === '/admin' || pathname.startsWith('/admin/');

  if (ADMIN_HOST && !onAdminHost && isAdminPath) {
    return NextResponse.rewrite(new URL('/404-admin-hidden', req.url));
  }

  if (onAdminHost && !isAdminPath && !SHARED.test(pathname)) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (pathname.startsWith('/admin/dashboard') && !(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  const res = NextResponse.next();
  if (onAdminHost) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
