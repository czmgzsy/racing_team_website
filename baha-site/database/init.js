/**
 * 数据库初始化脚本
 * 首次运行自动建表并插入示例数据
 * 后续启动自动跳过已存在的表
 */
const db = require('./db');
const bcrypt = require('bcryptjs');

function initDatabase() {
  console.log('正在初始化数据库...');

  // 站点设置表
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);

  // 页面内容表
  db.exec(`
    CREATE TABLE IF NOT EXISTS page_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_name TEXT NOT NULL,
      section_key TEXT NOT NULL,
      content TEXT,
      content_type TEXT DEFAULT 'text',
      UNIQUE(page_name, section_key)
    );
  `);

  // 赛车表
  db.exec(`
    CREATE TABLE IF NOT EXISTS racecar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      generation TEXT,
      description TEXT,
      specs TEXT,
      highlights TEXT,
      image_url TEXT,
      gallery TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1
    );
  `);

  // 赛事表
  db.exec(`
    CREATE TABLE IF NOT EXISTS competition (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      year INTEGER,
      date TEXT,
      location TEXT,
      result TEXT,
      description TEXT,
      cover_image TEXT,
      gallery TEXT,
      sort_order INTEGER DEFAULT 0
    );
  `);

  // 队员表
  db.exec(`
    CREATE TABLE IF NOT EXISTS member (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT,
      department TEXT,
      generation TEXT,
      status TEXT DEFAULT 'current',
      avatar TEXT,
      bio TEXT,
      sort_order INTEGER DEFAULT 0
    );
  `);

  // 赞助商表
  db.exec(`
    CREATE TABLE IF NOT EXISTS sponsor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo_url TEXT,
      level TEXT DEFAULT 'partner',
      website TEXT,
      description TEXT,
      sort_order INTEGER DEFAULT 0
    );
  `);

  // 招新岗位表
  db.exec(`
    CREATE TABLE IF NOT EXISTS recruit_post (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      department TEXT,
      requirements TEXT,
      description TEXT,
      is_open INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0
    );
  `);

  // 报名表
  db.exec(`
    CREATE TABLE IF NOT EXISTS recruit_application (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      post_id INTEGER,
      department TEXT,
      introduction TEXT,
      status TEXT DEFAULT 'pending',
      remark TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 管理员表
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `);

  // 留言表
  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_message (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      subject TEXT,
      message TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 站点图片表 - 管理所有页面的图片
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image_key TEXT UNIQUE NOT NULL,
      page_name TEXT NOT NULL,
      section TEXT NOT NULL,
      url TEXT NOT NULL,
      title TEXT DEFAULT '',
      description TEXT DEFAULT '',
      alt_text TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0
    );
  `);

  // 插入默认管理员
  const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_user').get();
  if (adminCount.count === 0) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO admin_user (username, password_hash) VALUES (?, ?)')
      .run('admin', hash);
    console.log('已创建默认管理员: admin / admin123');
  }

  // 插入默认图片数据（仅在表为空时插入）
  const imageCount = db.prepare('SELECT COUNT(*) as count FROM site_images').get();
  if (imageCount.count === 0) {
    console.log('正在初始化默认图片数据...');
    
    const defaultImages = [
      // ===== Logo =====
      { key: 'logos.schoolLogo', page: 'logos', section: 'logos', url: '/images/school_logo.png', title: '校徽', description: '合肥经济技术职业学院校徽', alt: '校徽', sort: 1 },
      { key: 'logos.teamLogo', page: 'logos', section: 'logos', url: '/images/team_logo.png', title: '队徽', description: '巴哈车队队徽', alt: '队徽', sort: 2 },
      
      // ===== 首页 =====
      { key: 'home.hero', page: 'home', section: 'hero', url: '/images/img_812.jpg', title: '速度与激情，工程与梦想', description: '合肥经济技术职业学院巴哈车队', alt: '巴哈赛车主视觉', sort: 1 },
      { key: 'home.feature1', page: 'home', section: 'features', url: '/images/img_809.jpg', title: '自主设计制造', description: '从设计图纸到赛车落地，全程自主完成', alt: '发动机安装', sort: 1 },
      { key: 'home.feature2', page: 'home', section: 'features', url: '/images/img_799.jpg', title: '精密工程工艺', description: '每一个细节都经过精心打磨', alt: '悬挂细节', sort: 2 },
      { key: 'home.feature3', page: 'home', section: 'features', url: '/images/img_800.jpg', title: '团队协作精神', description: '一群热爱赛车的年轻人并肩作战', alt: '队员笑容', sort: 3 },
      { key: 'home.gallery1', page: 'home', section: 'gallery', url: '/images/img_798.jpg', title: '赛车整车', description: '户外调试中的巴哈赛车', alt: '赛车整车', sort: 1 },
      { key: 'home.gallery2', page: 'home', section: 'gallery', url: '/images/img_804.jpg', title: '前悬挂细节', description: '精密的悬挂系统设计', alt: '前悬挂细节', sort: 2 },
      { key: 'home.gallery3', page: 'home', section: 'gallery', url: '/images/img_807.jpg', title: '团队造车', description: '室内团队协作造车场景', alt: '团队造车', sort: 3 },
      { key: 'home.gallery4', page: 'home', section: 'gallery', url: '/images/img_802.jpg', title: '夜间调试', description: '夜幕下的赛车调试剪影', alt: '夜间调试', sort: 4 },
      
      // ===== 车队介绍页 =====
      { key: 'about.banner', page: 'about', section: 'banner', url: '/images/img_807.jpg', title: '关于我们', description: '一群追逐赛车梦想的年轻人', alt: '团队造车', sort: 1 },
      { key: 'about.team1', page: 'about', section: 'story', url: '/images/img_796.jpg', title: '户外调试', description: '团队成员在户外调试赛车', alt: '户外调试', sort: 1 },
      { key: 'about.team2', page: 'about', section: 'team', url: '/images/img_808.jpg', title: '室内协作', description: '实验室里的团队协作', alt: '室内协作', sort: 2 },
      { key: 'about.workshop1', page: 'about', section: 'workshop', url: '/images/img_812.jpg', title: '实验室全景', description: '我们的造车基地', alt: '实验室全景', sort: 1 },
      { key: 'about.workshop2', page: 'about', section: 'workshop', url: '/images/img_809.jpg', title: '发动机安装', description: '精密的动力系统装配', alt: '发动机安装', sort: 2 },
      { key: 'about.workshop3', page: 'about', section: 'workshop', url: '/images/img_805.jpg', title: '赛车前部', description: '围观调试中的赛车', alt: '赛车前部', sort: 3 },
      
      // ===== 赛车展示页 =====
      { key: 'racecar.banner', page: 'racecar', section: 'banner', url: '/images/img_798.jpg', title: '赛车展示', description: '精密制造，极限性能', alt: '赛车展示', sort: 1 },
      { key: 'racecar.gallery1', page: 'racecar', section: 'gallery', url: '/images/img_798.jpg', title: '整车侧面', description: '户外展示的巴哈赛车', alt: '整车侧面', sort: 1 },
      { key: 'racecar.gallery2', page: 'racecar', section: 'gallery', url: '/images/img_799.jpg', title: '悬挂细节', description: '高性能悬挂系统', alt: '悬挂细节', sort: 2 },
      { key: 'racecar.gallery3', page: 'racecar', section: 'gallery', url: '/images/img_804.jpg', title: '前减震器', description: '专业级减震设计', alt: '前减震器', sort: 3 },
      { key: 'racecar.gallery4', page: 'racecar', section: 'gallery', url: '/images/img_805.jpg', title: '车头特写', description: '赛车前部细节', alt: '车头特写', sort: 4 },
      { key: 'racecar.detail1', page: 'racecar', section: 'details', url: '/images/img_809.jpg', title: '动力系统', description: '强劲的心脏', alt: '动力系统', sort: 1 },
      
      // ===== 赛事历程页 =====
      { key: 'competition.banner', page: 'competitions', section: 'banner', url: '/images/img_801.jpg', title: '赛事历程', description: '每一步，都算数', alt: '赛事历程', sort: 1 },
      { key: 'competition.timeline1', page: 'competitions', section: 'timeline', url: '/images/img_807.jpg', title: '组队成立', description: '车队初建，梦想启航', alt: '组队成立', sort: 1 },
      { key: 'competition.timeline2', page: 'competitions', section: 'timeline', url: '/images/img_809.jpg', title: '首车下线', description: '第一辆赛车制造完成', alt: '首车下线', sort: 2 },
      { key: 'competition.timeline3', page: 'competitions', section: 'timeline', url: '/images/img_798.jpg', title: '首次参赛', description: '登上赛场，初露锋芒', alt: '首次参赛', sort: 3 },
      { key: 'competition.timeline4', page: 'competitions', section: 'timeline', url: '/images/img_802.jpg', title: '持续进步', description: '不断优化，追求卓越', alt: '持续进步', sort: 4 },
      
      // ===== 队员风采页 =====
      { key: 'member.banner', page: 'members', section: 'banner', url: '/images/img_794.jpg', title: '队员风采', description: '青春与热血的故事', alt: '队员风采', sort: 1 },
      { key: 'member.life1', page: 'members', section: 'life', url: '/images/img_794.jpg', title: '休息时光', description: '训练之余的放松时刻', alt: '休息时光', sort: 1 },
      { key: 'member.life2', page: 'members', section: 'life', url: '/images/img_795.jpg', title: '青春笑脸', description: '热爱生活的队员们', alt: '青春笑脸', sort: 2 },
      { key: 'member.life3', page: 'members', section: 'life', url: '/images/img_800.jpg', title: '开怀大笑', description: '实验室里的欢乐时光', alt: '开怀大笑', sort: 3 },
      { key: 'member.life4', page: 'members', section: 'life', url: '/images/img_810.jpg', title: '工作间隙', description: '忙碌中的小憩', alt: '工作间隙', sort: 4 },
      { key: 'member.life5', page: 'members', section: 'life', url: '/images/img_811.jpg', title: '两人合影', description: '实验室背景的队员', alt: '两人合影', sort: 5 },
      
      // ===== 招新页 =====
      { key: 'recruit.banner', page: 'recruit', section: 'banner', url: '/images/img_806.jpg', title: '加入我们', description: '一起追逐赛车梦想', alt: '加入我们', sort: 1 },
      { key: 'recruit.gallery1', page: 'recruit', section: 'gallery', url: '/images/img_806.jpg', title: '团队合影', description: '期待你的加入', alt: '团队合影', sort: 1 },
      { key: 'recruit.gallery2', page: 'recruit', section: 'gallery', url: '/images/img_796.jpg', title: '实践机会', description: '亲手参与赛车制造', alt: '实践机会', sort: 2 },
      { key: 'recruit.gallery3', page: 'recruit', section: 'gallery', url: '/images/img_801.jpg', title: '赛事经历', description: '代表学校参加全国比赛', alt: '赛事经历', sort: 3 },
      
      // ===== 赞助商页 =====
      { key: 'sponsor.banner', page: 'sponsors', section: 'banner', url: '/images/img_812.jpg', title: '合作伙伴', description: '感谢一路相伴', alt: '合作伙伴', sort: 1 },
      
      // ===== 联系我们页 =====
      { key: 'contact.banner', page: 'contact', section: 'banner', url: '/images/img_805.jpg', title: '联系我们', description: '期待与你相遇', alt: '联系我们', sort: 1 },
    ];

    const insertStmt = db.prepare(`
      INSERT INTO site_images (image_key, page_name, section, url, title, description, alt_text, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const tx = db.transaction((images) => {
      for (const img of images) {
        insertStmt.run(img.key, img.page, img.section, img.url, img.title, img.description, img.alt, img.sort);
      }
    });
    tx(defaultImages);
    
    console.log(`已初始化 ${defaultImages.length} 张默认图片`);
  }

  console.log('数据库初始化完成');
}

module.exports = initDatabase;
