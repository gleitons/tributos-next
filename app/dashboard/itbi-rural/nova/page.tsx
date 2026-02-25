import ItbiRuralForm from "../components/ItbiRuralForm";

export default function NovaItbiRuralPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Novo ITBI Rural</h1>
                <p className="text-gray-600">Preencha os dados abaixo para gerar um novo ITBI de imóvel rural.</p>
            </div>
            <ItbiRuralForm />
        </div>
    );
}
