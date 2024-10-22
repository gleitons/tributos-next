const NewVersionNotice = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
      <a
          href="https://dapper-panda-e60101.netlify.app/verifica-login.html" target="_blank"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          Acessar sistema anterior
        </a>
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
