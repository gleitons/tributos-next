import Link from "next/link";
import VerEmpresa from "../components/VerEmpresa";

const importCadastros = async () => {
  const link = "http://localhost:3000" || process.env.VERCEL_URL;
  try {
    const resp = await fetch(`${link}/api/informacoes`, { cache: "no-store" });
    const data = await resp.json();
    data.sort((a, b) => a.empresa.localeCompare(b.empresa));

    return resp.ok ? data : [];
  } catch (error) {
    console.error("Erro ao solicitar:", error);
    return [];
  }
};

export default async function Page() {
  const cadastro = await importCadastros();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Dados Fiscais de Contribuintes
      </h2>
      <p className="text-center text-gray-600 text-sm">
        Sala Mineira do Empreendedor
      </p>

      {/* Seção de Cadastro */}
      <div className="mt-4 flex justify-center">
        <Link
          href="https://docs.google.com/spreadsheets/d/12BlFnJ-jdrLi_JQPBYvHervxePaX5lHMEjIh4eDVkXQ/edit?gid=0#gid=0"
          target="_blank"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Novo Cadastro
        </Link>
      </div>

      {/* Lista de Empresas */}
      <div className="mt-6 max-h-[450px] overflow-auto bg-white shadow-md rounded-lg p-4">
        <ul className="divide-y divide-gray-200 pb-80">
          {cadastro.length > 0 ? (
            cadastro.map((e, index) => <VerEmpresa key={index} dadosEmpresa={e} />)
          ) : (
            <p className="text-center text-gray-500 py-4">Nenhuma empresa encontrada.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
