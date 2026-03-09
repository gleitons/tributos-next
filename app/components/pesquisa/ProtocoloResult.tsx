import { FaCheckCircle, FaTimesCircle, FaFileAlt, FaUser, FaCalendarAlt } from 'react-icons/fa';

export default function ProtocoloResult({ result }: { result: any }) {
    if (!result.success) {
        return (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-800 mb-2">Protocolo Inválido</h3>
                <p className="text-red-600 font-medium">
                    O protocolo informado não foi encontrado em nossa base de dados oficial ou é inválido.
                </p>
                <div className="mt-6 p-4 bg-white rounded-lg border border-red-100 italic text-sm text-red-500">
                    Verifique os dígitos e tente novamente.
                </div>
            </div>
        );
    }

    const { data, type } = result;

    return (
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-8 animate-in fade-in slide-in-from-bottom duration-500">
            <div className="flex flex-col items-center mb-6">
                <FaCheckCircle className="text-emerald-500 text-6xl mb-4" />
                <h3 className="text-3xl font-black text-emerald-800 tracking-tight">DOCUMENTO VÁLIDO</h3>
                <span className="mt-2 px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full uppercase tracking-widest border border-emerald-200">
                    Autenticidade Confirmada
                </span>
            </div>

            <div className="space-y-4 bg-white rounded-2xl p-6 shadow-md border border-emerald-100">
                <div className="flex items-center group">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                        <FaFileAlt className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Protocolo</p>
                        <p className="text-lg font-bold text-gray-800">{data.protocolo}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mr-4 group-hover:bg-indigo-100 transition-colors">
                            <FaUser className="text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Adquirente</p>
                            <p className="text-sm font-extrabold text-gray-800 uppercase leading-none mt-1">
                                {data.adquirente || data.solicitante || 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center group">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mr-4 group-hover:bg-amber-100 transition-colors">
                            <FaCalendarAlt className="text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Data de Emissão</p>
                            <p className="text-sm font-extrabold text-gray-800 leading-none mt-1">
                                {data.dataCriacao ? new Date(data.dataCriacao).toLocaleDateString('pt-BR') : data.dataTransacao ? new Date(data.dataTransacao).toLocaleDateString('pt-BR') : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-100 cursor-default">
                    <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Categoria</span>
                        <span className="text-[10px] font-black text-gray-600 bg-gray-200 px-2 rounded tracking-widest">{type}</span>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-center text-xs text-emerald-600 font-medium leading-relaxed opacity-75">
                Este sistema utiliza criptografia e integração em tempo real com o banco de dados municipal para garantir a validade jurídica das informações aqui apresentadas.
            </p>
        </div>
    );
}
