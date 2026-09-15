# 生态工具链 Portal

中文静态官网：以工具目录为主，展示开发平台、持续集成与蓝区办公相关工具。

- **品牌**：生态工具链 / Ecosystem Tools  
- **技术栈**：Astro · TypeScript · Tailwind CSS · Bun  
- **部署**：纯静态产物，可部署到 Vercel（也兼容 Cloudflare Pages）

## 本地开发

```bash
bun install
bun run dev
```

```bash
bun run build    # 输出到 dist/
bun run preview  # 预览静态产物
```

## 内容维护

工具与分类写在 `src/data/*.yaml`，构建时经 Zod 校验。

**如何新增、修改工具或分类** → 见 [`docs/content.md`](docs/content.md)（含字段说明、示例与常见注意点）。

| 文件 | 说明 |
|------|------|
| [`src/data/site.yaml`](src/data/site.yaml) | 站点名称、标语 |
| [`src/data/categories.yaml`](src/data/categories.yaml) | 分类顺序与文案 |
| [`src/data/tools.yaml`](src/data/tools.yaml) | 工具条目 |

当前分类顺序：开发平台 → 持续集成 → 蓝区办公 → 其他。

## 页面

- `/` — 按分类展示目录（第一屏即目录）
- `/tools/[slug]` — 工具轻量详情
- `/about` — 关于页

## 部署到 Vercel

1. 将本仓库导入 [Vercel](https://vercel.com)
2. Framework Preset 选 **Astro**（或 Other）
3. Install Command：`bun install`
4. Build Command：`bun run build`
5. Output Directory：`dist`

无需 SSR Adapter；`astro.config.mjs` 已设 `output: 'static'`。

也可用 Vercel CLI：

```bash
bunx vercel
```

## 设计说明

浅色展陈风：冷灰纸感背景、墨绿强调色、Fraunces / Noto Serif SC 作品牌展示字体。顶栏承载品牌识别，首页以目录为主体，无独立英雄营销区。

## 后续演进

- 后台管理可读写同一 schema，再在构建时生成 YAML 或拉取 API
- 工具增多后再加客户端搜索（Astro 岛屿）
- 需要边缘能力时再引入 Vercel / Cloudflare adapter
