"use client"


import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
// const router = useRouter()
//     const pathName = usePathname()

export default function Home() {
  const [passw, setPassw] = useState('')
  const [inco, setInco] = useState('')
  const router = useRouter()
  const pathName = usePathname()

  const handleLoad = (event) => {
    setPassw(event.target.value)
  }
  const entrar = () => {
    setInco('Conectando...')
    const verifica = passw == 'salamineira' ? router.push('https://dapper-panda-e60101.netlify.app/verifica-login.html') : setInco('Senha incorreta - Tente Novamente')
    verifica

  }


  return (
    <div >
      <div className="h-screen font-sans lagoa bg-cover" id="login">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <div className="max-w-sm m-4 p-5 backMac rounded shadow-xl">
                <div className="brasao">
                  <Image src='/brasao-lagoa-dos-patos-mg.webp' width={150} height={200} priority alt="brasao Lagoa dos Patos MG" />
                </div>
                <p className="text-white font-medium text-center text-lg font-bold">TRIBUTOS LAGOA DOS PATOS-MG</p>
                <div className="mt-2">
                  <label className="block text-sm text-white" >Insira a senha</label>
                  <input onChange={handleLoad} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="password" />
                </div>
                <div className="mt-4 items-center flex justify-between">
                  <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    onClick={entrar} >Entrar</button>
                </div>
                <div>
                  {inco}
                </div>
                <div className="text-center">
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
