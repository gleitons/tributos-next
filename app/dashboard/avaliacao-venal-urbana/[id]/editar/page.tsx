'use client';

import { useState, useEffect } from 'react';
import { getUrbanValuation, updateUrbanValuation } from '@/app/actions/urban-valuation';
import { getUsers } from '@/app/actions/users';
import { getUfmByYear } from '@/app/actions/ufm';
import { useRouter } from 'next/navigation';

export default function EditarAvaliacaoUrbanaPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ufmValue, setUfmValue] = useState<number | null>(null);

    // Form States
    const [formData, setFormData] = useState({
        protocolo: '',
        ano: new Date().getFullYear(),
        usuarioId: '',
        solicitante: '',
        rua: '',
        numero: '',
        bairro: '',
        tipoAcabamento: 0,
        setor: 0,
        quadra: '',
        lote: '',
        areaLote: 0,
        areaConstrucao: 0,
        observacoes: '',
    });

    useEffect(() => {
        const loadData = async () => {
            const [usersData, valuationData] = await Promise.all([
                getUsers(),
                getUrbanValuation(Number(params.id))
            ]);

            setUsers(usersData);

            if (valuationData) {
                setFormData({
                    protocolo: valuationData.protocolo || '',
                    ano: valuationData.ano || new Date().getFullYear(),
                    usuarioId: valuationData.usuarioId?.toString() || '',
                    solicitante: valuationData.solicitante || '',
                    rua: valuationData.rua || '',
                    numero: valuationData.numero || '',
                    bairro: valuationData.bairro || '',
                    tipoAcabamento: valuationData.tipoAcabamento || 0,
                    setor: valuationData.setor || 0,
                    quadra: valuationData.quadra || '',
                    lote: valuationData.lote || '',
                    areaLote: valuationData.areaLote || 0,
                    areaConstrucao: valuationData.areaConstrucao || 0,
                    observacoes: valuationData.observacoes || '',
                });

                // Fetch UFM for the loaded year
                if (valuationData.ano) {
                    const ufm = await getUfmByYear(valuationData.ano);
                    if (ufm) setUfmValue(ufm.valor);
                }
            }
            setIsLoading(false);
        };

        loadData();
    }, [params.id]);

    const fetchUfm = async (year: number) => {
        const ufm = await getUfmByYear(year);
        if (ufm) {
            setUfmValue(ufm.valor);
        } else {
            setUfmValue(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'ano') {
            fetchUfm(Number(value));
        }
    };

    const calculateTotal = () => {
        const areaLote = Number(formData.areaLote) || 0;
        const areaConstrucao = Number(formData.areaConstrucao) || 0;
        const setorMultiplier = Number(formData.setor) || 0;
        const acabamentoValue = Number(formData.tipoAcabamento) || 0;

        // Sector value is now Multiplier * UFM
        const setorValue = ufmValue ? setorMultiplier * ufmValue : 0;

        const valorTerreno = areaLote * setorValue;
        const valorConstrucao = areaConstrucao * acabamentoValue;

        return valorTerreno + valorConstrucao;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const total = calculateTotal();

        await updateUrbanValuation(Number(params.id), {
            ...formData,
            valorVenal: total,
        });

        router.push('/dashboard/avaliacao-venal-urbana');
    };

    if (isLoading) {
        return <div className="text-center p-10">Carregando...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Editar Avaliação Venal Urbana</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Dados Iniciais */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">1. Dados Iniciais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Protocolo Geral</label>
                            <input type="text" name="protocolo" value={formData.protocolo} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 252" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ano</label>
                            <input type="number" name="ano" value={formData.ano} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 2024" />
                            {ufmValue ? (
                                <span className="text-xs text-green-600 font-semibold">UFM {formData.ano}: R$ {ufmValue.toFixed(2)}</span>
                            ) : (
                                <span className="text-xs text-red-500 font-semibold">UFM não encontrada para este ano.</span>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuário</label>
                            <select name="usuarioId" value={formData.usuarioId} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                                <option value="">Selecione</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>
                                        {u.nome} {u.sobrenome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Solicitante</label>
                            <input type="text" name="solicitante" value={formData.solicitante} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: Nome Completo" required />
                        </div>
                    </div>
                </section>

                {/* 2. Endereço do Imóvel */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">2. Endereço do Imóvel</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Rua</label>
                            <input type="text" name="rua" value={formData.rua} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: Rua Santo Brasil" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 456" required />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Bairro</label>
                            <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: Centro" />
                        </div>
                    </div>
                </section>

                {/* 3. Imóvel Urbano */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">3. Imóvel Urbano</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Tipo de Acabamento</label>
                            <select name="tipoAcabamento" value={formData.tipoAcabamento} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2">
                                <option value="0">Selecione</option>
                                <option value="0">Não Possui imóvel</option>
                                <option value="581.62">Unidade de Alto padrão de Acabamento (R$ 581,62)</option>
                                <option value="416.25">Unidade de Padrão Médio de Acabamento (R$ 416,25)</option>
                                <option value="346.50">Unidade de Padrão Normal de Acabamento (R$ 346,50)</option>
                                <option value="200.02">Unidade de Padrão Popular de Acabamento (R$ 200,02)</option>
                                <option value="140.62">Unidade de Baixíssimo Padrão de Acabamento (R$ 140,62)</option>
                                <option value="138">Unidade de Baixíssimo Padrão de Acabamento (R$ 138,00)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Setor (Multiplicador UFM)</label>
                            <select name="setor" value={formData.setor} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2">
                                <option value="0">Selecione</option>
                                <option value="8">Setor 01 (8 UFM)</option>
                                <option value="6">Setor 02 (6 UFM)</option>
                                <option value="4">Setor 03 (4 UFM)</option>
                                <option value="4">Setor 04 (4 UFM)</option>
                                <option value="4">Setor 05 (4 UFM)</option>
                            </select>
                            {ufmValue && formData.setor > 0 && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Valor Calculado: {formData.setor} x R$ {ufmValue.toFixed(2)} = <strong>R$ {(Number(formData.setor) * ufmValue).toFixed(2)}/m²</strong>
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quadra</label>
                                <input type="text" name="quadra" value={formData.quadra} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 0004" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Lote</label>
                                <input type="text" name="lote" value={formData.lote} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 0004" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Tamanho do Imóvel */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">4. Tamanho do Imóvel</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Área do Lote (m²)</label>
                            <input type="number" step="0.01" name="areaLote" value={formData.areaLote} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 100" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Área da Construção (m²)</label>
                            <input type="number" step="0.01" name="areaConstrucao" value={formData.areaConstrucao} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" placeholder="ex: 50" />
                        </div>
                    </div>
                </section>

                {/* 5. Resultado */}
                <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-600">Resultado da Avaliação</h2>
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-700">Valor Venal Total:</span>
                        <span className="text-3xl font-bold text-green-600">R$ {calculateTotal().toFixed(2)}</span>
                    </div>
                    {!ufmValue && (
                        <p className="text-red-500 text-sm mt-2">Atenção: UFM não configurada para o ano selecionado. O cálculo do terreno será R$ 0,00.</p>
                    )}
                </section>

                <section>
                    <label className="block text-sm font-medium text-gray-700">Observações</label>
                    <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" rows={3}></textarea>
                </section>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors">
                        Atualizar Avaliação Urbana
                    </button>
                </div>
            </form>
        </div>
    );
}
