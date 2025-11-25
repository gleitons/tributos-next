'use server';

import { db } from '@/lib/db';
import { vtnYears } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getVTNYears() {
    return await db.select().from(vtnYears).orderBy(desc(vtnYears.ano));
}

export async function getVTNByYear(ano: number) {
    const result = await db.select().from(vtnYears).where(eq(vtnYears.ano, ano));
    return result[0] || null;
}

export async function saveVTN(formData: FormData) {
    const ano = parseInt(formData.get('ano') as string);
    const aptidaoBoa = parseFloat(formData.get('aptidaoBoa') as string);
    const aptidaoRegular = parseFloat(formData.get('aptidaoRegular') as string);
    const aptidaoRestrita = parseFloat(formData.get('aptidaoRestrita') as string);
    const pastagemPlantada = parseFloat(formData.get('pastagemPlantada') as string);
    const pastagemNatural = parseFloat(formData.get('pastagemNatural') as string);
    const reserva = parseFloat(formData.get('reserva') as string);

    const existing = await getVTNByYear(ano);

    if (existing) {
        await db.update(vtnYears).set({
            aptidaoBoa,
            aptidaoRegular,
            aptidaoRestrita,
            pastagemPlantada,
            pastagemNatural,
            reserva,
        }).where(eq(vtnYears.ano, ano));
    } else {
        await db.insert(vtnYears).values({
            ano,
            aptidaoBoa,
            aptidaoRegular,
            aptidaoRestrita,
            pastagemPlantada,
            pastagemNatural,
            reserva,
        });
    }

    revalidatePath('/dashboard/avaliacao-venal-rural/configuracao-vtn');
    revalidatePath('/dashboard/avaliacao-venal-rural/nova');
}
