'use server';

import { db } from '@/lib/db';
import { ncms } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getNCMS() {
    return await db.select().from(ncms).orderBy(desc(ncms.codigo));
}

export async function getNCMSBycodigo(codigo: string) {
    const result = await db.select().from(ncms).where(eq(ncms.codigo, codigo));
    return result[0] || null;
}

export async function saveNCM(formData: FormData) {
    const id = formData.get('id') as string | null;
    const codigo = (formData.get('codigo') as string);
    const descricao = (formData.get('descricao') as string);

    if (id) {
        await db.update(ncms).set({
            codigo,
            descricao,
        }).where(eq(ncms.id, parseInt(id, 10)));
    } else {
        const existing = await getNCMSBycodigo(codigo);
        if (existing) {
            await db.update(ncms).set({
                codigo,
                descricao,
            }).where(eq(ncms.codigo, codigo));
        } else {
            await db.insert(ncms).values({
                codigo,
                descricao,
            });
        }
    }

    revalidatePath('/dashboard/ncm');
}
