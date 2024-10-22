'use client'
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import { pega } from '../../components/pesquisa/Fetchapi'
import Dadosempresa from '../../components/parts/Dadosempresa'




export default function Page() {
    const [dadosC, setDadosC] = useState(<LoadingSpinner />)
    const [infoContribuinte, setInfoContribuinte] = useState(<LoadingSpinner />)
    const [nEmpresa, setNEmpresa] = useState('Empresa')




    const rota = useRouter()

    const mostraDados = async (objeto) => {
        setNEmpresa(objeto.empresa)
        setInfoContribuinte(<Dadosempresa dados={objeto} />)


    }

    const buscaDados = async () => {

        const infos = await pega({ endereco: 'informacoes' });

        setDadosC(infos.map((c) => (<li onClick={() => mostraDados(c)} className="cursor-pointer hover:bg-slate-700 hover:text-white" key={c.id}>{c.empresa}</li>)))
        setInfoContribuinte(<div className="flex gap-4 border border-gray-500 m-1 p-1 w-[400px] relative border-b-4 border-b-black border-r-4 border-r-black bg-aliceblue"> <strong> &lt;- <span className="cursor-pointer text-blue-500 underline" > Selecione a empresa ao lado - * Clique em cima do item para copiar </span></strong></div>)
    }



    useEffect(() => {
        buscaDados()

    }, [])



    return (
        <div>
            <h2 className="text-xl">Dados Fiscais de Contribuintes - Sala Mineira do Empreendedor</h2> 
            <p>Para novo Cadastro - <button className="bg-green-800 px-1 rounded-sm text-white" onClick={() => rota.push('https://docs.google.com/spreadsheets/d/12BlFnJ-jdrLi_JQPBYvHervxePaX5lHMEjIh4eDVkXQ/edit?gid=0#gid=0')} >Clique aqui</button></p> <br />
            <div className="flex flex-wrap">
                <div className="border border-sky-500 ">
                    <h2 className="text-lg font-bold  bg-slate-400 text-center ">Contribuintes</h2>
                    <ul className="h-[600px] w-[410px] overflow-auto p-2">
                        {dadosC}
                    </ul>
                </div>
                <div className="border border-gray-500 mx-2 ">
                    <h2 className="text-lg font-bold bg-slate-400 text-center">Empresa: {nEmpresa}</h2>
                    <ul className="h-[600px] w-[500px] overflow-auto">
                        {infoContribuinte}
                    </ul>
                </div>
            </div>
            {/* <pre>{JSON.stringify(dadosC, null, 2)}</pre> */}
        </div>
    )
};
