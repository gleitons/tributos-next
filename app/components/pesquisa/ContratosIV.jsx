import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ContratoValido = ( {data, horario}) => {
  return (
    <div className="flex items-center justify-center p-4 mt-10 bg-green-100 rounded-lg border border-green-400">
      <FaCheckCircle className="text-green-600 text-4xl mr-4" />
      <div>
        <h2 className="text-green-700 font-bold text-xl">O CONTRATO É VÁLIDO</h2>
        <p className="text-green-600">Este contrato foi verificado e foi realizado por nossa Equipe.</p>
        <p className="text-green-600">Criado em: {data}- {horario} hs.</p>
      </div>
    </div>
  );
};

const ContratoInvalido = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-10 bg-red-100 rounded-lg border border-red-400">
      <FaTimesCircle className="text-red-600 text-4xl mr-4" />
      <div>
        <h2 className="text-red-700 font-bold text-xl">Contrato Inválido</h2>
        <p className="text-red-600">Este contrato contém erros ou está inválido.</p>
      </div>
    </div>
  );
};
const InsiraContrato = () => {
  return (
    <div className="flex items-center justify-center p-4 mt-10 bg-red-100 rounded-lg border border-red-400">
      <FaTimesCircle className="text-red-600 text-4xl mr-4" />
      <div>
        <h2 className="text-red-700 font-bold text-xl">ATENÇÃO, DIGITE CORRETAMENTE</h2>
        <p className="text-red-600">Informe o número do contrato no campo em branco.</p>
      </div>
    </div>
  );
};

export { ContratoValido, ContratoInvalido, InsiraContrato };
