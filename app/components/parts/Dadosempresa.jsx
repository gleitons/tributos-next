import { useState } from 'react';

const DadosEmpresa = ({ dados }) => {
    const [copiado, setCopiado] = useState('');

    // Função para copiar o conteúdo para a área de transferência
    const copiarTexto = (texto, titulo) => {
        navigator.clipboard.writeText(texto);
        setCopiado(`${titulo} copiado!`);
        setTimeout(() => setCopiado(''), 2000); // Remove a mensagem após 2 segundos
    };

    // Mapeia os dados para renderizar campos que não estão vazios
    const renderizarCampos = () => {
        return Object.keys(dados).map((chave, index) => {
            const valor = dados[chave];
             
            if (index > 1) {

                if (valor) { // Se o valor não for vazio, exibe o campo
                    return (
                        <div key={chave} className="flex justify-between  gap-4 border border-gray-500 m-1 p-1 w-[400px] relative border-b-4 border-b-black border-r-4 border-r-black bg-aliceblue">
                            <strong>{chave.charAt(0).toUpperCase() + chave.slice(1)}:</strong>{' '}
                            <p>|</p>
                            <span
                                onClick={() => copiarTexto(valor, chave)}
                                className="cursor-pointer text-blue-500 underline"
                            >
                                
                                {valor}
                            </span>
                        </div>

                    );
                }
            }
            return null;
        });
    };

    return (
        <div className="p-4">
            {copiado && (
                <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-lg font-bold text-center py-2">
                    {copiado}
                </div>
            )}          

            {renderizarCampos()}

        </div>
    );
};

export default DadosEmpresa;