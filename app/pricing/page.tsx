import type { Metadata } from "next";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "试用与激活",
  description: "学脉 HelpLearn 首次启动自动获得 7 天完整体验。查看 30 日激活码和永久激活码的价格与授权范围。",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <InfoPage
      current="pricing"
      eyebrow="学脉 HelpLearn · 试用与激活"
      title="先用 7 天，再决定要不要继续"
      description="学脉桌面端首次启动会自动获得 7 天完整体验。体验期结束后，再按自己的节奏选择激活方式。"
      updated="2026 年 8 月 25 日"
    >
      <section className="info-trial-banner" aria-label="7 天完整体验">
        <span>首次启动</span>
        <strong>自动获得 7 天完整体验</strong>
        <p>无需领取试用码；同一设备重复请求不会刷新体验期限。</p>
      </section>

      <section className="info-section" aria-labelledby="activation-options">
        <span className="info-index">激活方式</span>
        <h2 id="activation-options">体验结束后，按需要购买</h2>
        <div className="info-price-grid">
          {product.purchaseOptions.map((option) => (
            <article className="info-price-card" key={option.purchaseUrl}>
              <span>{option.name}</span>
              <strong>{option.price}</strong>
              <p>{option.name === "永久激活码" ? "适合准备长期使用桌面端的人。" : "适合想继续使用一段时间的人。"}</p>
              <a className="home-button-primary" href={option.purchaseUrl} target="_blank" rel="noreferrer">前往购买 <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section" aria-labelledby="activation-flow">
        <span className="info-index">怎么激活</span>
        <h2 id="activation-flow">购买后，在桌面端输入激活码</h2>
        <ol className="info-numbered-list">
          <li><strong>启动学脉</strong><span>首次使用会直接进入 7 天完整体验。</span></li>
          <li><strong>购买对应激活码</strong><span>根据需要选择 30 日或永久激活。</span></li>
          <li><strong>输入并校验</strong><span>桌面端支持重新校验、设备解绑与移除本机凭据。</span></li>
        </ol>
      </section>

      <section className="info-section info-callout" aria-labelledby="license-boundary">
        <span className="info-index">授权范围</span>
        <h2 id="license-boundary">永久激活不是所有服务的一次买断</h2>
        <p>永久激活码覆盖学脉桌面端授权。未来的 Pro、高级能力和云端模型点数属于持续服务，会与桌面端永久授权分开提供。</p>
      </section>
    </InfoPage>
  );
}
