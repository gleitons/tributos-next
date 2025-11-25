import { getUrbanValuations } from '@/app/actions/urban-valuation';
import Link from 'next/link';

export default async function UrbanValuationPage() {
    const valuations = await getUrbanValuations();

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Avaliações Urbanas Recentes</h1>
                <Link href="/dashboard/avaliacao-venal-urbana/nova" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Nova Avaliação
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocolo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Solicitante</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área Lote</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Venal (R$)</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {valuations.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                        Nenhuma avaliação encontrada.
                                    </td>
                                </tr>
                            ) : (
                                valuations.map((val) => (
                                    <tr key={val.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.protocolo || '-'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{val.solicitante}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.rua}, {val.numero} - {val.bairro}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{val.areaLote} m²</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">R$ {val.valorVenal.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link href={`/dashboard/avaliacao-venal-urbana/${val.id}/editar`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                                Editar
                                            </Link>
                                            <Link href={`/dashboard/avaliacao-venal-urbana/${val.id}/imprimir`} className="text-gray-600 hover:text-gray-900">
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
