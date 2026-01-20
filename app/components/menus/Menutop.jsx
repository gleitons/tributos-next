// components/Header.js
import Link from 'next/link';
import Image from 'next/image';
import Loggout from '@/app/dashboard/components/Loggout';

const Menutop = () => {
  return (
    <header className="bg-gray-700 p-4">
      <div className="container flex items-center justify-between w-[50%] m-auto">
        {/* Logo e Nome da Empresa */}
        <Link href={'/dashboard'} className="flex items-center space-x-3">
          <Image 
            src="/img/futuro-consultoria-horizonte.svg" // Caminho para o seu logo
            alt="Logo Futuro Consultoria"
            width={80}
            height={80}
            className="h-10 w-30"
          />
          <span className="text-white font-bold text-xl text-center">
            FUTURO CONSULTORIA
          </span>
        </Link>
        {/* Menu de navegação */}
        <nav className="flex space-x-4">
          <Link href="/dashboard/" className="text-white hover:text-gray-300">🏠 Home</Link>
          <Link href="/dashboard/sobre" className="text-white hover:text-gray-300">Sobre</Link>
          <Link href="/dashboard/documentos-cnpj" className="text-white hover:text-gray-300">Serviços</Link>
          <Loggout />
        {/* <Link href="/dashboard/contato" className="text-white hover:text-gray-300">Sair</Link> */}  
          {/* <Link href="/dashboard/contato" className="text-white hover:text-gray-300">Sair</Link> */}
        </nav>
      </div>
    </header>
  );
};

export default Menutop;
