import { db } from './lib/db';
import { itbiRural } from './lib/schema';

async function check() {
    try {
        const results = await db.select({
            id: itbiRural.id,
            status: itbiRural.status,
            protocolo: itbiRural.protocolo
        }).from(itbiRural);

        console.log('--- ITBI Rural Records ---');
        console.log('Total:', results.length);
        results.forEach(r => {
            console.log(`ID: ${r.id}, Status: ${r.status}, Protocolo: ${r.protocolo}`);
        });
        console.log('--------------------------');
    } catch (e) {
        console.error(e);
    }
}

check();
