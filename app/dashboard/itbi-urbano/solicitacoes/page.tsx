import { db } from '@/lib/db';
import { itbiRural, portalUsers } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import SolicitacoesTabs from './SolicitacoesTabs';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SolicitacoesItbiRuralPage() {
    try {
        // Fetch all requests
        const allRequests = await db.select()
            .from(itbiRural)
            .orderBy(desc(itbiRural.id));

        console.log('[ITBI Rural Solicitacoes] Total requests from DB:', allRequests.length);
        allRequests.forEach(r => {
            console.log(`  -> ID=${r.id} protocolo=${r.protocolo} status='${r.status}'`);
        });

        // Atendidas = status clearly marked as ATENDIDA
        const atendidas = allRequests.filter(r => r.status?.toUpperCase() === 'ATENDIDA');

        // Pendentes = everything that is NOT atendida (including PENDENTE, null, empty, or any other status)
        const pendentes = allRequests.filter(r => r.status?.toUpperCase() !== 'ATENDIDA');

        console.log(`[ITBI Rural Solicitacoes] Pendentes: ${pendentes.length}, Atendidas: ${atendidas.length}`);

        // Fetch registered portal users
        const registeredUsers = await db.select()
            .from(portalUsers)
            .orderBy(desc(portalUsers.dataCadastro));

        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Solicitações - ITBI Rural</h1>
                </div>

                <SolicitacoesTabs
                    pendentes={pendentes}
                    atendidas={atendidas}
                    usuarios={registeredUsers}
                />
            </div>
        );
    } catch (error) {
        console.error('[ITBI Rural Solicitacoes] Error loading data:', error);
        return (
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Solicitações - ITBI Rural</h1>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                    Erro ao carregar as solicitações. Por favor, recarregue a página.
                </div>
            </div>
        );
    }
}
