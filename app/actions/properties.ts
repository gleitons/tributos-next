'use server';

import { db } from '@/lib/db';
import { properties } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq, like, or } from 'drizzle-orm';

export async function createProperty(data: any) {
    await db.insert(properties).values({
        tipo: data.tipo,
        descricao: data.descricao,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
        matricula: data.matricula,
        livro: data.livro,
        folha: data.folha,
        areaTotal: data.areaTotal,
        areaAptidaoBoa: data.areaAptidaoBoa,
        areaAptidaoRegular: data.areaAptidaoRegular,
        areaAptidaoRestrita: data.areaAptidaoRestrita,
        areaPastagemPlantada: data.areaPastagemPlantada,
        areaPastagemNatural: data.areaPastagemNatural,
        areaReserva: data.areaReserva,
        areaLote: data.areaLote,
        areaConstrucao: data.areaConstrucao,
        inscricaoMunicipal: data.inscricaoMunicipal,
    });

    revalidatePath('/dashboard/imoveis');
}

export async function getProperties(search?: string) {
    if (search) {
        return await db.select().from(properties).where(
            or(
                like(properties.descricao, `%${search}%`),
                like(properties.matricula, `%${search}%`),
                like(properties.endereco, `%${search}%`)
            )
        ).orderBy(desc(properties.id));
    }
    return await db.select().from(properties).orderBy(desc(properties.id));
}

export async function getProperty(id: number) {
    const result = await db.select().from(properties).where(eq(properties.id, id));
    return result[0];
}

export async function updateProperty(id: number, data: any) {
    await db.update(properties).set({
        tipo: data.tipo,
        descricao: data.descricao,
        endereco: data.endereco,
        numero: data.numero,
        bairro: data.bairro,
        cidade: data.cidade,
        estado: data.estado,
        cep: data.cep,
        matricula: data.matricula,
        livro: data.livro,
        folha: data.folha,
        areaTotal: data.areaTotal,
        areaAptidaoBoa: data.areaAptidaoBoa,
        areaAptidaoRegular: data.areaAptidaoRegular,
        areaAptidaoRestrita: data.areaAptidaoRestrita,
        areaPastagemPlantada: data.areaPastagemPlantada,
        areaPastagemNatural: data.areaPastagemNatural,
        areaReserva: data.areaReserva,
        areaLote: data.areaLote,
        areaConstrucao: data.areaConstrucao,
        inscricaoMunicipal: data.inscricaoMunicipal,
    }).where(eq(properties.id, id));

    revalidatePath('/dashboard/imoveis');
}

export async function deleteProperty(id: number) {
    await db.delete(properties).where(eq(properties.id, id));
    revalidatePath('/dashboard/imoveis');
}
