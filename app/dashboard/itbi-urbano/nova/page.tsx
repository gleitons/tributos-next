import ItbiUrbanoForm from "../components/ItbiUrbanoForm";

export default function NovaItbiUrbanoPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Novo ITBI Urbano</h1>
                <p className="text-gray-600">Preencha os dados abaixo para gerar um novo ITBI de imóvel urbano.</p>
            </div>
            <ItbiUrbanoForm />
        </div>
    );
}
