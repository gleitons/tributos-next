'use client'
import { useState } from "react";
export default function Page() {
    const vtnData = [
        { tipo: "Lavoura – Aptidão Boa", valor: 7500 },
        { tipo: "Lavoura – Aptidão Regular", valor: 4500 },
        { tipo: "Lavoura – Aptidão Restrita", valor: 3000 },
        { tipo: "Pastagem Plantada", valor: 2500 },
        { tipo: "Pastagem Natural", valor: 1500 },
        { tipo: "Preservação da Fauna ou Flora", valor: 1000 }
    ];
    const [ano, setAno] = useState(2010);
    const mudaAno = (mAno) => {
        setAno(mAno)
    }
    console.log(vtnData)
    return (
        <div>
            
            <div className="my-2">
                <div class="flex gap-2 items-center">
                <h3 className="text-md">Mapa Rural de Lagoa dos Patos/MG - * Ajuda em Avaliação</h3>
                    <button onClick={() => mudaAno(2021)} class="px-4 py-2 rounded-lg border border-sky-500 text-sky-700 hover:bg-sky-50 transition font-medium">
                        Mapa 2021
                    </button>
                    <button onClick={() => mudaAno(2010)} class="px-4 py-2 rounded-lg border border-sky-400 text-sky-700 hover:bg-sky-50 transition font-medium">
                        Mapa 2010
                    </button>
                    <p className="bg-blue-700 text-white p-2 rounded-md">Exibindo Mapa de <strong>{ano}</strong></p>
                </div>
       

            </div>
            {/* <div className="Sirv" data-type="zoom" data-src="https://ialkyrog.sirv.com/Images/mapa-lagoa.avif"></div>
            <script async src="https://scripts.sirv.com/sirvjs/v3/sirv.js"></script> */}
            <iframe src={`/pdf/lagoa-dos-patos-rural-${ano}.pdf`} width={"100%"} height={600} frameborder="0"></iframe>
            <section className="py-20 bg-gradient-to-br from-blue-50 via-slate-50 to-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Valor da Terra Nua (VTN) por Hectare
                    </h2>
                    <p className="text-lg text-gray-600 mb-10">
                        Município de <span className="font-semibold text-blue-600">Lagoa dos Patos (MG)</span> — Dados de 2025
                    </p>

                    <div className="overflow-hidden rounded-3xl shadow-xl border border-gray-200 bg-white">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                        Tipo de Uso do Solo
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-white uppercase tracking-wider">
                                        Valor por Hectare (R$)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {vtnData.map((item, index) => (
                                    <tr key={index} className="hover:bg-blue-50/50 transition">
                                        <td className="px-6 py-4 text-gray-800 text-left font-medium">
                                            {item.tipo}
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                                            {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-10 text-sm text-gray-500">
                        <p>
                            Fonte: Secretaria Municipal da Fazenda — Lagoa dos Patos/MG · Exercício de 2025
                        </p>
                    </div>
                </div>
            </section>

        </div>
    )
};
