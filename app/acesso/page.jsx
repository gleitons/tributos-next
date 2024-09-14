'use client'
import React, { useState } from 'react';

export default function AcessoBloqueado() {
  const [senha, setSenha] = useState('');
  const [bloqueado, setBloqueado] = useState(true);

  const verificarSenha = async () => {
    try {
      const resposta = await fetch('/api/verificar-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha }),
      });
      
      if (resposta.ok) {
        setBloqueado(false);
      } else {
        alert('Senha incorreta. Tente novamente.');
      }
    } catch (erro) {
      console.error('Erro ao verificar a senha:', erro);
      alert('Ocorreu um erro ao verificar a senha. Tente novamente mais tarde.');
    }
  };

  if (bloqueado) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Acesso Bloqueado</h1>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            className="w-full px-3 py-2 mb-4 border rounded-md"
          />
          <button
            onClick={verificarSenha}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Acessar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo!</h1>
      {/* Conteúdo da página após o desbloqueio */}
    </div>
  );
}
