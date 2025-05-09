'use client'
// import AvaliacaoVenalRural from "../components/AvaliacaoVenalRural"
import { useState, useEffect } from "react"
export default function Page() {
    const [anos, setAnos] = useState([])
    const [valores, setValores] = useState([])
    const [valorTotalP, setValorTotalP] = useState(0)
    const geradorDeAnos = () => {
        const anoHoje = new Date().getFullYear()
        const anoFim = anoHoje - 5;
        const listaAnos = []

        for (let i = anoHoje; i >= anoFim; i--) {
            listaAnos.push(<option key={i} value={i}>{i}</option>)
        }

        setAnos(listaAnos)

    }
    const somaPorcentagem = (valor) => {
        const somatotal = valor + outrovalor
        setValorTotalP(somatotal)
    }
    const buscaValor = async (valor) => {
        const resp = await fetch(`https://www.salamineira.com/terra-nua/cidades-mg-${valor}`);
        const data = await resp.json();
        const infoTN = []
        data.forEach(e => {
            if (e.nome == 'Lagoa dos Patos') {
                infoTN.push(e)
            }
        });// ou .json() se for JSON
        console.log(infoTN)
        setValores(infoTN[0])
    }

    useEffect(() => {
        // geradorDeAnos()
    })
    return (
        <div>
            <div>
                <h2>Avaliação Rural</h2>
            </div>
            <div>
                <p>Porcentagem de área</p>
                <div>
                    <div>
                        <p>Terra nua</p>
                        <p>Ano:</p><select name="" id="anosVTN" onClick={geradorDeAnos} onChange={(e) => buscaValor(e.target.value)}>

                            <option value="">Selecione</option>
                            {anos}

                        </select>
                    </div>
                    <div>
                        <p>Preços</p>
                        <table>
                            <thead>
                                <tr>
                                    <td>1º:	Lavoura aptidão boa: </td>
                                    <td>{valores.aptidaoBoa}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2º:	Lavoura aptidão regular: </td>
                                    <td>{valores.aptdaoRegular}</td>
                                </tr>
                                <tr>
                                    <td>3º:	Lavoura aptidão restrita: </td>
                                    <td>{valores.aptdaoRestrita}</td>
                                </tr>
                                <tr>
                                    <td>4º:	Pastagem plantada: </td>
                                    <td>{valores.pastagemPlantada}</td>
                                </tr>
                                <tr>
                                    <td>5º:	Silvicultura ou Pastagem Natural: </td>
                                    <td>{valores.pastagemNatural}</td>
                                </tr>
                                <tr>
                                    <td>6º:	Preservação da Fauna ou Flora: </td>
                                    <td>{valores.reserva}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div >
                        <p>1º:	Lavoura aptidão boa: </p> <input type="number" onKeyDown={(e) => somaPorcentagem(e.target.value)} value={(e) => somaPorcentagem(e.target.value)} />%
                    </div>
                    <div >
                        <p>1º:	Lavoura aptidão boa: </p> <input type="number" value={0} />%
                    </div>
                    <div >
                        <p>1º:	Lavoura aptidão boa: </p> <input type="number" value={0} />%
                    </div>
                    <div >
                        <p>1º:	Lavoura aptidão boa: </p> <input type="number" value={0} />%
                    </div>
                    <div >
                        <p>1º:	Lavoura aptidão boa: </p> <input type="number" value={0} />%
                    </div>
                    <div >
                        <p>1º:	Lavoura aptidão boa: </p> <input type="number" value={0} />%
                    </div>
                    <div >
                        <p>Total:</p> <input type="number" value={valorTotalP}/>%
                    </div>
                </div>
            </div>
            {/* <AvaliacaoVenalRural /> */}
            <h3 className="text-md">Avaliação Venal Rural - Lagoa dos Patos/MG </h3>
            {/* <iframe src="https://dapper-panda-e60101.netlify.app/avaliacao-venal-rural-completo.html" className="w-full h-screen" frameborder="0"></iframe> */}
        </div>
    )
};
