import Botaolink from '@/app/dashboard/components/Botaolink'
const NewVersionNotice = () => {
 
  return (
    <div className="flex items-center justify-center">
      
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <Botaolink titulo={'Acessar sistema anterior'} link={'1'} />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Esta é uma nova versão!</h1>
        <p className="text-gray-600 mb-6">
          Estamos construindo ainda, novas funcionalidades estarão disponíveis em breve.
        </p>
        <p className="text-gray-600 mb-6">
          Para acessar o sistema anterior, clique no botão acima:
        </p>
      
      </div>
    </div>
  );
};

export default NewVersionNotice;
