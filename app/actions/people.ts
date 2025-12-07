'use server';

import { db } from '@/lib/db';
import { people } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq, like, or } from 'drizzle-orm';

export async function createPerson(data: any) {
    await db.insert(people).values({
        tipo: data.tipo,
        nome: data.nome,
        cpfCnpj: data.cpfCnpj,
        rg: data.rg,
        telefone: data.telefone,
        email: data.email,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
    });

    revalidatePath('/dashboard/pessoas');
}

export async function getPeople(search?: string) {
    if (search) {
        return await db.select().from(people).where(
            or(
                like(people.nome, `%${search}%`),
                like(people.cpfCnpj, `%${search}%`)
            )
        ).orderBy(desc(people.id));
    }
    return await db.select().from(people).orderBy(desc(people.id));
}

export async function getPerson(id: number) {
    const result = await db.select().from(people).where(eq(people.id, id));
    return result[0];
}

export async function updatePerson(id: number, data: any) {
    await db.update(people).set({
        tipo: data.tipo,
        nome: data.nome,
        cpfCnpj: data.cpfCnpj,
        rg: data.rg,
        telefone: data.telefone,
        email: data.email,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
    }).where(eq(people.id, id));

    revalidatePath('/dashboard/pessoas');
}

export async function deletePerson(id: number) {
    await db.delete(people).where(eq(people.id, id));
    revalidatePath('/dashboard/pessoas');
}
