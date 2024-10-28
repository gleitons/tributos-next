// app/dashboard/registros-imobiliarios/page.jsx
import React from 'react';

async function fetchImoveisData() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'; 

  //   console.log('baseUrl:', baseUrl);${baseUrl}
  const res = await fetch(`http://localhost:3000/api/imoveis/`);
  if (!res.ok) {
    throw new Error('Erro ao carregar dados');
  }
  return res.json();
}

export default async function RegistrosImobiliariosPage() {
  const data = await fetchImoveisData();

  // console.log(data[62])
  return (
    <div>
      <p>Imovis Cadastrados: {data.length}</p>
      <div>
        {/* <button onClick={() => data()}>Carregar</button> */}
        {/* <button>Proximo</button> */}
      </div>
      <div className='overflow-auto h-screen'>
        <table className='min-w-full border-collapse border border-gray-200'>
          <thead className='bg-gray-300 sticky top-0 z-10'>
            <tr className='bg-gray-300'>
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
              <tr
                key={index}
                className={`hover:bg-slate-400 ${index % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300'}`}
              >
                <td className='p-2 border border-gray-200'>{e.matricula} - {index}</td>
                <td className='p-2 border border-gray-200'>{e.proprietario}</td>
                <td className='p-2 border border-gray-200'>{e.codigo_setor}</td>
                <td className='p-2 border border-gray-200'>{e.codigo_quadra}</td>
                <td className='p-2 border border-gray-200'>{e.codigo_lote}</td>
                <td className='p-2 border border-gray-200'>{`${e.rua_nome}, ${e.construcao_numero} - ${e.bairro_descricao}`}</td>
                <td className='p-2 border border-gray-200'>{e.lote_area}</td>
                <td className='p-2 border border-gray-200'>{e.valor_testada_lote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
