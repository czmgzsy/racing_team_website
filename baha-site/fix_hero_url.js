const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database/baha.db');
const db = new Database(dbPath);

// 更新home.hero的url
const result = db.prepare(`
  UPDATE site_images SET url = ? WHERE image_key = ?
`).run('/images/img_812.jpg', 'home.hero');

console.log('更新结果：', result.changes, '行受影响');

// 验证一下
const hero = db.prepare('SELECT * FROM site_images WHERE image_key = ?').get('home.hero');
console.log('\n更新后的home.hero：');
console.log('  url:', hero.url);
console.log('  title:', hero.title);

db.close();
