'use client';

import { createProperty } from '@/app/actions/properties';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NovoImovelPage() {
    const router = useRouter();
    const [tipo, setTipo] = useState('URBANO');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data: any = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        await createProperty(data);
        router.push('/dashboard/imoveis');
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastrar Novo Imóvel</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Imóvel</label>
                        <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="mt-1 block w-full border rounded-md p-2" required>
                            <option value="URBANO">Urbano</option>
                            <option value="RURAL">Rural</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Descrição / Nome do Imóvel</label>
                        <input type="text" name="descricao" required className="mt-1 block w-full border rounded-md p-2" placeholder="Ex: Casa Residencial ou Fazenda Santa Maria" />
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Endereço</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Logradouro</label>
                            <input type="text" name="endereco" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número</label>
                            <input type="text" name="numero" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Bairro</label>
                            <input type="text" name="bairro" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cidade</label>
                            <input type="text" name="cidade" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <input type="text" name="estado" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">CEP</label>
                            <input type="text" name="cep" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Dados Cartoriais</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Matrícula</label>
                            <input type="text" name="matricula" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Livro</label>
                            <input type="text" name="livro" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Folha</label>
                            <input type="text" name="folha" className="mt-1 block w-full border rounded-md p-2" />
                        </div>
                    </div>
                </div>

                {tipo === 'URBANO' && (
                    <div className="border-t pt-4 bg-blue-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4 text-blue-800">Dados Urbanos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área do Lote (m²)</label>
                                <input type="number" step="0.01" name="areaLote" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área Construída (m²)</label>
                                <input type="number" step="0.01" name="areaConstrucao" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Inscrição Municipal</label>
                                <input type="text" name="inscricaoMunicipal" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                        </div>
                    </div>
                )}

                {tipo === 'RURAL' && (
                    <div className="border-t pt-4 bg-green-50 p-4 rounded-md">
                        <h2 className="text-lg font-semibold mb-4 text-green-800">Dados Rurais (Hectares)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Área Total</label>
                                <input type="number" step="0.01" name="areaTotal" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aptidão Boa</label>
                                <input type="number" step="0.01" name="areaAptidaoBoa" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aptidão Regular</label>
                                <input type="number" step="0.01" name="areaAptidaoRegular" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Aptidão Restrita</label>
                                <input type="number" step="0.01" name="areaAptidaoRestrita" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pastagem Plantada</label>
                                <input type="number" step="0.01" name="areaPastagemPlantada" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Pastagem Natural</label>
                                <input type="number" step="0.01" name="areaPastagemNatural" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Reserva Legal</label>
                                <input type="number" step="0.01" name="areaReserva" className="mt-1 block w-full border rounded-md p-2" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Salvar Imóvel
                    </button>
                </div>
            </form>
        </div>
    );
}
