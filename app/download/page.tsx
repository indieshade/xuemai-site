import type { Metadata } from "next";
import Link from "next/link";
import CopyHashButton from "../CopyHashButton";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "下载 Windows Alpha",
  description: "下载学脉 HelpLearn Windows Alpha，查看版本、SHA256、7 天完整体验和安装提示。",
  alternates: { canonical: "/download/" },
};

export default function DownloadPage() {
  return (
    <InfoPage
      current="download"
      eyebrow="学脉 HelpLearn · 下载"
      title="下载学脉 Windows Alpha"
      description="当前提供 Windows x64 测试版。首次启动会自动获得 7 天完整体验；体验结束后，输入激活码即可继续使用。"
      updated="2026 年 8 月 25 日"
    >
      <section className="info-highlight">
        <div>
          <span>{product.windows.label}</span>
          <h2>先装起来，从一段对话开始。</h2>
          <p>这是公开测试版本。安装前请确认系统平台、下载来源与校验值。</p>
        </div>
        <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows Alpha <span aria-hidden="true">↓</span></a>
      </section>

      <section className="info-section" aria-labelledby="download-details">
        <span className="info-index">文件信息</span>
        <h2 id="download-details">这次下载包含什么</h2>
        <dl className="info-spec-grid">
          <div><dt>平台</dt><dd>{product.windows.platform}</dd></div>
          <div><dt>版本</dt><dd>{product.windows.version}</dd></div>
          <div><dt>文件大小</dt><dd>{product.windows.size}</dd></div>
          <div><dt>体验</dt><dd>{product.trial.label}</dd></div>
        </dl>
        <div className="info-hash-block">
          <div><span>SHA256</span><code>{product.windows.sha256}</code></div>
          <CopyHashButton value={product.windows.sha256} />
        </div>
      </section>

      <section className="info-section" aria-labelledby="install-notes">
        <span className="info-index">安装提示</span>
        <h2 id="install-notes">Windows 可能会先拦一下</h2>
        <p>当前安装包尚未进行代码签名，因此 Windows 可能显示风险提示。请只从本页或 GitHub Release 下载，并在安装前核对 SHA256。</p>
        <p>如果系统提示阻止运行，请先确认文件名、下载地址与上方校验值一致，再按系统界面继续操作。任何不一致的文件都不要安装。</p>
      </section>

      <section className="info-section info-callout" aria-labelledby="after-trial">
        <span className="info-index">体验结束后</span>
        <h2 id="after-trial">可以继续试，也可以激活</h2>
        <p>体验期结束后，购买并输入激活码即可继续使用。可选择 30 日激活码或永久激活码；永久激活只覆盖桌面端授权，不包含未来的云端模型点数或订阅服务。</p>
        <Link className="info-text-link" href="/pricing/">查看激活方式与价格 →</Link>
      </section>
    </InfoPage>
  );
}
