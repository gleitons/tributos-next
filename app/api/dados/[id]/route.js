import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { informacoes } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

function isAuthenticated() {
    const cookieStore = cookies();
    const token = cookieStore.get('bg-gray-800');
    return token?.value === process.env.NEXT_PUBLIC_TOKEN;
}

// GET: Get single record
export async function GET(request, { params }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const id = parseInt(params.id);
        const data = await db.select().from(informacoes).where(eq(informacoes.id, id));

        if (data.length === 0) {
            return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}

// PUT: Update record
export async function PUT(request, { params }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const id = parseInt(params.id);
        const body = await request.json();

        const result = await db.update(informacoes)
            .set({
                empresa: body.empresa,
                cnpj: body.cnpj,
                inscricaoEstadual: body.inscricaoEstadual,
                inscricaoMunicipal: body.inscricaoMunicipal,
                cpf: body.cpf,
                fantasia: body.fantasia,
                telefone: body.telefone,
                dataNascimento: body.dataNascimento,
                email: body.email,
                endereco: body.endereco,
                numero: body.numero,
                bairro: body.bairro,
                cep: body.cep,
                cidade: body.cidade,
                estado: body.estado,
                dataAbertura: body.dataAbertura,
                senhaSiare: body.senhaSiare,
                senhaGov: body.senhaGov,
                senhaNotaFiscal: body.senhaNotaFiscal,
                codigoSimples: body.codigoSimples,
                titulo: body.titulo,
                situacao: body.situacao,
                mei: body.mei,
                outrasInformacoes: body.outrasInformacoes,
                atividadePrincipal: body.atividadePrincipal,
                atividadeSecundaria: body.atividadeSecundaria,
                regularize: body.regularize,
            })
            .where(eq(informacoes.id, id))
            .returning();

        revalidatePath('/dashboard/dados');
        revalidatePath(`/dashboard/dados/${id}`);

        if (result.length === 0) {
            return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}

// DELETE: Delete record
export async function DELETE(request, { params }) {
    if (!isAuthenticated()) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
        const id = parseInt(params.id);
        const result = await db.delete(informacoes).where(eq(informacoes.id, id)).returning();

        revalidatePath('/dashboard/dados');

        if (result.length === 0) {
            return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Registro removido' });
    } catch (error) {
        console.error('Erro ao remover:', error);
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
}
