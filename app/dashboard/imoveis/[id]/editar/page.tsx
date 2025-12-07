'use client';

import { useState, useEffect } from 'react';
import { getProperty, updateProperty } from '@/app/actions/properties';
import { useRouter } from 'next/navigation';

export default function EditarImovelPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        tipo: 'URBANO',
        descricao: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        matricula: '',
        livro: '',
        folha: '',
        areaTotal: 0,
        areaAptidaoBoa: 0,
        areaAptidaoRegular: 0,
        areaAptidaoRestrita: 0,
        areaPastagemPlantada: 0,
        areaPastagemNatural: 0,
        areaReserva: 0,
        areaLote: 0,
        areaConstrucao: 0,
        inscricaoMunicipal: '',
    });

    useEffect(() => {
        getProperty(Number(id)).then(data => {
            if (data) {
                setFormData({
                    tipo: data.tipo,
                    descricao: data.descricao || '',
                    endereco: data.endereco || '',
                    numero: data.numero || '',
                    bairro: data.bairro || '',
                    cidade: data.cidade || '',
                    estado: data.estado || '',
                    cep: data.cep || '',
                    matricula: data.matricula || '',
                    livro: data.livro || '',
                    folha: data.folha || '',
                    areaTotal: data.areaTotal || 0,
                    areaAptidaoBoa: data.areaAptidaoBoa || 0,
                    areaAptidaoRegular: data.areaAptidaoRegular || 0,
                    areaAptidaoRestrita: data.areaAptidaoRestrita || 0,
                    areaPastagemPlantada: data.areaPastagemPlantada || 0,
                    areaPastagemNatural: data.areaPastagemNatural || 0,
                    areaReserva: data.areaReserva || 0,
                    areaLote: data.areaLote || 0,
                    areaConstrucao: data.areaConstrucao || 0,
                    inscricaoMunicipal: data.inscricaoMunicipal || '',
                });
            }
            setLoading(false);
        });
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateProperty(Number(id), formData);
        router.push('/dashboard/imoveis');
    };

    if (loading) return <div className="p-8 text-center">Carregando...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Imóvel</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Imóvel</label>
                        <select name="tipo" value={formData.tipo} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                            <option value="URBANO">Urbano</option>
                            <option value="RURAL">Rural</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Descrição / Nome do Imóvel</label>
                        <input type="text" name="descricao" value={formData.descricao} onChange={handleInputChange} required className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Endereço</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Logradouro</label>
                            <input type="text" name="endereco" value={formData.endereco} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bairro</label>
                            <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cidade</label>
                            <input type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <input type="text" name="estado" value={formData.estado} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CEP</label>
                            <input type="text" name="cep" value={formData.cep} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Dados Cartoriais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Matrícula</label>
                            <input type="text" name="matricula" value={formData.matricula} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Livro</label>
                            <input type="text" name="livro" value={formData.livro} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Folha</label>
                            <input type="text" name="folha" value={formData.folha} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>
                </div>

                {formData.tipo === 'URBANO' && (
                    <div className="border-t pt-4 bg-blue-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4 text-blue-800">Dados Urbanos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área do Lote (m²)</label>
                                <input type="number" step="0.01" name="areaLote" value={formData.areaLote} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área Construída (m²)</label>
                                <input type="number" step="0.01" name="areaConstrucao" value={formData.areaConstrucao} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Inscrição Municipal</label>
                                <input type="text" name="inscricaoMunicipal" value={formData.inscricaoMunicipal} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                        </div>
                    </div>
                )}

                {formData.tipo === 'RURAL' && (
                    <div className="border-t pt-4 bg-green-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4 text-green-800">Dados Rurais (Hectares)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área Total</label>
                                <input type="number" step="0.01" name="areaTotal" value={formData.areaTotal} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aptidão Boa</label>
                                <input type="number" step="0.01" name="areaAptidaoBoa" value={formData.areaAptidaoBoa} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aptidão Regular</label>
                                <input type="number" step="0.01" name="areaAptidaoRegular" value={formData.areaAptidaoRegular} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aptidão Restrita</label>
                                <input type="number" step="0.01" name="areaAptidaoRestrita" value={formData.areaAptidaoRestrita} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pastagem Plantada</label>
                                <input type="number" step="0.01" name="areaPastagemPlantada" value={formData.areaPastagemPlantada} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pastagem Natural</label>
                                <input type="number" step="0.01" name="areaPastagemNatural" value={formData.areaPastagemNatural} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Reserva Legal</label>
                                <input type="number" step="0.01" name="areaReserva" value={formData.areaReserva} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Atualizar Imóvel
                    </button>
                </div>
            </form>
        </div>
    );
}
