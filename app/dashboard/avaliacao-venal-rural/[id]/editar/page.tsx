'use client';

import { useState, useEffect } from 'react';
import { getRuralValuation, updateRuralValuation } from '@/app/actions/rural-valuation';
import { getVTNYears, getVTNByYear } from '@/app/actions/vtn';
import { getUsers } from '@/app/actions/users';
import { useRouter } from 'next/navigation';
import { valorReal } from '@/app/funcions/ValorReal';


export default function EditarAvaliacaoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [years, setYears] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [vtnValues, setVtnValues] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  // Form States
  const [formData, setFormData] = useState({
    protocolo: '',
    anoProtocolo: new Date().getFullYear(),
    usuario: '',
    solicitante: '',
    nomeImovel: '',
    denominacao: '',
    endereco: '',
    matricula: '',
    folha: '',
    livro: '',
    registroData: '',
    generoProprietario: '',
    proprietario: '',
    cpfCnpj: '',
    identidade: '',
    enderecoProprietario: '',
    logradouroProprietario: '',
    numeroProprietario: '',
    complementoProprietario: '',
    bairroProprietario: '',
    cidadeProprietario: '',
    estadoProprietario: '',
    cepProprietario: '',
    conjuge: '',
    cpfConjuge: '',
    identidadeConjuge: '',
    areaTotal: 0,
    observacoes: '',
    valorConstrucoes: 0,
    valorCulturas: 0,
    valorTerraNua: 0,
  });

  const [isManualVTN, setIsManualVTN] = useState(false);

  const [percentages, setPercentages] = useState({
    aptidaoBoa: 0,
    aptidaoRegular: 0,
    aptidaoRestrita: 0,
    pastagemPlantada: 0,
    pastagemNatural: 0,
    reserva: 0,
  });

  useEffect(() => {
    getVTNYears().then(setYears);
    getUsers().then(setUsers);

    getRuralValuation(Number(id)).then(data => {
      if (data) {
        setFormData({
          protocolo: data.protocolo || '',
          anoProtocolo: data.anoProtocolo || new Date().getFullYear(),
          usuario: data.usuario || '',
          solicitante: data.solicitante || '',
          nomeImovel: data.nomeImovel || '',
          denominacao: data.denominacao || '',
          endereco: data.endereco || '',
          matricula: data.matricula || '',
          folha: data.folha || '',
          livro: data.livro || '',
          registroData: data.registroData || '',
          generoProprietario: data.generoProprietario || '',
          proprietario: data.proprietario || '',
          cpfCnpj: data.cpfCnpj || '',
          identidade: data.identidade || '',
          enderecoProprietario: data.enderecoProprietario || '',
          logradouroProprietario: data.logradouroProprietario || '',
          numeroProprietario: data.numeroProprietario || '',
          complementoProprietario: data.complementoProprietario || '',
          bairroProprietario: data.bairroProprietario || '',
          cidadeProprietario: data.cidadeProprietario || '',
          estadoProprietario: data.estadoProprietario || '',
          cepProprietario: data.cepProprietario || '',
          conjuge: data.conjuge || '',
          cpfConjuge: data.cpfConjuge || '',
          identidadeConjuge: data.identidadeConjuge || '',
          areaTotal: data.areaTotal || 0,
          observacoes: data.observacoes || '',
          valorConstrucoes: data.valorConstrucoes || 0,
          valorCulturas: data.valorCulturas || 0,
          valorTerraNua: data.valorTerraNua || 0,
        });
        setSelectedYear(data.anoVtn || '');

        // Calculate percentages back from areas if possible, or just load if we saved them (we didn't save percentages directly, only areas)
        // So we need to calculate percentages based on areaTotal
        const total = data.areaTotal || 1; // avoid division by zero
        setPercentages({
          aptidaoBoa: (data.areaAptidaoBoa || 0) / total * 100,
          aptidaoRegular: (data.areaAptidaoRegular || 0) / total * 100,
          aptidaoRestrita: (data.areaAptidaoRestrita || 0) / total * 100,
          pastagemPlantada: (data.areaPastagemPlantada || 0) / total * 100,
          pastagemNatural: (data.areaPastagemNatural || 0) / total * 100,
          reserva: (data.areaReserva || 0) / total * 100,
        });
      }
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (selectedYear) {
      getVTNByYear(Number(selectedYear)).then(setVtnValues);
    } else {
      setVtnValues(null);
    }
  }, [selectedYear]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPercentages(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const calculateTotalPercentage = () => {
    return Object.values(percentages).reduce((a, b) => a + b, 0);
  };

  const calculateAreaFromPercentage = (pct: number) => {
    const totalArea = Number(formData.areaTotal) || 0;
    return (totalArea * pct) / 100;
  };

  const calculateVTNTotal = () => {
    if (isManualVTN) return Number(formData.valorTerraNua);
    if (!vtnValues) return 0;

    return (
      (calculateAreaFromPercentage(percentages.aptidaoBoa) * vtnValues.aptidaoBoa) +
      (calculateAreaFromPercentage(percentages.aptidaoRegular) * vtnValues.aptidaoRegular) +
      (calculateAreaFromPercentage(percentages.aptidaoRestrita) * vtnValues.aptidaoRestrita) +
      (calculateAreaFromPercentage(percentages.pastagemPlantada) * vtnValues.pastagemPlantada) +
      (calculateAreaFromPercentage(percentages.pastagemNatural) * vtnValues.pastagemNatural) +
      (calculateAreaFromPercentage(percentages.reserva) * vtnValues.reserva)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const vtnTotal = calculateVTNTotal();
    const total = vtnTotal + Number(formData.valorConstrucoes) + Number(formData.valorCulturas);

    await updateRuralValuation(Number(id), {
      ...formData,
      anoVtn: Number(selectedYear),
      areaTotal: Number(formData.areaTotal),
      areaAptidaoBoa: calculateAreaFromPercentage(percentages.aptidaoBoa),
      areaAptidaoRegular: calculateAreaFromPercentage(percentages.aptidaoRegular),
      areaAptidaoRestrita: calculateAreaFromPercentage(percentages.aptidaoRestrita),
      areaPastagemPlantada: calculateAreaFromPercentage(percentages.pastagemPlantada),
      areaPastagemNatural: calculateAreaFromPercentage(percentages.pastagemNatural),
      areaReserva: calculateAreaFromPercentage(percentages.reserva),
      valorTerraNua: isManualVTN ? Number(formData.valorTerraNua) : vtnTotal,
      valorTotal: total,
    });

    router.push('/dashboard/avaliacao-venal-rural');
  };

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Editar Avaliação Venal Rural</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 1. Dados Iniciais */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">1. Dados Iniciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Protocolo Geral</label>
              <input type="text" name="protocolo" required value={formData.protocolo} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ano do Protocolo</label>
              <input type="number" name="anoProtocolo" value={formData.anoProtocolo} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ano do Valor da Terra Nua (VTN)</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="mt-1 block w-full border rounded-md p-2" required>
                <option value="">Selecione</option>
                {years.map(y => <option key={y.ano} value={y.ano}>{y.ano}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Solicitante</label>
              <input type="text" name="solicitante" value={formData.solicitante} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Usuário</label>
              <select name="usuario" value={formData.usuario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required>
                <option value="">Selecione</option>
                {users.map(u => (
                  <option key={u.id} value={`${u.nome} ${u.sobrenome || ''}`.trim()}>
                    {u.nome} {u.sobrenome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 2. Endereço do Imóvel */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">2. Endereço do Imóvel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome da Fazenda</label>
              <input type="text" name="nomeImovel" value={formData.nomeImovel} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Denominação</label>
              <input type="text" name="denominacao" value={formData.denominacao} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Endereço</label>
              <input type="text" name="endereco" value={formData.endereco} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número da Matrícula</label>
              <input type="text" name="matricula" value={formData.matricula} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Folha</label>
                <input type="text" name="folha" value={formData.folha} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Livro</label>
                <input type="text" name="livro" value={formData.livro} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Registro (Data)</label>
                <input type="date" name="registroData" value={formData.registroData} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Informações do Proprietário */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">3. Informações do Proprietário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Gênero</label>
              <select name="generoProprietario" value={formData.generoProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2">
                <option value="">Selecione</option>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome Proprietário</label>
              <input type="text" name="proprietario" value={formData.proprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CPF/CNPJ</label>
              <input type="text" name="cpfCnpj" value={formData.cpfCnpj} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Identidade</label>
              <input type="text" name="identidade" value={formData.identidade} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Endereço do Proprietário</h3>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Endereço Completo</label>
              <input type="text" name="enderecoProprietario" value={formData.enderecoProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <input type="text" name="cepProprietario" value={formData.cepProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Logradouro</label>
              <input type="text" name="logradouroProprietario" value={formData.logradouroProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <input type="text" name="numeroProprietario" value={formData.numeroProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Complemento</label>
              <input type="text" name="complementoProprietario" value={formData.complementoProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input type="text" name="bairroProprietario" value={formData.bairroProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input type="text" name="cidadeProprietario" value={formData.cidadeProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input type="text" name="estadoProprietario" value={formData.estadoProprietario} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Dados do Cônjuge</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cônjuge</label>
              <input type="text" name="conjuge" value={formData.conjuge} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">CPF Cônjuge</label>
                <input type="text" name="cpfConjuge" value={formData.cpfConjuge} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Identidade Cônjuge</label>
                <input type="text" name="identidadeConjuge" value={formData.identidadeConjuge} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Imóvel Rural - Aptidão e Tamanho */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">4. Imóvel Rural - Aptidão da Terra</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Área Total do Imóvel (Hectares)</label>
            <input type="number" step="0.01" name="areaTotal" value={formData.areaTotal} onChange={handleInputChange} className="block w-full border rounded-md p-2 bg-gray-50" required />
          </div>

          {selectedYear && vtnValues ? (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Distribuição da Área (%) e Valores (Base {selectedYear})</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { key: 'aptidaoBoa', label: 'Aptidão Boa', value: vtnValues.aptidaoBoa },
                  { key: 'aptidaoRegular', label: 'Aptidão Regular', value: vtnValues.aptidaoRegular },
                  { key: 'aptidaoRestrita', label: 'Aptidão Restrita', value: vtnValues.aptidaoRestrita },
                  { key: 'pastagemPlantada', label: 'Pastagem Plantada', value: vtnValues.pastagemPlantada },
                  { key: 'pastagemNatural', label: 'Pastagem Natural', value: vtnValues.pastagemNatural },
                  { key: 'reserva', label: 'Reserva/Preservação', value: vtnValues.reserva },
                ].map((item) => {
                  const areaCalculada = calculateAreaFromPercentage(percentages[item.key as keyof typeof percentages]);
                  const valorCalculado = areaCalculada * item.value;

                  return (
                    <div key={item.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center border-b pb-2 last:border-0">
                      <div className="text-sm font-medium text-gray-700 md:col-span-1">
                        {item.label} <span className="text-xs text-gray-500 block">(R$ {item.value.toFixed(2)}/ha)</span>
                      </div>
                      <div className="flex items-center md:col-span-1">
                        <input
                          type="number"
                          step="0.01"
                          name={item.key}
                          value={percentages[item.key as keyof typeof percentages]}
                          onChange={handlePercentageChange}
                          placeholder="%"
                          className="block w-full border rounded-md p-2 text-right"
                        />
                        <span className="ml-2 text-gray-600">%</span>
                      </div>
                      <div className="text-sm text-gray-600 text-right md:col-span-1">
                        {areaCalculada.toFixed(4)} ha
                      </div>
                      <div className="text-right text-sm font-semibold text-gray-900 md:col-span-1">
                        {valorCalculado.toFixed(2)}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>Total Calculado (Terra Nua):</span>
                <span className={calculateTotalPercentage() !== 100 ? "bg-red-500 font-bold p-1 text-white rounded-md" : "bg-green-600 text-white rounded-md font-bold p-1"}>{valorReal(calculateVTNTotal())}</span>
              </div>
              <div className="mt-1 flex justify-between items-center text-sm text-gray-600">
                <span className={calculateTotalPercentage() !== 100 ? "text-red-600  font-bold" : "text-green-600 font-bold"}>
                  Total Porcentagem: {calculateTotalPercentage().toFixed(2)}%
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">Selecione um ano de VTN para habilitar os campos de aptidão.</p>
          )}
        </section>

        {/* 5. Valores Venais e Construções */}
        <section>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-indigo-600">5. Valores Venais e Construções</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">01. Valor da Terra Nua</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="manualVTN"
                    checked={isManualVTN}
                    onChange={(e) => setIsManualVTN(e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="manualVTN" className="text-xs text-gray-500 cursor-pointer select-none">Inserir Manualmente</label>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">R$</span>
                <input
                  type="number"
                  step="0.01"
                  name="valorTerraNua"
                  value={isManualVTN ? formData.valorTerraNua : calculateVTNTotal().toFixed(2)}
                  onChange={handleInputChange}
                  disabled={!isManualVTN}
                  className={`block w-full border rounded-md p-2 pl-8 ${!isManualVTN ? 'bg-gray-100' : 'bg-white border-blue-300 ring-2 ring-blue-100'}`}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">02. Valor das Construções/Benfeitorias</label>
              <input type="number" step="0.01" name="valorConstrucoes" value={formData.valorConstrucoes} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">03. Valor das Culturas/Florestas</label>
              <input type="number" step="0.01" name="valorCulturas" value={formData.valorCulturas} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 font-bold">Valor Total da Avaliação</label>
              <input type="text" value={`R$ ${(calculateVTNTotal() + Number(formData.valorConstrucoes) + Number(formData.valorCulturas)).toFixed(2)}`} disabled className="mt-1 block w-full border rounded-md p-2 bg-indigo-50 font-bold text-indigo-700" />
            </div>
          </div>
        </section>

        <section>
          <label className="block text-sm font-medium text-gray-700">Observações</label>
          <textarea name="observacoes" value={formData.observacoes} onChange={handleInputChange} className="mt-1 block w-full border rounded-md p-2" rows={8}></textarea>
        </section>

        <div className="flex justify-end pt-4">
          <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors">
            Atualizar Avaliação
          </button>
        </div>
      </form>
    </div>
  );
}
