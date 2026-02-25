import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

function isAuthenticated() {
    const cookieStore = cookies();
    const token = cookieStore.get('bg-gray-800');
    return token?.value === process.env.NEXT_PUBLIC_TOKEN;
}

export async function PUT(request, { params }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const id = parseInt(params.id);
        const body = await request.json();

        const result = await db.update(users)
            .set({
                nome: body.nome,
                sobrenome: body.sobrenome,
                email: body.email,
                password: body.password,
                isAdmin: body.isAdmin,
                status: body.status,
            })
            .where(eq(users.id, id))
            .returning();

        if (result.length === 0) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const id = parseInt(params.id);
        const result = await db.delete(users).where(eq(users.id, id)).returning();

        if (result.length === 0) {
            return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Usuário removido' });
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
