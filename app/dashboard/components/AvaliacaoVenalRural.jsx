export default function AvaliacaoVenalRural() {
    return (
      <div className="p-6 bg-gray-600">
        <div className="bg-white shadow-lg rounded-md p-6">
          <fieldset className="border border-gray-300 p-4 rounded-md">
            <legend className="font-bold text-lg text-blue-600">Avaliação Venal Rural</legend>
            <fieldset className="border border-gray-300 p-4 rounded-md mt-4">
              <legend className="font-bold text-blue-500">Dados Iniciais</legend>
              <h2 className="text-xl text-gray-700 font-semibold mb-4">
                Veja o valor da terra nua por /ha em 2023
              </h2>
              <div id="abrirI"></div>
              <div className="hidden" id="imageTN2022"></div>
              <form id="formEnviar" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Protocolo Geral
                    </label>
                    <input
                      type="text"
                      id="protoEcidade"
                      placeholder="ex: 252"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ano</label>
                    <input
                      type="number"
                      id="anoProtocolo"
                      placeholder="ex: 2023"
                      value="2024"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Usuário</label>
                    <select
                      id="selectFun"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="funcio">GLEITON APARECIDO SOARES DE SOUZA</option>
                      <option value="funcio">JHESSYK DAIENY REIS BRITO RABELO</option>
                      <option value="funcio">VANDER DE JESUS MAGALHAES NOBRE</option>
                      <option value="funcio">JOÃO MARTINS GUEDES</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Solicitante</label>
                    <input
                      type="text"
                      id="nomeSolicitante"
                      placeholder="ex: nome completo"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                </div>
              </form>
            </fieldset>
  
            <fieldset className="border border-gray-300 p-4 rounded-md mt-4">
              <legend className="font-bold text-blue-500">Endereço do Imóvel</legend>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome da Fazenda</label>
                  <input
                    type="text"
                    id="nomeFazenda"
                    placeholder="ex: mocambo"
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Denominação</label>
                  <input
                    type="text"
                    id="denominacaoFazenda"
                    placeholder="ex: rio das pedras"
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número da Matrícula
                  </label>
                  <input
                    type="text"
                    id="matriculaFazenda"
                    placeholder="ex: 6.639"
                    className="w-full border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Dia</label>
                    <input
                      type="number"
                      id="diaRegistro"
                      placeholder="ex: 09"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mês</label>
                    <input
                      type="number"
                      id="mesRegistro"
                      placeholder="ex: 1"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ano</label>
                    <input
                      type="number"
                      id="anoRegistro"
                      placeholder="ex: 2000"
                      className="w-full border-gray-300 rounded-md shadow-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
  
            {/* Continuar com os outros fieldsets de forma similar */}
          </fieldset>
        </div>
      </div>
    );
  }
  