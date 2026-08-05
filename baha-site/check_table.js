const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database/baha.db');
const db = new Database(dbPath);

const columns = db.prepare('PRAGMA table_info(site_images)').all();
console.log('site_images 表结构：');
columns.forEach(col => {
  console.log(`  ${col.name} (${col.type})`);
});

db.close();
