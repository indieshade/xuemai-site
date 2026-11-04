import Link from "next/link";
import ContactCard from "./ContactCard";
import DomainWorkspaceCarousel from "./DomainWorkspaceCarousel";
import LearningJourneyGallery from "./LearningJourneyGallery";
import { product } from "./product-config";
import { siteAsset } from "./site-path";
import SiteHeader from "./SiteHeader";

const skillUrl = "https://github.com/indieshade/helplearn-skill#readme";

export default function Home() {
  return (
    <main className="home-page">
      <SiteHeader />

      <section className="home-hero" id="top">
        <div>
          <span className="home-kicker">持续构建属于自己的理解</span>
          <h1>学脉：AI交互<span className="home-hero-title-line">学习系统。</span></h1>
          <p>在学脉，围绕一本书、一份资料或一个问题展开的讨论，会被整理成可以继续往下走的学习脉络。相关的脉络还能放进同一个领域，慢慢拼出你自己的理解。</p>
          <div className="home-actions">
            <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载学脉桌面端 <span aria-hidden="true">↓</span></a>
            <a className="home-button-secondary" href={skillUrl} target="_blank" rel="noreferrer">免费安装 HelpLearn Skill <span aria-hidden="true">↗</span></a>
          </div>
          <div className="home-hero-notes"><span>{product.windows.label}</span><span>1 个学习脉络 + 1 个领域免费</span><span>Skill 可单独使用</span></div>
        </div>
        <div className="home-screenshot-frame">
          <img src={siteAsset("/screenshots/learning-home.png")} alt="学脉桌面端首页，展示领域、学习旅程和复习内容" />
        </div>
      </section>

      <section className="home-section home-learning-journey" id="product">
        <div className="home-learning-journey-intro">
          <span className="home-section-label">学习脉络</span>
          <h2>围绕一个话题或资料继续学习，形成自己的认知和思考。</h2>
          <p>从读一份资料、提出一个问题开始，沿着同一条脉络不断追问、核对和修正。对话、学习地图、概念关系与资料记录会留在一起，下次可以从已经想过的地方继续。</p>
        </div>
        <LearningJourneyGallery />
      </section>

      <section className="home-section home-start">
        <div className="home-start-visual"><img src={siteAsset("/screenshots/value-compass.png")} alt="价值罗盘界面示例：选择传播学、叙事学等方向，展开长期命题与学习切口" /></div>
        <div className="home-section-copy">
          <span className="home-section-label">价值罗盘</span>
          <h2>找到值得持续探索的方向</h2>
          <p>按学科查看推荐，或说说自己的想法。先了解一个方向能带来什么，再展开知识范围、案例和起步方式。值得长期研究的命题，可以留在领域工作台，接着学下去。</p>
          <div className="home-start-flow" aria-label="学习流程">
            <div><b>01</b><div><strong>选择一个方向</strong><span>从学科与主题逐步探索，也可以直接描述困惑。</span></div></div>
            <div><b>02</b><div><strong>看看能学到什么</strong><span>概述说清学习价值，详情提供案例与起步方式。</span></div></div>
            <div><b>03</b><div><strong>回到自己的学习里</strong><span>继续已有脉络、在领域中开始，或先保存待探索。</span></div></div>
          </div>
        </div>
      </section>

      <section className="home-section home-domain-section">
        <div className="home-domain-intro">
          <div><span className="home-section-label">领域工作台</span><h2>围绕领域持续构建理解</h2></div>
          <p>理解一个领域往往要经过多次讨论。领域工作台把相关学习旅程放在一起，让你回看联系、比较冲突观点，并从新问题继续学习。</p>
        </div>
        <DomainWorkspaceCarousel />
        <div className="home-domain-action"><Link className="home-button-secondary" href="/domains/">了解领域工作台 <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="home-section home-understanding">
        <div className="home-section-heading"><span className="home-section-label">在对话中形成理解</span><h2>把一个听懂的解释，变成自己的判断</h2></div>
        <div className="home-way-grid">
          <article className="home-way-card"><span className="home-way-type">思考旁支</span><h3>值得多想一步时，再展开</h3><p>对话旁的轻提示可以打开一段独立讨论。复述、辨析或换个例子应用，都可以跳过或收起；只有主动选择带回，才回到正文。</p></article>
          <article className="home-way-card"><span className="home-way-type">概念与依据</span><h3>地图留下关系，也留下你的表达</h3><p>模型整理的知识与自己表达过的理解会区分展示。回看概念、关系和对应回答，继续补充或纠正；模型的补充不等于你已经掌握。</p></article>
        </div>
        <p>资料阅读可跳回引用页；开启联网后可以搜索、阅读网页并追溯引用。输入区支持实时语音听写，也能随时手动修改。</p>
      </section>

      <section className="home-section home-ways">
        <div className="home-section-heading"><span className="home-section-label">两种使用方式</span><h2>在桌面端管理，或从常用 Agent 里开始</h2></div>
        <div className="home-way-grid">
          <article className="home-way-card">
            <span className="home-way-type">学脉桌面端</span>
            <h3>把学习放在一起管理</h3>
            <p>集中管理学习旅程、领域、资料和个人认知库，也可以按自己的习惯选择 AI 引擎。</p>
            <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 {product.windows.edition} <span aria-hidden="true">↓</span></a>
          </article>
          <article className="home-way-card">
            <span className="home-way-type">HelpLearn Skill</span>
            <h3>把学习方法带进 Agent</h3>
            <p>免费安装到 Codex、Claude 等兼容 Agent，离开桌面端也能使用这套学习方式。</p>
            <code>npx skills add indieshade/helplearn-skill --skill helplearn -g</code>
            <a className="home-button-secondary" href={skillUrl} target="_blank" rel="noreferrer">查看安装说明 <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section className="home-final" id="pricing">
        <div className="home-final-copy">
          <span className="home-section-label">你的资料</span>
          <h2>资料放在哪里，由你决定</h2>
          <p>学习记录默认保存在你指定的本地文件夹，可以备份和迁移。学脉不把你的资料绑在某个模型上；即使不再使用桌面端，数据也不会因此被锁住。</p>
          <div className="home-facts"><span>本地文件夹</span><span>可备份迁移</span><span>可选择 AI 引擎</span></div>
          <Link href="/interactive-ai-learning-system/">查看产品与开放组件文档 →</Link>
        </div>
        <aside className="home-download-panel" id="download">
          <span>{product.windows.label}</span>
          <h3>先装起来，从一段对话开始。</h3>
          {product.windows.prereleaseNote ? <p className="home-prerelease-note">{product.windows.prereleaseNote}</p> : null}
          <p><strong>先免费使用一个脉络与一个领域。</strong>{product.licensing.expansion}{product.licensing.monthlyTerm}；{product.licensing.annualTerm}，{product.licensing.permanentTerm}；{product.licensing.deviceLimit}。</p>
          <div className="home-download-warning">安装包当前未进行代码签名，Windows 可能会提示风险。请确认下载来源和 SHA256 后再安装。</div>
          <div className="home-download-meta"><div><span>平台</span><strong>{product.windows.platform}</strong></div><div><span>大小</span><strong>{product.windows.size}</strong></div><div><span>版本</span><strong>{product.windows.version}</strong></div></div>
          <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 {product.windows.edition} <span aria-hidden="true">↓</span></a>
          <ContactCard />
        </aside>
      </section>

      <footer className="home-footer">
        <div className="home-footer-brand"><img src={siteAsset("/xuemai-icon.png")} alt="" /><span>学脉 · HelpLearn</span></div>
        <div className="home-footer-links"><Link href="/what-is-xuemai/">学脉是什么</Link><Link href="/learn-from-materials/">围绕资料学习</Link><Link href="/learning-map/">学习地图</Link><Link href="/privacy/">隐私说明</Link><Link href="/changelog/">更新记录</Link></div>
        <a href="https://qm.qq.com/cgi-bin/qm/qr?k=2590930875" target="_blank" rel="noreferrer">激活、反馈与版本通知：QQ {product.feedbackQQ}</a>
        <span>© 2026 影下独作</span>
      </footer>
    </main>
  );
}
