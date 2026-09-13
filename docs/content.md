# 内容维护指南

本站第一阶段用仓库里的 YAML 维护内容，构建时用 Zod 校验。改完后本地 `bun run build`（或 `bun run dev`）即可看到结果；合并到主分支后由 Vercel 自动发布。

## 文件一览

| 文件 | 用途 |
|------|------|
| [`src/data/site.yaml`](../src/data/site.yaml) | 站点中英文名、标语、描述、站点 URL |
| [`src/data/categories.yaml`](../src/data/categories.yaml) | 分类列表（**顺序即首页展示顺序**） |
| [`src/data/tools.yaml`](../src/data/tools.yaml) | 全部工具条目 |
| [`src/lib/schema.ts`](../src/lib/schema.ts) | 字段校验规则（改 schema 时需同步文档） |

## 新增一个工具

1. 打开 [`src/data/tools.yaml`](../src/data/tools.yaml)。
2. 在合适位置追加一条（建议放在对应分类其它工具附近，方便阅读；**展示顺序由 `category` 与分类文件顺序决定**，同分类内按 YAML 出现顺序排列）。
3. 填写必填字段，参考下方示例与字段表。
4. 确认 `category` 的值存在于 `categories.yaml` 的某个 `id`。
5. 确认 `slug` 全局唯一，且只含小写字母、数字与连字符。
6. 运行校验：

```bash
bun run build
```

构建失败时，终端会指出 YAML / Zod 错误（例如未知分类、重复 slug、非法 URL）。

### 最小示例

```yaml
- slug: my-new-tool
  name: My New Tool
  summary: 一句话说明它解决什么问题。
  description: 稍长的介绍，会出现在详情页「介绍」区块。
  category: development
  tags: [示例]
  status: beta
  links:
    github: https://github.com/example/my-new-tool
  highlights:
    - 要点一
    - 要点二
```

保存后详情页地址为：`/tools/my-new-tool`。

## 修改已有工具

在 `tools.yaml` 中按 `slug` 找到对应条目，直接改字段即可。

注意：

- **改 `slug`** 等于改 URL。旧链接会失效；若已对外分享，优先只改展示文案，或自行做重定向（本阶段静态站默认不带重定向表）。
- **改 `category`** 会让该工具出现在首页另一分组；目标 `id` 必须已存在。
- 删除某工具：删掉整条 YAML 对象；构建后对应详情页不再生成。

## 工具字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `slug` | 是 | URL 段，匹配 `^[a-z0-9]+(?:-[a-z0-9]+)*$`，如 `forge-cli` |
| `name` | 是 | 展示名称 |
| `summary` | 是 | 目录列表上的一句话摘要 |
| `description` | 是 | 详情页正文 |
| `category` | 是 | 分类 id，必须是 `categories.yaml` 里已有的 `id` |
| `tags` | 否 | 字符串数组；默认 `[]` |
| `status` | 否 | `stable` \| `beta` \| `experimental`；默认 `stable`（界面显示为「稳定 / Beta / 实验」） |
| `links.website` | 否 | 官网，须为合法 URL |
| `links.github` | 否 | 代码仓库 URL |
| `links.docs` | 否 | 文档 URL |
| `highlights` | 否 | 详情页「要点」列表；默认 `[]` |

`links` 下至少填一个常用链接即可；三个都可省略，详情页则不显示「链接」区块。

## 分类：新增或调整

编辑 [`src/data/categories.yaml`](../src/data/categories.yaml)：

```yaml
- id: development
  name: 软件开发
  description: 编码、脚手架、API 与日常开发效率工具。
```

| 字段 | 说明 |
|------|------|
| `id` | 稳定标识，供工具的 `category` 引用；也会用作首页锚点 `/#id` |
| `name` | 中文展示名 |
| `description` | 分类说明 |

当前内置分类（顺序即导航与首页顺序）：

1. `development` — 软件开发  
2. `testing` — 软件测试  
3. `cicd` — CI/CD（含构建）  
4. `release` — 发布  
5. `ai` — AI 工程  

### 新增分类

1. 在 `categories.yaml` 追加一项（放在你希望展示的位置）。
2. 把相关工具的 `category` 改成新 `id`。
3. `bun run build` 确认通过。

### 重命名 / 删除分类

- 只改中文名或描述：改 `name` / `description`，**尽量不要改 `id`**（`id` 一变，所有引用该分类的工具都要一起改，锚点也会变）。
- 删除分类前：先把该分类下工具迁走或删掉，否则构建会因「未知 category」失败。

## 站点文案

改品牌名、标语等，编辑 [`src/data/site.yaml`](../src/data/site.yaml)。`url` 需为合法 URL（可与正式域名对齐，影响 SEO 相关 `site` 配置时请同时看 `astro.config.mjs` 的 `site`）。

## 本地预览建议

```bash
bun run dev          # 改 YAML 后刷新页面即可
bun run build        # 合并前建议跑一遍，捕获校验错误
bun run preview      # 预览静态产物
```

## 提交建议

- 纯内容变更：单独 commit，说明「新增 / 更新了哪些工具」。
- 若同时改了 `schema.ts`：在 PR 里写明字段变更，并更新本文档字段表。
