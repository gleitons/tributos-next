'use client'
import { useState } from 'react';

async function fetchSelic(dataInicio, dataFim) {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados?formato=json&dataInicial=${dataInicio}&dataFinal=${dataFim}`;
  const resp = await fetch(url);
  const data = await resp.json();
  
  return data.map((item) => parseFloat(item.valor) / 12); // Dividindo por 12 para obter a Selic mensal
}

function PlanilhaFinanceira() {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [valorBase, setValorBase] = useState(1200); // Salário base de R$ 1.200,00
  const [valorGratificacao, setValorGratificacao] = useState(1440); // Gratificação inicial de R$ 1.440,00
  const [linhas, setLinhas] = useState([]);
  const [selicAcumulada, setSelicAcumulada] = useState(null);

  async function calcularValorCorrigido(valorOriginal, selicMensal) {
    let valorCorrigido = valorOriginal;
    selicMensal.forEach((taxa) => {
      valorCorrigido *= 1 + taxa / 100;
    });
    return valorCorrigido;
  }

  async function gerarPlanilha() {
    const dataInicio = inicio.split('-').reverse().join('/');
    const dataFim = fim.split('-').reverse().join('/');
    
    const selicMensal = await fetchSelic(dataInicio, dataFim);
    console.log(selicMensal);
    const valorOriginal = valorGratificacao; // Considerando o valor da gratificação já calculado
    const valorCorrigido = await calcularValorCorrigido(valorOriginal, selicMensal);

    // Exemplo prático para aplicar a fórmula diretamente
    const exemploValorCorrigido = valorGratificacao * (1 + 0.40); // 40% de Selic acumulada
    console.log(`Valor corrigido (exemplo): R$ ${exemploValorCorrigido.toFixed(2)}`);
    
    const listaLinhas = [];
    const dataInicioDate = new Date(inicio);
    const dataFimDate = new Date(fim);
    let un = 1;

    while (dataInicioDate <= dataFimDate) {
      const mesNome = dataInicioDate.toLocaleString('pt-BR', { month: 'long' });
      const ano = dataInicioDate.getFullYear();
      const valorAtualizado = valorCorrigido + valorGratificacao;

      listaLinhas.push({
        un: un++,
        mes: mesNome,
        ano: ano,
        valorBase,
        valorGratificacao,
        valorAtualizado,
      });

      dataInicioDate.setMonth(dataInicioDate.getMonth() + 1);
    }

    setLinhas(listaLinhas);
    setSelicAcumulada(valorCorrigido);
  }

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Planilha Financeira</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <label className="flex flex-col items-center text-gray-700">
          Início:
          <input
            type="date"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </label>
        <label className="flex flex-col items-center text-gray-700">
          Fim:
          <input
            type="date"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </label>
        <label className="flex flex-col items-center text-gray-700">
          Valor Base:
          <input
            type="number"
            value={valorBase}
            onChange={(e) => setValorBase(Number(e.target.value))}
            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </label>
        <label className="flex flex-col items-center text-gray-700">
          Valor Gratificação:
          <input
            type="number"
            value={valorGratificacao}
            onChange={(e) => setValorGratificacao(Number(e.target.value))}
            className="mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </label>
        <button
          onClick={gerarPlanilha}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Gerar Planilha
        </button>
      </div>

      {selicAcumulada && (
        <p className="text-lg font-medium text-gray-700 mb-4">
          Selic Acumulada: R$ {selicAcumulada.toFixed(2)}
        </p>
      )}

      <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 border">UN</th>
              <th className="py-2 px-4 border">Mês</th>
              <th className="py-2 px-4 border">Ano</th>
              <th className="py-2 px-4 border">Valor Base</th>
              <th className="py-2 px-4 border">Valor Gratificação</th>
              <th className="py-2 px-4 border">Valor Atualizado</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha, index) => (
              <tr key={index} className="text-center even:bg-gray-100">
                <td className="py-2 px-4 border">{linha.un}</td>
                <td className="py-2 px-4 border capitalize">{linha.mes}</td>
                <td className="py-2 px-4 border">{linha.ano}</td>
                <td className="py-2 px-4 border">R$ {linha.valorBase.toFixed(2)}</td>
                <td className="py-2 px-4 border">R$ {linha.valorGratificacao.toFixed(2)}</td>
                <td className="py-2 px-4 border">R$ {linha.valorAtualizado.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlanilhaFinanceira;
