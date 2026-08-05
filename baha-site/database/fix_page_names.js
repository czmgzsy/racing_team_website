const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'baha.db');
const db = new Database(dbPath);

// 更新赛事历程页：competition → competitions
const updateCompetition = db.prepare(`
  UPDATE site_images SET page_name = 'competitions' WHERE page_name = 'competition'
`);
const competitionResult = updateCompetition.run();
console.log(`更新赛事历程页图片：${competitionResult.changes} 条`);

// 更新队员风采页：member → members
const updateMember = db.prepare(`
  UPDATE site_images SET page_name = 'members' WHERE page_name = 'member'
`);
const memberResult = updateMember.run();
console.log(`更新队员风采页图片：${memberResult.changes} 条`);

// 更新赞助商页：sponsor → sponsors
const updateSponsor = db.prepare(`
  UPDATE site_images SET page_name = 'sponsors' WHERE page_name = 'sponsor'
`);
const sponsorResult = updateSponsor.run();
console.log(`更新赞助商页图片：${sponsorResult.changes} 条`);

// 验证一下
const images = db.prepare('SELECT page_name, COUNT(*) as count FROM site_images GROUP BY page_name').all();
console.log('\n更新后的图片分布：');
images.forEach(img => {
  console.log(`  ${img.page_name}: ${img.count} 张`);
});

db.close();
console.log('\n数据库更新完成！');
