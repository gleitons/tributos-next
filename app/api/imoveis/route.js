// app/api/imoveis/route.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export async function GET() {
  const results = [];
  const filePath = path.join(process.cwd(), 'app', 'ants', 'imoveis.csv'); // Caminho do arquivo

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' })) // Define o delimitador como ponto e vírgula
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(new Response(JSON.stringify(results), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      })
      .on('error', (error) => {
        reject(new Response(JSON.stringify({ error: 'Erro ao processar CSV' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }));
      });
  });
}
