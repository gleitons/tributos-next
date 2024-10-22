'use client'
import { useRouter } from "next/navigation";
export default function Botaolink({titulo, link}) {
    const rota =  useRouter();
    const acessaSistema = async () => {
        try {
          const response = await fetch('/api/links/', {
            method: 'POST',
            headers: {
              contentType: 'application/json',
            },
            body: JSON.stringify({ adress: link }),
          });
          const data = await response.json();
          
          if(!data.url) {
            rota.push(data)
          }
        } catch (error) {
          
        }
        
      }
    return (
        <div
          onClick={() => acessaSistema(link)}
          className="inline-block bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          {titulo}
        </div>
    )
};
