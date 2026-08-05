# 合肥经济技术职业学院巴哈车队官网

对标苹果中国官网设计风格的车队展示网站，支持后台可视化内容管理。

## 技术栈

- **后端**：Node.js + Express + better-sqlite3
- **前端**：原生 HTML + CSS + JavaScript
- **样式**：自定义 CSS（苹果官网风格）
- **数据库**：SQLite（单文件，无需额外安装）
- **鉴权**：express-session

## 功能特性

### 前台展示
- 🏠 首页：Hero 大图 + 车队亮点 + 赛车预览 + 快速入口
- 📖 车队介绍：简介、背景、理念、组织架构
- 🏎️ 赛车展示：多代巴哈赛车参数与设计亮点
- 🏁 赛事历程：时间线展示历年参赛记录与图集
- 👥 队员风采：现任/往届队员卡片展示
- 🤝 赞助商：合作单位 Logo 墙 + 招商说明
- 🌟 招新：岗位介绍 + 在线报名
- 📧 联系我们：联系方式 + 留言表单

### 管理后台
- 🔐 账号密码登录（默认 admin / admin123）
- 📊 数据概览仪表盘
- 📝 可视化内容编辑
- 🖼️ 图片上传替换
- 🏆 赛事 CRUD 管理
- 👤 队员 CRUD 管理
- 📋 招新岗位与报名管理
- 💼 赞助商 CRUD 管理
- 💬 留言查看与管理
- 🔑 修改管理员密码

## 快速开始

```bash
# 安装依赖
npm install

# 启动服务
npm start
```

访问地址：
- 前台：http://localhost:3000
- 后台：http://localhost:3000/admin
- 默认账号：admin / admin123

## 项目结构

```
baha-site/
├── server.js              # Express 服务入口
├── package.json           # 项目配置
├── database/              # 数据库相关
├── middleware/            # 中间件
├── routes/                # API 路由
├── public/                # 前台静态页面
├── admin/                 # 后台管理页面
└── 部署使用说明.md         # 详细部署文档
```

## 部署

支持部署到 Render / Vercel 等免费平台，详见 [部署使用说明.md](./部署使用说明.md)。

## License

MIT
