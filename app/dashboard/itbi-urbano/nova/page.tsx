import ItbiRuralForm from "../components/ItbiRuralForm";
import { db } from '@/lib/db';
import { itbiRural } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function NovaItbiRuralPage({ searchParams }: { searchParams: { id?: string } }) {
    let initialData = undefined;

    if (searchParams?.id) {
        const result = await db.select().from(itbiRural).where(eq(itbiRural.id, parseInt(searchParams.id)));
        if (result.length > 0) {
            initialData = result[0];
        }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    {initialData ? `Atender ITBI Rural #${initialData.id}` : 'Novo ITBI Rural'}
                </h1>
                <p className="text-gray-600">Preencha e confirme os dados abaixo para gerar a guia oficial de ITBI de imóvel rural.</p>
            </div>
            <ItbiRuralForm initialData={initialData} />
        </div>
    );
}
