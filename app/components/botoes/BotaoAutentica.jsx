"use client"
import { useRouter } from "next/navigation"
import LinkValidador from "./LinkValidador" 

export default function BotaoAutentica() {
   
    const route = useRouter()
    const link = LinkValidador()   
    function validador(link) {                
        route.push(link)
        document.querySelector('#carrega').classList.remove('hidden')
    // onClick={validador(link)}
    }
    return (
        <>
                
        <span ><button onClick={() => validador(link)}  type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >Verificador Online de Contratos</button>
        <div className="hidden" id="carrega">
            Carregando...
        </div>
        </span>
        
        </>
    )
}