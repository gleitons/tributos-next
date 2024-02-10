"use client"


import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [passw, setPassw] = useState('')
  const [inco, setInco] = useState('')
  const [fundo, setFundo] = useState('')

  const handleLoad = (event) => {
    setPassw(event.target.value)
  }
  const entrar = () => {

    if (passw == 'salamineira') {
      setInco('Senha correta - Carregando...')
      Cookies.set('loginTributos', 1, { expires: 7 })
      location.href = 'https://dapper-panda-e60101.netlify.app/verifica-login.html'
    } else {
      setInco('Senha incorreta - Tente Novamente')
    }

  }
  const handleImg = () => {
    console.log('i')
    const num = Math.floor(Math.random() * 2)
    return verifica(num)

  }
  const verifica = (num) => {
    if (num == 0) {
      return setFundo('corrego')
    } else if (num == 1) {
      return setFundo('lapa')
    } else {
      return setFundo('sumidouro')
    }
  }

  // handleImg

  return (

    <div>

      <div className={`h-screen font-sans ${'lagoa'} bg-cover`} id="login">
        <div className="container mx-auto h-full flex flex-1 justify-center items-center">
          <div className="w-full max-w-lg">
            <div className="leading-loose">
              <form className="max-w-sm m-4 p-5 backMac rounded shadow-xl">
                <div className="brasao">
                  <Image src='/brasao-lagoa-dos-patos-mg.webp' width={150} height={200} alt="brasao Lagoa dos Patos MG" />
                </div>
                <p className="text-white font-medium text-center text-lg font-bold">TRIBUTOS LAGOA DOS PATOS-MG</p>
                <div className="mt-2">
                  <label className="block text-sm text-white" for="email">Insira a senha</label>
                  <input onChange={handleLoad} className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="password" />
                </div>
                {/* <div className="mt-2">
                  <label className="block text-sm text-white" for="email">E-mail</label>
                  <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white" type="email" id="email" placeholder="Digite o e-mail" aria-label="email" required>
                </div>
                <div className="mt-2">
                  <label className="block  text-sm text-white">Senha</label>
                  <input className="w-full px-5 py-1 text-gray-700 bg-gray-300 rounded focus:outline-none focus:bg-white"
                    type="password" id="password" placeholder="Digite a sua senha" arial-label="password" required>
                </div> */}

                <div className="mt-4 items-center flex justify-between">
                  <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    onClick={entrar} type="button">Entrar</button>
                  {/* <a className="inline-block right-0 align-baseline font-bold text-sm text-500 text-white hover:text-red-400"
                    href="#">Esqueceu a senha ?</a> */}
                </div>
                <div>
                  {inco}
                </div>
                <div className="text-center">
                  {/* <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                    Criar uma conta
                  </a> */}
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
