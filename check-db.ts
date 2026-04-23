import 'dotenv/config';
import { db } from './lib/db';
import { itbiRural } from './lib/schema';
import { desc } from 'drizzle-orm';

async function check() {
    console.log("Fetching itbi rural...");
    const reqs = await db.select().from(itbiRural).orderBy(desc(itbiRural.id)).limit(5);
    console.log("Total recent requests:", reqs.length);
    reqs.forEach(r => console.log(r.id, r.protocolo, r.status, r.solicitante, r.dataCriacao));
}

check().catch(console.error);
