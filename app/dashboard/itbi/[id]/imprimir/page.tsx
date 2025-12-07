'use client';

import { useState, useEffect, useRef } from 'react';
import { getItbi } from '@/app/actions/itbi';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import { toTitleCase, formatDateExtended } from '@/app/utils/textUtils';

export default function ImprimirItbiPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `ITBI_${id}`,
    });

    useEffect(() => {
        getItbi(Number(id)).then(val => {
            setData(val);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="p-8 text-center">Carregando...</div>;
    if (!data) return <div className="p-8 text-center">ITBI não encontrado.</div>;

    const TAXA_EXPEDIENTE = 9.26; // Fixed for now as per example, or calculated
    const ITBI_RATE = 0.02;
    const baseCalculation = Math.max(data.valorTransacao, data.valorVenal);
    const taxValue = baseCalculation * ITBI_RATE;
    const totalTributar = taxValue + TAXA_EXPEDIENTE;

    return (
        <div className="min-h-screen bg-gray-100 text-black p-8">
            <div className="flex justify-between items-center mb-8 max-w-[210mm] mx-auto">
                <button
                    onClick={() => handlePrint()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold shadow-md"
                >
                    Imprimir / Salvar PDF
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-50 border border-gray-300 shadow-sm"
                >
                    Voltar
                </button>
            </div>

            <div className="flex justify-center">
                <div ref={componentRef} className="bg-white w-[210mm] min-h-[297mm] p-[10mm] shadow-lg print:shadow-none text-black font-sans text-sm">

                    {/* Header */}
                    <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
                        <h1 className="text-xl font-bold uppercase">GUIA DE INFORMAÇÃO DE I.T.B.I</h1>
                        <h2 className="text-lg font-bold uppercase">PREFEITURA DE LAGOA DOS PATOS MG</h2>
                        <p className="text-xs mt-1">CONTATO: (38) 3426-0398 | tributos@lagoadospatos.mg.gov.br</p>
                        <div className="flex justify-between items-center mt-4">
                            <div className="text-left">
                                <p className="font-bold">PROTOCOLO: {data.protocolo}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs">SECRETARIA DA FAZENDA – DIVISÃO DE CADASTRO - CNPJ: 16.901.381/0001-00</p>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Código Tributário Municipal</h3>
                            <p>-</p>
                        </div>
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Natureza da Transmissão</h3>
                            <p>{data.natureza}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Adquirente</h3>
                            <p className="uppercase font-semibold">{data.adquirente?.nome}</p>
                            <p className="text-xs">{data.adquirente?.cpfCnpj}</p>
                            <p className="text-xs">{data.adquirente?.endereco}, {data.adquirente?.numero} - {data.adquirente?.bairro}</p>
                        </div>
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Transmitente</h3>
                            <p className="uppercase font-semibold">{data.transmitente?.nome}</p>
                            <p className="text-xs">{data.transmitente?.cpfCnpj}</p>
                            <p className="text-xs">{data.transmitente?.endereco}, {data.transmitente?.numero} - {data.transmitente?.bairro}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Tipo de Imóvel</h3>
                            <p>{data.imovel?.tipo}</p>
                        </div>
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Qualidade do Imóvel</h3>
                            <p>{data.qualidadeImovel}</p>
                        </div>
                    </div>

                    <div className="border p-2 mb-6">
                        <h3 className="font-bold text-xs uppercase mb-1">Descrição do Imóvel</h3>
                        <p className="text-justify">{data.imovel?.descricao}</p>
                        <p className="text-xs mt-1">{data.imovel?.endereco}, {data.imovel?.numero} - {data.imovel?.bairro} - {data.imovel?.cidade}/{data.imovel?.estado}</p>
                        <p className="text-xs">Matrícula: {data.imovel?.matricula} | Livro: {data.imovel?.livro} | Folha: {data.imovel?.folha}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Valor da Transação</h3>
                            <p>{data.valorTransacao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Área</h3>
                            <p>{data.imovel?.areaTotal || data.imovel?.areaLote} {data.imovel?.tipo === 'RURAL' ? 'ha' : 'm²'}</p>
                        </div>
                    </div>

                    <div className="mb-6 text-right">
                        <p>LAGOA DOS PATOS - MG, {formatDateExtended(new Date().toISOString())}.</p>
                    </div>

                    {/* Calculation Section */}
                    <div className="border-2 border-gray-800 p-4 mb-6 bg-gray-50">
                        <h3 className="font-bold uppercase mb-2 border-b border-gray-400 pb-1">Para Uso da Repartição</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-bold">VALOR DO IMÓVEL (BASE CÁLCULO): {baseCalculation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg">TOTAL A TRIBUTAR: {totalTributar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        </div>
                        <p className="mt-2 text-sm">
                            VALOR DO ITBI: (2% sobre {baseCalculation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} = {taxValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}) + taxa de expediente: {TAXA_EXPEDIENTE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} = <strong>{totalTributar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                        </p>
                        <p className="mt-2 text-xs font-bold text-red-600">
                            ATENÇÃO: Segue boleto para pagamento em anexo junto com este documento caso não tenha isenção.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Condições do Imóvel</h3>
                            <p>{data.condicaoImovel === 'PAGAIPTU' ? 'O IMÓVEL PAGA IPTU' : data.condicaoImovel === 'NAOPAGAIPTU' ? 'NÃO PAGA IPTU' : data.condicaoImovel === 'PAGAITR' ? 'IMOVEL RURAL PAGA ITR' : 'NÃO PAGA ITR'}</p>
                        </div>
                        <div className="border p-2">
                            <h3 className="font-bold text-xs uppercase mb-1">Seção de Divida Ativa</h3>
                            <p>{data.situacaoTransmitente === 'NADACONSTA' ? 'NADA CONSTA' : 'POSSUI DIVIDA ATIVA'}</p>
                        </div>
                    </div>

                    <div className="mb-8 border p-4 text-justify">
                        <h3 className="font-bold text-center uppercase mb-2">C E R T I D Ã O</h3>
                        <p>
                            Certifico que o(s) contribuinte(s) que está (ão) relacionado(s) nesta guia está(ão) quites com a Fazenda Municipal com Referência ao imóvel objeto da presente transação. LAGOA DOS PATOS-MG {formatDateExtended(new Date().toISOString())}
                        </p>
                    </div>

                    {/* Signatures */}
                    <div className="mt-12 grid grid-cols-2 gap-8 text-center">
                        <div>
                            <p className="border-t border-black pt-2 font-bold">GLEITON APARECIDO SOARES DE SOUZA</p>
                            <p className="text-xs">Divisão de Receitas e Cadastramento Imobiliário</p>
                        </div>
                        <div>
                            <p className="border-t border-black pt-2 font-bold">Ass. Avaliador</p>
                            <p className="text-xs">{formatDateExtended(new Date().toISOString())}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
