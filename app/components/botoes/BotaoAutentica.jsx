"use client"
import { useRouter } from "next/navigation"
export default function BotaoAutentica() {
    const route = useRouter()
    const validador = () => {   
        route.push('https://dapper-panda-e60101.netlify.app/validador.html')
    }
    return (
        <>
        <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={validador}>Verificador online de Contratos</button>
        </>
    )
}