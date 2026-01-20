'use client';

import { useEffect, useState } from 'react';

export default function Page() {
    const [valorNota, setValorNota] = useState('');
    const [aliquota, setAliquota] = useState('');
    const [taxaExpediente, setTaxaExpediente] = useState(0);

    const [issqn, setIssqn] = useState(0);
    const [total, setTotal] = useState(0);

    // Buscar UFM do ano atual
    useEffect(() => {
        async function fetchUfm() {
            try {
                const anoAtual = new Date().getFullYear();
                const res = await fetch('/api/ufm');
                const data = await res.json();

                const ufmAno = data.find((item: any) => item.ano === anoAtual);

                if (ufmAno) {
                    setTaxaExpediente(Number(ufmAno.valor * 2));
                }
            } catch (error) {
                console.error('Erro ao buscar UFM:', error);
            }
        }

        fetchUfm();
    }, []);

    function calcular() {
        const vNota = Number(valorNota.replace(',', '.'));
        const aliq = Number(aliquota.replace(',', '.'));

        if (!vNota || !aliq) return;

        const valorIssqn = (vNota * aliq) / 100;
        const valorTotal = valorIssqn + taxaExpediente;

        setIssqn(valorIssqn);
        setTotal(valorTotal);
    }

    return (
        <>
            <div className="max-w-md space-y-4 rounded-lg border p-6 shadow-sm">
                <h3 className="text-lg font-semibold">
                    Calculadora ISSQN – Lagoa dos Patos/MG
                </h3>

                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Valor da Nota"
                        value={valorNota}
                        onChange={(e) => setValorNota(e.target.value)}
                        className="w-full rounded border p-2"
                    />

                    <input
                        type="text"
                        placeholder="Alíquota (%)"
                        value={aliquota}
                        onChange={(e) => setAliquota(e.target.value)}
                        className="w-full rounded border p-2"
                    />

                    <button
                        onClick={calcular}
                        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
                    >
                        Calcular
                    </button>
                </div>

                <div className="space-y-1 pt-3 text-sm">
                    <p>Taxa de expediente (UFM {new Date().getFullYear()}): R$ {taxaExpediente.toFixed(2)}</p>
                    <p>ISSQN: R$ {issqn.toFixed(2)}</p>
                    <p className="font-semibold">Total: R$ {total.toFixed(2)}</p>
                </div>
            </div>
            <iframe src="https://dapper-panda-e60101.netlify.app/calculadora-issqn.html" className="w-full h-screen" ></iframe> </>
    );
}

