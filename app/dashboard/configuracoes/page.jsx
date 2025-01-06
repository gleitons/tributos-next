'use client';

import { useState, useEffect} from 'react';
import Atualizando from '@/app/components/loading/Atualizando'
export default function Page() {
  const [novoItbi, setNovoItbi] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [valorAtual, setValorAtual] = useState(<Atualizando />);

  const handleInputChange = (e) => {
    setNovoItbi(e.target.value);
  };


  const pegaValor = async () => {
    try {
      const response = await fetch('/api/config?n=1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
       
      });
    
      const data = await response.json();
      const dataV = data.config.valor;
  
      // Corrigido para toLocaleString
      setValorAtual(dataV.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao buscar o valor.');
    }
  };
  

  const handleSubmit = async () => {
    
    if (!novoItbi) {
      setMensagem('Por favor, insira um valor.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
        body: JSON.stringify({ valor: novoItbi.replace(/,/g, '.') }),
      });
      const data = await response.json();
   

      if (data.success) {
        setMensagem('Valor atualizado com sucesso!');
      } else {
        setMensagem(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao atualizar o valor.');
    }
    pegaValor();
    setIsLoading(false);
  };

  useEffect(() => {
    pegaValor();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
      <div className="space-y-2">
        <p className="text-gray-700">
          Valor UFM atual: <span className="font-medium text-green-600">{valorAtual}</span>
        </p>
        <div className="flex items-center space-x-3">
          <label htmlFor="novo-itbi" className="sr-only">Novo valor</label>
          <input 
            type="number" 
            id="novo-itbi" 
            className="w-36 px-3 py-2  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Novo valor"
            value={novoItbi}
            onChange={handleInputChange}
          />
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Atualizar
          </button>
        </div>
      </div>
      {mensagem && <p className="mt-4 text-sm text-center text-gray-800">{mensagem}</p>}
      {isLoading && <Atualizando />}
    
      {isLoading}
    </div>
  );
}
