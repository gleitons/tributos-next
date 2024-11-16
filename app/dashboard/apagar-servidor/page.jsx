'use client';
import { useState } from 'react';
import EditarServidor from '@/app/components/editar/EditarServidor';
import CadastroServidor from '@/app/components/cadastro/CadastroServidor';

export default function Page() {
  const [view, setView] = useState('cadastro'); // 'cadastro' ou 'editar'

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Servidores</h1>

      <div className="space-x-4 mb-6">
        <button
          onClick={() => setView('cadastro')}
          className={`p-2 rounded ${
            view === 'cadastro' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          Cadastrar Servidor
        </button>
        <button
          onClick={() => setView('editar')}
          className={`p-2 rounded ${
            view === 'editar' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
        >
          Editar Servidor
        </button>
      </div>

      <div>
        {view === 'cadastro' && <CadastroServidor />}
        {view === 'editar' && <EditarServidor />}
      </div>
    </div>
  );
}
