"use client";

import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AtenderButton({ id }: { id: number }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAtender = async () => {
        if (!confirm("Tem certeza que deseja marcar esta solicitação como Atendida?")) return;

        setLoading(true);
        try {
            const res = await fetch("/api/itbi-rural-solicitacao", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: "ATENDIDA" })
            });

            if (res.ok) {
                alert("Solicitação marcada como Atendida com sucesso!");
                router.refresh(); // Refresh the page to remove from "Pendentes"
            } else {
                alert("Erro ao atualizar a solicitação.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro na comunicação com o servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAtender}
            disabled={loading}
            className={`bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 items-center justify-center flex gap-2 text-xs transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Marcar como Atendida"
        >
            <FaCheck size={12} /> {loading ? "Atendendo..." : "Atender"}
        </button>
    );
}
