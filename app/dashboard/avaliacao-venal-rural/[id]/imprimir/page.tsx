'use client';

import { useState, useEffect, useRef } from 'react';
import { getRuralValuation } from '@/app/actions/rural-valuation';
import { getVTNByYear } from '@/app/actions/vtn';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';
import { upper } from '@/app/components/Upper';
import { formatarAreaPorExtenso, formatarValorPorExtenso } from '@/app/utils/numberToWords';
import { toTitleCase, formatDateExtended } from '@/app/utils/textUtils';
import { getUsers } from '@/app/actions/users';

function getDescricaoAvaliacao(data: any) {
    const items = [
        { label: 'terra de Aptidão Boa', area: data.areaAptidaoBoa },
        { label: 'terra de Aptidão Regular', area: data.areaAptidaoRegular },
        { label: 'terra de Aptidão Restrita', area: data.areaAptidaoRestrita },
        { label: 'Pastagem Plantada', area: data.areaPastagemPlantada },
        { label: 'Pastagem Natural', area: data.areaPastagemNatural },
        { label: 'área de Reserva/Preservação', area: data.areaReserva },
    ];

    const parts = items
        .filter(item => item.area > 0)
        .map(item => `${item.area.toFixed(4).replace('.', ',')} hectares avaliado como ${item.label}`);

    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0];

    const last = parts.pop();
    return parts.join(", ") + " e " + last;
}

export default function ImprimirAvaliacaoPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const [user, setUser] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [vtnValues, setVtnValues] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const componentRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Avaliacao_Rural_${id}`,
    });

    useEffect(() => {
        getRuralValuation(Number(id)).then(val => {
            setData(val);
            if (val) {
                if (val.anoVtn) {
                    getVTNByYear(val.anoVtn).then(setVtnValues);
                }

                // Fetch users and find the matching user
                getUsers().then(users => {
                    const foundUser = users.find((u: any) =>
                        `${u.nome} ${u.sobrenome || ''}`.trim() === val.usuario
                    );
                    if (foundUser) {
                        setUser(foundUser);
                    }
                });
            }
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="p-8 text-center">Carregando...</div>;
    if (!data) return <div className="p-8 text-center">Avaliação não encontrada.</div>;


    console.log(data)

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

            <div className="hidden">
                {/* This is a hidden container to ensure styles are loaded for print if needed, 
            but react-to-print usually handles the ref content well. 
            We display the content below for preview. */}
            </div>

            <div className="flex justify-center">
                <div className="">
                    <div ref={componentRef} className=" relative  border-frame w-[206mm] min-h-[297mm] p-[10mm] shadow-lg print:shadow-none print:w-full print:h-full print:p-[10mm] text-black">
                        <div className="btl"></div>
                        <div className="btr"></div>
                        <div className="bbb"></div>
                        <div className="bbt"></div>
                        <div className="left-border"></div>
                        <div className="right-border"></div>
                        <div className="relative fundoImprimir  bg-white p-2 border border-transparent h-full flex flex-col justify-between">
                            <div>
                                {/* Header */}
                                <div className="flex justify-between items-center mb-0 border-b-2 border-gray-300 pb-2">
                                    <div className="w-24 h-24 relative">
                                        <Image
                                            src="/brasao-lagoa-dos-patos-mg.webp"
                                            alt="Brasão"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="text-center flex-1 px-4">
                                        <h2 className="text-xl font-bold text-gray-800">PREFEITURA DE LAGOA DOS PATOS MG</h2>
                                        <h6 className="text-xs text-gray-600 mt-1 font-medium">
                                            PRAÇA 31 DE MARÇO, 111, CENTRO - CEP: 39360-000 TEL.(38) 3426-0398 <br />
                                            CNPJ: 16.901.381/0001-10 - SECRETARIA DE FAZENDA - SETOR TRIBUTÁRIO MUNICIPAL <br />
                                            <a href="http://www.lagoadospatos.mg.gov.br" className="text-gray-600 hover:underline">www.lagoadospatos.mg.gov.br</a>
                                            <h4 className="text-lg font-bold text-blue-800">PROTOCOLO {data.protocolo}/{data.anoProtocolo}</h4>
                                        </h6>
                                    </div>
                                    <div className="w-24 h-24 relative ">
                                        <Image
                                            src="/qr-vtn.png"
                                            alt="Brasão"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="mb-2">
                                    <div className="text-center mb-2">
                                        <h3 className="text-lg font-bold text-gray-800 uppercase">CERTIDÃO DE VALOR VENAL DE IMÓVEL RURAL</h3>

                                    </div>
                                    <p className="text-justify text-sm leading-relaxed">
                                        Certifico a pedido verbal e protocolado de <strong>{data.solicitante}</strong>, pessoa interessada e a quem interessar que, verificando os valores de Terrenos Rurais do CTM <strong>(Código Tributário Municipal)</strong>, CVTN <strong>(Comissão de Valor da Terra Nua)</strong> e atualizações georeferenciadas <strong>(GEO)</strong>, verifica-se constar o seguinte:
                                    </p>
                                    <p className="text-justify mb-4 text-sm leading-relaxed">
                                        O Imóvel localizado na(o) <strong>{data.endereco}</strong>, lugar denominado <strong>{data.denominacao}</strong>{data.nomeImovel ? <> <strong>, {data.nomeImovel}</strong></> : null}, matrícula/registro: <strong>{data.matricula}</strong>, {data.livro ? <>livro <strong>{data.livro}</strong>, </> : null}{data.folha ? <> folha <strong>{data.folha}</strong>, </> : null} registrado em <strong>{formatDateExtended(data.registroData)}</strong>, propriedade {data.generoProprietario === 'M' ? 'do Sr°' : 'da Sra°'}: <strong>{data.proprietario}</strong>, {data.cpfCnpj ? <>CPF/CNPJ: <strong>{data.cpfCnpj}</strong></> : null} {data.identidade ? <>identidade de número <strong>{data.identidade},</strong></> : null}{data.conjuge ? <> {data.generoProprietario === 'M' ? 'e sua' : 'e seu'} {data.conjuge ? <>cônjuge <strong>{data.conjuge}</strong></> : null} {data.cpfConjuge ? <> <strong>, CPF: {data.cpfConjuge}</strong></> : null} {data.identidadeConjuge ? <>, identidade de número <strong>{data.identidadeConjuge}</strong></> : null}</> : null}. Com área total de <strong>{data.areaTotal.toFixed(4).replace('.', ',')} Ha ({formatarAreaPorExtenso(data.areaTotal)})</strong>, descrita nesta avaliação como <strong>Imóvel Rural</strong>, sendo <strong>{getDescricaoAvaliacao(data)}</strong>, definido por Comissão de VTN (Valor de Terra Nua), comissão esta reunida <strong>no ano de {data.anoVtn}</strong> ², propriedade localizada neste Município de Lagoa dos Patos – MG. Segue abaixo as informações dos valores de terra nua.
                                    </p>
                                    {/* Table */}
                                    <div className="-mt-3">
                                        <h5 className="text-center font-bold text-sm mb-2 uppercase border-b border-gray-300 pb-1">
                                            VALOR VENAL RURAL - LAGOA DOS PATOS - MG<br />
                                            Avaliação CVTN (Comissão de Valor da Terra Nua) - {data.anoVtn}
                                        </h5>
                                        <table className="w-full text-sm border-collapse border border-gray-400">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <td className="border border-gray-400 p-1 font-bold text-center w-12">Item</td>
                                                    <td className="border border-gray-400 p-1 font-bold text-center w-24">Área/Ha</td>
                                                    <td className="border border-gray-400 p-1 font-bold text-center w-32">Valor/Ha</td>
                                                    <td className="border border-gray-400 p-1 font-bold text-left">Características da Área</td>
                                                    <td className="border border-gray-400 p-1 font-bold text-right w-32">Valor Venal</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { label: 'Aptidão Boa', area: data.areaAptidaoBoa, unit: vtnValues?.aptidaoBoa },
                                                    { label: 'Aptidão Regular', area: data.areaAptidaoRegular, unit: vtnValues?.aptidaoRegular },
                                                    { label: 'Aptidão Restrita', area: data.areaAptidaoRestrita, unit: vtnValues?.aptidaoRestrita },
                                                    { label: 'Pastagem Plantada', area: data.areaPastagemPlantada, unit: vtnValues?.pastagemPlantada },
                                                    { label: 'Pastagem Natural', area: data.areaPastagemNatural, unit: vtnValues?.pastagemNatural },
                                                    { label: 'Reserva/Preservação', area: data.areaReserva, unit: vtnValues?.reserva },
                                                ].filter(item => item.area > 0).map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="border border-gray-400 p-1 text-center">01.{idx + 1}</td>

                                                        <td className="border border-gray-400 p-1 text-center">
                                                            {item.area.toFixed(4).replace('.', ',')}
                                                        </td>

                                                        <td className="border border-gray-400 p-1 text-center">
                                                            {new Intl.NumberFormat("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            }).format(item.unit || 0)}
                                                        </td>

                                                        <td className="border border-gray-400 p-1 text-left">
                                                            {item.label} ¹
                                                        </td>

                                                        <td className="border border-gray-400 p-1 text-right">
                                                            {new Intl.NumberFormat("pt-BR", {
                                                                style: "currency",
                                                                currency: "BRL"
                                                            }).format(item.area * (item.unit || 0))}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {/* <tr>
                                            <td className="border border-gray-400 p-1 text-center">02</td>
                                            <td className="border border-gray-400 p-1 text-center"></td>
                                            <td className="border border-gray-400 p-1 text-center"></td>
                                            <td className="border border-gray-400 p-1 text-left">Valor das Construções, Instalações e Benfeitorias ²</td>
                                            <td className="border border-gray-400 p-1 text-right">R$ {data.valorConstrucoes?.toFixed(2) || '0.00'}</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-400 p-1 text-center">03</td>
                                            <td className="border border-gray-400 p-1 text-center"></td>
                                            <td className="border border-gray-400 p-1 text-center"></td>
                                            <td className="border border-gray-400 p-1 text-left">Valor das Culturas, Pastagens Cultivadas e Melhoradas e Florestas Plantadas ²</td>
                                            <td className="border border-gray-400 p-1 text-right">R$ {data.valorCulturas?.toFixed(2) || '0.00'}</td>
                                        </tr> */}
                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-gray-50 font-bold">
                                                    <td className="border border-gray-400 p-1" colSpan={3}>Área total: {data.areaTotal.toFixed(4).replace('.', ',')} hectares</td>
                                                    <td className="border border-gray-400 p-1 text-right">Valor Total do Imóvel</td>
                                                    <td className="border border-gray-400 p-1 text-right">
                                                        {new Intl.NumberFormat('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL'
                                                        }).format(data.valorTotal)}
                                                    </td>
                                                </tr>
                                                <tr className="bg-gray-50 font-bold">
                                                    <td className="border border-gray-400 p-1 text-center" colSpan={5}>
                                                        ({formatarValorPorExtenso(data.valorTotal)})
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                                {/* Info Notes */}
                                <div className="text-xs text-gray-800 mb-2 space-y-1 ">
                                    <p>¹ - Calculo Setor tributário: * Comissão de regularização</p>
                                    {/* <p>² - Calculado pelo ITR: * Declaração do Proprietário</p> */}
                                    <p>² - Data da reunião da CVTN - PREFEITURA MUNCIPAL | EMATER | CARTÓRIO | ASSOCIAÇÕES RURAIS CMDCA.</p>
                                </div>
                            </div>
                            {/* Footer Section with Signatures */}
                            <div>
                                {/* Date and Signature */}
                                <div className="mb-2">
                                    <h4 className="text-right mb-8 font-semibold ">Lagoa dos Patos – MG, {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}.</h4>
                                    <div className="flex justify-center">
                                        <div className="text-center">
                                            <p className="">_______________________________________</p>
                                            <h5 className="font-bold text-sm mb-1">{toTitleCase(data.usuario)}</h5>
                                            {user && user.cargo && (
                                                <p className="text-xs font-semibold mb-1">{toTitleCase(user.cargo)}</p>
                                            )}
                                            <p className="text-[10px] max-w-md mx-auto">Divisão Fiscal e Cadastramento Imobiliário Município de Lagoa dos Patos/MG – CNPJ 16.901.381/0001-10</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Digital Signature Block */}
                                {/* <div className="border-t-2 border-gray-300 pt-4">
                            <h2 className="text-lg font-bold uppercase text-gray-400 mb-2">{data.usuario}</h2>
                            <div className="text-sm text-gray-500">
                            <h3 className="font-semibold">Emitido Digitalmente por:</h3>
                            <h4 className="uppercase">{data.usuario}</h4>
                            <p>{new Date().toString()}</p>
                            </div>
                            </div> */}
                            </div>
                        </div>
                            <div className=" w-full px-10 absolute bottom-6 left-0  text-xs text-justify text-gray-800  ">
                               <strong>Observações:</strong> {data.observacoes}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
