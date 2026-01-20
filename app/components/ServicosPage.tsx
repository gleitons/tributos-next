'use client'
import { useState } from "react";
import Link from "next/link";


export default function ServicosPage({ servicos }: { servicos: any }) {
    const [busca, setBusca] = useState("");
    const servicosFiltrados = servicos.filter((servico: any) =>
        servico.nome.toLowerCase().includes(busca.toLowerCase()) ||
        servico.descricao.toLowerCase().includes(busca.toLowerCase())
    );
    const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusca(e.target.value);
    };
    return (
        <div className="space-y-6">

            {/* Barra de busca */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar serviço..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pl-10 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
                />
                <span className="absolute left-3 top-3 text-zinc-400">🔎</span>
            </div>

            {/* Grid de serviços */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {servicosFiltrados.map((servico: any) => (
                    <Link
                        key={servico.id}
                        href={servico.url}
                        className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-500 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{servico.emoji}</span>
                            <h2 className="text-base font-semibold text-zinc-800 group-hover:text-indigo-600">
                                {servico.nome}
                            </h2>
                        </div>

                        <p className="mt-3 text-sm text-zinc-600">
                            {servico.descricao}
                        </p>

                        <div className="mt-4 text-xs font-medium text-indigo-600">
                            Acessar →
                        </div>
                    </Link>
                ))}
            </div>

            {/* Mensagem se não encontrar */}
            {servicosFiltrados.length === 0 && (
                <p className="text-center text-sm text-zinc-500">
                    Nenhum serviço encontrado.
                </p>
            )}
        </div>
    );
}