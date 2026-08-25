import Link from "next/link";
import { siteAsset } from "./site-path";

const skillUrl = "https://github.com/indieshade/helplearn-skill#readme";

type SiteSection = "domains" | "download" | "docs" | "pricing";

export default function SiteHeader({ current }: { current?: SiteSection }) {
  return (
    <nav className="home-nav" aria-label="主导航">
      <Link className="home-brand" href="/" aria-label="学脉首页"><img src={siteAsset("/xuemai-icon.png")} alt="" /><span>学脉</span></Link>
      <div className="home-nav-links">
        <Link href="/#product">产品</Link>
        <Link href="/domains/" aria-current={current === "domains" ? "page" : undefined}>领域工作台</Link>
        <a href={skillUrl} target="_blank" rel="noreferrer">免费 Skill</a>
        <Link href="/download/" aria-current={current === "download" ? "page" : undefined}>下载</Link>
        <Link href="/interactive-ai-learning-system/" aria-current={current === "docs" ? "page" : undefined}>文档</Link>
        <Link href="/pricing/" aria-current={current === "pricing" ? "page" : undefined}>定价</Link>
      </div>
      <Link className="home-nav-download" href="/download/">下载</Link>
      <details className="home-mobile-menu">
        <summary>菜单</summary>
        <div>
          <Link href="/#product">产品</Link>
          <Link href="/domains/">领域工作台</Link>
          <a href={skillUrl} target="_blank" rel="noreferrer">免费 Skill</a>
          <Link href="/download/">下载</Link>
          <Link href="/interactive-ai-learning-system/">文档</Link>
          <Link href="/pricing/">定价</Link>
        </div>
      </details>
    </nav>
  );
}
