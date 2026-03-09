import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { itbiRural, itbiUrbano, itbi } from '@/lib/schema';
import { eq, or } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { protocolo } = body;

        if (!protocolo) {
            return NextResponse.json({ error: 'Protocolo é obrigatório' }, { status: 400 });
        }

        const isNumeric = /^\d+$/.test(protocolo);
        const numericId = isNumeric ? parseInt(protocolo) : null;

        // Search in itbiRural
        let rural;
        if (isNumeric && numericId !== null) {
            rural = await db.select().from(itbiRural).where(or(eq(itbiRural.protocolo, protocolo), eq(itbiRural.id, numericId)));
        } else {
            rural = await db.select().from(itbiRural).where(eq(itbiRural.protocolo, protocolo));
        }

        if (rural.length > 0) {
            return NextResponse.json({
                success: true,
                type: 'RURAL',
                data: rural[0]
            });
        }

        // Search in itbiUrbano
        let urbano;
        if (isNumeric && numericId !== null) {
            urbano = await db.select().from(itbiUrbano).where(or(eq(itbiUrbano.protocolo, protocolo), eq(itbiUrbano.id, numericId)));
        } else {
            urbano = await db.select().from(itbiUrbano).where(eq(itbiUrbano.protocolo, protocolo));
        }

        if (urbano.length > 0) {
            return NextResponse.json({
                success: true,
                type: 'URBANO',
                data: urbano[0]
            });
        }

        // Search in generic itbi
        let generic;
        if (isNumeric && numericId !== null) {
            generic = await db.select().from(itbi).where(or(eq(itbi.protocolo, protocolo), eq(itbi.id, numericId)));
        } else {
            generic = await db.select().from(itbi).where(eq(itbi.protocolo, protocolo));
        }

        if (generic.length > 0) {
            return NextResponse.json({
                success: true,
                type: 'GENERICO',
                data: generic[0]
            });
        }

        return NextResponse.json({ success: false, message: 'Protocolo não encontrado' });
    } catch (error) {
        console.error('Error validating ITBI:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error },
            { status: 500 }
        );
    }
}
