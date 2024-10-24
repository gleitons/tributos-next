import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function GET() {
    const results = [];
    const filePath = path.join(process.cwd(), 'app', 'ants', 'imoveis.csv'); // Caminho do arquivo

    // Usando Promessa para garantir que o CSV seja lido corretamente antes de retornar a resposta
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                results.push(data)                
            })
            .on('end', () => {
                resolve(new Response(JSON.stringify(results), { status: 200 })); // Corrigido: Removido parêntese extra
            })
            .on('error', (error) => {
                reject(new Response(JSON.stringify({ error: 'Erro ao processar CSV' }), { status: 500 }));
            });
    });
}
