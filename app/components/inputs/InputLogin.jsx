'use client'
// import "dotenv/config"
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Image from "next/image";
import styles from './load.module.css'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
export default function InputLogin({ pass, access }) {
    const esconderSenha = () => {
        setVer('password')
        setOicon(<FaEyeSlash className="hover:cursor-pointer" onClick={mostraSenha} />)
    }
    const mostraSenha = () => {
        setVer('text')
        setOicon(<FaRegEye className="hover:cursor-pointer" onClick={esconderSenha} />)
    }
    const [passw, setPassw] = useState('')
    const [inco, setInco] = useState('')
    const [ver, setVer] = useState('password')
    const [oIcon, setOicon] = useState(<FaEyeSlash className="hover:cursor-pointer" onClick={mostraSenha} />)
    const router = useRouter()
    const pathName = usePathname()

    const handleLoad = (event) => {
        setPassw(event.target.value)

        setInco('')
    }

    const entrar = () => {
        setInco(<Image className={styles.cimg} src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif" width={100} height={100} alt="" />)
        // <p className={styles.load}>Carregando... </p>
        
        const verifica = passw == pass ? router.push(access) : setInco(<p className={styles.load}>Incorreta, tente novamente</p>)
        verifica


    }
    return (
        <>
            <div className="mt-2">
                {/* <label className="block text-sm text-white" >Insira a senha</label> */}
                <div className="flex items-center w-full px-5 py-1 text-black-400 bg-white rounded focus:outline-none  focus:bg-white	">
                    <input onChange={handleLoad} placeholder="Insira a Senha" className="w-full px-5 py-1 text-black-400 bg-white rounded focus:outline-none  focus:bg-white" type={ver} />
                    {oIcon}


                </div>
            </div>
            <div className="mt-4 items-center flex justify-between">
                <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    onClick={entrar} >Entrar</button>
            </div>
            <div>
                <div className="bg-white  my-5 rounded-md anim">
                    {inco}
                </div>
                
            </div>
        </>
    )
}