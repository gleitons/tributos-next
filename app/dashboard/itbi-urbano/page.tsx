import NewVersionNotice from "../components/NewVersionNotice";
import { getItbisUrbano, deleteItbiUrbano } from "@/app/actions/itbi-urbano";
import Link from "next/link";
import { FaPlus, FaEdit, FaTrash, FaPrint } from 'react-icons/fa';

export default async function ItbiUrbanoPage() {
  const itbis = await getItbisUrbano();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">ITBI Urbano</h1>
        <Link
          href="/dashboard/itbi-urbano/nova"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition shadow"
        >
          <FaPlus /> Novo ITBI Urbano
        </Link>
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
                    Nenhum ITBI Urbano encontrado.
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
                      {itbi.solicitante}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {itbi.dataCriacao ? new Date(itbi.dataCriacao).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-700">
                      {itbi.valorItbi?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/dashboard/itbi-urbano/${itbi.id}/editar`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Editar"
                        >
                          <FaEdit size={18} />
                        </Link>
                        <Link
                          href={`/dashboard/itbi-urbano/${itbi.id}/imprimir`}
                          className="text-gray-600 hover:text-gray-900"
                          title="Imprimir"
                        >
                          <FaPrint size={18} />
                        </Link>
                        <form action={async () => {
                          'use server';
                          await deleteItbiUrbano(itbi.id);
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
