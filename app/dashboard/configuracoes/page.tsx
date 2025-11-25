'use client';

import { useState, useEffect } from 'react';
import { getUfmByYear, updateUfm } from '@/app/actions/ufm';

export default function ConfiguracoesPage() {
    const [ano, setAno] = useState(new Date().getFullYear());
    const [valor, setValor] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [valorAtual, setValorAtual] = useState<string>('Carregando...');

    const fetchUfm = async (year: number) => {
        setValorAtual('Buscando...');
        const ufm = await getUfmByYear(year);
        if (ufm) {
            setValorAtual(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ufm.valor));
            setValor(ufm.valor.toString().replace('.', ','));
        } else {
            setValorAtual('Não definido');
            setValor('');
        }
    };

    useEffect(() => {
        fetchUfm(ano);
    }, [ano]);

    const handleAnoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAno = Number(e.target.value);
        setAno(newAno);
    };

    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValor(e.target.value);
    };

    const handleSubmit = async () => {
        if (!valor) {
            setMensagem('Por favor, insira um valor.');
            return;
        }

        setIsLoading(true);
        setMensagem('');

        try {
            const valorNumber = parseFloat(valor.replace(',', '.'));
            if (isNaN(valorNumber)) {
                setMensagem('Valor inválido.');
                setIsLoading(false);
                return;
            }

            const result = await updateUfm(ano, valorNumber);

            if (result.success) {
                setMensagem('Valor atualizado com sucesso!');
                fetchUfm(ano);
            } else {
                setMensagem('Erro ao atualizar o valor.');
            }
        } catch (error) {
            console.error(error);
            setMensagem('Erro ao processar a requisição.');
        }

        setIsLoading(false);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">Configuração UFM</h1>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Referência</label>
                    <input
                        type="number"
                        value={ano}
                        onChange={handleAnoChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Valor UFM em {ano}:</p>
                    <p className="text-xl font-bold text-green-600">{valorAtual}</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Novo Valor (R$)</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={valor}
                            onChange={handleValorChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0,00"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isLoading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </div>
            </div>

            {mensagem && (
                <div className={`p-3 rounded-md text-center text-sm ${mensagem.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {mensagem}
                </div>
            )}
        </div>
    );
}
