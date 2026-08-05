/**
 * 后台管理 API 路由
 * 所有接口通过 requireAuth 中间件鉴权（登录接口除外）
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// 解析分页参数
function getPagination(query) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  let pageSize = parseInt(query.pageSize, 10) || 20;
  if (pageSize > 100) pageSize = 100;
  if (pageSize < 1) pageSize = 20;
  const offset = (page - 1) * pageSize;
  return { page, pageSize, offset };
}

// 管理员登录（不需要鉴权）
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
    }
    const user = db.prepare('SELECT * FROM admin_user WHERE username = ?').get(username);
    if (!user) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, message: '用户名或密码错误' });
    }
    req.session.adminLoggedIn = true;
    req.session.adminUsername = user.username;
    req.session.adminUserId = user.id;
    res.json({ success: true, message: '登录成功', user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 管理员登出（不需要鉴权，直接清 session）
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// 修改密码
router.put('/password', requireAuth, (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ success: false, message: '旧密码和新密码不能为空' });
    }
    const username = req.session.adminUsername;
    const user = db.prepare('SELECT * FROM admin_user WHERE username = ?').get(username);
    if (!user) {
      return res.status(400).json({ success: false, message: '用户不存在' });
    }
    const valid = bcrypt.compareSync(oldPassword, user.password_hash);
    if (!valid) {
      return res.status(400).json({ success: false, message: '旧密码错误' });
    }
    const newHash = bcrypt.hashSync(newPassword, 10);
    db.prepare('UPDATE admin_user SET password_hash = ? WHERE id = ?').run(newHash, user.id);
    res.json({ success: true, message: '密码修改成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 后台统计概览
router.get('/stats', requireAuth, (req, res) => {
  try {
    const racecarCount = db.prepare('SELECT COUNT(*) as count FROM racecar').get().count;
    const competitionCount = db.prepare('SELECT COUNT(*) as count FROM competition').get().count;
    const memberCount = db.prepare('SELECT COUNT(*) as count FROM member').get().count;
    const sponsorCount = db.prepare('SELECT COUNT(*) as count FROM sponsor').get().count;
    const recruitPostCount = db.prepare('SELECT COUNT(*) as count FROM recruit_post').get().count;
    const applicationCount = db.prepare('SELECT COUNT(*) as count FROM recruit_application').get().count;
    const newApplicationCount = db.prepare(
      "SELECT COUNT(*) as count FROM recruit_application WHERE status = 'pending'"
    ).get().count;
    const messageCount = db.prepare('SELECT COUNT(*) as count FROM contact_message').get().count;
    const unreadMessageCount = db.prepare(
      'SELECT COUNT(*) as count FROM contact_message WHERE is_read = 0'
    ).get().count;

    res.json({
      racecarCount,
      competitionCount,
      memberCount,
      sponsorCount,
      recruitPostCount,
      applicationCount,
      newApplicationCount,
      messageCount,
      unreadMessageCount
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 赛车 CRUD ==========
router.get('/racecars', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM racecar ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM racecar').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      generation: row.generation,
      description: row.description,
      specs: row.specs ? JSON.parse(row.specs) : {},
      highlights: row.highlights ? JSON.parse(row.highlights) : [],
      imageUrl: row.image_url,
      gallery: row.gallery ? JSON.parse(row.gallery) : [],
      sortOrder: row.sort_order,
      isPublished: Boolean(row.is_published)
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/racecars', requireAuth, (req, res) => {
  try {
    const {
      name,
      generation,
      description,
      specs,
      highlights,
      imageUrl,
      gallery,
      sortOrder,
      isPublished
    } = req.body;
    const stmt = db.prepare(
      `INSERT INTO racecar (name, generation, description, specs, highlights, image_url, gallery, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(
      name || '',
      generation || null,
      description || null,
      specs ? JSON.stringify(specs) : null,
      highlights ? JSON.stringify(highlights) : null,
      imageUrl || null,
      gallery ? JSON.stringify(gallery) : null,
      sortOrder != null ? sortOrder : 0,
      isPublished ? 1 : 0
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/racecars/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      generation,
      description,
      specs,
      highlights,
      imageUrl,
      gallery,
      sortOrder,
      isPublished
    } = req.body;
    const stmt = db.prepare(
      `UPDATE racecar SET name = ?, generation = ?, description = ?, specs = ?, highlights = ?, image_url = ?, gallery = ?, sort_order = ?, is_published = ? WHERE id = ?`
    );
    const result = stmt.run(
      name || '',
      generation || null,
      description || null,
      specs ? JSON.stringify(specs) : null,
      highlights ? JSON.stringify(highlights) : null,
      imageUrl || null,
      gallery ? JSON.stringify(gallery) : null,
      sortOrder != null ? sortOrder : 0,
      isPublished ? 1 : 0,
      id
    );
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/racecars/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM racecar WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 赛事 CRUD ==========
router.get('/competitions', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM competition ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM competition').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      title: row.title,
      year: row.year,
      date: row.date,
      location: row.location,
      result: row.result,
      description: row.description,
      coverImage: row.cover_image,
      gallery: row.gallery ? JSON.parse(row.gallery) : [],
      sortOrder: row.sort_order
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/competitions', requireAuth, (req, res) => {
  try {
    const {
      title,
      year,
      date,
      location,
      result,
      description,
      coverImage,
      gallery,
      sortOrder
    } = req.body;
    const stmt = db.prepare(
      `INSERT INTO competition (title, year, date, location, result, description, cover_image, gallery, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const result2 = stmt.run(
      title || '',
      year || null,
      date || null,
      location || null,
      result || null,
      description || null,
      coverImage || null,
      gallery ? JSON.stringify(gallery) : null,
      sortOrder != null ? sortOrder : 0
    );
    res.json({ success: true, id: result2.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/competitions/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      year,
      date,
      location,
      result,
      description,
      coverImage,
      gallery,
      sortOrder
    } = req.body;
    const stmt = db.prepare(
      `UPDATE competition SET title = ?, year = ?, date = ?, location = ?, result = ?, description = ?, cover_image = ?, gallery = ?, sort_order = ? WHERE id = ?`
    );
    const result2 = stmt.run(
      title || '',
      year || null,
      date || null,
      location || null,
      result || null,
      description || null,
      coverImage || null,
      gallery ? JSON.stringify(gallery) : null,
      sortOrder != null ? sortOrder : 0,
      id
    );
    if (result2.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/competitions/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM competition WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 队员 CRUD ==========
router.get('/members', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM member ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM member').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      position: row.position,
      department: row.department,
      generation: row.generation,
      status: row.status,
      avatar: row.avatar,
      bio: row.bio,
      sortOrder: row.sort_order
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/members', requireAuth, (req, res) => {
  try {
    const {
      name,
      position,
      department,
      generation,
      status,
      avatar,
      bio,
      sortOrder
    } = req.body;
    const stmt = db.prepare(
      `INSERT INTO member (name, position, department, generation, status, avatar, bio, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(
      name || '',
      position || null,
      department || null,
      generation || null,
      status || 'current',
      avatar || null,
      bio || null,
      sortOrder != null ? sortOrder : 0
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/members/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      position,
      department,
      generation,
      status,
      avatar,
      bio,
      sortOrder
    } = req.body;
    const stmt = db.prepare(
      `UPDATE member SET name = ?, position = ?, department = ?, generation = ?, status = ?, avatar = ?, bio = ?, sort_order = ? WHERE id = ?`
    );
    const result = stmt.run(
      name || '',
      position || null,
      department || null,
      generation || null,
      status || 'current',
      avatar || null,
      bio || null,
      sortOrder != null ? sortOrder : 0,
      id
    );
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/members/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM member WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 赞助商 CRUD ==========
router.get('/sponsors', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM sponsor ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM sponsor').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url,
      level: row.level,
      website: row.website,
      description: row.description,
      sortOrder: row.sort_order
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/sponsors', requireAuth, (req, res) => {
  try {
    const { name, logoUrl, level, website, description, sortOrder } = req.body;
    const stmt = db.prepare(
      `INSERT INTO sponsor (name, logo_url, level, website, description, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(
      name || '',
      logoUrl || null,
      level || 'partner',
      website || null,
      description || null,
      sortOrder != null ? sortOrder : 0
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/sponsors/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { name, logoUrl, level, website, description, sortOrder } = req.body;
    const stmt = db.prepare(
      `UPDATE sponsor SET name = ?, logo_url = ?, level = ?, website = ?, description = ?, sort_order = ? WHERE id = ?`
    );
    const result = stmt.run(
      name || '',
      logoUrl || null,
      level || 'partner',
      website || null,
      description || null,
      sortOrder != null ? sortOrder : 0,
      id
    );
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/sponsors/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM sponsor WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 招新岗位 CRUD ==========
router.get('/recruit-posts', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM recruit_post ORDER BY sort_order ASC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM recruit_post').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      title: row.title,
      department: row.department,
      requirements: row.requirements ? JSON.parse(row.requirements) : [],
      description: row.description,
      isOpen: Boolean(row.is_open),
      sortOrder: row.sort_order
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/recruit-posts', requireAuth, (req, res) => {
  try {
    const { title, department, requirements, description, isOpen, sortOrder } = req.body;
    const stmt = db.prepare(
      `INSERT INTO recruit_post (title, department, requirements, description, is_open, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    const result = stmt.run(
      title || '',
      department || null,
      requirements ? JSON.stringify(requirements) : null,
      description || null,
      isOpen ? 1 : 0,
      sortOrder != null ? sortOrder : 0
    );
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/recruit-posts/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { title, department, requirements, description, isOpen, sortOrder } = req.body;
    const stmt = db.prepare(
      `UPDATE recruit_post SET title = ?, department = ?, requirements = ?, description = ?, is_open = ?, sort_order = ? WHERE id = ?`
    );
    const result = stmt.run(
      title || '',
      department || null,
      requirements ? JSON.stringify(requirements) : null,
      description || null,
      isOpen ? 1 : 0,
      sortOrder != null ? sortOrder : 0,
      id
    );
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/recruit-posts/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM recruit_post WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 报名记录 ==========
router.get('/recruit-applications', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM recruit_application ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM recruit_application').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      phone: row.phone,
      email: row.email,
      postId: row.post_id,
      department: row.department,
      introduction: row.introduction,
      status: row.status,
      remark: row.remark,
      createdAt: row.created_at
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/recruit-applications/:id/status', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;
    const stmt = db.prepare(
      'UPDATE recruit_application SET status = ?, remark = ? WHERE id = ?'
    );
    const result = stmt.run(status || 'pending', remark || null, id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 留言管理 ==========
router.get('/messages', requireAuth, (req, res) => {
  try {
    const { pageSize, offset } = getPagination(req.query);
    const rows = db.prepare(
      'SELECT * FROM contact_message ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?'
    ).all(pageSize, offset);
    const total = db.prepare('SELECT COUNT(*) as count FROM contact_message').get().count;
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      isRead: Boolean(row.is_read),
      createdAt: row.created_at
    }));
    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/messages/:id/read', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare(
      'UPDATE contact_message SET is_read = 1 WHERE id = ?'
    ).run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '记录不存在' });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 站点设置更新 ==========
router.put('/settings', requireAuth, (req, res) => {
  try {
    const settings = req.body;
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ success: false, message: '参数格式错误' });
    }
    const stmt = db.prepare(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value'
    );
    const tx = db.transaction((obj) => {
      for (const [key, value] of Object.entries(obj)) {
        const valStr = typeof value === 'object' ? JSON.stringify(value) : String(value != null ? value : '');
        stmt.run(key, valStr);
      }
    });
    tx(settings);
    res.json({ success: true, message: '设置更新成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 页面内容更新 ==========
router.put('/pages/:page', requireAuth, (req, res) => {
  try {
    const page = req.params.page;
    let sections = [];
    
    // 支持两种格式：sections 数组 或 普通对象
    if (Array.isArray(req.body.sections)) {
      sections = req.body.sections;
    } else {
      // 普通对象格式，自动转换为 sections 数组
      for (const [key, value] of Object.entries(req.body)) {
        sections.push({
          sectionKey: key,
          content: value || '',
          contentType: 'text'
        });
      }
    }
    
    const stmt = db.prepare(
      `INSERT INTO page_content (page_name, section_key, content, content_type)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(page_name, section_key) DO UPDATE SET content = excluded.content, content_type = excluded.content_type`
    );
    const tx = db.transaction((secs) => {
      for (const section of secs) {
        stmt.run(page, section.sectionKey, section.content || '', section.contentType || 'text');
      }
    });
    tx(sections);
    res.json({ success: true, message: '页面内容更新成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========== 图片管理 ==========
// 获取所有图片
router.get('/images', requireAuth, (req, res) => {
  try {
    const rows = db.prepare(
      'SELECT * FROM site_images ORDER BY page_name ASC, sort_order ASC, id ASC'
    ).all();
    const images = rows.map((row) => ({
      id: row.id,
      key: row.image_key,
      page: row.page_name,
      section: row.section,
      url: row.url,
      title: row.title,
      description: row.description,
      altText: row.alt_text,
      sortOrder: row.sort_order
    }));
    res.json({ images });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 更新图片
router.put('/images/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, description, altText, sortOrder } = req.body;
    const result = db.prepare(`
      UPDATE site_images SET url = ?, title = ?, description = ?, alt_text = ?, sort_order = ?
      WHERE id = ?
    `).run(url || '', title || '', description || '', altText || '', sortOrder != null ? sortOrder : 0, id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '图片不存在' });
    }
    res.json({ success: true, message: '图片更新成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 新增图片
router.post('/images', requireAuth, (req, res) => {
  try {
    const { key, page, section, url, title, description, altText, sortOrder } = req.body;
    if (!key || !page || !section || !url) {
      return res.status(400).json({ success: false, message: '必填项不能为空' });
    }
    const result = db.prepare(`
      INSERT INTO site_images (image_key, page_name, section, url, title, description, alt_text, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(key, page, section, url, title || '', description || '', altText || '', sortOrder != null ? sortOrder : 0);
    res.json({ success: true, id: result.lastInsertRowid, message: '图片添加成功' });
  } catch (err) {
    if (err.message.includes('UNIQUE')) {
      return res.status(400).json({ success: false, message: '图片key已存在' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

// 删除图片
router.delete('/images/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM site_images WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: '图片不存在' });
    }
    res.json({ success: true, message: '图片删除成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
