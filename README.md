# 学脉产品落地页

学脉（HelpLearn）是一套交互式 AI 学习系统。这个仓库包含官网、公开产品截图和用于图文平台宣传的独立海报画布；不包含桌面端产品源码或安装包。

## 在线访问

[https://helplearn.cn/](https://helplearn.cn/)

网站通过 GitHub Actions 自动构建，并发布到 GitHub Pages。Windows 安装包作为 GitHub Release 资产发布，下载链接集中配置在 `app/product-config.ts`，不会提交到本仓库。

## 本地运行

需要 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

- 落地页：`http://localhost:3000/`
- 宣传图画布：`http://localhost:3000/poster`
- 短视频产品名片：`http://localhost:3000/card`

如果 3000 端口已被占用，开发服务器会自动选择下一个可用端口。

## 校验

```bash
npm run build
npm test
```

静态网站会导出到 `out/`，推送到 `main` 后由 `.github/workflows/pages.yml` 自动发布。

## 主要文件

- `app/page.tsx`：产品落地页
- `app/poster/page.tsx`：1440 × 1800 产品宣传图画布
- `app/card/page.tsx`：1080 × 1920 短视频产品名片
- `app/globals.css`：视觉系统与响应式布局
- `app/ContactCard.tsx`：一键复制 QQ 的联系入口
- `app/product-config.ts`：Windows 下载、SHA256、反馈 QQ 与链动小铺两种激活码商品的链接与库存状态配置
- `public/screenshots/`：产品实机截图

Indie Shade Product · Created by 影下独作
