'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createItbiUrbano, updateItbiUrbano } from '@/app/actions/itbi-urbano';
import { FaBold } from 'react-icons/fa';

export default function ItbiUrbanoForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [taxaExpediente, setTaxaExpediente] = useState(initialData?.taxaExpediente || 0);
    const [formData, setFormData] = useState({
        protocolo: initialData?.protocolo || '',
        usuario: initialData?.usuario || '',
        solicitante: initialData?.solicitante || '',
        valorUfm: initialData?.valorUfm || 0,
        ano: initialData?.ano || new Date().getFullYear(),
        adquirente: initialData?.adquirente || '',
        transmitente: initialData?.transmitente || '',
        areaTerreno: initialData?.areaTerreno || '',
        descricaoImovel: initialData?.descricaoImovel || '',
        natureza: initialData?.natureza || 'selecione',
        tipoImovel: initialData?.tipoImovel || 'URBANO',
        qualidadeImovel: initialData?.qualidadeImovel || 'selecione',
        condicaoImovel: initialData?.condicaoImovel || 'selecione',
        situacaoTransmitente: initialData?.situacaoTransmitente || 'selecione',
        valorTransacao: initialData?.valorTransacao || 0,
        valorItbi: initialData?.valorItbi || 0,
        observacoes: initialData?.observacoes || '',
    });

    const adquirenteRef = useRef<HTMLTextAreaElement>(null);
    const transmitenteRef = useRef<HTMLTextAreaElement>(null);
    const descricaoRef = useRef<HTMLTextAreaElement>(null);

    // Buscar UFM do banco quando o ano mudar
    useEffect(() => {
        async function fetchUfm() {
            try {
                const res = await fetch('/api/ufm');
                const data = await res.json();
                const ufmAno = data.find((item: any) => item.ano === Number(formData.ano));
                if (ufmAno) {
                    const ufmVal = Number(ufmAno.valor);
                    setFormData(prev => ({ ...prev, valorUfm: ufmVal }));
                    setTaxaExpediente(ufmVal * 2);
                }
            } catch (error) {
                console.error('Erro ao buscar UFM:', error);
            }
        }
        fetchUfm();
    }, [formData.ano]);

    useEffect(() => {
        calculateItbi();
    }, [formData.valorTransacao]);

    const calculateItbi = () => {
        const ITBI_RATE = 0.02; // 2%
        const total = formData.valorTransacao * ITBI_RATE;
        setFormData(prev => ({ ...prev, valorItbi: total }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const applyBold = (ref: React.RefObject<HTMLTextAreaElement>, name: string) => {
        const textarea = ref.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);

        if (selectedText) {
            const newText = text.substring(0, start) + `<b>${selectedText}</b>` + text.substring(end);
            setFormData(prev => ({ ...prev, [name]: newText }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = { ...formData, taxaExpediente };
        if (initialData?.id) {
            await updateItbiUrbano(initialData.id, submitData);
        } else {
            await createItbiUrbano(submitData);
        }
        router.push('/dashboard/itbi-urbano');
        router.refresh();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800 uppercase">Formulário ITBI Urbano</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset className="border p-4 rounded-md border-gray-300">
                    <legend className="px-2 font-bold text-gray-700">DADOS INICIAIS</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold">Protocolo Geral:</label>
                            <input type="text" name="protocolo" value={formData.protocolo} onChange={handleInputChange} placeholder="ex: 252 - Prefeitura" className="border p-2 rounded" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold">Usuário:</label>
                            <select name="usuario" value={formData.usuario} onChange={handleInputChange} className="border p-2 rounded">
                                <option value="">Selecione</option>
                                <option value="GLEITON APARECIDO SOARES DE SOUZA">GLEITON APARECIDO SOARES DE SOUZA</option>
                                <option value="VANDER DE JESUS MAGALHAES NOBRE">VANDER DE JESUS MAGALHAES NOBRE</option>
                                <option value="JOÃO MARTINS GUEDES">JOÃO MARTINS GUEDES</option>
                                <option value="JHESSYK DAIENY REIS BRITO RABELO">JHESSYK DAIENY REIS BRITO RABELO</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold">Solicitante:</label>
                            <input type="text" name="solicitante" value={formData.solicitante} onChange={handleInputChange} placeholder="ex: Nome Cartório" className="border p-2 rounded" required />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">Valor UFM:</label>
                                <input type="number" step="0.01" name="valorUfm" value={formData.valorUfm} onChange={handleInputChange} className="border p-2 rounded" />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">ANO:</label>
                                <input type="number" name="ano" value={formData.ano} onChange={handleInputChange} className="border p-2 rounded" />
                            </div>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border p-4 rounded-md border-gray-300">
                    <legend className="px-2 font-bold text-gray-700 uppercase">Adquirente</legend>
                    <div className="mb-2 flex items-center gap-2">
                        <button type="button" onClick={() => applyBold(adquirenteRef, 'adquirente')} className="bg-gray-200 p-1 rounded hover:bg-gray-300 flex items-center gap-1 text-xs">
                            <FaBold /> Negrito
                        </button>
                    </div>
                    <textarea
                        ref={adquirenteRef}
                        name="adquirente"
                        value={formData.adquirente}
                        onChange={handleInputChange}
                        placeholder="Nome e dados completos do adquirente"
                        className="w-full border p-2 rounded h-32"
                    />
                </fieldset>

                <fieldset className="border p-4 rounded-md border-gray-300">
                    <legend className="px-2 font-bold text-gray-700 uppercase">Transmitente</legend>
                    <div className="mb-2 flex items-center gap-2">
                        <button type="button" onClick={() => applyBold(transmitenteRef, 'transmitente')} className="bg-gray-200 p-1 rounded hover:bg-gray-300 flex items-center gap-1 text-xs">
                            <FaBold /> Negrito
                        </button>
                    </div>
                    <textarea
                        ref={transmitenteRef}
                        name="transmitente"
                        value={formData.transmitente}
                        onChange={handleInputChange}
                        placeholder="Nome e dados completos do transmitente"
                        className="w-full border p-2 rounded h-32"
                    />
                </fieldset>

                <fieldset className="border p-4 rounded-md border-gray-300">
                    <legend className="px-2 font-bold text-gray-700 uppercase">Área do Imóvel</legend>
                    <input type="text" name="areaTerreno" value={formData.areaTerreno} onChange={handleInputChange} placeholder="ex: 360m²" className="w-full border p-2 rounded" />
                </fieldset>

                <fieldset className="border p-4 rounded-md border-gray-300">
                    <legend className="px-2 font-bold text-gray-700 uppercase">Descrição do Imóvel</legend>
                    <div className="mb-2 flex items-center gap-2">
                        <button type="button" onClick={() => applyBold(descricaoRef, 'descricaoImovel')} className="bg-gray-200 p-1 rounded hover:bg-gray-300 flex items-center gap-1 text-xs">
                            <FaBold /> Negrito
                        </button>
                    </div>
                    <textarea
                        ref={descricaoRef}
                        name="descricaoImovel"
                        value={formData.descricaoImovel}
                        onChange={handleInputChange}
                        placeholder="Descrição detalhada do imóvel"
                        className="w-full border p-2 rounded h-32"
                    />
                </fieldset>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Natureza</legend>
                        <select name="natureza" value={formData.natureza} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="COMPRAEVENDA">COMPRA E VENDA</option>
                            <option value="CESSÃODEDIREITOHEREDITARIO">CESSÃO DE DIREITO HEREDITÁRIO</option>
                            <option value="ISENCAO">ISENÇÃO DE ITBI</option>
                            <option value="CONCESSÃO">FUSÃO, INCORPORAÇÃO, CISÃO OU EXTINÇÃO</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Tipo</legend>
                        <select name="tipoImovel" value={formData.tipoImovel} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="URBANO">URBANO</option>
                            <option value="RURAL">RURAL</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Qualidade</legend>
                        <select name="qualidadeImovel" value={formData.qualidadeImovel} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="OTIMO">OTIMO</option>
                            <option value="MUITOBOM">MUITO BOM</option>
                            <option value="BOM">BOM</option>
                            <option value="REGULAR">REGULAR</option>
                            <option value="RUIM">RUIM</option>
                            <option value="PESSIMO">PÉSSIMO</option>
                            <option value="NAOPOSSUIIMOVEL">NÃO POSSUI IMÓVEL</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Condições</legend>
                        <select name="condicaoImovel" value={formData.condicaoImovel} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="PAGAIPTU">O IMÓVEL PAGA IPTU</option>
                            <option value="NAOPAGAIPTU">NÃO PAGA IPTU</option>
                            <option value="PAGAITR">IMOVEL RURAL PAGA ITR</option>
                            <option value="NAOPAGAITR">NÃO PAGA ITR</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Dívida Ativa</legend>
                        <select name="situacaoTransmitente" value={formData.situacaoTransmitente} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="NADACONSTA">NADA CONSTA</option>
                            <option value="POSSUIDIVIDA">POSSUI DIVIDA ATIVA</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Observações</legend>
                        <textarea
                            name="observacoes"
                            value={formData.observacoes}
                            onChange={handleInputChange}
                            placeholder="Observações adicionais para a certidão"
                            className="w-full border p-2 rounded h-24"
                        />
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 bg-indigo-50">
                        <legend className="px-2 font-bold text-indigo-800 uppercase">Valor da Transação</legend>
                        <input type="number" step="0.01" name="valorTransacao" value={formData.valorTransacao} onChange={handleInputChange} placeholder="Ex: 10000.12" className="w-full border p-2 rounded font-bold" />
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between p-2 bg-indigo-100 rounded border border-indigo-200">
                                <span className="font-semibold text-indigo-900">ITBI (2%):</span>
                                <span className="font-bold text-indigo-900">{formData.valorItbi.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                            <div className="flex justify-between p-2 bg-amber-100 rounded border border-amber-200">
                                <span className="font-semibold text-amber-900">Taxa de Expediente (UFM × 2):</span>
                                <span className="font-bold text-amber-900">{taxaExpediente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                            <div className="flex justify-between p-3 bg-green-100 rounded border-2 border-green-300">
                                <span className="font-bold text-green-900 uppercase">Total a Recolher:</span>
                                <span className="font-black text-green-900 text-lg">{(formData.valorItbi + taxaExpediente).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            </div>
                        </div>
                    </fieldset>
                </div>

                <div className="flex justify-center pt-6">
                    <button type="submit" className="bg-indigo-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-indigo-700 transition shadow-md uppercase tracking-wider">
                        {initialData?.id ? 'Atualizar e Salvar' : 'Calcular e Salvar ITBI'}
                    </button>
                </div>
            </form>
        </div>
    );
}
