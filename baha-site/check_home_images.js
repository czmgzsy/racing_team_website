const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database/baha.db');
const db = new Database(dbPath);

const images = db.prepare(`
  SELECT id, image_key, page_name, section, title 
  FROM site_images 
  WHERE page_name = 'home' 
  ORDER BY id
`).all();

console.log('首页图片列表：');
console.log(JSON.stringify(images, null, 2));

db.close();
