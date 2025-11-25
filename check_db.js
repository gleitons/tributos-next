const Database = require('better-sqlite3');
const db = new Database('sqlite.db');

try {
    const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    const table = stmt.get();
    if (table) {
        console.log('Table users exists.');
    } else {
        console.log('Table users does NOT exist.');
    }
} catch (err) {
    console.error(err);
}
