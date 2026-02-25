'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const camposFormulario = [
    { key: 'empresa', label: 'Empresa / Nome', type: 'text' },
    { key: 'cnpj', label: 'CNPJ', type: 'text' },
    { key: 'cpf', label: 'CPF', type: 'text' },
    { key: 'fantasia', label: 'Nome Fantasia', type: 'text' },
    { key: 'inscricaoEstadual', label: 'Inscrição Estadual', type: 'text' },
    { key: 'inscricaoMunicipal', label: 'Inscrição Municipal', type: 'text' },
    { key: 'telefone', label: 'Telefone', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'dataNascimento', label: 'Data de Nascimento', type: 'text' },
    { key: 'endereco', label: 'Endereço', type: 'text' },
    { key: 'numero', label: 'Número', type: 'text' },
    { key: 'bairro', label: 'Bairro', type: 'text' },
    { key: 'cep', label: 'CEP', type: 'text' },
    { key: 'cidade', label: 'Cidade', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'text' },
    { key: 'dataAbertura', label: 'Data de Abertura', type: 'text' },
    { key: 'senhaSiare', label: 'Senha SIARE', type: 'text' },
    { key: 'senhaGov', label: 'Senha Gov', type: 'text' },
    { key: 'senhaNotaFiscal', label: 'Senha Nota Fiscal', type: 'text' },
    { key: 'codigoSimples', label: 'Código Simples', type: 'text' },
    { key: 'titulo', label: 'Título', type: 'text' },
    { key: 'situacao', label: 'Situação', type: 'text' },
    { key: 'mei', label: 'MEI', type: 'text' },
    { key: 'atividadePrincipal', label: 'Atividade Principal', type: 'text' },
    { key: 'atividadeSecundaria', label: 'Atividade Secundária', type: 'text' },
    { key: 'outrasInformacoes', label: 'Outras Informações', type: 'text' },
    { key: 'regularize', label: 'Regularize', type: 'text' },
];

export default function FormularioDados({ initialData, isEditing = false }) {
    const router = useRouter();
    const [formData, setFormData] = useState(() => {
        const defaults = {};
        camposFormulario.forEach(c => { defaults[c.key] = ''; });
        return initialData ? { ...defaults, ...initialData } : defaults;
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const url = isEditing ? `/api/dados/${formData.id}` : '/api/dados';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage(isEditing ? '✅ Atualizado com sucesso!' : '✅ Cadastrado com sucesso!');
                setTimeout(() => router.push('/dashboard/dados'), 1500);
            } else {
                const err = await response.json();
                setMessage(`❌ Erro: ${err.error || 'Erro desconhecido'}`);
            }
        } catch (error) {
            setMessage('❌ Erro ao salvar, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Tem certeza que deseja excluir este registro?')) return;
        setLoading(true);

        try {
            const response = await fetch(`/api/dados/${formData.id}`, { method: 'DELETE' });
            if (response.ok) {
                setMessage('✅ Registro excluído.');
                setTimeout(() => router.push('/dashboard/dados'), 1500);
            } else {
                setMessage('❌ Erro ao excluir.');
            }
        } catch (error) {
            setMessage('❌ Erro ao excluir.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {isEditing ? '✏️ Editar Cadastro' : '➕ Novo Cadastro'}
                </h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {camposFormulario.map(({ key, label, type }) => (
                            <div key={key} className="flex flex-col">
                                <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
                                <input
                                    type={type}
                                    value={formData[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder={label}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3 justify-center flex-wrap">
                        <button
                            type="button"
                            onClick={() => router.push('/dashboard/dados')}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                        >
                            ← Voltar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Salvando...' : (isEditing ? 'Salvar Alterações' : 'Cadastrar')}
                        </button>

                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition disabled:opacity-50"
                            >
                                🗑️ Excluir
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
