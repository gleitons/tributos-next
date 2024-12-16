export default function Page() {
    const listas = [
        {
            nome: 'CARTÃO CNPJ NA RECEITA FEDERAL',
            link: 'https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp',
        },
        {
            nome: 'CCMEI (CERTIFICADO DE MICROEMPREENDEDOR)',
            link: 'https://mei.receita.economia.gov.br/certificado',
        },
        {
            nome: 'CND FEDERAL',
            link: 'https://solucoes.receita.fazenda.gov.br/servicos/certidaointernet/pj/emitir',
        },
        {
            nome: 'CND ESTADUAL MG',
            link: 'https://www2.fazenda.mg.gov.br/sol/ctrl/SOL/CDT/SERVICO_829?ACAO=INICIAR#',
        },
        {
            nome: 'CND ESTADUAL MG',
            link: 'https://www2.fazenda.mg.gov.br/sol/ctrl/SOL/CDT/SERVICO_829?ACAO=INICIAR#',
        },
        {
            nome: 'CND MUNICIPAL - LAGOA DOS PATOS MG',
            link: '#',
        },
        {
            nome: 'ALVARÁ MUNICIPAL - LAGOA DOS PATOS MG',
            link: '#',
        },
        {
            nome: 'CND FGTS (FUNDO DE GARANTIA DO TEMPO DE SERVIÇO)',
            link: 'https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf',
        },
        {
            nome: 'CERTIDÃO NEGATIVA DE DÉBITOS TRABALHISTAS',
            link: 'https://www.tst.jus.br/certidao1',
        },
        {
            nome: 'CERTIDÃO DE FALÊNCIA E CONCORDATA CNPJ',
            link: 'https://rupe.tjmg.jus.br/rupe/justica/publico/certidoes/criarSolicitacaoCertidao.rupe?solicitacaoPublica=true',
        }
       
        

    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Documentos CNPJ
                </h1>
                <ul className="space-y-4">
                    {listas.map((lista) => (
                        <li key={lista.nome}>
                            <a
                                target="_blank"
                                href={lista.link}
                                className="block w-full px-4 py-2 text-lg font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition-all"
                            >
                                {lista.nome}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
