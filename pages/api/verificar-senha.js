import { NextResponse } from 'next/server';

export async function POST(request) {
  const { senha } = await request.json();
  const senhaCorreta = process.env.SENHA_ACESSO;

  if (senha === senhaCorreta) {
    return NextResponse.json({ sucesso: true });
  } else {
    return NextResponse.json({ sucesso: false }, { status: 401 });
  }
}