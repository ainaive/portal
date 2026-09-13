# 生态工具链 Portal — 实施计划

## 目标

第一阶段：中文静态官网，以**工具目录**为主，兼品牌展陈；可部署到 Vercel；数据用仓库内结构化文件，便于日后接后台。

## 已确认决策

| 项 | 决定 |
|---|---|
| 定位 | 工具目录为主 |
| 栈 | Astro + TypeScript + Tailwind CSS + Bun |
| 数据 | 仓库内 YAML（Zod 校验），非 CMS |
| 页面 | 首页目录、`/tools/[slug]` 轻量详情、`/about` |
| 语言 | 仅中文（英文名作副标） |
| 品牌 | 中文「生态工具链」/ 英文 Ecosystem Tools |
| 筛选 | 静态分类分区，无客户端搜索 |
| 部署 | `output: 'static'`；用现有 Vercel 账号部署 |
| 视觉 | 产品展陈、优雅；**目录即第一屏**（无独立英雄区）；自建 design tokens |
| 占位数据 | 21 个软件开发类工具（AI + 传统） |
| 首页构图 | 目录即第一屏（无独立英雄区）；品牌在顶栏与页眉 |

### 分类（最终）

1. 软件开发（条目偏多）
2. 软件测试
3. CI/CD（含构建）
4. 发布
5. AI 工程

## Git 工作流

- **不直接在 `main` 上开发**
- 从 `main` 检出功能分支：`feat/static-portal`
- 按逻辑拆成多次 commit（见下），全部完成后保持分支领先 `main`
- **本阶段不 merge、不 push**，除非你另行要求；执行结束时告知分支名与 commit 列表，由你决定 PR / 合并

### Commit 划分

1. `chore: scaffold Astro + Tailwind + Bun project`
2. `feat: add site config, categories, and placeholder tool data`
3. `feat: build directory, tool detail, and about pages with showcase UI`
4. `chore: add Vercel static deploy config and README`

## 技术结构

```
src/
  content/ or data/     # categories.yaml + tools/*.yaml（或 tools.yaml）
  lib/schema.ts         # Zod schema
  lib/tools.ts          # 读取与按分类聚合
  styles/global.css     # design tokens + Tailwind
  layouts/BaseLayout.astro
  components/           # Nav, ToolCard, CategorySection, Footer
  pages/
    index.astro
    about.astro
    tools/[slug].astro
public/
```

### 工具字段（schema）

- `slug`, `name`, `summary`, `description`, `category`（分类 id）
- `tags?: string[]`, `status?: 'stable' | 'beta' | 'experimental'`
- `links`: `{ website?, github?, docs? }`
- `highlights?: string[]`（详情页要点）

### 设计方向（自建 tokens）

- 浅色展陈：石墨文字 + 冷灰纸感底 + **单一强调色**（墨绿/青石，避免紫渐变与奶油 terracotta）
- 非系统默认字体（如展示用 Source Serif / 思源，正文用 IBM Plex Sans / 思源黑体类）
- 顶栏品牌强识别；目录分区清晰；2–3 处克制动效（入场、卡片 hover、锚点滚动）
- 工具条目用可点击列表/块作为交互容器（非装饰性卡片堆砌）

## 实施步骤

1. 创建分支 `feat/static-portal`
2. Scaffold Astro（strict TS）+ Tailwind + Bun；配置 `output: 'static'`
3. 写入 site 配置、5 分类、~20 占位工具 + schema
4. 实现 Layout / 首页分类目录 / 详情 / 关于
5. 打磨视觉与动效；`bun run build` 通过
6. 补充 README（本地命令、数据如何增删、Vercel 部署要点）与 `vercel.json`（如需要）
7. 按上述 4 次 commit 提交

## 明确不做（本阶段）

- 后台管理、鉴权、数据库
- 中英双语路由
- 客户端搜索/筛选
- 博客
- 强制绑定 Cloudflare adapter

## 后续演进（预留）

- 后台读写同一 schema，构建时改为拉 API 或生成 YAML
- 工具多了再加 Astro 岛屿做搜索
- 需要边缘能力时再选 Vercel/CF adapter
