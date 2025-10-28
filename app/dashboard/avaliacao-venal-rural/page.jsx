'use client'
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

// --- Componente Principal da Página de Avaliação ---
export default function AvaliacaoRuralPage() {
    // --- Estados para gerenciar os dados do formulário e da avaliação ---
    const anoCorrente = new Date().getFullYear()
    // Informações do Imóvel e Proprietário
    const [proprietario, setProprietario] = useState('Gleiton Aparecido Soares de Souza');
    const [imovel, setImovel] = useState('Fazenda Exemplo');
    const [matricula, setMatricula] = useState('12.345');
    const [areaTotal, setAreaTotal] = useState(0); // Área total em hectares
    const [protocolo, setProtocolo] = useState(0);
    const [solicitante, setSolicitante] = useState('')
    const [ano, setAno] = useState(2025)

    // Gerenciamento dos anos e valores da terra nua (VTN)
    const [anoSelecionado, setAnoSelecionado] = useState('');
    const [anosDisponiveis, setAnosDisponiveis] = useState([2024, 2023, 2022]); // Simulação inicial
    const [valoresVTN, setValoresVTN] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Nomes das categorias de terra para facilitar a manutenção
    const categoriasTerra = {
        aptidaoBoa: '1º: Lavoura aptidão boa',
        aptidaoRegular: '2º: Lavoura aptidão regular',
        aptidaoRestrita: '3º: Lavoura aptidão restrita',
        pastagemPlantada: '4º: Pastagem plantada',
        pastagemNatural: '5º: Silvicultura ou Pastagem Natural',
        reserva: '6º: Preservação da Fauna ou Flora',
    };

    // Estado para armazenar as porcentagens de cada tipo de terra
    const [porcentagens, setPorcentagens] = useState({
        aptidaoBoa: 0,
        aptidaoRegular: 0,
        aptidaoRestrita: 0,
        pastagemPlantada: 0,
        pastagemNatural: 0,
        reserva: 0,
    });

    // --- Efeitos para buscar dados e realizar cálculos ---

    // Efeito para buscar os valores de VTN quando um ano é selecionado
    useEffect(() => {
        if (!anoSelecionado) {
            setValoresVTN(null);
            return;
        }

        const fetchValoresVTN = async () => {
            setLoading(true);
            setError('');
            try {
                // No futuro, isso será uma chamada para sua API Next.js:
                // const response = await fetch(`/api/vtn/${anoSelecionado}`);
                // const data = await response.json();

                // Por enquanto, usamos dados simulados
                const data = await mockApiCall(anoSelecionado);

                if (data) {
                    setValoresVTN(data.valores);
                } else {
                    throw new Error('Ano não encontrado');
                }

            } catch (err) {
                setError('Não foi possível carregar os valores para este ano.');
                setValoresVTN(null);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchValoresVTN();
    }, [anoSelecionado]);

    // --- Funções de Manipulação de Eventos e Cálculos ---

    // Função para atualizar as porcentagens e garantir que a soma não passe de 100
    const handlePorcentagemChange = (categoria, valor) => {
        const novoValor = Math.max(0, Number(valor)); // Garante que não seja negativo
        const novasPorcentagens = { ...porcentagens, [categoria]: novoValor };

        const somaAtual = Object.values(novasPorcentagens).reduce((acc, curr) => acc + curr, 0);

        if (somaAtual > 100) {
            alert("A soma das porcentagens não pode exceder 100%.");
            return;
        }

        setPorcentagens(novasPorcentagens);
    };

    // Função para acionar a impressão do navegador
    const handlePrint = () => {
        window.print();
    };

    // --- Cálculos dos Totais ---
    const totalPorcentagem = Object.values(porcentagens).reduce((soma, p) => soma + p, 0);
    const valorTotalTerraNua = valoresVTN ? Object.keys(porcentagens).reduce((soma, key) => {
        const porcentagem = porcentagens[key] || 0;
        const valorHectare = valoresVTN[key] || 0;
        return soma + (areaTotal * (porcentagem / 100)) * valorHectare;
    }, 0) : 0;

    // --- Renderização do Componente ---
    return (
        <>
            {/* Head da página para título e metadados */}
            <Head>
                <title>Avaliação Venal Rural - Lagoa dos Patos/MG</title>
                <meta name="description" content="Sistema para geração de avaliação venal de imóveis rurais." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Estilos Globais e de Impressão */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                }
                @media print {
                    /* Esconde elementos não essenciais na impressão */
                    .no-print {
                        display: none !important;
                    }
                    /* Garante que a área de impressão ocupe a página */
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        box-shadow: none;
                        border: none;
                        margin: 0;
                        padding: 0;
                    }
                    /* Estilo para a página A4 */
                    @page {
                        size: A4;
                        margin: 2cm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background-color: #fff;
                        color: #000;
                    }
                }
            `}</style>

            {/* Container Principal */}
            <main className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Cabeçalho da Ferramenta (visível na tela) */}
                    <div className="text-center mb-8 no-print">
                        <h1 className="text-3xl font-bold text-gray-800">Gerador de Avaliação Venal Rural</h1>
                        <p className="text-gray-600 mt-1">Município de Lagoa dos Patos/MG</p>
                    </div>

                    {/* Formulário de Inputs (visível na tela) */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 no-print">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Informações Gerais</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="proprietario" className="block text-sm font-medium text-gray-700">Protocolo</label>
                                <input type="text" id="protocolo" value={protocolo} onChange={e => setProtocolo(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="imovel" className="block text-sm font-medium text-gray-700">Ano</label>
                                <input type="text" id="ano" value={ano} onChange={e => setAno(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                           
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área Total (hectares)</label>
                                <input type="number" id="area" value={areaTotal} onChange={e => setAreaTotal(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="solicitante" className="block text-sm font-medium text-gray-700">Solicitante</label>
                                <input type="text" id="solicitante" value={solicitante} onChange={e => setSolicitante(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="anosVTN" className="block text-sm font-medium text-gray-700">Servidor</label>
                                <select id="anosVTN" value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Selecione o Ano</option>
                                    {anosDisponiveis.map(ano => <option key={ano} value={ano}>{ano}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 no-print">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Informação do Imóvel</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="proprietario" className="block text-sm font-medium text-gray-700">Nome da Fazenda:	</label>
                                <input type="text" id="proprietario" value={proprietario} onChange={e => setProprietario(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="imovel" className="block text-sm font-medium text-gray-700">Denominação:	</label>
                                <input type="text" id="imovel" value={imovel} onChange={e => setImovel(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="imovel" className="block text-sm font-medium text-gray-700">Denominação:	</label>
                                <input type="text" id="imovel" value={imovel} onChange={e => setImovel(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="imovel" className="block text-sm font-medium text-gray-700">Endereço:</label>
                                <input type="text" id="imovel" value={imovel} onChange={e => setImovel(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                             <div>
                                <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">Matrícula/Transcrição</label>
                                <input type="text" id="matricula" value={matricula} onChange={e => setMatricula(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área Total (hectares)</label>
                                <input type="number" id="area" value={areaTotal} onChange={e => setAreaTotal(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="anosVTN" className="block text-sm font-medium text-gray-700">Ano Base do VTN</label>
                                <select id="anosVTN" value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Selecione o Ano</option>
                                    {anosDisponiveis.map(ano => <option key={ano} value={ano}>{ano}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 no-print">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Dados do Proprietário</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="proprietario" className="block text-sm font-medium text-gray-700">Proprietário</label>
                                <input type="text" id="proprietario" value={proprietario} onChange={e => setProprietario(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="imovel" className="block text-sm font-medium text-gray-700">Nome do Imóvel</label>
                                <input type="text" id="imovel" value={imovel} onChange={e => setImovel(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                             <div>
                                <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">Matrícula/Transcrição</label>
                                <input type="text" id="matricula" value={matricula} onChange={e => setMatricula(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área Total (hectares)</label>
                                <input type="number" id="area" value={areaTotal} onChange={e => setAreaTotal(Number(e.target.value))} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                            </div>
                            <div>
                                <label htmlFor="anosVTN" className="block text-sm font-medium text-gray-700">Ano Base do VTN</label>
                                <select id="anosVTN" value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="">Selecione o Ano</option>
                                    {anosDisponiveis.map(ano => <option key={ano} value={ano}>{ano}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
              
                    {/* Seção de Cálculo (visível na tela) */}
                    {loading && <div className="text-center p-4 no-print">Carregando valores...</div>}
                    {error && <div className="text-center p-4 text-red-600 no-print">{error}</div>}
                    {valoresVTN && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8 no-print">
                             <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Distribuição da Área (%)</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                {Object.keys(categoriasTerra).map(key => (
                                    <div key={key} className="flex items-center justify-between">
                                        <label htmlFor={key} className="text-sm text-gray-600">{categoriasTerra[key]}</label>
                                        <div className="flex items-center">
                                            <input
                                                type="number"
                                                id={key}
                                                value={porcentagens[key]}
                                                onChange={(e) => handlePorcentagemChange(key, e.target.value)}
                                                className="w-24 px-2 py-1 text-right border border-gray-300 rounded-md"
                                            />
                                            <span className="ml-2">%</span>
                                        </div>
                                    </div>
                                ))}
                             </div>
                             <div className="mt-6 pt-4 border-t">
                                <div className="flex justify-end items-center text-lg font-semibold">
                                    <span>Total da Porcentagem:</span>
                                    <span className={`ml-4 w-24 text-right ${totalPorcentagem > 100 ? 'text-red-500' : 'text-gray-800'}`}>
                                        {totalPorcentagem.toFixed(2)}%
                                    </span>
                                </div>
                             </div>
                        </div>
                    )}
                    
                    {/* Botão de Ação (visível na tela) */}
                    <div className="text-center mt-8 no-print">
                        <button
                            onClick={handlePrint}
                            disabled={!valoresVTN || totalPorcentagem !== 100}
                            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Gerar Impressão da Avaliação
                        </button>
                        {totalPorcentagem !== 100 && valoresVTN && (
                             <p className="text-red-500 text-sm mt-2">A soma das porcentagens deve ser exatamente 100% para gerar a impressão.</p>
                        )}
                    </div>
                </div>

                {/* --- Área de Impressão (visível apenas ao imprimir) --- */}
                <div className="hidden print-area bg-white text-black p-8">
                    <header className="text-center mb-10">
                        <h1 className="text-2xl font-bold">LAUDO DE AVALIAÇÃO VENAL RURAL</h1>
                        <h2 className="text-xl">Valor da Terra Nua (VTN) - ITR {anoSelecionado}</h2>
                        <p className="text-lg font-semibold mt-2">MUNICÍPIO DE LAGOA DOS PATOS - MG</p>
                    </header>

                    <section className="mb-6">
                        <h3 className="text-lg font-bold border-b border-black pb-1 mb-2">DADOS DO IMÓVEL</h3>
                        <p><strong>Proprietário:</strong> {proprietario}</p>
                        <p><strong>Imóvel:</strong> {imovel}</p>
                        <p><strong>Matrícula/Transcrição:</strong> {matricula}</p>
                        <p><strong>Área Total:</strong> {areaTotal.toLocaleString('pt-BR')} ha</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-bold border-b border-black pb-1 mb-2">MEMÓRIA DE CÁLCULO</h3>
                        <table className="w-full border-collapse border border-black">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-black p-2 text-left">Tipo de Solo</th>
                                    <th className="border border-black p-2 text-right">Área (%)</th>
                                    <th className="border border-black p-2 text-right">Área (ha)</th>
                                    <th className="border border-black p-2 text-right">Valor/ha (R$)</th>
                                    <th className="border border-black p-2 text-right">Valor Parcial (R$)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {valoresVTN && Object.keys(categoriasTerra).map(key => {
                                    const areaHectares = areaTotal * (porcentagens[key] / 100);
                                    const valorHectare = valoresVTN[key] || 0;
                                    const valorParcial = areaHectares * valorHectare;
                                    return (
                                        <tr key={key}>
                                            <td className="border border-black p-2">{categoriasTerra[key]}</td>
                                            <td className="border border-black p-2 text-right">{porcentagens[key].toFixed(2)}</td>
                                            <td className="border border-black p-2 text-right">{areaHectares.toLocaleString('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</td>
                                            <td className="border border-black p-2 text-right">{valorHectare.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td className="border border-black p-2 text-right">{valorParcial.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr className="font-bold bg-gray-200">
                                    <td className="border border-black p-2 text-right" colSpan="4">VALOR TOTAL DA TERRA NUA (VTN)</td>
                                    <td className="border border-black p-2 text-right">{valorTotalTerraNua.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </section>

                     <footer className="mt-20 text-center text-sm">
                        <p>Lagoa dos Patos/MG, {new Date().toLocaleDateString('pt-BR')}.</p>
                        <div className="mt-16">
                            <p className="border-t border-black w-80 mx-auto pt-1">Gleiton Aparecido Soares de Souza</p>
                            <p>Agente Fazendário</p>
                        </div>
                    </footer>
                </div>
            </main>
        </>
    );
}

// --- Função Simulada de API ---
// Substitua isso por uma chamada de API real para seu backend (ex: /api/vtn/[ano])
// que buscará os dados no MongoDB.
async function mockApiCall(ano) {
    console.log(`Buscando dados para o ano: ${ano}`);
    const mockDatabase = {
        "2024": {
            valores: {
                aptidaoBoa: 12500.50,
                aptidaoRegular: 9800.00,
                aptidaoRestrita: 7650.25,
                pastagemPlantada: 5400.00,
                pastagemNatural: 4100.00,
                reserva: 2500.75,
            }
        },
        "2023": {
            valores: {
                aptidaoBoa: 11800.00,
                aptidaoRegular: 9200.00,
                aptidaoRestrita: 7100.00,
                pastagemPlantada: 5000.00,
                pastagemNatural: 3800.00,
                reserva: 2200.00,
            }
        },
        "2022": {
            valores: {
                aptidaoBoa: 10500.00,
                aptidaoRegular: 8500.00,
                aptidaoRestrita: 6800.00,
                pastagemPlantada: 4700.00,
                pastagemNatural: 3500.00,
                reserva: 2000.00,
            }
        },
    };

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(mockDatabase[ano] || null);
        }, 500); // Simula um delay de rede
    });
}
