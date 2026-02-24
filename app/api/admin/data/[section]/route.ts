import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';

const VALID_SECTIONS = ['services', 'projects', 'skills', 'experience'];
const DB_NAME = process.env.MONGODB_DB || 'portfolio';

export async function GET(
    req: NextRequest,
    { params }: { params: { section: string } }
) {
    const { section } = params;
    if (!VALID_SECTIONS.includes(section)) {
        return NextResponse.json({ error: 'Invalid section.' }, { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const collection = db.collection(section);

        if (section === 'skills') {
            // skills.json is a single object
            const data = await collection.findOne({});
            return NextResponse.json(data || {});
        } else {
            // others are arrays
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
    const session = cookieStore.get('admin_session');
    if (!session || session.value !== 'authenticated') {
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
            // Replace the entire object for skills
            await collection.deleteMany({});
            await collection.insertOne(body);
        } else {
            // For sections like projects, services, experience, we currently save the entire array
            // This mirrors the file-based logic for now. 
            // In a more advanced DB setup, we'd use separate docs and specific update/insert routes.
            await collection.deleteMany({});
            if (Array.isArray(body) && body.length > 0) {
                await collection.insertMany(body);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Database update error:', error);
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}
