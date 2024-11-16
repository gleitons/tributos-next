'use client';
import { useState, useEffect } from 'react';
import ServidorForm from '@/app/components/ServidorForm';

export default function EditarServidor() {
  const [servidores, setServidores] = useState([]);
  const [servidorSelecionado, setServidorSelecionado] = useState(null);

  // Carregar servidores da API
  useEffect(() => {
    const fetchServidores = async () => {
      try {
        const response = await fetch('/api/servidor');
        const data = await response.json();
        setServidores(data);
      } catch (error) {
        console.error('Erro ao buscar servidores:', error);
      }
    };

    fetchServidores();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Servidores</h1>
      
      {/* Lista de servidores */}
      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 space-y-2">
        {servidores.map((servidor) => (
          <li
            key={servidor._id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-200"
            onClick={() => setServidorSelecionado(servidor)}
          >
            {servidor.nome}
          </li>
        ))}
      </ul>

      {/* Formulário de edição */}
      {servidorSelecionado && (
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Editar {servidorSelecionado.nome}</h2>
          <ServidorForm servidor={servidorSelecionado} />
          <button
            onClick={() => setServidorSelecionado(null)}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
