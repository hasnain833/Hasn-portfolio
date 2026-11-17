import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import clientPromise from '@/lib/mongodb';

const VALID_SECTIONS = ['services', 'projects', 'skills', 'experience'];
const DB_NAME = process.env.MONGODB_DB || 'portfolio';

export async function GET(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const session = cookies().get(SESSION_COOKIE);
    if (!(await verifySession(session?.value))) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { section } = params;
    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: 'Invalid section.' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(section);

        if (section === 'skills') {
            const data = await collection.findOne({});
            return NextResponse.json(data || {});
        } else {
            const data = await collection.find({}).toArray();
            return NextResponse.json(data);
        }
    } catch (error) {
        console.error('Database fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    if (!(await verifySession(session?.value))) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { section } = params;
    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: 'Invalid section.' }, { status: 400 });
    }

    try {
        const body = await req.json();
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(section);

        if (section === 'skills') {
            await collection.deleteMany({});
            await collection.insertOne(body);
        } else {
            await collection.deleteMany({});
            if (Array.isArray(body) && body.length > 0) {
                await collection.insertMany(body);
            }
        }

        revalidatePath('/');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database update error:', error);
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}
