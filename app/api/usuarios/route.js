import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';

function isAuthenticated() {
    const cookieStore = cookies();
    const token = cookieStore.get('bg-gray-800');
    return token?.value === process.env.NEXT_PUBLIC_TOKEN;
}

export async function GET() {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const allUsers = await db.select({
            id: users.id,
            nome: users.nome,
            sobrenome: users.sobrenome,
            email: users.email,
            isAdmin: users.isAdmin,
            status: users.status,
            matricula: users.matricula,
        }).from(users).all();
        return NextResponse.json(allUsers);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}

export async function POST(request) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Basic validation
        if (!body.email || !body.password || !body.nome) {
            return NextResponse.json({ error: 'Campos obrigatórios: nome, email e senha' }, { status: 400 });
        }

        const newUser = await db.insert(users).values({
            nome: body.nome,
            sobrenome: body.sobrenome || '',
            email: body.email,
            password: body.password, // In a real app, hash this!
            isAdmin: body.isAdmin || false,
            matricula: body.matricula || String(Date.now()),
            status: 'ativo',
        }).returning();

        return NextResponse.json(newUser[0], { status: 201 });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return NextResponse.json({ error: 'Erro ao criar usuário, email pode já estar em uso' }, { status: 500 });
    }
}
