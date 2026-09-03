import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "更新记录与已知问题",
  description: "查看学脉 HelpLearn Windows Alpha 的当前版本、激活能力、已知问题和下一步计划。",
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
        <h2 id="released">{product.windows.version}</h2>
        <ul className="info-check-list">
          <li>Windows Alpha 安装包已更新至 {product.windows.version}。</li>
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
        <span className="info-index">当前更新方式</span>
        <h2 id="next-version">发现新版本后，由你决定是否安装</h2>
        <p>启动后会静默检查更新，并在左下角给出提示。下载在后台进行并显示进度；安装前会征求你的确认，不会自行重启。</p>
        <Link className="info-text-link" href="/download/">查看当前可下载版本 →</Link>
      </section>
    </InfoPage>
  );
}
