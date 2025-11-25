'use client';

import { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { getUrbanValuation } from '@/app/actions/urban-valuation';
import { getUsers } from '@/app/actions/users';
import { getUfmByYear } from '@/app/actions/ufm';
import Image from 'next/image';
import { formatarAreaPorExtenso, formatarValorPorExtenso, numeroPorExtenso } from '@/app/utils/numberToWords';

export default function ImprimirAvaliacaoUrbanaPage({ params }: { params: { id: string } }) {
    const [valuation, setValuation] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [ufmValue, setUfmValue] = useState<number | null>(null);
    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Avaliacao_Urbana_${params.id}`,
    });

    useEffect(() => {
        const loadData = async () => {
            const val = await getUrbanValuation(Number(params.id));
            setValuation(val);

            if (val) {
                if (val.usuarioId) {
                    const usersList = await getUsers();
                    const foundUser = usersList.find((u: any) => u.id === val.usuarioId);
                    setUser(foundUser);
                }
                if (val.ano) {
                    const ufm = await getUfmByYear(val.ano);
                    if (ufm) setUfmValue(ufm.valor);
                }
            }
        };
        loadData();
    }, [params.id]);

    if (!valuation) {
        return <div className="p-10 text-center">Carregando...</div>;
    }

    // Helper to format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    // Helper to title case
    const toTitleCase = (str: string) => {
        if (!str) return '';
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    // console.log(user)

    // Calculate Sector Value (Multiplier * UFM)
    // Note: valuation.setor stored the multiplier (e.g., 8, 6, 4)
    const setorMultiplier = valuation.setor;
    const valorMetroQuadradoTerreno = ufmValue ? setorMultiplier * ufmValue : 0;

    const valorTerreno = valuation.areaLote * valorMetroQuadradoTerreno;
    const valorConstrucao = valuation.areaConstrucao * valuation.tipoAcabamento;
    const valorTotal = valorTerreno + valorConstrucao;

    return (
        <div className="min-h-screen bg-gray-100 p-8 text-black">
            <div className="mb-6 flex justify-end no-print max-w-[210mm] mx-auto">
                <button
                    onClick={() => handlePrint()}
                    className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition-colors"
                >
                    Imprimir / Salvar PDF
                </button>
            </div>

            <div className="flex justify-center">

                <div ref={componentRef} className="relative fundoImprimir bg-white border-frame w-[210mm] min-h-[297mm] p-[20mm] shadow-lg print:shadow-none print:w-full print:h-full print:p-[10mm] text-black">
                    <div className="btl"></div>
                    <div className="btr"></div>
                    <div className="bbb"></div>
                    <div className="bbt"></div>
                    <div className="left-border"></div>
                    <div className="right-border"></div>
                    <div className="flex justify-between items-center mb-2 border-b-2 border-gray-300 pb-4">
                        <div className="w-24 h-24 relative">
                            <Image
                                src="/brasao-lagoa-dos-patos-mg.webp"
                                alt="Brasão"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="text-center flex-1 px-4">
                            <h2 className="text-xl font-bold text-gray-800">MUNICÍPIO DE LAGOA DOS PATOS MG</h2>
                            <h6 className="text-xs text-gray-600 mt-1 font-medium">
                                PRAÇA 31 DE MARÇO, 111, CENTRO - CEP: 39360-000 TEL.(38) 3426-0398 <br />
                                CNPJ: 16.901.381/0001-10 - SECRETARIA DE FAZENDA - SETOR TRIBUTÁRIO MUNICIPAL<br />
                                <a href="http://www.lagoadospatos.mg.gov.br" className="text-blue-600 hover:underline">www.lagoadospatos.mg.gov.br</a>
                            </h6>
                        </div>
                        <div className="w-24 h-24 relative invisible">
                            <Image
                                src="/brasao-lagoa-dos-patos-mg.webp"
                                alt="Brasão"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div className="text-center mb-2">
                        
                        <h3 className="text-lg font-bold text-gray-800 uppercase">CERTIDÃO DE VALOR VENAL DE IMÓVEL URBANO</h3>
                        <h4 className="text-md font-semibold text-gray-700">PROTOCOLO {valuation.protocolo}/{valuation.ano}</h4>
                    </div>
                    <div className="text-justify mb-2 p-2 text-md">
                        <p className="mb-2">
                            Certifico a pedido verbal e protocolado de <strong>{valuation.solicitante.toUpperCase()}</strong> pessoa interessada que, revendo a planta
                            Cadastral do Perímetro Urbano deste Município e a Planta de valores de
                            Terrenos Urbanos do <strong>CTM (Código Tributário Municipal)</strong>, verifiquei que o <strong>Lote {valuation.lote} </strong>da <strong>Quadra {valuation.quadra}</strong> localizado no <strong>Setor {setorMultiplier < 10 ? `0${setorMultiplier}` : setorMultiplier}</strong> com área total de <strong>{valuation.areaLote} M²</strong> ({numeroPorExtenso(valuation.areaLote)} metros quadrados), com área construída de <strong>{valuation.areaConstrucao} M²</strong> ({numeroPorExtenso(valuation.areaConstrucao)} metros quadrados), localizado na <strong> {valuation.rua.toUpperCase()}, N° {valuation.numero}, no Bairro: {valuation.bairro.toUpperCase()},
                            </strong> neste Município de Lagoa dos Patos – MG. Tem o seguinte Valor
                            Venal (avaliado a <strong>“Preço de Tabela *Código Tributário Pág. 87</strong> - e <strong>Pág. 90 para terrenos.</strong>”) da
                            seguinte forma:
                        </p>

                        <div className="ml-4 mb-2 ">
                            <p>
                                <strong>* Terreno (Lote):</strong> <u>{formatCurrency(valorTerreno)} ({formatarValorPorExtenso(valorTerreno)})</u> (Este é o valor do terreno sem imóvel, localizado no <strong>Setor {setorMultiplier < 10 ? `0${setorMultiplier}` : setorMultiplier}</strong> sendo o preço médio de <strong>{formatCurrency(valorMetroQuadradoTerreno)} ({formatarValorPorExtenso(valorMetroQuadradoTerreno)})</strong> por M²). <strong>(*VT) - </strong>
                                {ufmValue && (
                                    <span className=" text-sm text-gray-600 italic mt-1">
                                        (Cálculo: {setorMultiplier} UFM x {formatCurrency(ufmValue)} = {formatCurrency(valorMetroQuadradoTerreno)}/m²)
                                    </span>
                                )}
                            </p>
                            <p>
                                <strong>* Área Construída:</strong> <u>{formatCurrency(valorConstrucao)} ({formatarValorPorExtenso(valorConstrucao)})</u> (Valor calculado de acordo com o código tributário 544/2005 Pág. 87)<strong>(*VT)</strong>
                            </p>
                            <p>
                                <strong>*Valor total do Imóvel: {formatCurrency(valorTotal)} ({formatarValorPorExtenso(valorTotal)}) </strong>(Sendo <strong>{formatCurrency(valorTerreno)} ({formatarValorPorExtenso(valorTerreno)})</strong> o valor do lote {valuation.lote}, na Quadra {valuation.quadra} do Setor {setorMultiplier < 10 ? `0${setorMultiplier}` : setorMultiplier} com <strong>construção avaliada em {formatCurrency(valorConstrucao)} ({formatarValorPorExtenso(valorConstrucao)})</strong>. <i>De acordo com o código tributário 544/2005, valor de {formatCurrency(valuation.tipoAcabamento)} ({formatarValorPorExtenso(valuation.tipoAcabamento)}) por M²).</i><strong>(*VT)</strong> - <strong>VT= </strong>(Valor de tributação).
                            </p>
                        </div>

                        <p className="mb-8">
                            E, por ser a expressão da verdade, assim o certifico e dou fé, na forma da Lei,
                            para que possa produzir seus regulares efeitos.
                        </p>

                        <div className="mb-12">
                            <h2 className="text-lg font-semibold text-right">
                                Lagoa dos Patos – MG, {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </h2>
                        </div>
                    </div>

                    {/* Footer / Signature */}
                    <div className="mt-auto">
                        <div className="text-center text-2xs mb-4">
                            <p className="mb-2">________________________________________</p>
                            <div className="font-bold uppercase ">
                                {user ? `${user.nome} ${user.sobrenome}` : 'Responsável Técnico'}
                            </div>
                            <p className="text-sm">
                                {user ? `${user.cargo}` : ''} <br />
                                Município de Lagoa dos Patos/MG –<br />
                                CNPJ 16.901.381/0001-10
                            </p>
                        </div>

                        <div className="text-center text-xs text-gray-600 border-t border-gray-300 pt-4">
                            <p>
                                PRAÇA 31 DE MARÇO 111 / CENTRO / (38) 3426-0398 / CEP: 39.360-000 / LAGOA DOS PATOS / MINAS GERAIS
                            </p>
                            <p>
                                prefeitura@lagoadospatos.mg.gov.br
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
