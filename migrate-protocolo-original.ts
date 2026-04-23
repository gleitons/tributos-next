import { createClient } from '@libsql/client';

const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
});

async function main() {
    try {
        // Add the new column
        await client.execute(`ALTER TABLE itbi_rural ADD COLUMN protocolo_original TEXT`);
        console.log('✅ Column protocolo_original added successfully!');

        // Backfill existing records: set protocoloOriginal = protocolo for all existing rows
        await client.execute(`UPDATE itbi_rural SET protocolo_original = protocolo WHERE protocolo_original IS NULL`);
        console.log('✅ Backfilled existing records with protocoloOriginal = protocolo');

        // Verify
        const result = await client.execute(`SELECT id, protocolo, protocolo_original FROM itbi_rural`);
        console.log('Current data:');
        result.rows.forEach((row: any) => {
            console.log(`  ID=${row.id} protocolo=${row.protocolo} protocoloOriginal=${row.protocolo_original}`);
        });
    } catch (error: any) {
        if (error.message?.includes('duplicate column name')) {
            console.log('⚠️ Column already exists, skipping ALTER TABLE.');
            // Still do the backfill
            await client.execute(`UPDATE itbi_rural SET protocolo_original = protocolo WHERE protocolo_original IS NULL`);
            console.log('✅ Backfilled existing records.');
        } else {
            console.error('❌ Error:', error);
        }
    }
}

main();
