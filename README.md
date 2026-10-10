# 学脉 HelpLearn｜AI 交互学习系统

学脉是产品的中文名，HelpLearn 是国际名称，由影下独作开发。围绕书、PDF 或问题展开的 AI 对话，会整理成可继续的学习旅程；相关旅程可以放进同一个领域，用学习地图回看概念关系与资料来源。

这个仓库包含官网、公开产品截图和宣传画布。Windows 安装包通过本仓库的 GitHub Releases 提供，桌面端源码不在此仓库中。

## 在线访问

[学脉 HelpLearn 官网](https://helplearn.cn/) · [学脉是什么](https://helplearn.cn/what-is-xuemai/) · [下载 Windows 版](https://helplearn.cn/download/) · [领域工作台](https://helplearn.cn/domains/)

[HelpLearn Skill](https://github.com/indieshade/helplearn-skill) 可免费安装到兼容 Agent，独立于桌面端使用。

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
- `app/product-config.ts`：Windows 下载、SHA256、反馈 QQ 与桌面端授权方案的集中配置
- `public/screenshots/`：产品实机截图

Indie Shade Product · Created by 影下独作
