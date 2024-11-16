// app/dashboard/registros-imobiliarios/page.jsx
import React from 'react';

async function fetchImoveisData() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  //   console.log('baseUrl:', baseUrl);${baseUrl}
  const res = await fetch(`https://tributos.netlify.app/api/imoveis/`);

  function filtrarPorBairro(imoveis, bairro) {
    return imoveis.filter(imovel => imovel.bairro_descricao === bairro);
  }
  const resultadoSF = await res.json()

  const resultado = await filtrarPorBairro(resultadoSF, "NOVO HORIZONTE");




  if (!res.ok) {
    throw new Error('Erro ao carregar dados');
  }
  return resultado;
}

export default async function RegistrosImobiliariosPage() {
  const data = await fetchImoveisData();

  // console.log(data[62])
  return (
    <div>
      <p>Imóvei Cadastrados: {data.length}</p>
      <div>
        {/* <button onClick={() => data()}>Carregar</button> */}
        {/* <button>Proximo</button> */}
      </div>
      <div  className='overflow-auto h-screen'>
        <div className="flex  justify-center  bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Imóveis do bairro {data[1].bairro_descricao}
            </h2>
            
            <p className="text-lg text-gray-600 text-center mt-2">
              Quantidade de imóveis:{" "}
              <span className="font-semibold text-gray-900">
                {data.length}
              </span>
            </p>
            <div className="mt-4 flex justify-center">
              {/* <button
                onClick={() => setBairro("Cidade Nova")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Filtrar Cidade Nova
              </button>
              <button
                onClick={() => setBairro("Centro")}
                className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Filtrar Centro
              </button> */}
            </div>
          </div>
        </div>

        <table className='min-w-full border-collapse border border-gray-200'>
          <thead className='bg-gray-300 sticky top-0 z-10'>
            <tr className='bg-gray-300'>
            <th className='p-2 border border-gray-200'>i</th>
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
                <td className='p-2 border border-gray-200'>{index}</td>
                <td className='p-2 border border-gray-200'>{e.matricula}</td>
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
