'use client';

import { useState, useEffect } from 'react';
import { getPerson, updatePerson } from '@/app/actions/people';
import { useRouter } from 'next/navigation';

export default function EditarPessoaPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { id } = params;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        tipo: 'FISICA',
        nome: '',
        cpfCnpj: '',
        rg: '',
        telefone: '',
        email: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
    });

    useEffect(() => {
        getPerson(Number(id)).then(data => {
            if (data) {
                setFormData({
                    tipo: data.tipo,
                    nome: data.nome,
                    cpfCnpj: data.cpfCnpj,
                    rg: data.rg || '',
                    telefone: data.telefone || '',
                    email: data.email || '',
                    endereco: data.endereco || '',
                    numero: data.numero || '',
                    bairro: data.bairro || '',
                    cidade: data.cidade || '',
                    estado: data.estado || '',
                    cep: data.cep || '',
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
        await updatePerson(Number(id), formData);
        router.push('/dashboard/pessoas');
    };

    if (loading) return <div className="p-8 text-center">Carregando...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Pessoa</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo de Pessoa</label>
                        <select name="tipo" value={formData.tipo} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                            <option value="FISICA">Pessoa Física</option>
                            <option value="JURIDICA">Pessoa Jurídica</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome Completo / Razão Social</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPF / CNPJ</label>
                        <input type="text" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleInputChange} required className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">RG / Inscrição Estadual</label>
                        <input type="text" name="rg" value={formData.rg} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
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

                <div className="flex justify-end pt-4">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                        Atualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
