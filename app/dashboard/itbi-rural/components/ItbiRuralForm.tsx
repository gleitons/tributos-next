'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createItbiRural, updateItbiRural } from '@/app/actions/itbi-rural';
import { FaBold } from 'react-icons/fa';

export default function ItbiRuralForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
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
        tipoImovel: initialData?.tipoImovel || 'RURAL',
        qualidadeImovel: initialData?.qualidadeImovel || 'selecione',
        condicaoImovel: initialData?.condicaoImovel || 'selecione',
        situacaoTransmitente: initialData?.situacaoTransmitente || 'selecione',
        valorTransacao: initialData?.valorTransacao || 0,
        valorItbi: initialData?.valorItbi || 0,
        observacoes: initialData?.protocolo + " - " + initialData?.observacoes || '',
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

        async function fetchUsers() {
            try {
                const res = await fetch('/api/usuarios');
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
            }
        }

        fetchUfm();
        fetchUsers();
    }, [formData.ano]);

    useEffect(() => {
        const calculateItbi = () => {
            const ITBI_RATE = 0.02; // 2%
            const total = formData.valorTransacao * ITBI_RATE;
            setFormData(prev => ({ ...prev, valorItbi: total }));
        };
        calculateItbi();
    }, [formData.valorTransacao]);

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
            await updateItbiRural(initialData.id, submitData);
        } else {
            await createItbiRural(submitData);
        }
        router.push('/dashboard/itbi-rural');
        router.refresh();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 uppercase">Formulário ITBI Rural</h2>

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
                                {users.map((user) => (
                                    <option key={user.id} value={`${user.nome} ${user.sobrenome || ''}`.trim()}>
                                        {`${user.nome} ${user.sobrenome || ''}`.trim()}
                                    </option>
                                ))}
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
                        <span className="text-xs text-gray-500">* Selecione o texto e clique para formatar</span>
                    </div>
                    <textarea
                        ref={adquirenteRef}
                        name="adquirente"
                        value={formData.adquirente}
                        onChange={handleInputChange}
                        placeholder="Nome e dados completos do adquirente"
                        className="w-full border p-2 rounded h-32"
                    />
                    <div className="text-right text-xs text-gray-500">Caracteres: {formData.adquirente.length} / 1050</div>
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
                    <legend className="px-2 font-bold text-gray-700 uppercase">Área Negociada - Ha (hectares)</legend>
                    <input type="text" name="areaTerreno" value={formData.areaTerreno} onChange={handleInputChange} placeholder="ex: 15.65.25ha" className="w-full border p-2 rounded" />
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
                        <span title={`*Pedido: ${formData.natureza}`}>ℹ️</span>
                        <select name="natureza" value={formData.natureza} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="COMPRA E VENDA">COMPRA E VENDA</option>
                            <option value="CESSÃO DE DIREITO HEREDITÁRIO">CESSÃO DE DIREITO HEREDITÁRIO</option>
                            {/* <option value="ISENÇÃO">ISENÇÃO DE ITBI</option> */}
                            <option value="FUSÃO/INCORPORAÇÃO">FUSÃO, INCORPORAÇÃO, CISÃO OU EXTINÇÃO</option>
                            <option value="ISENÇÃO DE ITBI">ISENÇÃO DE ITBI</option>
                            <option value="DAÇÃO EM PAGAMENTO">DAÇÃO EM PAGAMENTO</option>
                            <option value="PERMUTA">PERMUTA</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Tipo</legend>
                        <select name="tipoImovel" value={formData.tipoImovel} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="Terreno Rural">Terreno Rural</option>
                            <option value="Fazenda de Cultura">Fazenda de Cultura</option>
                            <option value="Gleba de Terras">Gleba de Terras</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Qualidade</legend>
                        <select name="qualidadeImovel" value={formData.qualidadeImovel} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="Não Possui">Não Possui</option>
                            <option value="Excelente">Excelente</option>
                            <option value="Boa">Boa</option>
                            <option value="Regular">Regular</option>
                            <option value="Ruim">Ruim</option>
                            <option value="Péssima">Péssima</option>
                        </select>
                    </fieldset>

                    <fieldset className="border p-4 rounded-md border-gray-300 text-sm">
                        <legend className="px-2 font-bold text-gray-700 uppercase">Condições</legend>
                        <select name="condicaoImovel" value={formData.condicaoImovel} onChange={handleInputChange} className="w-full border p-2 rounded" required>
                            <option value="selecione">Selecione</option>
                            <option value="Imóvel paga ITR">Imóvel paga ITR</option>
                            <option value="Imóvel não paga ITR">Imóvel não paga ITR</option>
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

                    <fieldset className="border p-4 rounded-md border-gray-300 bg-blue-50">
                        <legend className="px-2 font-bold text-blue-800 uppercase">Valor da Transação</legend>
                        <input type="number" step="0.01" name="valorTransacao" value={formData.valorTransacao} onChange={handleInputChange} placeholder="Ex: 10000.12" className="w-full border p-2 rounded font-bold" />
                        <div className="mt-3 space-y-2">
                            <div className="flex justify-between p-2 bg-blue-100 rounded border border-blue-200">
                                <span className="font-semibold text-blue-900">ITBI (2%):</span>
                                <span className="font-bold text-blue-900">{formData.valorItbi.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
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
                    <button type="submit" className="bg-green-600 text-white px-10 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-md uppercase tracking-wider">
                        {initialData?.id ? 'Atualizar e Salvar' : 'Calcular e Salvar ITBI'}
                    </button>
                </div>
            </form>
        </div>
    );
}
