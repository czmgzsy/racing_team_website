# UI 设计指南

> **设计类型**: App 设计（应用架构设计）
> **确认检查**: 本指南适用于可交互的应用/网站/工具。

> ℹ️ Section 1 为设计意图与决策上下文。Code agent 实现时以 Section 2 及之后的具体参数为准。

## 1. Design Archetype (设计原型)

### 1.1 内容理解

- **目标用户**: 高校师生、赛事评委、潜在赞助商；期望专业感与工程美学
- **核心目的**: 建立信任 / 展示实力 / 引导招新与合作
- **情绪基调**: 高级克制、精密感 / 避免花哨、廉价、过度装饰

### 1.2 设计方向

- **Design Style**: Apple 极简范式 — 用户明确要求模仿苹果中国官网，大留白+毛玻璃+纤细字体
- **Application Type**: Landing/Showcase — 多页面展示站 + 轻量管理后台
- **Aesthetic Direction**: 精密工程美学遇上消费级极简，让赛车成为唯一视觉焦点

## 2. Color System (色彩系统)

**色彩关系**: 纯白底 + 深灰文字 + 中性蓝灰主色，极低饱和度贯穿全局
**配色设计理由**: 严格对标 Apple 官网低饱和克制感，让赛车照片与工程细节成为色彩主角
**主色推导**: 中性蓝灰取自精密机械金属质感，兼顾学术机构稳重与车队科技感
**使用比例**: 85% 白/浅灰背景 · 10% 深灰文字 · 5% 主色仅用于 CTA 与激活态

### 2.1 主题颜色

| Token                | HSL 值                 | 说明                              |
| -------------------- | ---------------------- | --------------------------------- |
| `background`         | hsl(0 0% 98%)          | 近纯白底色，Apple 标准            |
| `card`               | hsl(0 0% 100%)         | 卡片纯白，微阴影区分层级          |
| `foreground`         | hsl(0 0% 13%)          | 主文字深灰，非纯黑                |
| `muted-foreground`   | hsl(0 0% 45%)          | 次要说明文字                      |
| `primary`            | hsl(211 60% 48%)       | 中性蓝灰，按钮/链接/激活态        |
| `primary-foreground` | hsl(0 0% 100%)         | 主按钮白色文字                    |
| `accent`             | hsl(0 0% 96%)          | hover/focus 浅灰反馈背景          |
| `accent-foreground`  | hsl(0 0% 13%)          | accent 上文字同 foreground        |
| `border`             | hsl(0 0% 90%)          | 极细分隔线                        |

### 2.2 导航区配色

- **基调关系**: 复用主配色 background，叠加 backdrop-blur-xl + bg-white/80 毛玻璃效果
- **关键状态**: 默认 muted-foreground → hover foreground → active primary；对比度 ≥ 4.5:1
- **边界与背景**: 底部 1px border-border 分隔；滚动时背景透明度从 80% 渐变为 95%

### 2.3 语义颜色

| 用途     | HSL 值           | 衍生逻辑                     |
| -------- | ---------------- | ---------------------------- |
| `success` | hsl(142 71% 45%) | 绿色系，表单提交成功/赛事获奖 |
| `error`   | hsl(0 84% 60%)   | 红色系，表单验证失败          |

## 3. Typography (字体排版)

- **Heading**: -apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", sans-serif
- **Body**: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", sans-serif
- **字体策略**: 优先系统原生 SF Pro/PingFang 实现 Apple 质感；回退至 Segoe UI/Noto Sans SC

## 4. Layout Strategy (布局策略)

- **导航意图**: 固定顶部毛玻璃导航栏，左上角双 logo 横向并列；移动端折叠为汉堡菜单；至多一套
- **页面架构**: 全宽流式布局 + 内容区 max-w-5xl 居中；Hero 区全宽，内容区块内收
- **响应式**: 移动端单列堆叠 + 导航折叠；桌面端双栏/三栏网格 + 大量留白

## 5. Visual Language (视觉语言)

- **形态参数**: 圆角 `rounded-lg (0.75rem)` · 阴影 `shadow-sm` · 间距基调 `spacious`
- **识别签名**: 毛玻璃导航栏 · Hero 区全宽大图画布 · section 间距 ≥ space-y-24
- **装饰策略**: 零装饰元素；仅靠留白、字体层级、图片质量建立高级感
- **动效原则**: 滚动淡入 fade-up，duration-700 ease-out；hover scale-[1.01] duration-300
- **可及性**: 正文对比度 ≥ 4.5:1；Hero 大图文字加 text-shadow 或半透明遮罩

## 6. Component Principles (组件原则)

- **状态完整性**: Button/Input/Card 覆盖 Default/Hover/Focus/Disabled；Focus ring 用 primary/30
- **层级清晰**: Primary 按钮 filled + rounded-full；Secondary outline + hover:bg-accent
- **一致性**: 所有卡片统一 rounded-lg + shadow-sm + p-8；图片统一 aspect-video + object-cover

## 7. Image Direction (图片与视觉资产)

- **Image Role**: Hero 大图 / 赛车展示 / 队员肖像 / 赛事纪实 / Logo 占位
- **Image Art Direction**: 高对比自然光 / 深色赛道背景 / 浅景深突出主体 / 冷调后期 / 杂志级构图
- **Image Prompt Keywords**: baja racing car, automotive photography, studio lighting, shallow depth of field, carbon fiber texture, motion blur, pit lane atmosphere, professional motorsport, clean background, editorial style
- **Image Avoidance**: 通用赛车素材库图、过度 HDR、卡通插画、低分辨率模糊图、无关人物摆拍

## 8. 应避免 (Anti-patterns)

- ❌ 高饱和渐变/霓虹色/复杂纹理背景 — 违背 Apple 极简克制原则
- ❌ 小尺寸 Hero 图 / 图片周围多余边框 — 削弱沉浸式视觉冲击力
- ❌ 密集文字排版 / 过小行高 — 破坏留白呼吸感与信息层级