'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import styles from './load.module.css';
import Erromessage from '../inputs/Erromenssage'
import { insertCookie } from '../../dashboard/components/Cookie'
import LoadingSpinner from "../loading/LoadingSpinner";

export default function InputLogin() {
    const [passw, setPassw] = useState('');
    const [inco, setInco] = useState('Entrar');
    const [ver, setVer] = useState('password');


    const esconderSenha = () => {
        setVer('password');
        setOicon(<FaEyeSlash className="hover:cursor-pointer" onClick={mostraSenha} />);
    };
    const mostraSenha = () => {
        setVer('text');
        setOicon(<FaRegEye className="hover:cursor-pointer" onClick={esconderSenha} />);
    };
    const router = useRouter();  

   

    const [oIcon, setOicon] = useState(<FaEyeSlash className="hover:cursor-pointer" onClick={mostraSenha} />);




    const handleLoad = (event) => {
        setPassw(event.target.value);
        setInco('Entrar');
    };

    const entrar = async () => {
        setInco(<LoadingSpinner />);       

        try {
            const response = await fetch('/route/', {                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: passw }),
            });
            
            const data = await response.json(); 

            if (data.success) {
                insertCookie();
                router.push(data.message);
            } else {
                setInco( <span onClick={() => setInco('')}><Erromessage  /></span> );
            }
        } catch (error) {
            setInco(<p className={styles.load}>Erro na verificação, tente novamente mais tarde</p>);
        }
    };

    return (
        <>
            <div className="mt-2">
                <div className="flex items-center w-full px-5 py-1 text-black-400 bg-white rounded focus:outline-none">
                    <input
                        onChange={handleLoad}
                        placeholder="Insira a Senha"
                        className="w-full px-5 py-1 text-black-400 bg-white rounded focus:outline-none"
                        type={ver}
                        
                    />
                    {oIcon}
                </div>
            </div>
            <div className="mt-4 items-center flex justify-between">
                <button className="px-4 flex items-center py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    onClick={entrar}>
                     {inco} 
                    
                </button>
            </div>
            <div>
                <div className="bg-white my-5 rounded-md anim">
                   
                </div>
            </div>
        </>
    );
}
