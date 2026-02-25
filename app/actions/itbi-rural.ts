'use server';

import { db } from '@/lib/db';
import { itbiRural } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function createItbiRural(data: any) {
    await db.insert(itbiRural).values({
        protocolo: data.protocolo,
        usuario: data.usuario,
        solicitante: data.solicitante,
        valorUfm: Number(data.valorUfm),
        ano: Number(data.ano),
        adquirente: data.adquirente,
        transmitente: data.transmitente,
        areaTerreno: data.areaTerreno,
        descricaoImovel: data.descricaoImovel,
        natureza: data.natureza,
        tipoImovel: data.tipoImovel,
        qualidadeImovel: data.qualidadeImovel,
        condicaoImovel: data.condicaoImovel,
        situacaoTransmitente: data.situacaoTransmitente,
        valorTransacao: Number(data.valorTransacao),
        valorItbi: Number(data.valorItbi),
        taxaExpediente: Number(data.taxaExpediente || 0),
        observacoes: data.observacoes,
    });

    revalidatePath('/dashboard/itbi-rural');
}

export async function getItbisRural() {
    return await db.select().from(itbiRural).orderBy(desc(itbiRural.id));
}

export async function getItbiRural(id: number) {
    const result = await db.select().from(itbiRural).where(eq(itbiRural.id, id));
    return result[0] || null;
}

export async function updateItbiRural(id: number, data: any) {
    await db.update(itbiRural).set({
        protocolo: data.protocolo,
        usuario: data.usuario,
        solicitante: data.solicitante,
        valorUfm: Number(data.valorUfm),
        ano: Number(data.ano),
        adquirente: data.adquirente,
        transmitente: data.transmitente,
        areaTerreno: data.areaTerreno,
        descricaoImovel: data.descricaoImovel,
        natureza: data.natureza,
        tipoImovel: data.tipoImovel,
        qualidadeImovel: data.qualidadeImovel,
        condicaoImovel: data.condicaoImovel,
        situacaoTransmitente: data.situacaoTransmitente,
        valorTransacao: Number(data.valorTransacao),
        valorItbi: Number(data.valorItbi),
        taxaExpediente: Number(data.taxaExpediente || 0),
        observacoes: data.observacoes,
    }).where(eq(itbiRural.id, id));

    revalidatePath('/dashboard/itbi-rural');
}

export async function deleteItbiRural(id: number) {
    await db.delete(itbiRural).where(eq(itbiRural.id, id));
    revalidatePath('/dashboard/itbi-rural');
}
