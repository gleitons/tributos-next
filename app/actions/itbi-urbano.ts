'use server';

import { db } from '@/lib/db';
import { itbiUrbano } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function createItbiUrbano(data: any) {
    await db.insert(itbiUrbano).values({
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

    revalidatePath('/dashboard/itbi-urbano');
}

export async function getItbisUrbano() {
    return await db.select().from(itbiUrbano).orderBy(desc(itbiUrbano.id));
}

export async function getItbiUrbano(id: number) {
    const result = await db.select().from(itbiUrbano).where(eq(itbiUrbano.id, id));
    return result[0] || null;
}

export async function updateItbiUrbano(id: number, data: any) {
    await db.update(itbiUrbano).set({
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
    }).where(eq(itbiUrbano.id, id));

    revalidatePath('/dashboard/itbi-urbano');
}

export async function deleteItbiUrbano(id: number) {
    await db.delete(itbiUrbano).where(eq(itbiUrbano.id, id));
    revalidatePath('/dashboard/itbi-urbano');
}
