import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "学脉更新记录：Windows 版改动、已知问题与安装说明",
  description: "查看学脉 HelpLearn Windows 桌面端的版本改动、已知问题、下载校验方式，以及后续更新安排。",
  alternates: { canonical: "/changelog/" },
};

export default function ChangelogPage() {
  return (
    <InfoPage
      current="docs"
      eyebrow="学脉 HelpLearn · 更新记录"
      title="版本、已知问题和接下来的安排"
      description="这里记录已经发布的变化，也把尚未上线的计划单独写清楚。"
      updated={product.windows.releasedOn}
    >
      <section className="info-release" aria-labelledby="current-release">
        <div><span>当前版本</span><h2 id="current-release">{product.windows.label}</h2></div>
        <a className="home-button-primary" href={product.windows.releaseUrl} target="_blank" rel="noreferrer">查看 GitHub Release <span aria-hidden="true">↗</span></a>
      </section>

      <section className="info-section" aria-labelledby="released">
        <span className="info-index">已发布</span>
        <h2 id="released">{product.windows.version}</h2>
        <ul className="info-check-list">
          <li>{product.windows.edition}安装包已更新至 {product.windows.version}。</li>
          <li>免费持续使用 1 个学习脉络和 1 个领域，新增更多时再选择年度版或永久版；模型费用独立计算。</li>
          <li>改善菜单遮挡、下拉选择器与按钮提示；取消升级后保留输入。</li>
          <li>修复带资料页链接的收藏、稍后复习同步及原文跳转，重启后恢复记录与阅读位置。</li>
          <li>联网工具接入 Pi，支持搜索、网页阅读与引用；改善理解反馈和概念地图纠错同步。</li>
        </ul>
      </section>

      <section className="info-section" aria-labelledby="known-issues">
        <span className="info-index">已知情况</span>
        <h2 id="known-issues">安装时可能看到 Windows 风险提示</h2>
        <p>当前安装包尚未进行代码签名。请从官网或 GitHub Release 下载，并在安装前核对 SHA256。其他使用问题可以通过 QQ 2590930875 或官网微信入口反馈。</p>
      </section>

      <section className="info-section info-callout" aria-labelledby="next-version">
        <span className="info-index">当前更新方式</span>
        <h2 id="next-version">发现新版本后，由你决定是否安装</h2>
        <p>可以在桌面端设置中检查新版本，或从官网下载页获取安装包。安装前请保存当前工作并备份重要资料。</p>
        <Link className="info-text-link" href="/download/">查看当前可下载版本 →</Link>
      </section>
    </InfoPage>
  );
}
