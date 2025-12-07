'use server';

import { db } from '@/lib/db';
import { itbi, people, properties } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq, like, or } from 'drizzle-orm';

export async function createItbi(data: any) {
    await db.insert(itbi).values({
        protocolo: data.protocolo,
        adquirenteId: Number(data.adquirenteId),
        transmitenteId: Number(data.transmitenteId),
        imovelId: Number(data.imovelId),
        natureza: data.natureza,
        qualidadeImovel: data.qualidadeImovel,
        condicaoImovel: data.condicaoImovel,
        situacaoTransmitente: data.situacaoTransmitente,
        valorTransacao: Number(data.valorTransacao),
        valorVenal: Number(data.valorVenal),
        valorItbi: Number(data.valorItbi),
        observacoes: data.observacoes,
    });

    revalidatePath('/dashboard/itbi');
}

export async function getItbis(search?: string) {
    // This is a simplified join. Drizzle ORM query builder is better for this.
    // For now, let's just fetch ITBIs and we might need to fetch related data separately or use a proper join query.
    // Using db.select().from(itbi).leftJoin(...)

    const result = await db.select({
        id: itbi.id,
        protocolo: itbi.protocolo,
        dataTransacao: itbi.dataTransacao,
        adquirenteNome: people.nome,
        imovelDescricao: properties.descricao,
        valorItbi: itbi.valorItbi,
    })
        .from(itbi)
        .leftJoin(people, eq(itbi.adquirenteId, people.id))
        .leftJoin(properties, eq(itbi.imovelId, properties.id))
        .orderBy(desc(itbi.id));

    return result;
}

export async function getItbi(id: number) {
    const result = await db.select({
        itbi: itbi,
        adquirente: people,
        transmitente: {
            id: people.id,
            nome: people.nome,
            cpfCnpj: people.cpfCnpj,
            endereco: people.endereco,
            numero: people.numero,
            bairro: people.bairro,
            cidade: people.cidade,
            estado: people.estado,
            cep: people.cep,
        }, // We need to alias or fetch separately if we join same table twice.
        // Drizzle might handle this if we alias the table.
        // For simplicity in this step, let's just fetch the ITBI and then fetch relations if needed, 
        // OR use aliases. Let's try fetching raw ITBI first and then manual fetch for relations to avoid alias complexity in this snippet.
    }).from(itbi).where(eq(itbi.id, id));

    if (result.length === 0) return null;

    const itbiData = result[0].itbi;

    // Fetch relations manually to be safe with double join on 'people'
    const adquirente = await db.select().from(people).where(eq(people.id, itbiData.adquirenteId!));
    const transmitente = await db.select().from(people).where(eq(people.id, itbiData.transmitenteId!));
    const imovel = await db.select().from(properties).where(eq(properties.id, itbiData.imovelId!));

    return {
        ...itbiData,
        adquirente: adquirente[0],
        transmitente: transmitente[0],
        imovel: imovel[0],
    };
}

export async function updateItbi(id: number, data: any) {
    await db.update(itbi).set({
        protocolo: data.protocolo,
        adquirenteId: Number(data.adquirenteId),
        transmitenteId: Number(data.transmitenteId),
        imovelId: Number(data.imovelId),
        natureza: data.natureza,
        qualidadeImovel: data.qualidadeImovel,
        condicaoImovel: data.condicaoImovel,
        situacaoTransmitente: data.situacaoTransmitente,
        valorTransacao: Number(data.valorTransacao),
        valorVenal: Number(data.valorVenal),
        valorItbi: Number(data.valorItbi),
        observacoes: data.observacoes,
    }).where(eq(itbi.id, id));

    revalidatePath('/dashboard/itbi');
}

export async function deleteItbi(id: number) {
    await db.delete(itbi).where(eq(itbi.id, id));
    revalidatePath('/dashboard/itbi');
}
