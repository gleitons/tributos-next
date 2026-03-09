import React from 'react';

const DetalhesLegaisITBI = ({ natureza }: { natureza: any }) => {
    console.log(natureza)
    // Mapeamento de textos baseados na lei de Lagoa dos Patos
    const renderConteudo = () => {
        switch (natureza) {
            case "Compra e Venda":
                return (
                    <div>
                        compra e venda
                    </div>
                )
            case "DAÇÃO EM PAGAMENTO":
            case "PERMUTA":
            case "CESSÃO DE DIREITO HEREDITÁRIO":
                return (
                    <div className="space-y-3">
                        <h4 className="font-bold text-blue-900 uppercase border-b border-blue-100 pb-1">
                            Incidência do Imposto (Art. 45 e 46)
                        </h4>
                        <p className="text-[11px] leading-relaxed">
                            O imposto incide sobre a transmissão onerosa de bens imóveis e direitos reais.
                            Conforme o <strong>Art. 46</strong>, a incidência alcança:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] list-disc ml-4">
                            <li>I - Compra e venda pura ou condicional.</li>
                            <li>IV - Dação em pagamento.</li>
                            <li>X - Permuta de bens imóveis e direitos.</li>
                            <li>III - Compromissos ou cessão de direitos.</li>
                        </ul>
                        {natureza === "CESSÃO DE DIREITO HEREDITÁRIO" && (
                            <p className="bg-yellow-50 p-2 text-[10px] border-l-2 border-yellow-400 italic">
                                Nota: A cessão onerosa de direitos hereditários equipara-se à compra e venda para fins tributários (Art. 45, III).
                            </p>
                        )}
                    </div>
                );

            case "FUSÃO/INCORPORAÇÃO":
                return (
                    <div className="space-y-3">
                        <h4 className="font-bold text-green-900 uppercase border-b border-green-100 pb-1">
                            Hipótese de Não Incidência (Art. 47)
                        </h4>
                        <p className="text-[11px] leading-relaxed italic">
                            Conforme o <strong>Art. 47, II</strong>, o imposto não incide sobre a transmissão decorrente de fusão, incorporação, cisão ou extinção de pessoa jurídica.
                        </p>
                        <div className="bg-red-50 p-2 text-[9px] text-red-800 border border-red-100">
                            <strong>ATENÇÃO (§ 1º):</strong> Não se aplica a não incidência se a atividade preponderante da empresa for a compra, venda ou locação de imóveis.
                        </div>
                    </div>
                );

            case "ISENÇÃO DE ITBI":
                return (
                    <div className="space-y-3">
                        <h4 className="font-bold text-purple-900 uppercase border-b border-purple-100 pb-1">
                            Das Isenções (Art. 48)
                        </h4>
                        <p className="text-[11px]">Ficam isentos do imposto os atos que atendam aos seguintes critérios:</p>
                        <ul className="text-[10px] space-y-1 ml-4 list-decimal">
                            <li>Aquisição via programas habitacionais de interesse social (Baixa Renda).</li>
                            <li>Transmissão inferior a R$ 700,00.</li>
                            <li>Imóveis desapropriados para fins de reforma agrária.</li>
                        </ul>
                    </div>
                );

            default:
                return <p className="text-gray-500 italic">Selecione a natureza da transação para ver os detalhes legais.</p>;
        }
    };

    return (
        <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
            {renderConteudo()}
        </div>
    );
};

export default DetalhesLegaisITBI;