import { db } from '@/lib/db';
import { imoveis } from '@/app/actions/schema';
import { excluirImovel, salvarImovel } from '@/app/actions/imoveis';

export const dynamic = 'force-dynamic';

export default async function CadastroPage() {
    const listaImoveis = await db.select().from(imoveis);

    return (
        <div className="p-8 max-w-7xl mx-auto font-sans">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Gestão Imobiliária - Lagoa dos Patos</h1>
                <button className="bg-green-600 text-white px-4 py-2 rounded shadow"> + Novo Cadastro </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FORMULÁRIO (Simplificado para o exemplo) */}
                <section className="bg-slate-50 p-6 rounded-lg border">
                    <h2 className="font-semibold mb-4">Dados do Imóvel</h2>
                    <form action={salvarImovel} className="space-y-4">
                        <input type="hidden" name="id" /> {/* Preencher para editar */}
                        <input name="inscricaoMunicipal" placeholder="Inscrição Municipal" className="w-full p-2 border rounded" required />
                        <input name="logradouro" placeholder="Logradouro" className="w-full p-2 border rounded" required />
                        <div className="grid grid-cols-2 gap-2">
                            <input name="numero" placeholder="Nº" className="p-2 border rounded" />
                            <input name="bairro" placeholder="Bairro" className="p-2 border rounded" />
                        </div>
                        <select name="tipo" className="w-full p-2 border rounded">
                            <option value="residencial">Residencial</option>
                            <option value="comercial">Comercial</option>
                            <option value="religioso">Religioso</option>
                            <option value="rural">Rural</option>
                        </select>
                        <input name="areaTotal" type="number" placeholder="Área Total (m²)" className="w-full p-2 border rounded" />
                        <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded font-bold">Salvar Imóvel</button>
                    </form>
                </section>

                {/* TABELA DE LISTAGEM */}
                <section className="lg:col-span-2 overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white shadow-sm">
                        <thead>
                            <tr className="bg-slate-100 border-b">
                                <th className="p-3">Inscrição</th>
                                <th className="p-3">Endereço</th>
                                <th className="p-3">Tipo</th>
                                <th className="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaImoveis.map((imovel) => (
                                <tr key={imovel.id} className="border-b hover:bg-slate-50">
                                    <td className="p-3 font-mono text-sm">{imovel.inscricaoMunicipal}</td>
                                    <td className="p-3">{imovel.logradouro}, {imovel.numero}</td>
                                    <td className="p-3 capitalize">{imovel.tipo}</td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <button className="text-blue-600 hover:underline">Editar</button>
                                        <form action={async () => { 'use server'; await excluirImovel(imovel.id); }}>
                                            <button className="text-red-600 hover:underline">Excluir</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}