const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database/baha.db');
const db = new Database(dbPath);

const images = db.prepare(`
  SELECT id, image_key, page_name, section, title 
  FROM site_images 
  ORDER BY id
`).all();

console.log('所有图片列表：');
images.forEach(img => {
  console.log(`  id: ${img.id}, key: ${img.image_key}, page: ${img.page_name}, section: ${img.section}, title: ${img.title}`);
});

console.log(`\n总计：${images.length} 张`);

db.close();
