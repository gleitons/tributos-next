'use client'
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
export default function InputLogin() {
    const [passw, setPassw] = useState('')
    const [inco, setInco] = useState('')
    const router = useRouter()
    const pathName = usePathname()

    const handleLoad = (event) => {
        setPassw(event.target.value)
        setInco('')
    }
    const entrar = () => {
        setInco('Conectando...')
        const verifica = passw == 'salamineira' ? router.push('https://dapper-panda-e60101.netlify.app/verifica-login.html') : setInco('SENHA INCORRETA')
        verifica

    }
    return (
        <>
            <div className="mt-2">
                {/* <label className="block text-sm text-white" >Insira a senha</label> */}
                <input onChange={handleLoad} placeholder="Insira a Senha" className="w-full px-5 py-1 text-black-400 bg-gray-300 rounded focus:outline-none  focus:bg-white" type="password" />
            </div>
            <div className="mt-4 items-center flex justify-between">
                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    onClick={entrar} >Entrar</button>
            </div>
            <div>
                <div className="bg-white p-1 my-5 rounded-md">
                    {inco}
                </div>
            </div>
        </>
    )
}