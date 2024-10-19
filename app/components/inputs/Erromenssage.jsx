import { FaExclamationCircle } from 'react-icons/fa'; // Ícone de erro
import React from 'react';

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-red-100 rounded-lg shadow-lg">
      <FaExclamationCircle className="text-red-600 text-6xl mb-4" /> {/* Ícone grande */}
      <h1 className="text-red-600 text-xl font-bold">Senha incorreta!</h1>
      <p className="text-gray-700 mt-2">Tente novamente.</p>
      <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
        Tentar Novamente
      </button>
    </div>
  );
};

export default ErrorMessage;
