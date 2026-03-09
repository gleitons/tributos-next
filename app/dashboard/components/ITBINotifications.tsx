'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ITBINotifications() {
    const [pendentesCount, setPendentesCount] = useState(0);

    useEffect(() => {
        const fetchPendentes = async () => {
            try {
                // Reaproveitamos a rota de GET que criamos para itbi rural 
                // Precisamos de uma query apenas para pendentes, mas como a tabela não é muito pesada podemos filtrar ou modificar a api.
                // Vou fazer uma chamada simples para a nossa rota api e contar.
                const res = await fetch('/api/itbi-rural-solicitacao');
                const data = await res.json();

                if (Array.isArray(data)) {
                    const pendentes = data.filter((item: any) => item.observacoes === 'Pendente');
                    setPendentesCount(pendentes.length);
                }
            } catch (err) {
                console.error("Erro ao buscar notificações ITBI", err);
            }
        };

        fetchPendentes();
        // Polling a cada 30 segundos
        const interval = setInterval(fetchPendentes, 30000);
        return () => clearInterval(interval);
    }, []);

    if (pendentesCount === 0) return null;

    return (
        <Link href="/dashboard/itbi-rural/solicitacoes" className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 hover:bg-orange-700 transition z-50 animate-bounce">
            <div className="bg-white text-orange-600 font-black rounded-full w-8 h-8 flex items-center justify-center">
                {pendentesCount}
            </div>
            <div>
                <p className="font-bold">Aviso: ITBI Pendente</p>
                <p className="text-xs">Existem solicitações aguardando.</p>
            </div>
        </Link>
    );
}
