/**
 * 巴哈车队官网 - Express 服务入口
 * 负责：
 *   1. 静态资源托管（前台页面 public/、后台页面 admin/）
 *   2. API 路由挂载
 *   3. 中间件配置（Session、JSON 解析等）
 *   4. 数据库初始化
 */

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const crypto = require('crypto');

// 数据库初始化
const initDatabase = require('./database/init');

// 路由模块
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// 中间件配置
// ========================================

// JSON 解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie 解析
app.use(cookieParser());

// Session 配置
app.use(session({
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24小时
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// ========================================
// API 路由
// ========================================

app.use('/api', apiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', uploadRoutes);

// ========================================
// 静态资源托管
// ========================================

// 后台管理页面（放在前面以避免被前台覆盖）
app.use('/admin', express.static(path.join(__dirname, 'admin'), {
  index: 'index.html',
  extensions: ['html']
}));

// 前台静态资源
app.use(express.static(path.join(__dirname, 'public'), {
  index: 'index.html',
  extensions: ['html']
}));

// SPA fallback - 后台页面（处理刷新 404）
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});

// 404 兜底 - 前台返回首页（多页面架构下实际不会走到这里）
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ========================================
// 启动服务
// ========================================

function startServer() {
  try {
    initDatabase();
  } catch (err) {
    console.error('数据库初始化失败:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log('========================================');
    console.log('  巴哈车队官网服务已启动');
    console.log('  前台地址: http://localhost:' + PORT);
    console.log('  后台地址: http://localhost:' + PORT + '/admin');
    console.log('  默认账号: admin / admin123');
    console.log('========================================');
  });
}

startServer();
