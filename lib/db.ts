import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

console.log("Database URL:", process.env.TURSO_DATABASE_URL?.replace(/:[^:]*@/, ':***@'));


export const db = drizzle(client, { schema });
