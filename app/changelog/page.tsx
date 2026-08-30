import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "更新记录与已知问题",
  description: "查看学脉 HelpLearn Windows Alpha 的当前版本、体验与激活能力、已知问题和下一步计划。",
  alternates: { canonical: "/changelog/" },
};

export default function ChangelogPage() {
  return (
    <InfoPage
      current="docs"
      eyebrow="学脉 HelpLearn · 更新记录"
      title="版本、已知问题和接下来的安排"
      description="这里记录已经发布的变化，也把尚未上线的计划单独写清楚。"
      updated="2026 年 8 月 30 日"
    >
      <section className="info-release" aria-labelledby="current-release">
        <div><span>当前版本</span><h2 id="current-release">Windows Alpha · {product.windows.version}</h2></div>
        <a className="home-button-primary" href={product.windows.releaseUrl} target="_blank" rel="noreferrer">查看 GitHub Release <span aria-hidden="true">↗</span></a>
      </section>

      <section className="info-section" aria-labelledby="released">
        <span className="info-index">已发布</span>
        <h2 id="released">0.1.0-alpha.9</h2>
        <ul className="info-check-list">
          <li>Windows Alpha 安装包更新至 0.1.0-alpha.9。</li>
          <li>首次启动自动领取 7 天完整桌面体验；同一设备重复请求不会刷新期限。</li>
          <li>支持输入激活码、重新校验、设备解绑与移除本机凭据。</li>
          <li>被授权拦住的操作，会在激活成功后恢复。</li>
        </ul>
      </section>

      <section className="info-section" aria-labelledby="known-issues">
        <span className="info-index">已知情况</span>
        <h2 id="known-issues">安装时可能看到 Windows 风险提示</h2>
        <p>当前安装包尚未进行代码签名。请从官网或 GitHub Release 下载，并在安装前核对 SHA256。其他使用问题可以通过 QQ 2590930875 或官网微信入口反馈。</p>
      </section>

      <section className="info-section info-callout" aria-labelledby="next-version">
        <span className="info-index">计划中</span>
        <h2 id="next-version">下一版本重点：更新提醒与自动更新</h2>
        <p>这是一项计划，不是当前已上线能力。现在请自行关注本页或 GitHub Release 获取新版本。</p>
        <Link className="info-text-link" href="/download/">查看当前可下载版本 →</Link>
      </section>
    </InfoPage>
  );
}
