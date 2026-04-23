"use client";

import { useState } from "react";
import Link from "next/link";
import { FaEye, FaCheck, FaHistory } from 'react-icons/fa';
import AtenderButton from './AtenderButton';

interface ItbiRuralRequest {
    id: number;
    protocolo: string | null;
    protocoloOriginal: string | null;
    usuario: string | null;
    solicitante: string | null;
    nomeUsuario: string | null;
    dataCriacao: string | null;
    areaTerreno: string | null;
    valorItbi: number | null;
    status: string | null;
}

interface PortalUser {
    id: number;
    cpf: string;
    nome: string;
    email: string | null;
    telefone: string | null;
    dataCadastro: string | null;
}

interface SolicitacoesTabsProps {
    pendentes: ItbiRuralRequest[];
    atendidas: ItbiRuralRequest[];
    usuarios: PortalUser[];
}

export default function SolicitacoesTabs({ pendentes, atendidas, usuarios }: SolicitacoesTabsProps) {
    const [activeTab, setActiveTab] = useState<'pendentes' | 'atendidas' | 'usuarios'>('pendentes');

    const requests = activeTab === 'pendentes' ? pendentes : atendidas;
    const isPendente = activeTab === 'pendentes';
    const isAtendida = activeTab === 'atendidas';
    const isUsuarios = activeTab === 'usuarios';

    return (
        <div className="space-y-4">
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('pendentes')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${isPendente
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    Solicitações Pendentes ({pendentes.length})
                </button>
                <button
                    onClick={() => setActiveTab('atendidas')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${isAtendida
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    Solicitações Atendidas ({atendidas.length})
                </button>
                <button
                    onClick={() => setActiveTab('usuarios')}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${isUsuarios
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                >
                    Usuários Cadastrados ({usuarios.length})
                </button>
            </div>

            {isUsuarios ? (
                <div className="bg-white rounded-lg shadow overflow-hidden border border-blue-200">
                    <div className="bg-blue-50 text-blue-800 p-4 border-b border-blue-200 font-semibold">
                        Lista de usuários que se cadastraram no portal de solicitações.
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Nome</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">CPF</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Data Cadastro</th>
                                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {usuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            Nenhum usuário cadastrado no portal ainda.
                                        </td>
                                    </tr>
                                ) : (
                                    usuarios.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                {user.nome}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                {user.cpf}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.dataCadastro ? new Date(user.dataCadastro).toLocaleDateString('pt-BR') : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={`/dashboard/itbi-rural?cpf=${user.cpf}`}
                                                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-100 items-center justify-center inline-flex gap-2 text-xs border border-blue-200 transition"
                                                >
                                                    <FaHistory size={12} /> Ver Pedidos
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className={`bg-white rounded-lg shadow overflow-hidden border ${isPendente ? 'border-orange-200' : 'border-green-200'}`}>
                    <div className={`${isPendente ? 'bg-orange-50 text-orange-800' : 'bg-green-50 text-green-800'} p-4 border-b ${isPendente ? 'border-orange-200' : 'border-green-200'} font-semibold`}>
                        {isPendente
                            ? "Mostrando as solicitações feitas pelos contribuintes aguardando atendimento."
                            : "Mostrando as solicitações que já foram atendidas pelo sistema."}
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
                                {requests.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            Nenhuma solicitação {isPendente ? 'pendente' : 'atendida'} no momento.
                                        </td>
                                    </tr>
                                ) : (
                                    requests.map((itbi) => (
                                        <tr key={itbi.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                                                <div>{itbi.protocolo || "-"}</div>
                                                {itbi.protocoloOriginal && itbi.protocoloOriginal !== itbi.protocolo && (
                                                    <div className="text-xs text-amber-600 font-mono mt-0.5" title="Protocolo original do solicitante">
                                                        📋 {itbi.protocoloOriginal}
                                                    </div>
                                                )}
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
                                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 items-center justify-center flex gap-2 text-xs border border-gray-300 transition"
                                                        title="Visualizar Detalhes"
                                                    >
                                                        <FaEye size={12} /> Avaliar
                                                    </Link>

                                                    {/* Botão para ver todos os pedidos do usuário */}
                                                    <Link
                                                        href={`/dashboard/itbi-rural?cpf=${itbi.usuario}`}
                                                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-100 items-center justify-center flex gap-2 text-xs border border-blue-200 transition"
                                                        title="Ver histórico do usuário"
                                                    >
                                                        <FaHistory size={12} /> Pedidos
                                                    </Link>

                                                    {isPendente && <AtenderButton id={itbi.id} />}
                                                    {!isPendente && (
                                                        <span className="flex items-center gap-1 text-green-600 font-semibold text-xs px-2 py-1 bg-green-50 rounded border border-green-200">
                                                            <FaCheck size={10} /> Atendida
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
