import Link from "next/link";
import { FaCheck, FaEye } from 'react-icons/fa';
import { db } from '@/lib/db';
import { itbiRural } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import AtenderButton from './AtenderButton';

export const dynamic = 'force-dynamic';

export default async function SolicitacoesItbiRuralPage() {
    const pendentes = await db.select().from(itbiRural).where(eq(itbiRural.status, 'PENDENTE')).orderBy(desc(itbiRural.id));

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Solicitações Pendentes - ITBI Rural</h1>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border border-orange-200">
                <div className="bg-orange-50 p-4 border-b border-orange-200 text-orange-800 font-semibold">
                    Mostrando as solicitações feitas pelos contribuintes aguardando atendimento.
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Protocolo</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Solicitante (CPF)</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Área</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Valor Estimado ITBI</th>
                                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pendentes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Nenhuma solicitação pendente no momento.
                                    </td>
                                </tr>
                            ) : (
                                pendentes.map((itbi) => (
                                    <tr key={itbi.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                            {itbi.protocolo || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{itbi.solicitante}</div>
                                            <div className="text-xs text-gray-400">CPF: {itbi.usuario}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {itbi.dataCriacao ? new Date(itbi.dataCriacao).toLocaleDateString('pt-BR') : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {itbi.areaTerreno}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-700">
                                            {itbi.valorItbi?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    href={`/dashboard/itbi-rural/nova?id=${itbi.id}`}
                                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 items-center justify-center flex gap-2 text-xs border border-gray-300"
                                                    title="Avaliar"
                                                >
                                                    <FaEye size={12} /> Avaliar
                                                </Link>
                                                <AtenderButton id={itbi.id} />
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
