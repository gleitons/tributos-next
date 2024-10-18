'use client'
// import Link from "next/link";
import documentos from "../components/certificaded/certificados";
import Image from "next/image";
import { useState } from "react"; // useState para controlar o estado da imagem em tela cheia
import FullScreenImage from "../components/imagens/FullScreenImage";

export default function Page() {
  const [fullImageUrl, setFullImageUrl] = useState(null); // estado para controlar qual imagem abrir em full screen
  const certifico = documentos;

  // Função para abrir a imagem em tela cheia
  const openFullScreen = (imageUrl) => {
    setFullImageUrl(imageUrl);
  };

  return (
    <div className="container m-auto bg-gray-100 flex justify-center items-center flex-wrap">
      {/* Condicional para exibir o componente de tela cheia */}
      {fullImageUrl && <FullScreenImage imageUrl={fullImageUrl} close={() => setFullImageUrl(null)} />}
      
      {certifico.map((certificado) => (
        <div key={certificado.id} className="m-4 text-center max-w-[360px] p-4 bg-white rounded-lg shadow-lg">
          <h1>{certificado.title?.toLocaleUpperCase()}</h1>
          <p>{certificado.horas} horas</p>
          {certificado.image.map((image, index) => (
            <div key={index} className="py-2">
              <Image
                src={image}
                alt={certificado.title}
                width={200}
                height={200}
                className="cursor-pointer m-auto border-slate-100 border-2"
                onClick={() => openFullScreen(image)} // Ao clicar, abre a imagem em full screen
              />
            </div>
          ))} 
          <p>{certificado.escola}</p>
          {/* <Link href={certificado.link} target="_blank" rel="noopener noreferrer">
            Link
          </Link> */}
        </div>
      ))}
    </div>
  );
}
