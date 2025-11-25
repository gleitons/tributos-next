import { getVTNYears, saveVTN } from '@/app/actions/vtn';

export default async function VTNConfigPage() {
  const years = await getVTNYears();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Configuração de Valores da Terra Nua (VTN)</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Adicionar/Editar Ano</h2>
        <form action={saveVTN} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ano</label>
            <input type="number" name="ano" required placeholder="Ex: 2025" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Aptidão Boa (R$/ha)</label>
              <input type="number" step="0.01" name="aptidaoBoa" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Aptidão Regular (R$/ha)</label>
              <input type="number" step="0.01" name="aptidaoRegular" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Aptidão Restrita (R$/ha)</label>
              <input type="number" step="0.01" name="aptidaoRestrita" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pastagem Plantada (R$/ha)</label>
              <input type="number" step="0.01" name="pastagemPlantada" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pastagem Natural (R$/ha)</label>
              <input type="number" step="0.01" name="pastagemNatural" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reserva/Preservação (R$/ha)</label>
              <input type="number" step="0.01" name="reserva" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
            </div>
          </div>

          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Salvar Valores
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Valores Cadastrados</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ano</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Boa</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Regular</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Restrita</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Past. Plant.</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Past. Nat.</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Reserva</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {years.map((year) => (
                <tr key={year.ano}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-gray-900">{year.ano}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">R$ {year.aptidaoBoa.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">R$ {year.aptidaoRegular.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">R$ {year.aptidaoRestrita.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">R$ {year.pastagemPlantada.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">R$ {year.pastagemNatural.toFixed(2)}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">R$ {year.reserva.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
