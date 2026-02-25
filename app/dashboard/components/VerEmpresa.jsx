"use client";
import { useState } from "react";
import Link from "next/link";

export default function VerEmpresa({ dadosEmpresa, cor }) {
    const [showModal, setShowModal] = useState(false);
    const [copiedItem, setCopiedItem] = useState("");

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(String(text));
        setCopiedItem(`${label.toUpperCase()} copiado!`);
        setTimeout(() => setCopiedItem(""), 2000);
    };

    // Campos a exibir com labels bonitos
    const camposExibir = [
        { key: 'empresa', label: 'Empresa' },
        { key: 'cnpj', label: 'CNPJ' },
        { key: 'cpf', label: 'CPF' },
        { key: 'fantasia', label: 'Nome Fantasia' },
        { key: 'inscricaoEstadual', label: 'Inscrição Estadual' },
        { key: 'inscricaoMunicipal', label: 'Inscrição Municipal' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'email', label: 'Email' },
        { key: 'dataNascimento', label: 'Data Nascimento' },
        { key: 'endereco', label: 'Endereço' },
        { key: 'numero', label: 'Número' },
        { key: 'bairro', label: 'Bairro' },
        { key: 'cep', label: 'CEP' },
        { key: 'cidade', label: 'Cidade' },
        { key: 'estado', label: 'Estado' },
        { key: 'dataAbertura', label: 'Data Abertura' },
        { key: 'senhaSiare', label: 'Senha SIARE' },
        { key: 'senhaGov', label: 'Senha Gov' },
        { key: 'senhaNotaFiscal', label: 'Senha Nota Fiscal' },
        { key: 'codigoSimples', label: 'Código Simples' },
        { key: 'titulo', label: 'Título' },
        { key: 'situacao', label: 'Situação' },
        { key: 'mei', label: 'MEI' },
        { key: 'atividadePrincipal', label: 'Atividade Principal' },
        { key: 'atividadeSecundaria', label: 'Atividade Secundária' },
        { key: 'outrasInformacoes', label: 'Outras Informações' },
        { key: 'regularize', label: 'Regularize' },
    ];

    const dadosValidos = camposExibir.filter(
        ({ key }) => dadosEmpresa[key] !== null && dadosEmpresa[key] !== undefined && dadosEmpresa[key] !== ""
    );

    const nomeEmpresa = (dadosEmpresa.empresa || '').toLowerCase().split(' ').map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(' ');

    return (
        <div>
            <li
                className={`cursor-pointer ${cor} hover:text-white px-5 hover:bg-slate-600 h-8 flex items-center`}
                onClick={() => setShowModal(true)}
            >
                {(dadosEmpresa.empresa || '').toUpperCase()}
            </li>

            {showModal && (
                <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/70 z-50">
                    <button
                        className="absolute bg-slate-200 animate-pulse top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                        onClick={() => setShowModal(false)}
                    >
                        ✖
                    </button>
                    <div className="bg-white p-6 rounded-lg h-screen pb-14 mt-3 mb-6 overflow-auto shadow-lg w-[70%] relative">
                        <button
                            className="absolute bg-slate-200 animate-pulse top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                            onClick={() => setShowModal(false)}
                        >
                            ✖
                        </button>

                        <h2 className="text-xl font-bold mb-4 text-center">
                            Dados da Empresa: {nomeEmpresa}
                        </h2>

                        {/* Botão para editar */}
                        {dadosEmpresa.id && (
                            <div className="flex justify-center mb-4">
                                <Link
                                    href={`/dashboard/dados/${dadosEmpresa.id}`}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
                                >
                                    ✏️ Editar Cadastro
                                </Link>
                            </div>
                        )}

                        {copiedItem && (
                            <div className="fixed z-30 top-0 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md">
                                {copiedItem}
                            </div>
                        )}
                        <div className="space-y-3">
                            {dadosValidos.map(({ key, label }) => (
                                <p
                                    key={key}
                                    className="animate-jump-in animate-once animate-duration-300 cursor-pointer bg-gray-100 p-2 rounded hover:bg-gray-200"
                                    onClick={() => handleCopy(dadosEmpresa[key], label)}
                                >
                                    <strong>{label}:</strong> {String(dadosEmpresa[key])}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
