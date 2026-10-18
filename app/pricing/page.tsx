import type { Metadata } from "next";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "学脉免费版与价格：一个学习脉络、一个领域免费使用",
  description: "学脉 HelpLearn 免费使用 1 个学习脉络和 1 个领域，新增更多时再选择年度版或永久版。查看价格、激活方式、两台设备规则与数据归属。",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return (
    <InfoPage
      current="pricing"
      eyebrow="学脉 HelpLearn · 桌面端授权"
      title="先免费学习，需要更多空间时再升级"
      description={`${product.licensing.freeTier}${product.licensing.expansion}`}
      updated="2026 年 10 月 18 日"
    >
      <section className="info-license-banner" aria-label="桌面免费版">
        <span>桌面免费版</span>
        <strong>1 个学习脉络 + 1 个领域</strong>
        <p>用自己的问题和资料开始学习，对话、资料阅读、理解练习、概念地图和成果整理均可使用。模型费用独立计算。</p>
      </section>

      <section className="info-section" aria-labelledby="activation-options">
        <span className="info-index">授权方案</span>
        <h2 id="activation-options">新增更多脉络和领域，不限数量</h2>
        <p>{product.licensing.annualTerm}；{product.licensing.permanentTerm}；{product.licensing.deviceLimit}。两种授权解锁相同的本地桌面能力。</p>
        <div className="info-price-grid">
          {product.desktopLicenses.map((option) => (
            <article className="info-price-card" key={option.id}>
              <span>{option.name}</span>
              <strong>{option.price}</strong>
              <p>{option.term}。{option.description}</p>
              {option.isAvailable && option.purchaseUrl ? (
                <a className="home-button-primary" href={option.purchaseUrl} target="_blank" rel="noreferrer">购买{option.name} <span aria-hidden="true">↗</span></a>
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
          <li><strong>选择桌面端授权</strong><span>{product.licensing.annualTerm}，{product.licensing.permanentTerm}；{product.licensing.deviceLimit}。</span></li>
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
