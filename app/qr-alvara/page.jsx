'use client'
import React from 'react';
import { useState } from 'react';
import BotoesQrAlvara from '../components/botoes/BotoesQrAlvara';
import enderecosPdf from '../components/botoes/enderecosPdf';

export default function QrAlvara() {
    const [local, setLocal] = useState(enderecosPdf(2))
    
    const handleChangePdf = (cod) => {
        setLocal(enderecosPdf(cod)); // Define o PDF baseado no código
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex justify-between mb-6 space-x-4">
                <BotoesQrAlvara funcao={() => handleChangePdf(2)} tituloBtn="Código Tributário" cor="bg-blue-500 hover:bg-blue-600"/>
                <BotoesQrAlvara funcao={() => handleChangePdf(1)} tituloBtn="Código ISSQN" cor="bg-green-500 hover:bg-green-600"/>
                <BotoesQrAlvara funcao={() => handleChangePdf(3)} tituloBtn="Outras Leis" cor="bg-red-500 hover:bg-red-600"/>
                <BotoesQrAlvara funcao={() => handleChangePdf(4)} tituloBtn="Contato" cor="bg-green-900 hover:bg-green-600"/>
            </div>
            <div className="w-full h-full flex justify-center items-center">
                <iframe 
                    src={local}
                    className="w-full h-[800px] border border-gray-300 rounded shadow-lg"
                    title="PDF Viewer">
                </iframe>
            </div>
        </div>
    
    );
}
