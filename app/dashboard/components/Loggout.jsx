'use client'
import { deleteCookies } from './Cookie';
import { useRouter } from 'next/navigation';
export default function Loggout() {
    const rota = useRouter();
    return (
        <button onClick={() => {deleteCookies(); rota.push('/')}} class="bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md text-white">
            Sair
        </button>
    )
};
