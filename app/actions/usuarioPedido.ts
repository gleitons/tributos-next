"use server"

import { db } from "@/lib/db";
import { usuarioPedido } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Criar ou Atualizar
export async function salvarUsuarioPedido(formData: FormData) {
    const id = formData.get('id') ? Number(formData.get('id')) : null;

    const data = {
        cpf: formData.get('cpf') as string,
        nome: formData.get('nome') as string,
        email: formData.get('email') as string,
        idItbi: Number(formData.get('idItbi')),
        registrado: formData.get('registrado') === 'on',
    };

    if (id) {
        await db.update(usuarioPedido).set(data).where(eq(usuarioPedido.id, id));
    } else {
        await db.insert(usuarioPedido).values(data);
    }

    revalidatePath('/cadastro');
}

export async function getUsuarioPedido(cpf?: string) {
    if (!cpf) return [];
    const usuario = await db.select().from(usuarioPedido).where(eq(usuarioPedido.cpf, cpf));
    return usuario;
}

// Excluir
export async function excluirUsuarioPedido(id: number) {
    await db.delete(usuarioPedido).where(eq(usuarioPedido.id, id));
    revalidatePath('/cadastro');
}
