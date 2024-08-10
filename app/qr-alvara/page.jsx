'use client'
import React from 'react';
import { useState } from 'react';

export default function QrAlvara() {
    const [local, setLocal] = useState('/pdf/codigo-tributario-lagoa-dos-patos-mg.pdf')
    
    const issqn = () => {
        setLocal('/pdf/lei-issqn-lagoa-dos-patos-mg.pdf')
        
    } 
    const codigoTributario =  () => {
        setLocal('/pdf/codigo-tributario-lagoa-dos-patos-mg.pdf')
    }
    const outrasLeis = () => {
        setLocal('https://lagoadospatos.mg.gov.br/leis/')
    }

    
    
    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="flex justify-between mb-6 space-x-4">
                <button onClick={() => codigoTributario()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg">
                Codigo tributario
                </button>
                <button onClick={() => issqn()} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg">
                Codigo ISSQN
                    
                </button>
                <button onClick={() => outrasLeis()} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg">
                    Outras Leis
                </button>
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
