'use client';

import { useState } from 'react';
import { createUser } from '@/app/actions/users';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function NovoUsuarioPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        matricula: '',
        nome: '',
        sobrenome: '',
        cargo: '',
        setor: '',
        dataAdmissao: '',
        password: '',
        funcao: '',
        email: '',
        telefone: '',
        status: 'ativo'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password && !formData.email) {
            alert('O email é obrigatório quando uma senha é definida.');
            return;
        }
        try {
            await createUser(formData);
            router.push('/dashboard/usuarios');
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            alert('Erro ao criar usuário. Verifique os dados.');
        }
    };

    const emailRequired = formData.password.length > 0;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Novo Usuário</h1>

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Matrícula */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Matrícula</label>
                        <input
                            type="text"
                            name="matricula"
                            required
                            value={formData.matricula}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                        </select>
                    </div>

                    {/* Nome */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            required
                            value={formData.nome}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Sobrenome */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome</label>
                        <input
                            type="text"
                            name="sobrenome"
                            value={formData.sobrenome}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Cargo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                        <input
                            type="text"
                            name="cargo"
                            value={formData.cargo}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Função */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                        <input
                            type="text"
                            name="funcao"
                            value={formData.funcao}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Setor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                        <input
                            type="text"
                            name="setor"
                            value={formData.setor}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Data Admissão */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Data de Admissão</label>
                        <input
                            type="date"
                            name="dataAdmissao"
                            value={formData.dataAdmissao}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Senha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email {emailRequired && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="email"
                            name="email"
                            required={emailRequired}
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full border rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 ${emailRequired && !formData.email ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                        />
                        {emailRequired && !formData.email && (
                            <p className="text-xs text-red-500 mt-1">Email obrigatório quando senha é definida</p>
                        )}
                    </div>

                    {/* Telefone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                        <input
                            type="text"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
                    >
                        Salvar Usuário
                    </button>
                </div>
            </form>
        </div>
    );
}
