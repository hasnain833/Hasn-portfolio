import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, SESSION_MAX_AGE, createSession, passwordMatches } from '@/lib/session';

export async function POST(req: NextRequest) {
    const { password } = await req.json().catch(() => ({}));
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
        return NextResponse.json({ error: 'Admin password not configured.' }, { status: 500 });
    }

    if (!passwordMatches(password, adminPassword)) {
        return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, await createSession(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: SESSION_MAX_AGE,
        path: '/',
    });

    return NextResponse.json({ success: true });
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
}
