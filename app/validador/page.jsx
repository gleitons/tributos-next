import SearchContrato from "../components/pesquisa/SearchContrato";
import { GrDocumentLocked } from "react-icons/gr";
import Image from "next/image";

const fetchData = async () => {
    const url = 'https://script.google.com/macros/s/AKfycbz7ErSj70haP8AkH2TiciA3BkY2vJhdek0fYPp0N_vtjyGZn4ziey1e08kB3tHH_fTUyA/exec'
    const resp = await fetch(url, { next: {revalidate: 600} }); // Corrigido: adicionado chaves para o segundo argumento
    const data = await resp.json()
    return data.saida
}


const SearchComponent = async () => {
   
    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg h-screen ">
            {/* Imagem */}
            <div className='bg-gradient-to-r text-white from-blue-400 via-blue-500 to-blue-600 h-30 py-5 w-full flex items-center justify-center gap-2'>
                <div>
                    < GrDocumentLocked className='text-6xl' />
                </div>
                <div className='text-center p-2 text-lg font-bold'>
                    <h2>VERIFICAR AUTENTICIDADE DE DOCUMENTOS</h2>
                </div>
            </div>


            {/* Título */}
            <h2 className="text-2xl font-bold text-center mb-2">Buscar Documento</h2>

            {/* Texto descritivo */}
            <p className="text-center text-gray-600 mb-4">
                Insira o <strong>número do contrato</strong> abaixo e clique no botão para buscar.
            </p>

            {/* Input de pesquisa */}

            <SearchContrato  />
            {/* Botão de busca */}
            <div className="flex items-center justify-center w-full fixed bottom-0 left-0 right-0">
                <Image
                    className="m-auto w-[200px]"
                    src='/img/futuro-consultoria-horizonte.png'
                    alt="Futuro Consultoria"
                    width={200}
                    height={50}
                />
            </div>

        </div>
    );
};

export default SearchComponent;
