import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

dotenv.config();

// Define a minimal schema for testing
const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    nome: text('nome').notNull(),
});

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function main() {
    console.log("Connecting to:", process.env.TURSO_DATABASE_URL);
    try {
        const result = await db.select().from(users).all();
        console.log("Query successful. Users found:", result.length);
        console.log(result);
    } catch (e) {
        console.error("Query failed:", e);
    }
}

main();
