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

           
          


        <div className="mt-6 flex flex-col md:flex-row gap-6 bg-white shadow-xl rounded-2xl p-6">

    {/* LISTA DE EMPRESAS */}
    <div className="w-full md:w-2/3 max-h-[80vh] overflow-y-auto pr-2 space-y-3">

        <ul className="space-y-3">
            {cadastros.length > 0 ? (
                cadastros.map((e, index) => {
                    const colorir = index % 2 === 0 ? "bg-white" : "bg-gray-100";
                    return (
                        <div
                            key={index}
                            className={`${colorir} hover:bg-blue-50 transition rounded-xl shadow-sm border border-gray-200`}
                        >
                            <VerEmpresa cor={colorir} dadosEmpresa={e} />
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-500 py-4">
                    Nenhum dado encontrado.
                </p>
            )}
        </ul>

    </div>

    {/* LATERAL DIREITA */}
    <div className="w-full md:w-1/3 flex flex-col gap-4">

        {/* Botão Novo Cadastro */}
        <div className="flex justify-center">
            <Link
                href="https://docs.google.com/spreadsheets/d/12BlFnJ-jdrLi_JQPBYvHervxePaX5lHMEjIh4eDVkXQ/edit?gid=0#gid=0"
                target="_blank"
                className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition"
            >
                ➕ Novo Cadastro
            </Link>
        </div>

        {/* Caixa Informativa */}
        <div className="sticky top-6 bg-white shadow-xl rounded-2xl p-5 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                <span className="font-semibold text-gray-900 dark:text-white">Clique na empresa</span>
                &nbsp;para visualizar informações completas sobre seus&nbsp;
                <span className="font-semibold">dados fiscais</span>.
                <br /><br />
                A&nbsp;
                <span className="text-blue-600 font-semibold">Sala Mineira do Empreendedor</span>&nbsp;de&nbsp;
                <span className="text-blue-600 font-semibold">Lagoa dos Patos - MG</span>
                &nbsp;está disponível para auxiliar contribuintes com informações e suporte personalizado.
            </p>
        </div>

    </div>

</div>

        </div>
    );
}
