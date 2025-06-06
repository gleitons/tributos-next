import Link from "next/link";
import VerEmpresa from "../components/VerEmpresa";

const importCadastros = async () => {
    try {
        const url = 'https://tributos.netlify.app/api/informacoes';

        const resp = await fetch(url, {
            cache: "no-store",
            next: { revalidate: 0 },
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!resp.ok) throw new Error("Erro ao buscar dados");

        const data = await resp.json();

        return data.sort((a, b) => a.empresa.localeCompare(b.empresa));
    } catch (error) {
        console.error("Erro ao solicitar:", error);
        return [];
    }
};

export default async function Page() {

    const cadastros = await importCadastros();

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
                Dados Fiscais de Contribuintes
            </h2>
            <p className="text-center text-gray-600 text-sm">
                Sala Mineira do Empreendedor
            </p>

           
          


            <div className="mt-6 max-h-[80vh] relative flex overflow-auto pb-80 bg-white shadow-md rounded-lg p-4">
                <ul className="divide-y w-2/3 divide-gray-200  ">
                    {cadastros.length > 0 ? (
                        cadastros.map((e, index) => {
                            const colorir = index % 2 === 0 ? 'bg-white' : 'bg-gray-200';
                            return <VerEmpresa key={index} cor={colorir} dadosEmpresa={e} />;
                        })
                    ) : (
                        <p className="text-center text-gray-500 py-4">Nenhum dado encontrado.</p>
                    )}
                    <div className="pb-80">

                    </div>
                </ul>
                <div className="relative w-1/3">
                    <div className="sticky top-4 left-0 bg-white shadow-lg rounded-2xl p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            <span className="font-semibold">Clique na empresa</span> para mais informações sobre seus <span className="font-semibold">dados fiscais</span>.
                            A <span className="text-blue-500">Sala Mineira do Empreendedor</span> de <span className="text-blue-500">Lagoa dos Patos - MG</span> está à disposição para auxiliar contribuintes com informações e suporte.
                        </p>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Link
                            href="https://docs.google.com/spreadsheets/d/12BlFnJ-jdrLi_JQPBYvHervxePaX5lHMEjIh4eDVkXQ/edit?gid=0#gid=0"
                            target="_blank"
                            className="bg-blue-600 text-white px-5 py-1 rounded-lg hover:bg-blue-700 transition"
                        >
                            ➕ Novo Cadastro
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
