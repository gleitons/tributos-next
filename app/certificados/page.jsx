'use client'
import Image from "next/image";
import { useEffect, useState } from "react"; 
import FullScreenImage from "../components/imagens/FullScreenImage";

export default function Page() {
  const [fullImageUrl, setFullImageUrl] = useState(null);
  const [osDiplomas, setOsDiplomas] = useState([])
  const certifico = async () => {
    try {
      const resp = await fetch('/api/diploms/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ativar: '1' })
        }
      );
      const dataResp = await resp.json()
    
      setOsDiplomas(Array.isArray(dataResp.diplomas) ? dataResp.diplomas : []);

    } catch (error) {
      console.error(error);
      setOsDiplomas([])
    }
  }

  const openFullScreen = (imageUrl) => {
    setFullImageUrl(imageUrl);
  };
  useEffect(() => {
    certifico()
  }, []);


  return (
    <div className="container m-auto bg-gray-100 flex justify-center items-center flex-wrap">
      {fullImageUrl && <FullScreenImage imageUrl={fullImageUrl} close={() => setFullImageUrl(null)} />}

      {osDiplomas.map((certificado) => (
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
                onClick={() => openFullScreen(image)}
              />
            </div>
          ))}
          <p>{certificado.escola}</p>
        </div>
      ))}
    </div>
  );
}
