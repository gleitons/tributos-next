import { getRuralValuations } from '@/app/actions/rural-valuation';
import Link from 'next/link';

export default async function RuralValuationPage() {
  const valuations = await getRuralValuations();

  return (
    <div className=" mx-auto">
      <h1 className="text-2xl font-bold mb-6">Avaliações Recentes</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocolo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proprietário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VTN (R$)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (R$)</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {valuations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    Nenhuma avaliação encontrada.
                  </td>
                </tr>
              ) : (
                valuations.map((val) => (
                  <tr key={val.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.protocolo || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.proprietario}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.nomeImovel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.areaTotal} ha</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {val.valorTerraNua.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">R$ {val.valorTotal.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/dashboard/avaliacao-venal-rural/${val.id}/editar`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Editar
                      </Link>
                      <Link href={`/dashboard/avaliacao-venal-rural/${val.id}/imprimir`} className="text-gray-600 hover:text-gray-900">
                        Imprimir
                      </Link>
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