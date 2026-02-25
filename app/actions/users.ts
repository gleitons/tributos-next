'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    const usuarios = await db.select().from(users)
    // console.log(usuarios)
    return usuarios;
    // return await db.select().from(users).orderBy(desc(users.id));
}

export async function getUser(id: number) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
}

export async function createUser(data: any) {
    await db.insert(users).values({
        matricula: data.matricula,
        nome: data.nome,
        sobrenome: data.sobrenome,
        cargo: data.cargo,
        setor: data.setor,
        dataAdmissao: data.dataAdmissao,
        password: data.password || '123456', // In a real app, hash this!
        funcao: data.funcao,
        email: data.email,
        telefone: data.telefone,

        status: data.status || 'ativo',
    });
    revalidatePath('/dashboard/usuarios');
}

export async function updateUser(id: number, data: any) {
    const updateData: any = {
        matricula: data.matricula,
        nome: data.nome,
        sobrenome: data.sobrenome,
        cargo: data.cargo,
        setor: data.setor,
        dataAdmissao: data.dataAdmissao,
        funcao: data.funcao,
        email: data.email,
        telefone: data.telefone,
        status: data.status,
    };

    // Só atualiza a senha se foi preenchida
    if (data.password && data.password.trim() !== '') {
        updateData.password = data.password;
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    revalidatePath('/dashboard/usuarios');
}

export async function deleteUser(id: number) {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath('/dashboard/usuarios');
}
