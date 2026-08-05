const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database/baha.db');
const db = new Database(dbPath);

// 检查是否已经存在home.hero
const existing = db.prepare('SELECT * FROM site_images WHERE image_key = ?').get('home.hero');
if (existing) {
  console.log('home.hero 已存在，不需要插入');
} else {
  // 插入home.hero
  const result = db.prepare(`
    INSERT INTO site_images (image_key, page_name, section, url, title, description, alt_text, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'home.hero',
    'home',
    'hero',
    '/images/img_812.jpg',
    '速度与激情，工程与梦想',
    '合肥经济技术职业学院巴哈车队',
    '巴哈赛车主视觉',
    1
  );
  console.log('home.hero 插入成功，id:', result.lastInsertRowid);
}

// 验证一下
const images = db.prepare("SELECT id, image_key, page_name, section, title FROM site_images WHERE page_name = 'home' ORDER BY id").all();
console.log('\n首页图片列表：');
images.forEach(img => {
  console.log(`  id: ${img.id}, key: ${img.image_key}, section: ${img.section}, title: ${img.title}`);
});

db.close();
