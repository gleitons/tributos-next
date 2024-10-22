'use client'
import Login from "./components/login/Login";
import { useState, useEffect } from "react";

export default function Home() {
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [backgroundDiagonal, setbackgroundDiagonal] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prevPos) => prevPos + 1); // Incrementa a posição de fundo
    }, 20);

    const intervalDiagonal = setInterval(() => {
      setbackgroundDiagonal((prevPos) => prevPos + 1); // Incrementa a posição de fundo
    }, 20);

    return () => clearInterval(interval, intervalDiagonal); // Limpa o intervalo quando o componente desmonta
  }, []); // [] garante que o efeito seja executado uma vez após a renderização inicial

  return (
    <div>
      <div
        className="lagoa8 h-screen font-sans bg-cover"
        id="login"
        style={{
          backgroundPosition: `-${backgroundPosition}px -${backgroundDiagonal}px`, // Atualiza o backgroundPosition dinamicamente
          // backgroundImage: "url('/path-to-your-image.jpg')", // Substitua pela sua imagem
        }}
      >
        <div className="w-full h-screen bgEscuro">
          <Login />
        </div>
      </div>
    </div>
  );
}
