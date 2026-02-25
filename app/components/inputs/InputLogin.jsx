'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import LoadingSpinner from "../loading/LoadingSpinner";

export default function InputLogin() {
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');
    const [inco, setInco] = useState('Entrar');
    const [ver, setVer] = useState('password');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const toggleSenha = () => {
        setVer(prev => prev === 'password' ? 'text' : 'password');
    };

    const handleLoad = (event) => {
        setPassw(event.target.value);
        setErrorMsg('');
    };

    const entrar = async () => {
        setInco(<LoadingSpinner />);
        setErrorMsg('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: passw }),
            });

            const data = await response.json();

            if (data.success) {
                router.push(data.message);
            } else {
                setErrorMsg(data.message || 'Senha incorreta');
                setInco('Entrar');
            }
        } catch (error) {
            setErrorMsg('Erro na verificação, tente novamente mais tarde');
            setInco('Entrar');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') entrar();
    };
    return (
        <>
            <div className="mt-2 text-center text-xs text-slate-500 mb-4">
                Digite seu email e senha de servidor
            </div>
            <div className="mt-2">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Seu Email"
                    className="w-full px-5 py-2 text-black bg-white rounded-lg focus:outline-none mb-3 border border-slate-200"
                    type="email"
                    value={email}
                />
                <div className="flex items-center w-full px-5 py-2 text-black bg-white rounded-lg focus:outline-none border border-slate-200">
                    <input
                        onChange={handleLoad}
                        onKeyDown={handleKeyDown}
                        placeholder="Sua Senha"
                        className="w-full bg-white rounded focus:outline-none"
                        type={ver}
                        value={passw}
                    />
                    <button onClick={toggleSenha} type="button" className="hover:cursor-pointer text-slate-500 ml-2">
                        {ver === 'password' ? <FaEyeSlash /> : <FaRegEye />}
                    </button>
                </div>
            </div>
            {
                errorMsg && (
                    <p className="text-red-400 text-sm mt-2 text-center">{errorMsg}</p>
                )
            }
            <div className="mt-4 items-center flex justify-between">
                <button
                    className="px-4 flex items-center py-1 text-white font-light tracking-wider bg-gray-900 hover:bg-gray-800 rounded"
                    onClick={entrar}
                >
                    {inco}
                </button>
            </div>
            <div>
                <div className="bg-white my-5 rounded-md anim"></div>
            </div>
        </>
    );
}
