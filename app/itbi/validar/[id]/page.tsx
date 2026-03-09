'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaShieldAlt } from 'react-icons/fa';
import LoadingSpinner from '../../../components/loading/LoadingSpinner';
import ProtocoloResult from '../../../components/pesquisa/ProtocoloResult';

export default function DirectValidationPage() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const [result, setResult] = useState<{ success: boolean; message?: string;[key: string]: any } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const validateProtocol = async () => {
            if (!id) return;

            try {
                const response = await fetch('/api/itbi/validar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ protocolo: id }),
                });

                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error('Validation error:', error);
                setResult({ success: false, message: 'Erro ao conectar ao servidor' });
            } finally {
                setIsLoading(false);
            }
        };

        validateProtocol();
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-between py-12 px-4 selection:bg-blue-100 selection:text-blue-900">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50"></div>
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-indigo-200 blur-[100px] rounded-full"></div>
            </div>

            <div className="w-full max-w-xl flex flex-col gap-8 flex-grow">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl border border-gray-100 mb-2 transform hover:rotate-6 transition-transform">
                        <FaShieldAlt className="text-blue-600 text-3xl" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                        Validação <span className="text-blue-600">Automática</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto leading-relaxed">
                        Verificando a autenticidade do documento <span className="font-bold text-slate-700">#{id}</span>
                    </p>
                </div>

                {/* Result Card */}
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10 min-h-[300px] flex flex-col justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-4">
                            <LoadingSpinner />
                            <p className="text-slate-400 font-bold animate-pulse text-sm uppercase tracking-widest">Consultando base de dados...</p>
                        </div>
                    ) : (
                        result && <ProtocoloResult result={result} />
                    )}
                </div>

                {/* Footer instructions */}
                <div className="text-center space-y-2 px-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Atenção</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Em caso de divergência entre este validador e o documento impresso,
                        dirija-se ao Setor de Tributação para esclarecimentos.
                    </p>
                </div>
            </div>

            {/* Brand Footer */}
            <footer className="mt-12 flex flex-col items-center gap-6">
                <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                <Image
                    className="opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                    src='/img/futuro-consultoria-horizonte.png'
                    alt="Futuro Consultoria"
                    width={180}
                    height={40}
                />
            </footer>
        </div>
    );
}