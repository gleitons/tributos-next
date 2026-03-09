import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { itbiRural } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const usuario = searchParams.get('usuario');
    const status = searchParams.get('status');

    try {
        let query;

        // Se passar "usuario", retorna só os daquele CPF
        if (usuario) {
            query = await db.select().from(itbiRural).where(eq(itbiRural.usuario, usuario)).orderBy(desc(itbiRural.id));
        } else if (status) {
            query = await db.select().from(itbiRural).where(eq(itbiRural.status, status)).orderBy(desc(itbiRural.id));
        } else {
            // Se não, retorna tudo pra tabela dos servidores
            query = await db.select().from(itbiRural).orderBy(desc(itbiRural.id));
        }

        return NextResponse.json(query);
    } catch (error) {
        console.error('Error fetching ITBI Rural:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        await db.insert(itbiRural).values({
            protocolo: body.protocolo,
            usuario: body.usuario, // O CPF do Logado
            solicitante: body.solicitante,
            valorUfm: body.valorUfm,
            ano: body.ano,
            adquirente: body.adquirente,
            transmitente: body.transmitente,
            areaTerreno: body.areaTerreno,
            descricaoImovel: body.descricaoImovel,
            natureza: body.natureza,
            tipoImovel: body.tipoImovel,
            qualidadeImovel: body.qualidadeImovel,
            condicaoImovel: body.condicaoImovel,
            situacaoTransmitente: body.situacaoTransmitente,
            valorTransacao: body.valorTransacao,
            valorItbi: body.valorItbi,
            taxaExpediente: body.taxaExpediente,
            observacoes: body.observacoes,
            status: 'PENDENTE',
        });

        return NextResponse.json({ success: true, message: 'Solicitação gerada com sucesso.' });
    } catch (error) {
        console.error('Error saving ITBI:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        if (!body.id || !body.status) {
            return NextResponse.json({ error: 'ID and Status are required' }, { status: 400 });
        }

        await db.update(itbiRural)
            .set({ status: body.status }) // 'Atendida' ou 'Paga'
            .where(eq(itbiRural.id, body.id));

        return NextResponse.json({ success: true, message: 'Status atualizado com sucesso.' });
    } catch (error) {
        console.error('Error updating ITBI status:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error },
            { status: 500 }
        );
    }
}
