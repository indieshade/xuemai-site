import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import LicenseOptions from "../LicenseOptions";

export const metadata: Metadata = {
  title: "学脉免费版与价格：一个学习脉络、一个领域免费使用",
  description: "免费持续使用 1 个学习脉络和 1 个领域。更多学习空间：30 天版 9.9 元、年度版 68 元、永久版 199 元。自备 AI 引擎，模型费用另计。",
  alternates: { canonical: "/pricing/" },
};

export default function PricingPage() {
  return <InfoPage current="pricing" eyebrow="学脉 · 价格" title="让值得学的方向，都有自己的空间" description="免费开始，需要更多学习脉络和领域时再升级。" updated="2026 年 11 月 4 日">
    <section className="info-license-banner" aria-label="桌面免费版">
      <span>免费持续使用</span><strong>1 个学习脉络 + 1 个领域</strong>
      <p>对话、资料阅读、思考旁支、概念地图与成果整理，都能使用。</p>
      <Link className="info-text-link" href="/download/">先下载体验 →</Link>
    </section>
    <section className="info-section" aria-labelledby="activation-options">
      <h2 id="activation-options">更多脉络与领域，不限数量</h2>
      <p>三档功能相同，按你的学习节奏选择。</p>
      <LicenseOptions />
      <p className="purchase-note">不自动续费 · 自备 API 或兼容 Agent，模型费用另计</p>
    </section>
    <section className="info-section purchase-faq" aria-label="购买与使用说明">
      <h2>购买前，你可能想知道</h2>
      <details><summary>购买后怎么使用？</summary><p>购买后获取激活码，在桌面端设置中激活。30 天版与年度版从首次成功激活起计时，未激活不会扣天数。</p></details>
      <details><summary>激活码能用在几台设备上？</summary><p>30 天版限 1 台设备；年度版与永久版支持同一购买者激活 2 台设备。可在桌面端管理设备解绑。</p></details>
      <details><summary>授权包含 AI 模型费用吗？</summary><p>不包含。授权解锁本地桌面能力，需连接自己的 API 或兼容 Agent；模型费用由对应服务收取，不包含云服务。</p></details>
      <details><summary>到期后，学习记录还能用吗？</summary><p>已有内容可继续学习、阅读、整理、导出和备份。需要新增超出免费额度的脉络或领域时，再激活新码。多个激活码不叠加时长，建议到期后再激活。</p></details>
      <details><summary>不使用桌面端，也能用 HelpLearn 吗？</summary><p>可以。HelpLearn Skill 可免费安装到兼容 Agent；独立使用 Skill、Core、CLI 与 MCP 不限制领域和脉络数量。</p></details>
    </section>
  </InfoPage>;
}
