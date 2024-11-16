'use client'
import { useState } from "react"

export default function Page() {
    const [inputValue, setInputValue] = useState('')
    const [copiado, setCopiado] = useState(false) // Estado para controlar a exibição da mensagem "Copiado!!"

    const limpaLetras = () => {
        setInputValue('') // Limpa o valor do input
    }

    const copiaTextoAoClicar = () => {
        const textoCopiado = inputValue
        navigator.clipboard.writeText(textoCopiado.toString().replace(/[-,.;\/' ><={}\\|:]/g, '')) // Copia o texto para a área de transferência
        setCopiado(true) // Exibe a mensagem "Copiado!!"
        setTimeout(() => setCopiado(false), 2000) // Oculta a mensagem após 2 segundos
    }

    return (
        <div className="w-[600px] m-auto bg-slate-200 p-5 relative rounded-md">
            <strong>
                <h2>RETIRAR CARACTERES</h2>
            </strong>
            <p>Insira a entrada:</p>
              
            <input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                type="text" 
                name="" 
                className="w-[300px] p-2"
                id="" 
            /> 
            
            <button className="bg-green-500 p-1 rounded-md" onClick={() => limpaLetras()}>Limpar</button>
            
            <div>
                Saída: 
                <abbr title={`Copiar ${inputValue.toString().replace(/[-,.;:]/g, '')}`}>
                    <p
                        onClick={() => copiaTextoAoClicar()}
                        className="bg-blue-800 text-white p-2 no-underline cursor-pointer "
                    >
                        {inputValue.toString().replace(/[-,.;\/' ><={}\\|:]/g, '')}
                    </p>
                </abbr>
            </div>
            <div>
            <strong>
                <h2>IMPRESSAO ONLINE</h2>
            </strong>
            </div>

            {/* Mensagem "Copiado!!" centralizada e posicionada de forma absoluta */}
            {copiado && (
                <div className="bg-green-700 text-white w-fit p-2 absolute left-1/2 top-3 transform -translate-x-1/2 -translate-y-1/2">
                    Copiado!!
                </div>
            )}
        </div>
    )
}
