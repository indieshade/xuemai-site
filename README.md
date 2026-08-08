# 学脉产品落地页

学脉是一套本地优先的桌面学习系统。这个仓库包含产品落地页，以及用于图文平台宣传的独立海报画布。

## 在线访问

[https://indieshade.github.io/xuemai-site/](https://indieshade.github.io/xuemai-site/)

网站通过 GitHub Actions 自动构建，并发布到 GitHub Pages。仓库只包含落地页源码、公开产品截图和网页构建配置，不包含学脉桌面应用源码及本地宣发工作资料。

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
- `public/screenshots/`：产品实机截图

Indie Shade Product · Created by 影下独作
