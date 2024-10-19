'use client';
import { useState } from 'react';
import LoadingSpinner from '../loading/LoadingSpinner';
import { ContratoValido, ContratoInvalido, InsiraContrato } from './ContratosIV';

export default function SearchContrato() {
    const [searchQuery, setSearchQuery] = useState('');
    const [contratoEncontrado, setContratoEncontrado] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Para controlar o loading


    const buscaContrato = async () => {

        setIsLoading(true);

        if (searchQuery.trim() === '') {
                    setContratoEncontrado(<InsiraContrato />)
                    setIsLoading(false);
                    return;
                }

        try {
            const response = await fetch('/api/contratos/', {                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigoC: searchQuery }),
            });
            
            const datea = await response.json(); 


            if (datea.success) {
                console.log(datea.message)
                setContratoEncontrado(<ContratoValido data={datea.message.split('T')[0].split('-').reverse().join('/')} horario={datea.message.split('T')[1].split('.')[0]} />);
            } else {
                setContratoEncontrado(<ContratoInvalido />);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleSearch = () => {    
    //     if (searchQuery.trim() === '') {
    //         setContratoEncontrado(<InsiraContrato />)
    //         return;
    //     }
        
    //     setIsLoading(true); // Ativa o spinner

    //     const resultado = dados.find((dado) => dado.codigo == searchQuery);
    
    //     // Simulação de tempo de carregamento
    //     setTimeout(() => {
    //         if (resultado) {
    //             setContratoEncontrado(<ContratoValido data={resultado.dataCadastro.split('T')[0].split('-').reverse().join('/')} horario={resultado.dataCadastro.split('T')[1].split('.')[0]} />);
    //         } else {
    //             setContratoEncontrado(<ContratoInvalido />);
    //         }

    //         setIsLoading(false); // Desativa o spinner após a busca
    //     }, 1000);
    // };

    return (
        <div>
            <div className="mb-4">
                <input onClick={() => setContratoEncontrado('')}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite sua pesquisa aqui"
                    required
                    maxLength={6}
                />
            </div>

            <div className="flex justify-center">
                <button
                    onClick={buscaContrato}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                    Pesquisar
                </button>
            </div>

            <div className="flex justify-center mt-4">
                {/* Exibe o spinner enquanto está carregando */}
                {isLoading ? <LoadingSpinner /> : contratoEncontrado}
            </div>
        </div>
    );
};
