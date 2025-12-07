'use server';

import { db } from '@/lib/db';
import { ruralValuations } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function createRuralValuation(data: any) {
    await db.insert(ruralValuations).values({
        protocolo: data.protocolo,
        anoProtocolo: data.anoProtocolo,
        anoVtn: data.anoVtn,
        usuario: data.usuario,
        solicitante: data.solicitante,
        nomeImovel: data.nomeImovel,
        denominacao: data.denominacao,
        endereco: data.endereco,
        matricula: data.matricula,
        folha: data.folha,
        livro: data.livro,
        registroData: data.registroData,
        generoProprietario: data.generoProprietario,
        proprietario: data.proprietario,
        cpfCnpj: data.cpfCnpj,
        identidade: data.identidade,
        enderecoProprietario: data.enderecoProprietario,
        logradouroProprietario: data.logradouroProprietario,
        numeroProprietario: data.numeroProprietario,
        complementoProprietario: data.complementoProprietario,
        bairroProprietario: data.bairroProprietario,
        cidadeProprietario: data.cidadeProprietario,
        estadoProprietario: data.estadoProprietario,
        cepProprietario: data.cepProprietario,
        conjuge: data.conjuge,
        cpfConjuge: data.cpfConjuge,
        identidadeConjuge: data.identidadeConjuge,
        areaTotal: data.areaTotal,
        areaAptidaoBoa: data.areaAptidaoBoa,
        areaAptidaoRegular: data.areaAptidaoRegular,
        areaAptidaoRestrita: data.areaAptidaoRestrita,
        areaPastagemPlantada: data.areaPastagemPlantada,
        areaPastagemNatural: data.areaPastagemNatural,
        areaReserva: data.areaReserva,
        valorTerraNua: data.valorTerraNua,
        valorConstrucoes: data.valorConstrucoes,
        valorCulturas: data.valorCulturas,
        valorTotal: data.valorTotal,
        observacoes: data.observacoes,
    });

    revalidatePath('/dashboard/avaliacao-venal-rural');
}

export async function getRuralValuations() {
    return await db.select().from(ruralValuations).orderBy(desc(ruralValuations.id));
}

export async function getRuralValuation(id: number) {
    const result = await db.select().from(ruralValuations).where(eq(ruralValuations.id, id));
    return result[0];
}

export async function updateRuralValuation(id: number, data: any) {
    await db.update(ruralValuations).set({
        protocolo: data.protocolo,
        anoProtocolo: data.anoProtocolo,
        anoVtn: data.anoVtn,
        usuario: data.usuario,
        solicitante: data.solicitante,
        nomeImovel: data.nomeImovel,
        denominacao: data.denominacao,
        endereco: data.endereco,
        matricula: data.matricula,
        folha: data.folha,
        livro: data.livro,
        registroData: data.registroData,
        generoProprietario: data.generoProprietario,
        proprietario: data.proprietario,
        cpfCnpj: data.cpfCnpj,
        identidade: data.identidade,
        enderecoProprietario: data.enderecoProprietario,
        logradouroProprietario: data.logradouroProprietario,
        numeroProprietario: data.numeroProprietario,
        complementoProprietario: data.complementoProprietario,
        bairroProprietario: data.bairroProprietario,
        cidadeProprietario: data.cidadeProprietario,
        estadoProprietario: data.estadoProprietario,
        cepProprietario: data.cepProprietario,
        conjuge: data.conjuge,
        cpfConjuge: data.cpfConjuge,
        identidadeConjuge: data.identidadeConjuge,
        areaTotal: data.areaTotal,
        areaAptidaoBoa: data.areaAptidaoBoa,
        areaAptidaoRegular: data.areaAptidaoRegular,
        areaAptidaoRestrita: data.areaAptidaoRestrita,
        areaPastagemPlantada: data.areaPastagemPlantada,
        areaPastagemNatural: data.areaPastagemNatural,
        areaReserva: data.areaReserva,
        valorTerraNua: data.valorTerraNua,
        valorConstrucoes: data.valorConstrucoes,
        valorCulturas: data.valorCulturas,
        valorTotal: data.valorTotal,
        observacoes: data.observacoes,
    }).where(eq(ruralValuations.id, id));

    revalidatePath('/dashboard/avaliacao-venal-rural');
}

export async function deleteRuralValuetion(id:number) {
    try {
        await db.delete(ruralValuations)
            .where(eq(ruralValuations.id, id));

        // Atualiza a tela para sumir o item deletado
        revalidatePath('/dashboard/avaliacao-venal-rural'); 
    } catch (error) {
        console.error("Erro ao apagar avaliação:", error);
        throw new Error("Falha ao apagar a avaliação.");
    }
}