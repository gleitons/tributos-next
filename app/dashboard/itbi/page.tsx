'use server';

import { getItbis } from '@/app/actions/itbi';
import Link from 'next/link';
import { FaPlus, FaPrint } from 'react-icons/fa';

export default async function ItbiPage() {
    const itbis = await getItbis();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar ITBI</h1>
                <Link href="/dashboard/itbi/novo" className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                    <FaPlus /> Novo ITBI
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocolo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adquirente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imóvel</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor ITBI</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {itbis.map((itbi) => (
                            <tr key={itbi.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{itbi.protocolo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{itbi.dataTransacao}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{itbi.adquirenteNome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{itbi.imovelDescricao}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {itbi.valorItbi ? itbi.valorItbi.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/dashboard/itbi/${itbi.id}/imprimir`} className="text-indigo-600 hover:text-indigo-900 mr-4" title="Imprimir">
                                        <FaPrint className="inline" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {itbis.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Nenhum ITBI gerado.
                    </div>
                )}
            </div>
        </div>
    );
}
