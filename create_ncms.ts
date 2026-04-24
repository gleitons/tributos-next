import 'dotenv/config';
import { db } from './lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log("Criando tabela ncms...");
        await db.run(sql`CREATE TABLE IF NOT EXISTS ncms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            codigo TEXT NOT NULL,
            descricao TEXT NOT NULL
        );`);
        console.log("Tabela ncms criada com sucesso.");
    } catch (error: any) {
        console.error("Erro ao criar tabela ncms:", error.message);
    }
    process.exit(0);
}

main();
