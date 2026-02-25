import { getItbiUrbano } from "@/app/actions/itbi-urbano";
import ItbiUrbanoForm from "../../components/ItbiUrbanoForm";
import { notFound } from "next/navigation";

export default async function EditarItbiUrbanoPage({ params }: { params: { id: string } }) {
    const itbi = await getItbiUrbano(parseInt(params.id));

    if (!itbi) {
        notFound();
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Editar ITBI Urbano</h1>
                <p className="text-gray-600">Altere os dados do protocolo {itbi.protocolo}.</p>
            </div>
            <ItbiUrbanoForm initialData={itbi} />
        </div>
    );
}
