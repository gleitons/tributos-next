'use client'
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import { pega } from '../../components/pesquisa/Fetchapi'
import Dadosempresa from '../../components/parts/Dadosempresa'
import SkeletonList from "../components/SkeletonList";

import { IoEye } from "react-icons/io5";





export default function Page() {
    const [dadosC, setDadosC] = useState(<SkeletonList />)
    const [infoContribuinte, setInfoContribuinte] = useState(<LoadingSpinner />)
    const [nEmpresa, setNEmpresa] = useState('Empresa');
    const [visivel, setVisivel] = useState(false);






    const rota = useRouter()

    const mostraVisivel = () => {
        setVisivel(true)
    }

    const mostraDados = async (objeto) => {
        setNEmpresa(objeto.empresa)
        setInfoContribuinte(<Dadosempresa dados={objeto} />)

    }

    useEffect(() => {
        const buscaDados = async () => {
            const infos = await pega({ endereco: 'informacoes' });
            
            setDadosC(infos.map((c) => (<li className="cursor-default flex gap-2 items-center transition-all hover:bg-slate-700 hover:text-white px-2" key={c.id}> <span className="hover:cursor-pointer" onMouseOver={() => mostraDados(c)}><IoEye /></span> | <span onClick={() => mostraDados(c)}> {c.empresa}</span></li>)));

            setInfoContribuinte(<div className="flex gap-4 border border-gray-500 m-1 p-2 w-[400px] relative border-b-4 border-b-black border-r-4 border-r-black bg-aliceblue"> <strong> &lt;- <span className="cursor-pointer text-blue-500 underline" > Selecione a empresa ao lado - * Clique em cima do item para copiar </span></strong></div>)
        }

        buscaDados()
    }, [])



    return (
        <div>        
            
            <h2 className="text-xl">Dados Fiscais de Contribuintes - Sala Mineira do Empreendedor</h2> 
            <p>Para novo Cadastro - <button className="bg-green-800 px-1 rounded-sm text-white" onClick={() => rota.push('https://docs.google.com/spreadsheets/d/12BlFnJ-jdrLi_JQPBYvHervxePaX5lHMEjIh4eDVkXQ/edit?gid=0#gid=0')} >Clique aqui</button></p> 
            <p>*Os dados sao atualizados de 10 em 10 minutos</p>
            <br />
            <button onClick={() => mostraVisivel()}  className="inline-block bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out">Mostrar Dados</button>

            {visivel &&
            <div className="flex ">
                <div className="border border-sky-500 ">
                    <h2 className="text-lg font-bold    bg-slate-700 text-center text-white ">Contribuintes</h2>
                    <ul className="h-[600px] w-[410px] shadow-inner overflow-auto p-2">
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
             }
            
        </div>
    )
};
