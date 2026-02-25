import { db } from "@/lib/db";
import { informacoes } from "@/lib/schema";
import { eq } from "drizzle-orm";
import EditarDadosClient from "./EditarDadosClient";

export default async function EditarPage({ params }) {
    const id = parseInt(params.id);

    let registro = null;
    try {
        const result = await db.select().from(informacoes).where(eq(informacoes.id, id));
        if (result.length > 0) {
            registro = result[0];
        }
    } catch (error) {
        console.error("Erro ao buscar registro:", error);
    }

    if (!registro) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Registro não encontrado.</p>
            </div>
        );
    }

    return <EditarDadosClient initialData={registro} />;
}
