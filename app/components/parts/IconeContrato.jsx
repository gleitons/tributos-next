import { GrDocumentLocked } from "react-icons/gr";
export default function IconeContrato() {
    return (
        <div className='bg-gradient-to-r text-white from-blue-400 via-blue-500 to-blue-600 h-30 py-5 w-full flex items-center justify-center gap-2'>
            <div>
                < GrDocumentLocked className='text-6xl' />
            </div>
            <div className='text-center p-2 text-lg font-bold'>
                <h2>VERIFICAR AUTENTICIDADE DE DOCUMENTOS</h2>
            </div>
        </div>
    )
};
