'use client';
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTicketAlt } from "react-icons/fa";
import Link from "next/link";

const ContratoValido = ({ data, horario, down }) => {
  const [baixar, setBaixar] = useState(false);


  useEffect(() => {
    if (down) {
      setBaixar(true);
    }
  }, [down]);
  return (
    <div className="p-4 mt-10 w-full bg-green-100 rounded-lg border border-green-400">
      <div className="flex items-center justify-center">
        <FaCheckCircle className="text-green-600 text-4xl mr-4" />
        <div>
          <h2 className="text-green-700 font-bold text-xl">O CONTRATO É VÁLIDO</h2>
          <p className="text-green-600">Este contrato foi verificado e foi realizado por nossa Equipe.</p>
          <p className="text-green-600">Criado em: {data} - {horario} hs.</p>
        </div>
      </div>
      {
        baixar && (
          <Link href={down} target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center mt-4">
              <button className="text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Download</button>
            </div>
          </Link>
        )
      }

    </div>

  );
};

const ContratoInvalido = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-10 bg-red-100 rounded-lg border border-red-400">
      <FaTimesCircle className="text-red-600 text-4xl mr-4" />
      <div>
        <h2 className="text-red-700 font-bold text-xl">Contrato Inválido</h2>
        <p className="text-red-600">Este contrato contém erros ou está inválido.</p>
      </div>
    </div>
  );
};
const InsiraContrato = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-10 bg-blue-100 rounded-lg border border-blue-400">
      <FaTicketAlt className="text-blue-600 text-4xl mr-4" />
      <div>
        <h2 className="text-blue-700 font-bold text-xl text-center">ATENÇÃO, DIGITE CORRETAMENTE</h2>
        <p className="text-blue-600 text-center">Informe o número do contrato no campo em branco.</p>
      </div>
    </div>
  );
};

export { ContratoValido, ContratoInvalido, InsiraContrato };
