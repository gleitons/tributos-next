import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { portalUsers } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const cpf = searchParams.get('cpf');

        if (cpf) {
            const user = await db.select().from(portalUsers).where(eq(portalUsers.cpf, cpf));
            return NextResponse.json(user[0] || null);
        }

        const allUsers = await db.select().from(portalUsers).orderBy(desc(portalUsers.dataCadastro));
        return NextResponse.json(allUsers);
    } catch (error) {
        console.error('Error fetching portal users:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.cpf || !body.nome) {
            return NextResponse.json({ error: 'CPF and Name are required' }, { status: 400 });
        }

        // Check if exists
        const existing = await db.select().from(portalUsers).where(eq(portalUsers.cpf, body.cpf));

        if (existing.length > 0) {
            // Update
            await db.update(portalUsers)
                .set({
                    nome: body.nome,
                    email: body.email || existing[0].email,
                    telefone: body.telefone || existing[0].telefone,
                })
                .where(eq(portalUsers.cpf, body.cpf));

            return NextResponse.json({ success: true, message: 'Usuário atualizado.' });
        } else {
            // Insert
            await db.insert(portalUsers).values({
                cpf: body.cpf,
                nome: body.nome,
                email: body.email,
                telefone: body.telefone,
            });

            return NextResponse.json({ success: true, message: 'Usuário cadastrado com sucesso.' });
        }
    } catch (error) {
        console.error('Error saving portal user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
