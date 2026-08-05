/**
 * 前台 API 路由
 * 提供各页面数据读取接口
 */
const express = require('express');
const db = require('../database/db');

const router = express.Router();

// 禁止缓存，确保每次都获取最新数据
router.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// 站点设置 - 获取全局配置
router.get('/settings', (req, res) => {
  try {
    const rows = db.prepare('SELECT key, value FROM settings').all();
    const settings = {};
    for (const row of rows) {
      if (row.key === 'socialLinks') {
        try {
          settings[row.key] = JSON.parse(row.value);
        } catch {
          settings[row.key] = [];
        }
      } else {
        settings[row.key] = row.value || '';
      }
    }
    res.json({
      siteName: settings.siteName || '',
      siteTitle: settings.siteTitle || '',
      schoolLogoUrl: settings.schoolLogoUrl || '',
      teamLogoUrl: settings.teamLogoUrl || '',
      footerCopyright: settings.footerCopyright || '',
      footerAbout: settings.footerAbout || '',
      contactEmail: settings.contactEmail || '',
      contactAddress: settings.contactAddress || '',
      contactPhone: settings.contactPhone || '',
      socialLinks: settings.socialLinks || [],
      addressUrl: settings.addressUrl || '',
      wechatOfficial: settings.wechatOfficial || ''
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 页面内容 - 获取指定页面数据
router.get('/pages/:page', (req, res) => {
  try {
    const page = req.params.page;
    const rows = db.prepare(
      'SELECT section_key, content, content_type FROM page_content WHERE page_name = ?'
    ).all(page);
    const sections = rows.map((row) => ({
      sectionKey: row.section_key,
      content: row.content,
      contentType: row.content_type
    }));
    res.json({ page, sections });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 赛车列表
router.get('/racecars', (req, res) => {
  try {
    const rows = db.prepare(
      'SELECT * FROM racecar WHERE is_published = 1 ORDER BY sort_order ASC, id DESC'
    ).all();
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
    res.json({ items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 赛事列表
router.get('/competitions', (req, res) => {
  try {
    const { year } = req.query;
    let rows;
    if (year) {
      rows = db.prepare(
        'SELECT * FROM competition WHERE year = ? ORDER BY year DESC, sort_order ASC, id DESC'
      ).all(year);
    } else {
      rows = db.prepare(
        'SELECT * FROM competition ORDER BY year DESC, sort_order ASC, id DESC'
      ).all();
    }

    const yearsRows = db.prepare(
      'SELECT DISTINCT year FROM competition WHERE year IS NOT NULL ORDER BY year DESC'
    ).all();
    const years = yearsRows.map((row) => row.year);

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
    res.json({ items, years });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 队员列表
router.get('/members', (req, res) => {
  try {
    const { status, generation } = req.query;
    const conditions = [];
    const params = [];
    if (status) {
      conditions.push('status = ?');
      params.push(status);
    }
    if (generation) {
      conditions.push('generation = ?');
      params.push(generation);
    }
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const rows = db.prepare(
      `SELECT * FROM member ${whereClause} ORDER BY sort_order ASC, id DESC`
    ).all(...params);

    const genRows = db.prepare(
      'SELECT DISTINCT generation FROM member WHERE generation IS NOT NULL AND generation != \'\' ORDER BY generation DESC'
    ).all();
    const generations = genRows.map((row) => row.generation);

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
    res.json({ items, generations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 赞助商列表
router.get('/sponsors', (req, res) => {
  try {
    const rows = db.prepare(
      "SELECT * FROM sponsor ORDER BY CASE level WHEN 'gold' THEN 1 WHEN 'silver' THEN 2 WHEN 'bronze' THEN 3 WHEN 'partner' THEN 4 ELSE 5 END, sort_order ASC, id DESC"
    ).all();
    const items = rows.map((row) => ({
      id: row.id,
      name: row.name,
      logoUrl: row.logo_url,
      level: row.level,
      website: row.website,
      description: row.description,
      sortOrder: row.sort_order
    }));
    res.json({ items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 招新岗位
router.get('/recruit/posts', (req, res) => {
  try {
    const rows = db.prepare(
      'SELECT * FROM recruit_post WHERE is_open = 1 ORDER BY sort_order ASC, id DESC'
    ).all();
    const items = rows.map((row) => ({
      id: row.id,
      title: row.title,
      department: row.department,
      requirements: row.requirements ? JSON.parse(row.requirements) : [],
      description: row.description,
      isOpen: Boolean(row.is_open),
      sortOrder: row.sort_order
    }));
    res.json({ items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 提交报名申请
router.post('/recruit/apply', (req, res) => {
  try {
    const { name, phone, email, postId, department, introduction } = req.body;
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: '姓名和电话为必填项',
        applicationId: 0
      });
    }
    const stmt = db.prepare(
      'INSERT INTO recruit_application (name, phone, email, post_id, department, introduction) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const result = stmt.run(
      name,
      phone,
      email || null,
      postId || null,
      department || null,
      introduction || null
    );
    res.json({
      success: true,
      message: '报名提交成功',
      applicationId: result.lastInsertRowid
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message, applicationId: 0 });
  }
});

// 提交联系留言
router.post('/contact/message', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: '姓名和留言内容为必填项'
      });
    }
    const stmt = db.prepare(
      'INSERT INTO contact_message (name, email, subject, message) VALUES (?, ?, ?, ?)'
    );
    stmt.run(name, email || null, subject || null, message);
    res.json({ success: true, message: '留言提交成功' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 获取指定页面的图片
router.get('/images/:page', (req, res) => {
  try {
    const page = req.params.page;
    const rows = db.prepare(
      'SELECT * FROM site_images WHERE page_name = ? ORDER BY sort_order ASC, id ASC'
    ).all(page);
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
    res.json({ page, images });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 获取所有图片（按页面分组）
router.get('/images', (req, res) => {
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

module.exports = router;
