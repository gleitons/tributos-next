'use client';

import { useState, useEffect } from 'react';
import { getUser, updateUser } from '@/app/actions/users';
import { useRouter } from 'next/navigation';

export default function EditarUsuarioPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    sobrenome: '',
    cargo: '',
    setor: '',
    dataAdmissao: '',
    funcao: '',
    email: '',
    telefone: '',
    status: 'ativo'
  });

  useEffect(() => {
    getUser(Number(id)).then(user => {
        if (user) {
            setFormData({
                matricula: user.matricula || '',
                nome: user.nome || '',
                sobrenome: user.sobrenome || '',
                cargo: user.cargo || '',
                setor: user.setor || '',
                dataAdmissao: user.dataAdmissao || '',
                funcao: user.funcao || '',
                email: user.email || '',
                telefone: user.telefone || '',
                status: user.status || 'ativo',
            });
        }
        setLoading(false);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(Number(id), formData);
      router.push('/dashboard/usuarios');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário. Verifique os dados.');
    }
  };

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Editar Usuário</h1>
      
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

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
                Salvar Alterações
            </button>
        </div>
      </form>
    </div>
  );
}
