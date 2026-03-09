'use client';
import { useState } from 'react';
import LoadingSpinner from '../loading/LoadingSpinner';
import ProtocoloResult from './ProtocoloResult';

export default function SearchProtocolo() {
    const [protocolo, setProtocolo] = useState('');
    const [result, setResult] = useState<{ success: boolean; message?: string;[key: string]: any } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!protocolo.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/itbi/validar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ protocolo }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Search error:', error);
            setResult({ success: false, message: 'Erro ao conectar ao servidor' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        value={protocolo}
                        onChange={(e) => setProtocolo(e.target.value.toUpperCase())}
                        placeholder="Digite o número do protocolo"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg font-medium"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading || !protocolo.trim()}
                    className={`w-full py-3 px-6 rounded-lg text-white font-bold text-lg shadow-lg transform transition-all active:scale-95 ${isLoading || !protocolo.trim()
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                        }`}
                >
                    {isLoading ? 'Validando...' : 'Validar Documento'}
                </button>
            </form>

            <div className="mt-8">
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <LoadingSpinner />
                    </div>
                ) : (
                    result && <ProtocoloResult result={result} />
                )}
            </div>
        </div>
    );
}
