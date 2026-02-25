import Link from "next/link";
import EmpresasList from "./EmpresasList";
import { db } from "@/lib/db";
import { informacoes } from "@/lib/schema";
import { asc } from "drizzle-orm";

export default async function Page() {
    let cadastros = [];

    try {
        cadastros = await db.select().from(informacoes).orderBy(asc(informacoes.empresa));
    } catch (error) {
        console.error("Erro ao buscar dados do banco:", error);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
                Dados Fiscais de Contribuintes
            </h2>
            <p className="text-center text-gray-600 text-sm">
                Sala Mineira do Empreendedor
            </p>

            <div className="mt-6 flex flex-col md:flex-row gap-6 bg-white shadow-xl rounded-2xl p-6">

                {/* LISTA DE EMPRESAS (Componente Cliente) */}
                <EmpresasList initialData={cadastros} />

                {/* LATERAL DIREITA */}
                <div className="w-full md:w-1/3 flex flex-col gap-4">

                    {/* Botão Novo Cadastro */}
                    <div className="flex justify-center">
                        <Link
                            href="/dashboard/dados/novo"
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition"
                        >
                            ➕ Novo Cadastro
                        </Link>
                    </div>

                    {/* Caixa Informativa */}
                    <div className="sticky top-6 bg-white shadow-xl rounded-2xl p-5 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            <span className="font-semibold text-gray-900 dark:text-white">Clique na empresa</span>
                            &nbsp;para visualizar informações completas sobre seus&nbsp;
                            <span className="font-semibold">dados fiscais</span>.
                            <br /><br />
                            A&nbsp;
                            <span className="text-blue-600 font-semibold">Sala Mineira do Empreendedor</span>&nbsp;de&nbsp;
                            <span className="text-blue-600 font-semibold">Lagoa dos Patos - MG</span>
                            &nbsp;está disponível para auxiliar contribuintes com informações e suporte personalizado.
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}
