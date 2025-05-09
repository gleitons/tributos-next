"use client";
import { useState } from "react";

export default function VerEmpresa({ dadosEmpresa, cor}) {
    const [showModal, setShowModal] = useState(false);
    const [copiedItem, setCopiedItem] = useState("");

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(`${label.toUpperCase()} copiado!`);
        setTimeout(() => setCopiedItem(""), 2000); // Esconde o banner após 2 segundos
    };

    // Filtra apenas as chaves que possuem valores não vazios
    const dadosValidos = Object.entries(dadosEmpresa).filter(([key, value]) =>
        value !== null && value !== undefined && value !== ""
    );

    return (
        <div>
            {/* Item da lista que abre o modal */}
            <li
                className={`cursor-pointer ${cor} hover:text-white px-5  hover:bg-slate-600 h-8`}
                onClick={() => setShowModal(true)}
            >
                {dadosEmpresa.empresa.toUpperCase()}
            </li>

            {/* Modal */}
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-screen  flex items-center justify-center bg-black/70 z-50">
                    <button
                        className=" absolute bg-slate-200 animate-pulse top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                        onClick={() => setShowModal(false)}
                    >
                        ✖
                    </button>
                    <div className="bg-white  p-6 rounded-lg h-screen pb-14 mt-3 mb-6  overflow-auto shadow-lg w-[70%]  relative">
                        <button
                            className="absolute bg-slate-200 animate-pulse top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>


                        <h2 className="text-xl font-bold mb-4 text-center">Dados da Empresa: {dadosEmpresa.empresa.toLowerCase().split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ')}</h2>

                        {copiedItem && (
                            <div className="fixed  z-30 top-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md">
                                {copiedItem}
                            </div>
                        )}
                        <div className="space-y-3">
                            {dadosValidos.map(([key, value]) => (
                                <p
                                    key={key}
                                    className="animate-jump-in animate-once animate-duration-300 cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200"
                                    onClick={() => handleCopy(value, key)}
                                >
                                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}
