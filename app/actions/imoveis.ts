'use server'

import { db } from '@/lib/db';
import { imoveis } from './schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// Criar ou Atualizar
export async function salvarImovel(formData: FormData) {
  const id = formData.get('id') ? Number(formData.get('id')) : null;

  const data = {
    inscricaoMunicipal: formData.get('inscricaoMunicipal') as string,
    matricula: formData.get('matricula') as string,
    logradouro: formData.get('logradouro') as string,
    numero: formData.get('numero') as string,
    bairro: formData.get('bairro') as string,
    numeroSetor: formData.get('numeroSetor') as string,
    tipo: formData.get('tipo') as any,
    areaTotal: Number(formData.get('areaTotal')),
    registrado: formData.get('registrado') === 'on',
  };

  if (id) {
    await db.update(imoveis).set(data).where(eq(imoveis.id, id));
  } else {
    await db.insert(imoveis).values(data);
  }

  revalidatePath('/cadastro');
}

// Excluir
export async function excluirImovel(id: number) {
  await db.delete(imoveis).where(eq(imoveis.id, id));
  revalidatePath('/cadastro');
}