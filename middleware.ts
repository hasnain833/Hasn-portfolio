import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySession } from '@/lib/session';

// Send signed-out visitors to the sign-in page instead of showing the dashboard.
// Saving is also checked on the server (API routes), this just keeps the UI private.
export async function middleware(req: NextRequest) {
  if (!(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/admin/dashboard/:path*'] };
