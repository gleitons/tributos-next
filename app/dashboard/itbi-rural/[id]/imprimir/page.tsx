'use client';

import { useState, useEffect, useRef } from 'react';
import { getItbiRural } from '@/app/actions/itbi-rural';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import { toTitleCase } from '@/app/utils/textUtils';
import { getUsers } from '@/app/actions/users';
import DetalhesLegaisITBI from '@/app/dashboard/components/SituacaoItbi';

export default function ImprimirItbiRuralPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [data, setData] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [availableUsers, setAvailableUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState('Padrão');
    const [showQR, setShowQR] = useState('Padrão');

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `ITBI_Rural_${id}`,
    });

    useEffect(() => {
        getItbiRural(Number(id)).then(val => {
            setData(val);
            getUsers().then(users => {
                setAvailableUsers(users);
                if (val && val.usuario) {
                    const foundUser = users.find((u: any) =>
                        `${u.nome} ${u.sobrenome || ''}`.trim() === val.usuario
                    );
                    if (foundUser) {
                        setUser(foundUser);
                    }
                }
            });
            setLoading(false);
        });
    }, [id]);
    console.log(user)
    const getFontClass = () => {
        switch (fontSize) {
            case '14': return 'text-[14pt]';
            case '13': return 'text-[13pt]';
            case '12': return 'text-[12pt]';
            case '11': return 'text-[11pt]';
            case '10': return 'text-[10pt]';
            case '9': return 'text-[9pt]';
            case '8': return 'text-[8pt]';
            case '7': return 'text-[7pt]';
            default: return 'text-sm';
        }
    };

    if (loading) return <div className="p-8 text-center">Carregando...</div>;
    if (!data) return <div className="p-8 text-center">ITBI não encontrado.</div>;
    // console.log(data);
    return (
        <div className="min-h-screen bg-gray-100 text-black p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 max-w-[210mm] mx-auto gap-4 bg-white p-4 rounded shadow">
                <div className="flex gap-4">
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

                <div className="flex gap-4 items-center text-sm">
                    <div>
                        <label className="mr-2 font-bold">Fonte:</label>
                        <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} className="border p-1 rounded">
                            <option>Padrão</option>
                            <option>14</option><option>13</option><option>12</option>
                            <option>11</option><option>10</option><option>9</option>
                            <option>8</option><option>7</option>
                        </select>
                    </div>
                    <div>
                        <label className="mr-2 font-bold">Assinatura:</label>
                        <select
                            value={user ? `${user.nome} ${user.sobrenome || ''}`.trim() : ''}
                            onChange={(e) => {
                                const found = availableUsers.find(u => `${u.nome} ${u.sobrenome || ''}`.trim() === e.target.value);
                                setUser(found || null);
                            }}
                            className="border p-1 rounded"
                        >
                            <option value="">Selecione o Emitente</option>
                            {availableUsers.map((u, idx) => (
                                <option key={idx} value={`${u.nome} ${u.sobrenome || ''}`.trim()}>
                                    {`${u.nome} ${u.sobrenome || ''}`.trim()}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div ref={componentRef} className={`relative border-frame w-[210mm] min-h-[297mm] p-[10mm] shadow-lg print:shadow-none print:w-full print:h-full print:p-[10mm] text-black ${getFontClass()}`}>
                    <div className="btl"></div>
                    <div className="btr"></div>
                    <div className="bbb"></div>
                    <div className="bbt"></div>
                    <div className="left-border"></div>
                    <div className="right-border"></div>
                    <div className="relative fundoImprimir bg-white p-2 border border-transparent  flex flex-col justify-between">
                        <div>
                            {/* Header */}
                            <div className="flex justify-between items-center  border-b-2 border-gray-300 ">
                                <div className="w-24 h-24 relative">
                                    <Image src="/brasao-lagoa-dos-patos-mg.webp" alt="Brasão" fill className="object-contain" />
                                </div>
                                <div className="text-center flex-1 px-2">
                                    <h2 className="text-lg font-bold text-gray-800 uppercase">Prefeitura de Lagoa dos Patos MG</h2>
                                    <p className="text-[10px] text-gray-600  font-medium">
                                        PRAÇA 31 DE MARÇO, 111, CENTRO - CEP: 39360-000 TEL.(38) 3426-0398 <br />
                                        CNPJ: 16.901.381/0001-10 - SECRETARIA DE FAZENDA - SETOR TRIBUTÁRIO MUNICIPAL <br />
                                        <span className="text-blue-600">www.lagoadospatos.mg.gov.br</span>
                                    </p>

                                    <div className="text-center font-bold text-md border-y border-gray-200 uppercase">
                                        Guia de Informação e Recolhimento de ITBI - RURAL
                                    </div>
                                </div>
                                {(showQR === 'Padrão' || showQR === 'Inserir') && (
                                    <div className="w-24 h-24 relative">
                                        <Image src="/qr-vtn.png" alt="QR Code" fill className="object-contain" />
                                    </div>
                                )}
                                {showQR === 'Retirar' && <div className="w-24 h-24"></div>}
                            </div>

                            {/* Content */}
                            <div>
                                <h4 className="text-lg text-center font-bold text-blue-800  uppercase">Protocolo {data.protocolo} / {data.ano || new Date().getFullYear()}</h4>

                                <div className="grid grid-cols-1 gap-2">
                                    <section>
                                        <h3 className="font-bold border-b uppercase text-xs text-gray-600">Adquirente (Comprador)</h3>
                                        <div className="p-2 bg-white/50 border rounded text-justify" dangerouslySetInnerHTML={{ __html: data.adquirente }} />
                                    </section>

                                    <section>
                                        <h3 className="font-bold border-b uppercase text-xs text-gray-600">Transmitente (Vendedor)</h3>
                                        <div className="p-2 bg-white/50 border rounded text-justify" dangerouslySetInnerHTML={{ __html: data.transmitente }} />
                                    </section>

                                    <section className="grid grid-cols-3 gap-4">
                                        <div>
                                            <h3 className="font-bold border-b uppercase text-xs text-gray-600">Área do Terreno (ha)</h3>
                                            <div className="p-2 bg-white/50 border rounded font-bold">{data.areaTerreno}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold border-b uppercase text-xs text-gray-600">Natureza da Operação</h3>
                                            <div className="p-2 bg-white/50 border rounded">{data.natureza}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold border-b uppercase text-xs text-gray-600">Tipo de Imóvel</h3>
                                            <div className="p-2 bg-white/50 border rounded">{data.tipoImovel}</div>
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="font-bold border-b uppercase text-xs text-gray-600">Descrição do Imóvel</h3>
                                        <div className="p-2 bg-white/50 border rounded text-justify" dangerouslySetInnerHTML={{ __html: data.descricaoImovel }} />
                                    </section>

                                    <section className="grid grid-cols-3 gap-4 text-xs">
                                        <div>
                                            <h3 className="font-bold border-b uppercase text-gray-600">Qualidade</h3>
                                            <div className="p-1 bg-white/50 border rounded">{data.qualidadeImovel}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold border-b uppercase text-gray-600">Condição</h3>
                                            <div className="p-1 bg-white/50 border rounded">{data.condicaoImovel}</div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold border-b uppercase text-gray-600">Dívida Ativa</h3>
                                            <div className="p-1 bg-white/50 border rounded">{data.situacaoTransmitente}</div>
                                        </div>
                                    </section>
                                    {/* <--editavel -!> */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <section>
                                            <DetalhesLegaisITBI natureza={data.natureza} />

                                        </section>


                                        <section className="border border-gray-50 p-2 rounded bg-white/80">
                                            <div className="flex justify-between items-center ">
                                                <span className="font-bold uppercase text-blue-900">Valor da Transação:</span>
                                                <span className="text-md font-bold">{data.valorTransacao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                                <span className="font-bold uppercase text-blue-900">Imposto Devido (2%):</span>
                                                <span className="text-md font-bold text-blue-900">{data.valorItbi?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                                <span className="font-bold uppercase text-blue-900">Taxa de Expediente (UFM × 2):</span>
                                                <span className="text-md font-bold text-blue-900">{(data.taxaExpediente || (data.valorUfm ? data.valorUfm * 2 : 0))?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t-2 border-blue-400 mt-1">
                                                <span className="font-black uppercase text-blue-900">Total a Recolher:</span>
                                                <span className="text-md font-black text-blue-900">{((data.valorItbi || 0) + (data.taxaExpediente || (data.valorUfm ? data.valorUfm * 2 : 0))).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                            </div>
                                        </section>

                                    </div>










                                    {/* <section className="border-2 border-blue-800 p-4 rounded bg-blue-50/80">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold uppercase text-blue-900">Valor da Transação:</span>
                                            <span className="text-lg font-bold">{data.valorTransacao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                            <span className="font-bold uppercase text-blue-900">Imposto Devido (2%):</span>
                                            <span className="text-lg font-bold text-blue-900">{data.valorItbi?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                                            <span className="font-bold uppercase text-blue-900">Taxa de Expediente (UFM × 2):</span>
                                            <span className="text-lg font-bold text-blue-900">{(data.taxaExpediente || (data.valorUfm ? data.valorUfm * 2 : 0))?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2 border-t-2 border-blue-400 mt-1">
                                            <span className="font-black uppercase text-blue-900">Total a Recolher:</span>
                                            <span className="text-2xl font-black text-blue-900">{((data.valorItbi || 0) + (data.taxaExpediente || (data.valorUfm ? data.valorUfm * 2 : 0))).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                        </div>
                                    </section> */}
                                </div>
                            </div>
                        </div>

                        {/* Footer / Signatures */}
                        <div>
                            <p className="text-right font-medium mb-12">
                                Lagoa dos Patos – MG, {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}.
                            </p>

                            <div className="flex justify-center">
                                <div className="text-center">
                                    <p className="mb-2">___________________________________________________</p>
                                    <h4 className="font-bold uppercase">{user ? `${user.nome} ${user.sobrenome || ''}`.trim() : data.usuario}</h4>
                                    {user && user.cargo && <p className="text-xs font-semibold">{toTitleCase(user.cargo)}</p>}
                                    <p className="text-[9px] text-gray-500 mt-2">
                                        Divisão Fiscal e Cadastramento Imobiliário <br />
                                        Município de Lagoa dos Patos/MG – CNPJ 16.901.381/0001-10
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-10 right-10 text-[10px] text-gray-800 text-justify border-t border-gray-300 pt-2">
                        {data.observacoes && (
                            <div className="mb-1"><strong>Observações:</strong> {data.observacoes}</div>
                        )}
                        <strong>Solicitante:</strong> {data.solicitante} | <strong>Valor UFM:</strong> {data.valorUfm} | <strong>Ano Base:</strong> {data.ano}
                    </div>
                </div>
            </div>

        </div>
    );
}
