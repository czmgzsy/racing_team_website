const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database/baha.db');
const db = new Database(dbPath);

const hero = db.prepare('SELECT * FROM site_images WHERE image_key = ?').get('home.hero');
console.log('home.hero 详情：');
console.log(JSON.stringify(hero, null, 2));

db.close();
