import { getItbiRural } from "@/app/actions/itbi-rural";
import ItbiRuralForm from "../../components/ItbiRuralForm";
import { notFound } from "next/navigation";

export default async function EditarItbiRuralPage({ params }: { params: { id: string } }) {
    const itbi = await getItbiRural(parseInt(params.id));

    if (!itbi) {
        notFound();
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Editar ITBI Rural</h1>
                <p className="text-gray-600">Altere os dados do protocolo {itbi.protocolo}.</p>
            </div>
            <ItbiRuralForm initialData={itbi} />
        </div>
    );
}
