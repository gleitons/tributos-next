import SearchContrato from "../components/pesquisa/SearchContrato";
import IconeContrato from "../components/parts/IconeContrato"
import Image from "next/image";

const SearchComponent = async () => {   
    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg h-screen ">
           <IconeContrato />
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
