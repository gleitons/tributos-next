import { NextResponse } from 'next/server';

// Função para lidar com requisições POST
export async function POST(req) {    

    const fetchData = async () => {
        const url = 'https://script.google.com/macros/s/AKfycbz7ErSj70haP8AkH2TiciA3BkY2vJhdek0fYPp0N_vtjyGZn4ziey1e08kB3tHH_fTUyA/exec'
        const resp = await fetch(url, { next: { revalidate: 600 } }); // Corrigido: adicionado chaves para o segundo argumento
        const data = await resp.json()
        return data.saida
    }

    const { codigoC } = await req.json();  

    const dataE = await fetchData();    
    
    for (const e of dataE) {
       
        if (codigoC === e.codigo) {
            return NextResponse.json({ success: true, message: e.dataCadastro });
        }
    }
    return NextResponse.json({ success: false });
    
}

// Para outros métodos, você pode retornar um erro de método não permitido
export function GET() {
    return new NextResponse('Você não possui permissão pra acessar essa página.', { status: 405 });
}
