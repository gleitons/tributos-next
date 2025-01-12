'use client'
import React, { useEffect, useState } from 'react';
import ImovelItem from '../components/ImovelItem';

async function fetchImoveisData() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

    //${baseUrl}
  const response = await fetch(`https://tributos.netlify.app/api/imoveis/`);
  
  if (!response.ok) {
    throw new Error('Erro ao carregar dados');
  }
  
  const res = await response.json();
  return res;
}

function corrigirNomes(data) {
  return data.map((item) => ({
    ...item,
    proprietario: item.proprietario.replace("GON�", "GONÇ").replace("MAGALH�", "MAGALHÃ").replace("EN�", "ENÇ")
  }));
}

export default function RegistrosImobiliariosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const imoveisData = await fetchImoveisData();
        const imoveisCorrigidos = corrigirNomes(imoveisData);
        setData(imoveisCorrigidos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <p>Imóveis Cadastrados: {data.length - 111}</p>
      <div className="flex justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Cadastro de Todos os Bairros
          </h2>
          <p className="text-lg text-gray-600 text-center mt-2">
            Quantidade de imóveis:{" "}
            <span className="font-semibold text-gray-900">
              {data.length - 111}
            </span>
          </p>
        </div>
      </div>
      <div className='overflow-auto h-screen'>
        <table className='border-collapse border w-full border-gray-200'>
          <thead className='bg-gray-300 sticky top-0 z-10'>
            <tr>
              <th className='p-2 border border-gray-200'>Imóvel</th>
              <th className='p-2 border border-gray-200'>Proprietário</th>
              <th className='p-2 border border-gray-200'>Setor</th>
              <th className='p-2 border border-gray-200'>Quadra</th>
              <th className='p-2 border border-gray-200'>Lote</th>
              <th className='p-2 border border-gray-200'>Endereço</th>
              <th className='p-2 border border-gray-200'>Área Total</th>
              <th className='p-2 border border-gray-200'>Frente</th>
            </tr>
          </thead>
          <tbody className='bg-slate-300 overflow-auto h-screen'>
            {data.map((e, index) => (
              <ImovelItem key={index} imovel={e} inde={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
