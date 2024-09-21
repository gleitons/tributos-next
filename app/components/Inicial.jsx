'use client'
import { useState, useEffect } from 'react';
import Login from "./login/Login";


export default function Inicial() {

    const [fundo, setFundo] = useState('');
    useEffect(() => {
      // Gera o array de fundos
      const fundos = [];
      for (let i = 0; i <= 6; i++) {
        const add = 'lagoa' + i;
        fundos.push(add);
      }
  
      // Seleciona um fundo aleatório após o componente ser montado
      const randomIndex = Math.floor(Math.random() * fundos.length);
      setFundo(fundos[randomIndex]);
    }, []); // O array vazio faz 
  
    return (
        <div >
          
            <div className={`${fundo} h-screen font-sans  bg-cover`} id="login">


                <Login />
            </div>

        </div>
    )
};
