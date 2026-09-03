import type { Metadata } from "next";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "桌面端授权与定价",
  description: "查看学脉 HelpLearn 年度版与永久版的桌面端授权范围、购买入口与数据归属说明。",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <InfoPage
      current="pricing"
      eyebrow="学脉 HelpLearn · 桌面端授权"
      title="按使用周期选择桌面端授权"
      description="年度版从首次激活起计算 365 天；永久版提供桌面端永久使用。"
      updated="2026 年 9 月 4 日"
    >
      <section className="info-license-banner" aria-label="桌面端授权">
        <span>桌面端授权</span>
        <strong>年度版或永久版</strong>
        <p>{product.licensing.annualTerm}；{product.licensing.permanentTerm}。</p>
      </section>

      <section className="info-section" aria-labelledby="activation-options">
        <span className="info-index">授权方案</span>
        <h2 id="activation-options">按需要选择，再输入激活码</h2>
        <div className="info-price-grid">
          {product.desktopLicenses.map((option) => (
            <article className="info-price-card" key={option.id}>
              <span>{option.name}</span>
              <strong className={option.price ? undefined : "info-price-term"}>{option.price ?? option.term}</strong>
              <p>{option.price ? option.description : `${option.term}。${option.description}`}</p>
              {option.isAvailable && option.purchaseUrl ? (
                <a className="home-button-primary" href={option.purchaseUrl} target="_blank" rel="noreferrer">前往购买 <span aria-hidden="true">↗</span></a>
              ) : (
                <span className="info-price-unavailable">{option.availability}</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="info-section" aria-labelledby="activation-flow">
        <span className="info-index">怎么激活</span>
        <h2 id="activation-flow">购买后，在桌面端输入激活码</h2>
        <ol className="info-numbered-list">
          <li><strong>选择桌面端授权</strong><span>{product.licensing.annualTerm}，{product.licensing.permanentTerm}。</span></li>
          <li><strong>获取对应激活码</strong><span>在已开放的购买入口下单，或通过 QQ、微信咨询。</span></li>
          <li><strong>输入并校验</strong><span>桌面端支持重新校验、设备解绑与移除本机凭据。</span></li>
        </ol>
      </section>

      <section className="info-section info-callout" aria-labelledby="license-boundary">
        <span className="info-index">授权范围</span>
        <h2 id="license-boundary">桌面端授权和在线服务分开</h2>
        <p>{product.licensing.desktopOnly} {product.licensing.futureServices}</p>
        <p>{product.licensing.independentAccess}</p>
      </section>
    </InfoPage>
  );
}
