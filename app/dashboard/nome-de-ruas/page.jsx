import {nomeDeRuas, nomesSugestao} from '@/app/dashboard/components/NomedeRuas';
export default function page() {
    const nRuas =  nomeDeRuas;
    console.log(nRuas);
    return (
        <div>
            <h1>Nome das Ruas </h1>
            <h2>Projeto de Nomeação de Ruas</h2>
            <div className="flex">
                <div>
                    <h3>Nome da Rua</h3>
                    <div>
                        {nRuas.map((nomeDeRua, chave) => (
                            <div key={chave}>
                                <h4>{nomeDeRua.nome}</h4>
                                {/* <p>{nomeDeRua.mapa}</p>
                                <p>{nomeDeRua.mapa2}</p>
                                <p>{nomeDeRua.rotacao}</p>
                                <p>{nomeDeRua.bairro}</p>
                                <p>{nomeDeRua.cidade}</p> */}
                            </div>
                        ))}
           
                    </div>
                </div>
                <div>
                    <h3>Mapa</h3>
                    <div>

                    </div>
                </div>
                <div>
                    <h3>Sugestão</h3>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
};
