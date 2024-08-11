export default function BotoesQrAlvara({tituloBtn, cod, cor, funcao}) {
    return (
        <button onClick={funcao} className= {`${cor} text-white font-bold py-2 px-4 rounded shadow-lg`}>
           {tituloBtn}
        </button>
    )
};
