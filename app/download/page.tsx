import type { Metadata } from "next";
import Link from "next/link";
import CopyHashButton from "../CopyHashButton";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "下载学脉 Windows 版：安装包、版本、SHA256 与安装说明",
  description: "下载学脉 HelpLearn Windows x64 版，免费持续使用一个学习脉络和一个领域。连接自己的 AI 引擎，围绕资料、书和问题开始学习。",
  alternates: { canonical: "/download/" },
};

export default function DownloadPage() {
  return <InfoPage current="download" eyebrow="学脉 · Windows 版" title="从一个问题，开始你的学习" description="1 个学习脉络 + 1 个领域，免费持续使用。" updated={product.windows.releasedOn}>
    <section className="info-highlight">
      <div><h2>下载学脉</h2><p>{product.windows.platform} · v{product.windows.version} · {product.windows.size}</p>
        {product.windows.prereleaseNote ? <p>{product.windows.prereleaseNote}</p> : null}
        {product.windows.refreshNote ? <p>{product.windows.refreshNote}</p> : null}
      </div>
      <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">免费下载 {product.windows.edition} <span aria-hidden="true">↓</span></a>
    </section>
    <p className="purchase-note">需自备 API 或兼容 Agent，模型费用另计。</p>
    <section className="info-section" aria-labelledby="start-learning"><h2 id="start-learning">装好后，这样开始</h2>
      <ol className="info-numbered-list">
        <li><strong>连接 AI 引擎</strong><span>在设置中添加自己的 API 或选择兼容 Agent。</span></li>
        <li><strong>带来一个问题或资料</strong><span>从一本书、一份笔记，或一直想弄懂的事开始。</span></li>
        <li><strong>沿着理解继续学</strong><span>对话、阅读、思考与地图，留在同一条学习脉络里。</span></li>
      </ol>
    </section>
    <section className="info-section purchase-faq" aria-label="安装与校验">
      <details><summary>Windows 提示风险，怎么办？</summary><p>安装包尚未进行代码签名，Windows 可能显示风险提示。请确认从本页或 GitHub Release 下载，并核对 SHA256；校验一致后再继续安装。</p></details>
      <details><summary>查看 SHA256 校验值</summary><div className="info-hash-block"><div><span>SHA256</span><code>{product.windows.sha256}</code></div><CopyHashButton value={product.windows.sha256} /></div></details>
    </section>
    <section className="info-section info-callout"><h2>想同时探索更多方向？</h2><p>¥9.9 起，解锁不限数量的学习脉络与领域。</p><Link className="info-text-link" href="/pricing/">查看价格与授权 →</Link></section>
  </InfoPage>;
}
