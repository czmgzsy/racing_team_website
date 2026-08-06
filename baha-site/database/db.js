/**
 * Turso 云端数据库连接模块
 * 使用 @libsql/better-sqlite3 兼容驱动，API 与 better-sqlite3 完全一致
 */
const Database = require('@libsql/better-sqlite3');

// 从环境变量读取 Turso 数据库配置
const db = new Database({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_TOKEN,
});

// 开启外键约束
db.pragma('foreign_keys = ON');

module.exports = db;
