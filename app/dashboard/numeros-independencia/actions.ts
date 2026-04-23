'use server'

import { db } from '@/lib/db'
import { numerosIndependencia } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export type NumeroIndependencia = typeof numerosIndependencia.$inferSelect
export type NewNumeroIndependencia = typeof numerosIndependencia.$inferInsert

export async function getNumeros() {
    try {
        const numeros = await db.select().from(numerosIndependencia).orderBy(desc(numerosIndependencia.id));
        return { success: true, data: numeros };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function addNumero(data: NewNumeroIndependencia) {
    try {
        const result = await db.insert(numerosIndependencia).values(data).returning();
        revalidatePath('/dashboard/numeros-independencia');
        return { success: true, data: result[0] };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateNumero(id: number, data: Partial<NewNumeroIndependencia>) {
    try {
        const result = await db.update(numerosIndependencia)
            .set(data)
            .where(eq(numerosIndependencia.id, id))
            .returning();
        revalidatePath('/dashboard/numeros-independencia');
        return { success: true, data: result[0] };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteNumero(id: number) {
    try {
        await db.delete(numerosIndependencia).where(eq(numerosIndependencia.id, id));
        revalidatePath('/dashboard/numeros-independencia');
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
