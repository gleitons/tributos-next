import connectToDatabase from '../../../lib/mongodb';
import Config from '../../models/Config';

export async function POST(req) {
  await connectToDatabase();

  try {
    const body = await req.json(); // Parse do corpo da requisição
    const { valor } = body; // Obtem o valor enviado na requisição    

    if (!valor) {
      return new Response(JSON.stringify({ success: false, message: 'Valor não fornecido.' }), {
        status: 400,
      });
    }

    const config = await Config.findOneAndUpdate(
      {}, // Atualiza o primeiro documento encontrado ou cria um novo
      { valor },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ success: true, config }), { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar o valor:', error);
    return new Response(JSON.stringify({ success: false, message: 'Erro ao atualizar o valor.' }), {
      status: 500,
    });
  }
}

export async function GET(req) {
  const url = new URL(req.url);
  const n = url.searchParams.get('n');

  console.log(n + " req");

  if (n === '1') {
    await connectToDatabase();

    try {
      const config = await Config.findOne({});
      if (!config) {
        return new Response(JSON.stringify({ success: false, message: 'Configuração não encontrada.' }), {
          status: 404,
        });
      }

      return new Response(JSON.stringify({ success: true, config }), { status: 200 });
    } catch (error) {
      console.error('Erro ao buscar configuração:', error);
      return new Response(JSON.stringify({ success: false, message: 'Erro ao buscar configuração.' }), {
        status: 500,
      });
    }
  } else {
    // return new Response(JSON.stringify({ success: false, message: 'Parâmetro inválido.' }), {
    //   status: 400,
    // });
    return new Response(JSON.stringify({ success: false, message: 'Você não tem permissão para acessar essa página.' }), {
      status: 400,
    });
  }
}
