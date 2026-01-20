'use server';

import { db } from '@/lib/db';
import { urbanValuations } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getUrbanValuations() {
    try {
        const valuations = await db.select().from(urbanValuations).orderBy(desc(urbanValuations.id));
        return valuations;
    } catch (error) {
        console.error('Error fetching urban valuations:', error);
        return [];
    }
}

export async function getUrbanValuation(id: number) {
    try {
        const valuation = await db.select().from(urbanValuations).where(eq(urbanValuations.id, id));
        return valuation[0] || null;
    } catch (error) {
        console.error('Error fetching urban valuation:', error);
        return null;
    }
}

export async function createUrbanValuation(data: any) {
    console.log(data)
    try {
        const result = await db.insert(urbanValuations).values({
            protocolo: data.protocolo,
            ano: data.ano ? parseInt(data.ano) : new Date().getFullYear(),
            usuarioId: data.usuarioId ? parseInt(data.usuarioId) : null,
            solicitante: data.solicitante,
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            tipoAcabamento: parseFloat(data.tipoAcabamento),
            setor: parseFloat(data.setor),
            numeroSetor: data.numeroSetor,
            quadra: data.quadra,
            lote: data.lote,
            areaLote: parseFloat(data.areaLote),
            areaConstrucao: parseFloat(data.areaConstrucao),
            valorVenal: parseFloat(data.valorVenal),
            observacoes: data.observacoes,
        }).returning({ id: urbanValuations.id });

        revalidatePath('/dashboard/avaliacao-venal-urbana');
        return { success: true, id: result[0].id };
    } catch (error) {
        console.error('Error creating urban valuation:', error);
        return { success: false, error: 'Failed to create valuation' };
    }
}

export async function updateUrbanValuation(id: number, data: any) {
    try {
        await db.update(urbanValuations).set({
            protocolo: data.protocolo,
            ano: data.ano ? parseInt(data.ano) : undefined,
            usuarioId: data.usuarioId ? parseInt(data.usuarioId) : null,
            solicitante: data.solicitante,
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            tipoAcabamento: parseFloat(data.tipoAcabamento),
            setor: parseFloat(data.setor),
            numeroSetor: data.numeroSetor,
            quadra: data.quadra,
            lote: data.lote,
            areaLote: parseFloat(data.areaLote),
            areaConstrucao: parseFloat(data.areaConstrucao),
            valorVenal: parseFloat(data.valorVenal),
            observacoes: data.observacoes,
        }).where(eq(urbanValuations.id, id));

        revalidatePath('/dashboard/avaliacao-venal-urbana');
        revalidatePath(`/dashboard/avaliacao-venal-urbana/${id}`);
        return { success: true };
    } catch (error) {
        console.error('Error updating urban valuation:', error);
        return { success: false, error: 'Failed to update valuation' };
    }
}

export async function deleteUrbanValuation(id: number) {
    try {
        await db.delete(urbanValuations).where(eq(urbanValuations.id, id));
        revalidatePath('/dashboard/avaliacao-venal-urbana');
        return { success: true };
    } catch (error) {
        console.error('Error deleting urban valuation:', error);
        return { success: false, error: 'Failed to delete valuation' };
    }
}
