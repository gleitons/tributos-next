import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vtnYears } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data = await db.select().from(vtnYears).orderBy(desc(vtnYears.ano));
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching VTN data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
