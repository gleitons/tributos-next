'use client'
import RegistroImobiliarioList from "./RegistroImobiliarioList";
import { useState } from "react";

export default function ImovelItem({ imovel, inde }) {
    // const [mostraImovela, setMostraImovela] = useState(false)
    const [selectedRegistro, setSelectedRegistro] = useState(null);

    const mostraImovel = (item) => {
        // setMostraImovela(!mostraImovel);
        setSelectedRegistro(true);
    }
    return (
        <>
            <tr
                onClick={() => mostraImovel()}
                className={`hover:bg-slate-400 ${inde % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300'}`}
            >
                <td className='p-2 border border-gray-200'>{imovel.matricula} - {inde}</td>
                <td className='p-2 border border-gray-200'>{imovel.proprietario}</td>
                <td className='p-2 border border-gray-200'>{imovel.codigo_setor}</td>
                <td className='p-2 border border-gray-200'>{imovel.codigo_quadra}</td>
                <td className='p-2 border border-gray-200'>{imovel.codigo_lote}</td>
                <td className='p-2 border border-gray-200'>{`${imovel.rua_nome}, ${imovel.construcao_numero} - ${imovel.bairro_descricao}`}</td>
                <td className='p-2 border border-gray-200'>{imovel.lote_area}</td>
                <td className='p-2 border border-gray-200'>{imovel.valor_testada_lote}</td>

            </tr>
            {selectedRegistro && (
                <RegistroImobiliarioList
                    registro={imovel}
                    onClose={() => setSelectedRegistro(null)}
                />
            )}
        </>

    )
};
