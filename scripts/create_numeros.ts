import 'dotenv/config';
import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log("Criando tabela numeros_independencia...");
        await db.run(sql`
            CREATE TABLE IF NOT EXISTS numeros_independencia (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cod TEXT,
                setor TEXT,
                quadra TEXT,
                lote TEXT,
                principal TEXT,
                numero TEXT,
                prop TEXT,
                mais_informa TEXT
            );
        `);
        console.log("Tabela numeros_independencia criada com sucesso!");
    } catch (error: any) {
        console.error("Erro ao criar tabela:", error.message);
    }
    process.exit(0);
}

main();
