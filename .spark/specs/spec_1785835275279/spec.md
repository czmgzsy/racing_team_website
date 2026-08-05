# 需求分析

## 用户故事

1. 浏览车队官网首页
  - 1.1 用户访问首页可看到苹果风格的大幅 Hero 横幅和车队 slogan
  - 1.2 首页分区块展示车队亮点、赛车预览和快速入口导航
  - 1.3 导航栏固定顶部带毛玻璃效果，滚动时样式变化
  - 1.4 页面滚动元素有淡入动画，响应式适配电脑和手机

2. 了解车队背景与组织架构
  - 2.1 用户可在车队介绍页查看车队简介、成立背景和团队理念
  - 2.2 展示车队组织架构图和各部门职责说明
  - 2.3 内容由后台管理维护，前台自动同步更新

3. 查看巴哈赛车展示
  - 3.1 用户可浏览多代巴哈赛车的展示卡片
  - 3.2 每款赛车展示车辆参数和设计亮点
  - 3.3 赛车信息支持后台新增、编辑、删除

4. 查阅赛事历程与成绩
  - 4.1 用户可按年份查看历年参赛记录和比赛成绩
  - 4.2 展示赛事图集，点击可查看大图
  - 4.3 赛事信息由后台管理，支持图文增删改

5. 浏览队员风采
  - 5.1 用户可查看现任队员和往届队员展示
  - 5.2 队员卡片展示照片、姓名、职位、届别
  - 5.3 队员信息支持后台分类管理与增删改

6. 了解赞助商与合作
  - 6.1 用户可浏览合作赞助单位 logo 展示墙
  - 6.2 展示招商合作说明与联系方式
  - 6.3 赞助商信息支持后台维护更新

7. 在线报名招新
  - 7.1 用户可查看招新介绍和各岗位要求
  - 7.2 填写报名表单并提交，数据保存到数据库
  - 7.3 后台可查看报名记录和管理招新信息

8. 获取联系方式
  - 8.1 用户可查看车队邮箱、校内地址等联系信息
  - 8.2 联系信息由后台统一维护

9. 管理员登录管理后台
  - 9.1 管理员通过账号密码登录后台（默认 admin/admin123）
  - 9.2 登录态校验，未登录访问自动跳转登录页
  - 9.3 支持修改管理员密码

10. 可视化编辑网站内容
  - 10.1 管理员可在后台修改各页面的文本内容
  - 10.2 支持上传图片替换网站各处占位图片
  - 10.3 修改后前台页面实时生效，无需改代码

11. 管理赛事/队员/招新数据
  - 11.1 管理员可对赛事记录、队员信息、招新岗位进行增删改查
  - 11.2 所有数据持久化到 SQLite 数据库
  - 11.3 前台通过 API 读取数据库内容渲染

## 页面列表

### 首页（index.html）
1. 苹果风格大尺寸 Hero 横幅，含车队 slogan
2. 车队亮点展示区（3-4 个亮点卡片）
3. 赛车预览区，展示最新赛车图片和简介
4. 快速入口区，导航至各栏目
5. 滚动淡入动画、响应式适配

### 车队介绍页（about.html）
1. 车队简介与成立背景文字展示
2. 团队理念与价值观展示
3. 组织架构图（部门划分 + 职责说明）
4. 图片占位区（车队合照等）

### 赛车展示页（racecar.html）
1. 多代巴哈赛车卡片式展示
2. 车辆参数详情（车架、动力、悬挂等）
3. 设计亮点与技术创新说明
4. 赛车图片轮播/图集

### 赛事历程页（competition.html）
1. 历年参赛记录时间线展示
2. 比赛成绩与获奖情况
3. 赛事图集市，支持大图查看
4. 按年份筛选切换

### 队员风采页（member.html）
1. 现任队员卡片网格展示
2. 往届队员分区展示
3. 队员信息：照片、姓名、职位、届别
4. 按届别/部门筛选

### 赞助商合作页（sponsor.html）
1. 合作赞助单位 logo 展示墙
2. 招商合作说明文字
3. 赞助合作联系方式
4. 赞助商分级展示

### 招新页面（recruit.html）
1. 招新介绍与加入我们的号召
2. 各招聘岗位要求列表
3. 在线报名表单（姓名、联系方式、意向岗位、个人介绍）
4. 表单提交与成功反馈

### 联系我们页（contact.html）
1. 车队邮箱、QQ 群等联系方式
2. 校内地址与位置描述
3. 社交媒体链接占位
4. 留言反馈表单（可选）

### 管理后台登录页（admin/login.html）
1. 账号密码输入表单
2. 登录验证与错误提示
3. 登录成功跳转后台首页

### 管理后台首页（admin/index.html）
1. 数据概览（赛事数、队员数、报名数等）
2. 快捷操作入口
3. 左侧导航 + 右侧内容布局

### 内容管理页（admin/content.html）
1. 各页面文本内容可视化编辑
2. 图片上传替换功能
3. 保存后实时生效

### 赛事管理页（admin/competitions.html）
1. 赛事记录列表展示
2. 新增/编辑/删除赛事
3. 赛事图片上传管理

### 队员管理页（admin/members.html）
1. 队员列表与分类筛选
2. 新增/编辑/删除队员
3. 队员照片上传

### 招新管理页（admin/recruits.html）
1. 招新岗位管理（增删改）
2. 报名记录查看
3. 报名状态标记

### 账号设置页（admin/settings.html）
1. 修改管理员密码
2. 退出登录

## 非功能需求
1. 响应式设计：桌面端、平板、手机端自动适配，导航栏移动端折叠为汉堡菜单
2. UI 风格：严格对标苹果中国官网，极简留白、大尺寸主视觉、低饱和度、干净纤细字体
3. 动画效果：滚动淡入、导航栏滚动变化、hover 微动效，整体柔和低调
4. 部署友好：SQLite 文件数据库，无需额外数据库服务，支持部署到 Vercel/Render
5. 图片占位：所有图片位置标记明确注释，便于后续上传替换

# 技术方案

## 开发元信息
- 开发模式: 全栈应用
- 涉及层级: [数据库, 服务端, 前端]
- 前端技术栈: HTML + Tailwind CSS (CDN) + 原生 JavaScript
- 后端技术栈: Node.js + Express + SQLite (better-sqlite3)
- 鉴权方式: Session + 简单账号密码

## 项目结构

```
baha-website/
├── package.json
├── README.md                    # 部署使用说明
├── server.js                    # Express 服务入口
├── database/
│   ├── db.js                    # SQLite 数据库连接与初始化
│   └── init.js                  # 建表与初始数据脚本
├── routes/
│   ├── api.js                   # 前台内容 API 路由
│   ├── admin.js                 # 后台管理 API 路由
│   └── upload.js                # 图片上传路由
├── middleware/
│   └── auth.js                  # 后台鉴权中间件
├── public/                      # 静态资源目录（前台页面）
│   ├── index.html
│   ├── about.html
│   ├── racecar.html
│   ├── competition.html
│   ├── member.html
│   ├── sponsor.html
│   ├── recruit.html
│   ├── contact.html
│   ├── css/
│   │   └── style.css            # 自定义样式（动画、滚动效果等）
│   ├── js/
│   │   ├── app.js               # 公共 JS（导航、滚动动画、响应式）
│   │   └── page/                # 各页面专属 JS
│   └── images/
│       ├── placeholder.svg      # 通用占位图
│       └── uploads/             # 上传图片存放目录
└── admin/                       # 管理后台页面（作为静态文件托管）
    ├── login.html
    ├── index.html
    ├── content.html
    ├── competitions.html
    ├── members.html
    ├── recruits.html
    ├── settings.html
    ├── css/
    │   └── admin.css
    └── js/
        ├── admin.js             # 后台公共 JS
        └── page/                # 各管理页专属 JS
```

## 页面路由与导航

### 页面路由（静态页面）
- `/` → index.html（首页）
- `/about.html` → 车队介绍页
- `/racecar.html` → 赛车展示页
- `/competition.html` → 赛事历程页
- `/member.html` → 队员风采页
- `/sponsor.html` → 赞助商合作页
- `/recruit.html` → 招新页面
- `/contact.html` → 联系我们
- `/admin/login.html` → 后台登录页
- `/admin/index.html` → 后台首页

### API 路由
- `GET /api/settings` → 获取全局站点配置（logo、联系方式等）
- `GET /api/pages/:page` → 获取指定页面的内容数据
- `GET /api/racecars` → 获取赛车列表
- `GET /api/competitions` → 获取赛事列表
- `GET /api/members` → 获取队员列表
- `GET /api/sponsors` → 获取赞助商列表
- `GET /api/recruit/posts` → 获取招新岗位
- `POST /api/recruit/apply` → 提交报名申请
- `POST /api/contact/message` → 提交留言
- `POST /api/admin/login` → 管理员登录
- `POST /api/admin/logout` → 管理员登出
- `GET /api/admin/stats` → 后台数据统计
- `PUT /api/admin/settings` → 更新站点设置
- `PUT /api/admin/pages/:page` → 更新页面内容
- `POST /api/admin/upload` → 图片上传
- 完整 CRUD: racecars / competitions / members / sponsors / recruit-posts / recruit-applications

### 导航设计
- 导航机制：页面路由（多页面，每个栏目独立 HTML）
- 导航项（前台）：
  - 首页
  - 车队介绍
  - 赛车展示
  - 赛事历程
  - 队员风采
  - 赞助商
  - 招新
  - 联系我们
- 导航项（后台侧边栏）：
  - 数据概览
  - 内容管理
  - 赛事管理
  - 队员管理
  - 招新管理
  - 账号设置
- 导航特性：固定顶部、毛玻璃 backdrop-blur、滚动时背景透明度变化、移动端汉堡菜单

## 数据模型

### 数据库设计

#### 站点设置表（settings）
用途：存储网站全局配置，如两个 logo、联系方式、版权信息等。
核心字段：
- key: varchar (配置键名，唯一)
- value: text (配置值，JSON 格式存储复杂内容)

#### 页面内容表（page_content）
用途：存储各页面的文本内容，支持后台可视化编辑。
核心字段：
- page_name: varchar (页面标识，如 index/about/racecar)
- section_key: varchar (区块标识，如 hero_slogan/intro_text)
- content: text (内容文本)
- content_type: varchar ['text', 'html', 'image', 'json'] (内容类型)

#### 赛车表（racecar）
用途：存储各代巴哈赛车的信息。
核心字段：
- name: varchar (赛车名称/型号)
- generation: varchar (第几代/年份)
- description: text (赛车简介)
- specs: text (车辆参数，JSON 格式)
- highlights: text (设计亮点，JSON 数组)
- image_url: varchar (主图 URL)
- gallery: text (图集 URL，JSON 数组)
- sort_order: integer (排序权重)
- is_published: boolean (是否发布)

#### 赛事表（competition）
用途：存储历年参赛记录和成绩。
核心字段：
- title: varchar (赛事名称)
- year: integer (参赛年份)
- date: varchar (比赛日期)
- location: varchar (比赛地点)
- result: varchar (取得成绩/奖项)
- description: text (赛事描述)
- cover_image: varchar (封面图 URL)
- gallery: text (赛事图集，JSON 数组)
- sort_order: integer (排序)

#### 队员表（member）
用途：存储车队队员信息。
核心字段：
- name: varchar (队员姓名)
- position: varchar (职位/角色)
- department: varchar (所属部门)
- generation: varchar (届别，如 2023 届)
- status: varchar ['current', 'alumni'] (现任/往届)
- avatar: varchar (头像 URL)
- bio: text (个人简介)
- sort_order: integer (排序)

#### 赞助商表（sponsor）
用途：存储合作赞助单位信息。
核心字段：
- name: varchar (赞助商名称)
- logo_url: varchar (logo 图片 URL)
- level: varchar ['gold', 'silver', 'bronze', 'partner'] (赞助级别)
- website: varchar (官方网站)
- description: text (简介)
- sort_order: integer (排序)

#### 招新岗位表（recruit_post）
用途：存储招新岗位信息。
核心字段：
- title: varchar (岗位名称)
- department: varchar (所属部门)
- requirements: text (岗位要求，JSON 数组)
- description: text (岗位描述)
- is_open: boolean (是否开放招聘)
- sort_order: integer (排序)

#### 报名表（recruit_application）
用途：存储用户提交的招新报名。
核心字段：
- name: varchar (姓名)
- phone: varchar (联系电话)
- email: varchar (邮箱)
- post_id: integer (意向岗位 ID)
- department: varchar (意向部门)
- introduction: text (个人介绍)
- status: varchar ['pending', 'reviewed', 'accepted', 'rejected'] (状态)
- remark: text (备注)

#### 管理员表（admin_user）
用途：存储后台管理员账号。
核心字段：
- username: varchar (用户名，唯一)
- password_hash: varchar (密码哈希)

#### 留言表（contact_message）
用途：存储联系页面提交的留言。
核心字段：
- name: varchar (留言人姓名)
- email: varchar (邮箱)
- subject: varchar (主题)
- message: text (留言内容)
- is_read: boolean (是否已读)

## 业务模型

### API 设计

#### 前台公共 API
**功能全景**：
| 功能 | 实现方式 | 说明 |
|------|----------|------|
| 获取站点全局设置 | API | GET /api/settings |
| 获取页面内容数据 | API | GET /api/pages/:page |
| 获取赛车列表 | API | GET /api/racecars |
| 获取赛事列表 | API | GET /api/competitions |
| 获取队员列表 | API | GET /api/members |
| 获取赞助商列表 | API | GET /api/sponsors |
| 获取招新岗位 | API | GET /api/recruit/posts |
| 提交报名申请 | API | POST /api/recruit/apply |
| 提交联系留言 | API | POST /api/contact/message |
| 图片上传（后台用） | API | POST /api/admin/upload |

**API 类型定义**：
```typescript
// 获取站点设置 [领域模型: settings] [对应页面功能: 全站导航栏、页脚、联系页]
GET /api/settings
Response: {
  siteName: string;
  schoolLogoUrl: string;
  teamLogoUrl: string;
  footerCopyright: string;
  contactEmail: string;
  contactAddress: string;
  contactPhone: string;
  socialLinks: Array<{ name: string; url: string }>;
}

// 获取指定页面内容 [领域模型: page_content] [对应页面功能: 各页面文本/图片内容]
GET /api/pages/:page
Response: {
  page: string;
  sections: Array<{
    sectionKey: string;
    content: string;
    contentType: 'text' | 'html' | 'image' | 'json';
  }>;
}

// 获取赛车列表 [领域模型: racecar] [对应页面功能: 赛车展示页]
GET /api/racecars
Response: {
  items: Array<{
    id: number;
    name: string;
    generation: string;
    description: string;
    specs: Record<string, string>;
    highlights: string[];
    imageUrl: string;
    gallery: string[];
  }>;
}

// 获取赛事列表 [领域模型: competition] [对应页面功能: 赛事历程页]
GET /api/competitions?year=
Response: {
  items: Array<{
    id: number;
    title: string;
    year: number;
    date: string;
    location: string;
    result: string;
    description: string;
    coverImage: string;
    gallery: string[];
  }>;
  years: number[];
}

// 获取队员列表 [领域模型: member] [对应页面功能: 队员风采页]
GET /api/members?status=current&generation=
Response: {
  items: Array<{
    id: number;
    name: string;
    position: string;
    department: string;
    generation: string;
    status: 'current' | 'alumni';
    avatar: string;
    bio: string;
  }>;
  generations: string[];
}

// 获取赞助商列表 [领域模型: sponsor] [对应页面功能: 赞助商合作页]
GET /api/sponsors
Response: {
  items: Array<{
    id: number;
    name: string;
    logoUrl: string;
    level: 'gold' | 'silver' | 'bronze' | 'partner';
    website: string;
    description: string;
  }>;
}

// 获取招新岗位 [领域模型: recruit_post] [对应页面功能: 招新页面]
GET /api/recruit/posts
Response: {
  items: Array<{
    id: number;
    title: string;
    department: string;
    requirements: string[];
    description: string;
    isOpen: boolean;
  }>;
}

// 提交报名申请 [领域模型: recruit_application] [对应页面功能: 招新页面-报名表单]
POST /api/recruit/apply
Request: {
  name: string;
  phone: string;
  email: string;
  postId: number;
  department: string;
  introduction: string;
}
Response: { success: boolean; message: string; applicationId: number }

// 提交联系留言 [领域模型: contact_message] [对应页面功能: 联系我们页-留言]
POST /api/contact/message
Request: {
  name: string;
  email: string;
  subject: string;
  message: string;
}
Response: { success: boolean; message: string }
```

#### 后台管理 API
**功能全景**：
| 功能 | 实现方式 | 说明 |
|------|----------|------|
| 管理员登录/登出 | API | Session 鉴权 |
| 获取数据统计概览 | API | GET /api/admin/stats |
| 更新站点设置 | API | PUT /api/admin/settings |
| 更新页面内容 | API | PUT /api/admin/pages/:page |
| 图片上传 | API | POST /api/admin/upload (multipart/form-data) |
| 赛车 CRUD | API | RESTful /api/admin/racecars |
| 赛事 CRUD | API | RESTful /api/admin/competitions |
| 队员 CRUD | API | RESTful /api/admin/members |
| 赞助商 CRUD | API | RESTful /api/admin/sponsors |
| 招新岗位 CRUD | API | RESTful /api/admin/recruit-posts |
| 报名记录查看/状态更新 | API | GET /api/admin/recruit-applications |
| 留言查看/标记已读 | API | GET /api/admin/messages |
| 修改管理员密码 | API | PUT /api/admin/password |

**后台 API 类型定义**：
```typescript
// 管理员登录 [领域模型: admin_user] [对应页面功能: 后台登录]
POST /api/admin/login
Request: { username: string; password: string }
Response: { success: boolean; message: string; user: { username: string } }

// 管理员登出
POST /api/admin/logout
Response: { success: boolean }

// 获取后台统计 [领域模型: 多表聚合] [对应页面功能: 后台首页-数据概览]
GET /api/admin/stats
Response: {
  racecarCount: number;
  competitionCount: number;
  memberCount: number;
  sponsorCount: number;
  recruitPostCount: number;
  applicationCount: number;
  newApplicationCount: number;
  messageCount: number;
  unreadMessageCount: number;
}

// 更新站点设置 [领域模型: settings] [对应页面功能: 内容管理]
PUT /api/admin/settings
Request: {
  siteName: string;
  schoolLogoUrl: string;
  teamLogoUrl: string;
  footerCopyright: string;
  contactEmail: string;
  contactAddress: string;
  contactPhone: string;
}
Response: { success: boolean; message: string }

// 更新页面内容 [领域模型: page_content] [对应页面功能: 内容管理]
PUT /api/admin/pages/:page
Request: {
  sections: Array<{ sectionKey: string; content: string; contentType: string }>;
}
Response: { success: boolean; message: string }

// 图片上传 [对应页面功能: 内容管理/赛事管理/队员管理]
POST /api/admin/upload (multipart/form-data, field: file)
Response: { success: boolean; url: string; filename: string }

// 赛车 CRUD [领域模型: racecar] [对应页面功能: 赛车管理]
GET    /api/admin/racecars              → { items, total }
GET    /api/admin/racecars/:id          → { id, name, ... }
POST   /api/admin/racecars              → { success, id }
PUT    /api/admin/racecars/:id          → { success }
DELETE /api/admin/racecars/:id          → { success }

// 赛事 CRUD [领域模型: competition] [对应页面功能: 赛事管理]
GET    /api/admin/competitions          → { items, total }
GET    /api/admin/competitions/:id      → { id, title, ... }
POST   /api/admin/competitions          → { success, id }
PUT    /api/admin/competitions/:id      → { success }
DELETE /api/admin/competitions/:id      → { success }

// 队员 CRUD [领域模型: member] [对应页面功能: 队员管理]
GET    /api/admin/members               → { items, total }
GET    /api/admin/members/:id           → { id, name, ... }
POST   /api/admin/members               → { success, id }
PUT    /api/admin/members/:id           → { success }
DELETE /api/admin/members/:id           → { success }

// 赞助商 CRUD [领域模型: sponsor] [对应页面功能: 内容管理-赞助商]
GET    /api/admin/sponsors              → { items, total }
POST   /api/admin/sponsors              → { success, id }
PUT    /api/admin/sponsors/:id          → { success }
DELETE /api/admin/sponsors/:id          → { success }

// 招新岗位 CRUD [领域模型: recruit_post] [对应页面功能: 招新管理]
GET    /api/admin/recruit-posts         → { items, total }
POST   /api/admin/recruit-posts         → { success, id }
PUT    /api/admin/recruit-posts/:id     → { success }
DELETE /api/admin/recruit-posts/:id     → { success }

// 报名记录 [领域模型: recruit_application] [对应页面功能: 招新管理-报名记录]
GET    /api/admin/recruit-applications  → { items, total }
PUT    /api/admin/recruit-applications/:id/status → { success }

// 留言管理 [领域模型: contact_message] [对应页面功能: 后台留言查看]
GET    /api/admin/messages              → { items, total }
PUT    /api/admin/messages/:id/read     → { success }

// 修改密码 [领域模型: admin_user] [对应页面功能: 账号设置]
PUT /api/admin/password
Request: { oldPassword: string; newPassword: string }
Response: { success: boolean; message: string }
```

## 前端实现要点

### 公共能力
- **导航栏**：固定顶部、毛玻璃效果（backdrop-blur）、滚动时背景加深、移动端汉堡菜单展开收起
- **滚动淡入动画**：IntersectionObserver 实现元素进入视口时淡入上滑效果
- **响应式布局**：Tailwind 断点 sm/md/lg/xl 适配，移动端单列、桌面端多列
- **数据渲染**：页面加载时 fetch API 读取数据，动态填充 DOM
- **图片占位**：所有 `<img>` 标签旁添加 HTML 注释 `<!-- 此处后续上传替换图片/logo -->`，默认显示灰色占位块或 SVG 占位图

### 苹果风格设计规范
- 字体：优先使用 `-apple-system, BlinkMacSystemFont, "SF Pro SC", "PingFang SC", "Helvetica Neue"` 等系统字体
- 配色：以白/浅灰为底色，深灰/黑色文字，低饱和度点缀色（深蓝/深灰按钮）
- 间距：大留白，section 间距 80-120px，内边距充足
- 卡片：圆角 12-20px，轻阴影或无阴影，纯白/浅灰底色
- 动画：transition 0.3s ease，hover 微微上浮或透明度变化
- Hero 区域：超大字号标题（40-64px 桌面端），简短有力的 slogan

### 管理后台
- 左侧固定侧边栏导航 + 右侧内容区布局
- 列表使用 table + 操作按钮，新增/编辑使用模态框或抽屉
- 表单包含校验提示，操作后 Toast 反馈
- 图片上传支持拖拽或点击选择，预览后确认上传
- 登录态通过 Cookie/Session 维持，请求自动携带 credentials
