'use client';

import { useState, useEffect } from 'react';
import { createItbi } from '@/app/actions/itbi';
import { useRouter } from 'next/navigation';

export default function ItbiForm({ people, properties }: { people: any[], properties: any[] }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        protocolo: '',
        adquirenteId: '',
        transmitenteId: '',
        imovelId: '',
        natureza: 'COMPRA E VENDA',
        qualidadeImovel: 'REGULAR',
        condicaoImovel: 'PAGAIPTU',
        situacaoTransmitente: 'NADACONSTA',
        valorTransacao: 0,
        valorVenal: 0,
        valorItbi: 0,
        observacoes: '',
    });

    const [valorCalculado, setValorCalculado] = useState(0);

    // Constants (could be fetched from config)
    const UFM_VALUE = 4.63; // Example value
    const TAXA_EXPEDIENTE_UFM = 2;
    const ITBI_RATE = 0.02;

    useEffect(() => {
        calculateItbi();
    }, [formData.valorVenal, formData.valorTransacao]);

    const calculateItbi = () => {
        // Use the higher value between Transaction and Venal
        const baseCalculation = Math.max(formData.valorTransacao, formData.valorVenal);
        const tax = baseCalculation * ITBI_RATE;
        const fee = UFM_VALUE * TAXA_EXPEDIENTE_UFM;
        const total = tax + fee;

        setValorCalculado(total);
        setFormData(prev => ({ ...prev, valorItbi: total }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createItbi(formData);
        router.push('/dashboard/itbi');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Protocolo</label>
                    <input type="text" name="protocolo" value={formData.protocolo} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="Ex: 1212/2025" />
                </div>

                <div className="md:col-span-2 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Partes Envolvidas</h3>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Adquirente (Comprador)</label>
                    <select name="adquirenteId" value={formData.adquirenteId} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                        <option value="">Selecione...</option>
                        {people.map(p => (
                            <option key={p.id} value={p.id}>{p.nome} - {p.cpfCnpj}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Transmitente (Vendedor)</label>
                    <select name="transmitenteId" value={formData.transmitenteId} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                        <option value="">Selecione...</option>
                        {people.map(p => (
                            <option key={p.id} value={p.id}>{p.nome} - {p.cpfCnpj}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-700">Imóvel e Transação</h3>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Imóvel</label>
                    <select name="imovelId" value={formData.imovelId} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                        <option value="">Selecione...</option>
                        {properties.map(p => (
                            <option key={p.id} value={p.id}>{p.descricao} - {p.tipo} - {p.endereco}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Natureza da Transmissão</label>
                    <select name="natureza" value={formData.natureza} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                        <option value="COMPRA E VENDA">COMPRA E VENDA</option>
                        <option value="CESSÃO DE DIREITO HEREDITÁRIO">CESSÃO DE DIREITO HEREDITÁRIO</option>
                        <option value="ISENÇÃO">ISENÇÃO DE ITBI</option>
                        <option value="FUSÃO/INCORPORAÇÃO">FUSÃO, INCORPORAÇÃO, CISÃO OU EXTINÇÃO</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Qualidade do Imóvel</label>
                    <select name="qualidadeImovel" value={formData.qualidadeImovel} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2">
                        <option value="OTIMO">OTIMO</option>
                        <option value="MUITO BOM">MUITO BOM</option>
                        <option value="BOM">BOM</option>
                        <option value="REGULAR">REGULAR</option>
                        <option value="RUIM">RUIM</option>
                        <option value="PESSIMO">PÉSSIMO</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Condição do Imóvel</label>
                    <select name="condicaoImovel" value={formData.condicaoImovel} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2">
                        <option value="PAGAIPTU">O IMÓVEL PAGA IPTU</option>
                        <option value="NAOPAGAIPTU">NÃO PAGA IPTU</option>
                        <option value="PAGAITR">IMOVEL RURAL PAGA ITR</option>
                        <option value="NAOPAGAITR">NÃO PAGA ITR</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Situação Transmitente</label>
                    <select name="situacaoTransmitente" value={formData.situacaoTransmitente} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2">
                        <option value="NADACONSTA">NADA CONSTA</option>
                        <option value="POSSUIDIVIDA">POSSUI DIVIDA ATIVA</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Valor da Transação (R$)</label>
                    <input type="number" step="0.01" name="valorTransacao" value={formData.valorTransacao} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Valor Venal (Avaliação) (R$)</label>
                    <input type="number" step="0.01" name="valorVenal" value={formData.valorVenal} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                </div>

                <div className="md:col-span-2 bg-gray-100 p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold text-gray-800">Valor Total ITBI: {valorCalculado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    <p className="text-sm text-gray-500 mt-1">(Maior Valor x 2%) + Taxa Expediente</p>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" rows={3}></textarea>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Gerar ITBI
                </button>
            </div>
        </form>
    );
}
