'use server';

import { db } from '@/lib/db';
import { ufm } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getUfmByYear(ano: number) {
    try {
        const result = await db.select().from(ufm).where(eq(ufm.ano, ano));
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching UFM:', error);
        return null;
    }
}

export async function updateUfm(ano: number, valor: number) {
    try {
        const existing = await getUfmByYear(ano);

        if (existing) {
            await db.update(ufm).set({ valor }).where(eq(ufm.ano, ano));
        } else {
            await db.insert(ufm).values({ ano, valor });
        }

        revalidatePath('/dashboard/avaliacao-venal-urbana');
        return { success: true };
    } catch (error) {
        console.error('Error updating UFM:', error);
        return { success: false, error: 'Failed to update UFM' };
    }
}
