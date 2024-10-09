import { FiX } from 'react-icons/fi';
import Image from 'next/image';

const FullScreenImage = ({ imageUrl, close }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative">
        {/* Botão fechar "X" */}
        <button
          onClick={close}
          className="absolute bg-red-600 top-4 right-4 text-white text-4xl focus:outline-none"
        >
          <FiX />
        </button>

        {/* Imagem em full screen */}
        <Image
          src={imageUrl}
          alt="Full Screen"
          className="max-w-full max-h-screen object-contain"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default FullScreenImage;
