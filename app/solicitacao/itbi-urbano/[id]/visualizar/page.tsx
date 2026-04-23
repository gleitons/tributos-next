"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function VisualizarItbiPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string | undefined;
    const [itbi, setItbi] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItbi = async () => {
            try {
                // Fetch all to find the one with this ID (assuming the API returns all if no user filter)
                const res = await fetch("/api/itbi-rural-solicitacao");
                const data = await res.json();
                const found = data.find((item: any) =>
                    item.protocolo === id ||
                    item.protocoloOriginal === id ||
                    item.id.toString() === id
                );

                if (found) {
                    setItbi(found);
                } else {
                    alert("Solicitação não encontrada");
                    router.push("/solicitacao/itbi-rural");
                }
            } catch (error) {
                console.error("Erro ao carregar ITBI:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchItbi();
    }, [id, router]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando documento...</div>;
    if (!itbi) return null;

    const isPaid = itbi.status === "PAGO" || itbi.status === "ATENDIDA";

    const maskValue = (value: string | null | undefined) => {
        if (!value) return "-";
        if (isPaid) return value;
        if (value.length < 5) return "***";
        return value.substring(0, 3) + "****" + value.substring(value.length - 2);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white">
            <div className="max-w-4xl mx-auto flex justify-between items-center mb-6 print:hidden">
                <Link href="/solicitacao/itbi-rural" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
                    ← Voltar para Solicitações
                </Link>
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition shadow-md flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Imprimir Guia
                </button>
            </div>

            <div className="relative bg-white shadow-2xl rounded-sm border border-gray-200 overflow-hidden print:shadow-none print:border-none">

                {/* Watermark Section */}
                {!isPaid && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                        <div className="transform -rotate-45 text-gray-200 text-9xl font-black opacity-30 whitespace-nowrap border-8 border-gray-200 p-10 uppercase tracking-widest">
                            Sem Validade
                        </div>
                    </div>
                )}

                {/* Document Content */}
                <div className="relative z-10 p-12 md:p-16 space-y-10 text-gray-800">

                    {/* Page Header */}
                    <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-black uppercase tracking-tight text-gray-900">Guia de Informações ITBI</h1>
                            <p className="text-gray-500 font-medium text-lg">Prefeitura Municipal de Tributos-Next</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Protocolo</div>
                            <div className="text-2xl font-mono font-bold text-blue-600">#{(itbi.protocoloOriginal || itbi.protocolo)?.toUpperCase()}</div>
                            {itbi.protocoloOriginal && itbi.protocoloOriginal !== itbi.protocolo && (
                                <div className="text-xs text-gray-500 mt-1 font-semibold uppercase tracking-wider">Secretaria: #{itbi.protocolo}</div>
                            )}
                        </div>
                    </div>

                    {/* Status Banner */}
                    {!isPaid && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 print:hidden">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 font-bold">
                                        ESTE DOCUMENTO NÃO TEM VALIDADE PARA PAGAMENTO.
                                    </p>
                                    <p className="text-xs text-red-600">
                                        Aguarde a análise do gestor para liberação da guia definitiva. Alguns dados estão ocultos para sua segurança.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPaid && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4 print:hidden">
                            <p className="text-sm text-green-700 font-bold">DOCUMENTO ORIGINAL E VÁLIDO</p>
                            <p className="text-xs text-green-600">Este documento foi emitido e validado eletronicamente.</p>
                        </div>
                    )}

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        <section className="space-y-6">
                            <div>
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">Adquirente</h2>
                                <p className="text-gray-900 font-medium leading-relaxed">{maskValue(itbi.adquirente)}</p>
                            </div>
                            <div>
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">Transmitente</h2>
                                <p className="text-gray-900 font-medium leading-relaxed">{maskValue(itbi.transmitente)}</p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div>
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b pb-1">Imóvel</h2>
                                <p className="text-gray-900 font-medium leading-relaxed">{maskValue(itbi.descricaoImovel)}</p>
                                <p className="mt-2 text-sm"><strong>Área:</strong> {itbi.areaTerreno}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Natureza</h2>
                                    <p className="text-gray-900 font-semibold">{itbi.natureza}</p>
                                </div>
                                <div>
                                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tipo</h2>
                                    <p className="text-gray-900 font-semibold">{itbi.tipoImovel}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Financial Section */}
                    <div className="bg-gray-50 rounded-lg p-8 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Valor da Transação</span>
                                <p className="text-xl font-bold text-gray-900">
                                    {itbi.valorTransacao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Taxa de Expediente</span>
                                <p className="text-xl font-bold text-gray-900">
                                    {(itbi.taxaExpediente * 2 || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                            <div className="space-y-1 bg-blue-600 rounded-md p-4 text-white">
                                <span className="text-xs font-bold uppercase tracking-widest opacity-80">Total ITBI</span>
                                <p className="text-2xl font-black">
                                    {(itbi.valorItbi + itbi.taxaExpediente * 2)?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Section */}
                    {itbi.observacoes && (
                        <div className="space-y-3">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b pb-1">Informações Adicionais / Observações para o Boleto</h2>
                            <p className="text-gray-700 italic leading-relaxed whitespace-pre-wrap">
                                &quot;{itbi.observacoes}&quot;
                            </p>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="pt-12 border-t border-gray-100 flex justify-between items-end">
                        <div className="text-center w-full max-w-xs border-t border-gray-400 pt-2">
                            <p className="text-xs font-bold text-gray-500">Assinatura do Responsável</p>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                            <p>Emitido em {new Date(itbi.dataCriacao).toLocaleString('pt-BR')}</p>
                            <p>Sistema Tributos-Next - Autenticidade verificável via QR Code</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Print specific instructions */}
            <p className="mt-6 text-center text-sm text-gray-400 print:hidden italic">
                Dica: Para um melhor resultado, habilite a impressão de &quot;Gráficos de segundo plano&quot; nas configurações do seu navegador.
            </p>
        </div>
    );
}
