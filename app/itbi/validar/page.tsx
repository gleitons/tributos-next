import Image from "next/image";
import SearchProtocolo from "../../components/pesquisa/SearchProtocolo";
import { FaShieldAlt } from 'react-icons/fa';

export const metadata = {
    title: 'Validador de ITBI | Prefeitura Municipal',
    description: 'Validação de autenticidade de protocolos de ITBI.',
};

export default function ValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-between py-12 px-4 selection:bg-blue-100 selection:text-blue-900">
            {/* Background elements for premium feel */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50"></div>
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 opacity-30">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-indigo-200 blur-[100px] rounded-full"></div>
            </div>

            <div className="w-full max-w-xl flex flex-col gap-8 flex-grow">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl border border-gray-100 mb-2 transform hover:rotate-6 transition-transform">
                        <FaShieldAlt className="text-blue-600 text-3xl" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                        Validador de <span className="text-blue-600">Autenticidade</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-medium max-w-sm mx-auto leading-relaxed">
                        Verifique a validade jurídica de guias e documentos de ITBI através do protocolo oficial.
                    </p>
                </div>

                {/* Search Card */}
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10">
                    <SearchProtocolo />
                </div>

                {/* Footer instructions */}
                <div className="text-center space-y-2 px-4">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Atenção</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Em caso de divergência entre este validador e o documento impresso,
                        dirija-se ao Setor de Tributação para esclarecimentos.
                    </p>
                </div>
            </div>

            {/* Brand Footer */}
            <footer className="mt-12 flex flex-col items-center gap-6">
                <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                <Image
                    className="opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
                    src='/img/futuro-consultoria-horizonte.png'
                    alt="Futuro Consultoria"
                    width={180}
                    height={40}
                />
            </footer>

        </div>
    );
}
