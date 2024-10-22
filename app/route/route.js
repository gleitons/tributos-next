import { NextResponse } from 'next/server';


// Função para lidar com requisições POST
export async function POST(req) {
    
    const { password } = await req.json();
    const serverPass = process.env.PASS;

    const linkPass = process.env.ADRESS;    
   
    if (password == serverPass) {        
       
        return NextResponse.json({ success: true, message: '/dashboard' }, { status: 200 });
    } else {
        return NextResponse.json({ success: false, message: 'Senha incorreta' }, { status: 401 });
    }
}

// Para outros métodos, você pode retornar um erro de método não permitido
export function GET() {
    return new NextResponse('Method Not Allowed', { status: 405 });
}
