import 'dotenv/config';
import { db } from './lib/db';
import { sql } from 'drizzle-orm';

async function main() {
    try {
        console.log("Adicionando coluna taxa_expediente na tabela itbi_rural...");
        await db.run(sql`ALTER TABLE itbi_rural ADD COLUMN taxa_expediente REAL DEFAULT 0;`);
        console.log("Coluna taxa_expediente adicionada em itbi_rural.");
    } catch (error: any) {
        if (error.message.includes('duplicate column name')) {
            console.log("A coluna taxa_expediente já existe em itbi_rural.");
        } else {
            console.error("Erro itbi_rural:", error.message);
        }
    }

    try {
        console.log("Verificando se precisamos adicionar em itbi_urbano também...");
        await db.run(sql`ALTER TABLE itbi_urbano ADD COLUMN taxa_expediente REAL DEFAULT 0;`);
        console.log("Coluna taxa_expediente adicionada em itbi_urbano.");
    } catch (error: any) {
        if (error.message.includes('duplicate column name')) {
            console.log("A coluna taxa_expediente já existe em itbi_urbano.");
        } else {
            console.error("Erro itbi_urbano:", error.message);
        }
    }

    console.log("Finalizado!");
    process.exit(0);
}

main();
