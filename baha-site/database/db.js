/**
 * SQLite 数据库连接模块
 * 使用 better-sqlite3 同步操作，简单高效
 */
const Database = require('better-sqlite3');
const path = require('path');

// 数据库文件路径
const dbPath = path.join(__dirname, 'baha.db');
const db = new Database(dbPath);

// 开启 WAL 模式提升性能
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

module.exports = db;
