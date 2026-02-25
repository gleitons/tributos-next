import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { informacoes } from '@/lib/schema';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Helper to check auth
function isAuthenticated() {
    const cookieStore = cookies();
    const token = cookieStore.get('bg-gray-800');
    return token?.value === process.env.NEXT_PUBLIC_TOKEN;
}

// GET: List all informacoes
export async function GET() {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const data = await db.select().from(informacoes).all();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}

// POST: Create new informacao
export async function POST(request) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const result = await db.insert(informacoes).values({
            empresa: body.empresa || '',
            cnpj: body.cnpj || '',
            inscricaoEstadual: body.inscricaoEstadual || '',
            inscricaoMunicipal: body.inscricaoMunicipal || '',
            cpf: body.cpf || '',
            fantasia: body.fantasia || '',
            telefone: body.telefone || '',
            dataNascimento: body.dataNascimento || '',
            email: body.email || '',
            endereco: body.endereco || '',
            numero: body.numero || '',
            bairro: body.bairro || '',
            cep: body.cep || '',
            cidade: body.cidade || '',
            estado: body.estado || '',
            dataAbertura: body.dataAbertura || '',
            senhaSiare: body.senhaSiare || '',
            senhaGov: body.senhaGov || '',
            senhaNotaFiscal: body.senhaNotaFiscal || '',
            codigoSimples: body.codigoSimples || '',
            titulo: body.titulo || '',
            situacao: body.situacao || '',
            mei: body.mei || '',
            outrasInformacoes: body.outrasInformacoes || '',
            atividadePrincipal: body.atividadePrincipal || '',
            atividadeSecundaria: body.atividadeSecundaria || '',
            regularize: body.regularize || '',
        }).returning();

        revalidatePath('/dashboard/dados');
        return NextResponse.json(result[0], { status: 201 });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
