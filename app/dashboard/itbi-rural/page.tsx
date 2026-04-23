import { getItbisRural, deleteItbiRural } from "@/app/actions/itbi-rural";
import { getUsuarioPedido } from "@/app/actions/usuarioPedido";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaPrint } from 'react-icons/fa';


export default async function ItbiRuralPage({ searchParams }: { searchParams: { cpf?: string } }) {
  const cpf = searchParams?.cpf;
  const itbis = await getItbisRural(cpf);
  const usuario = await getUsuarioPedido(cpf);
  // console.log(itbis);
  console.log(usuario);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          ITBI Rural {cpf && <span className="text-blue-600 text-xl font-normal">(Filtrado por CPF: {cpf})</span>}
        </h1>
        <div className="flex gap-2">
          {cpf && (
            <Link
              href="/dashboard/itbi-rural"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition shadow text-sm flex items-center"
            >
              Limpar Filtro
            </Link>
          )}
          <Link
            href="/dashboard/itbi-rural/solicitacoes"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition shadow"
          >
            Solicitações
          </Link>
          <Link
            href="/solicitacao/itbi-rural"
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow"
          >
            Link de Solicitação ITBI Rural
          </Link>
          <Link
            href="/dashboard/itbi-rural/nova"
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow"
          >
            <FaPlus /> Novo ITBI Rural
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Protocolo</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Adquirente</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Solicitante</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Valor ITBI</th>
                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itbis.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Nenhum ITBI Rural encontrado.
                  </td>
                </tr>
              ) : (
                itbis.map((itbi) => (
                  <tr key={itbi.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      {itbi.protocolo || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="max-w-xs truncate" dangerouslySetInnerHTML={{ __html: itbi.adquirente || '' }} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="font-bold text-gray-900">{itbi.nomeUsuario || itbi.solicitante}</div>
                      <div className="text-xs text-gray-600">Solicitante: {itbi.solicitante}</div>
                      <div className="text-xs text-gray-400 font-mono">
                        {/\d/.test(itbi.usuario || '') ? `CPF: ${itbi.usuario}` : `Usuário: ${itbi.usuario}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {itbi.dataCriacao ? new Date(itbi.dataCriacao).toLocaleDateString('pt-BR') : '-'}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                      {itbi.valorItbi?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/dashboard/itbi-rural/${itbi.id}/editar`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <Link
                          href={`/dashboard/itbi-rural/${itbi.id}/imprimir`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Imprimir"
                        >
                          <FaPrint size={18} />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteItbiRural(itbi.id);
                        }} className="inline">
                          <button
                            type="submit"
                            className="text-red-600 hover:text-red-900"
                            title="Apagar"
                          >
                            <FaTrash size={16} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
