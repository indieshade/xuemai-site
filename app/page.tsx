import Link from "next/link";
import ContactCard from "./ContactCard";
import DomainWorkspace from "./DomainWorkspace";
import { product } from "./product-config";
import { siteAsset } from "./site-path";

const skillUrl = "https://github.com/indieshade/helplearn-skill#readme";

export default function Home() {
  return (
    <main className="home-page">
      <nav className="home-nav" aria-label="主导航">
        <a className="home-brand" href="#top" aria-label="学脉首页"><img src={siteAsset("/xuemai-icon.png")} alt="" /><span>学脉</span></a>
        <div className="home-nav-links">
          <a href="#product">产品</a>
          <Link href="/domains/">领域工作台</Link>
          <a href={skillUrl} target="_blank" rel="noreferrer">免费 Skill</a>
          <a href="#download">下载</a>
          <Link href="/interactive-ai-learning-system/">文档</Link>
          <a href="#pricing">定价</a>
        </div>
        <a className="home-nav-download" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载</a>
        <details className="home-mobile-menu">
          <summary>菜单</summary>
          <div><a href="#product">产品</a><Link href="/domains/">领域工作台</Link><a href={skillUrl} target="_blank" rel="noreferrer">免费 Skill</a><a href="#download">下载</a><Link href="/interactive-ai-learning-system/">文档</Link><a href="#pricing">定价</a></div>
        </details>
      </nav>

      <section className="home-hero" id="top">
        <div>
          <span className="home-kicker">学脉 · HelpLearn</span>
          <h1>和 AI 聊过的东西，别让它散掉</h1>
          <p>学脉会把你围绕一本书、一份资料或一个问题展开的讨论，整理成可以继续往下走的学习脉络。相关的脉络还能放进同一个领域，慢慢拼出你自己的理解。</p>
          <div className="home-actions">
            <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载学脉桌面端 <span aria-hidden="true">↓</span></a>
            <a className="home-button-secondary" href={skillUrl} target="_blank" rel="noreferrer">免费安装 HelpLearn Skill <span aria-hidden="true">↗</span></a>
          </div>
          <div className="home-hero-notes"><span>{product.windows.label}</span><span>首次启动自动获得 7 天完整体验</span><span>Skill 可单独使用</span></div>
        </div>
        <div className="home-screenshot-frame">
          <div className="home-screenshot-bar"><strong>学脉</strong><span>学习旅程 · 对话继续中</span><span>已保存</span></div>
          <img src={siteAsset("/screenshots/learning-dialogue.png")} alt="学脉里围绕学习材料继续展开的对话和学习旅程" />
          <p className="home-screenshot-caption">一次讨论留下的问题、材料和下一步，都还在这里。</p>
        </div>
      </section>

      <section className="home-section home-continuity" id="product">
        <div className="home-section-copy">
          <span className="home-section-label">对话会留下来</span>
          <h2>对话结束了，学习还可以继续</h2>
          <p>AI 很会回答眼前的问题，但换个会话，之前的理解往往就断了。学脉会记住讨论过什么、想通了什么，还有哪些地方值得回头。再次打开时，可以接着原来的思路继续。</p>
        </div>
        <div className="continuity-line" aria-label="对话整理为学习脉络的示意">
          <div className="continuity-card"><span>刚刚聊过</span><strong>“这份调研能说明用户真的需要它吗？”</strong><p>一个问题不必在会话结束时消失。</p></div>
          <div className="continuity-arrow" aria-hidden="true">→</div>
          <div className="continuity-thread"><span>学习脉络</span><strong>产品研究与决策</strong><i aria-hidden="true" /><strong>随机对照试验能证明什么</strong></div>
        </div>
      </section>

      <section className="home-section home-start">
        <div className="home-start-visual"><img src={siteAsset("/screenshots/interest-compass.png")} alt="学脉根据一个学习想法给出继续探索的方向" /></div>
        <div className="home-section-copy">
          <span className="home-section-label">从问题开始</span>
          <h2>先聊起来，整理交给学脉</h2>
          <p>你可以从一本书、PDF、概念，或一句还说不清的想法开始。Agent 负责读、解释、追问和核对；学脉在背后整理记录、来源和关联。先把问题说出来，再决定要走到哪里。</p>
          <div className="home-start-flow" aria-label="学习流程">
            <div><b>01</b><div><strong>抛出一个起点</strong><span>书、资料、概念或工作中的疑问都可以。</span></div></div>
            <div><b>02</b><div><strong>在对话里把问题说清</strong><span>需要解释、追问或核对时，就从眼前内容继续。</span></div></div>
            <div><b>03</b><div><strong>留下以后还能接上的记录</strong><span>讨论、来源和待回看的地方会回到对应旅程。</span></div></div>
          </div>
        </div>
      </section>

      <section className="home-section home-domain-section">
        <div className="home-domain-intro">
          <div><span className="home-section-label">领域工作台</span><h2>一本书讲不完一个领域</h2></div>
          <p>理解一个领域往往要经过多次讨论。领域工作台把相关学习旅程放在一起，让你回看联系、比较冲突观点，并从新问题继续学习。</p>
        </div>
        <DomainWorkspace />
        <div className="home-domain-action"><Link className="home-button-secondary" href="/domains/">了解领域工作台 <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="home-section home-ways">
        <div className="home-section-heading"><span className="home-section-label">两种使用方式</span><h2>在桌面端管理，或从常用 Agent 里开始</h2></div>
        <div className="home-way-grid">
          <article className="home-way-card">
            <span className="home-way-type">学脉桌面端</span>
            <h3>把学习放在一起管理</h3>
            <p>集中管理学习旅程、领域、资料和个人认知库，也可以按自己的习惯选择 AI 引擎。</p>
            <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows Alpha <span aria-hidden="true">↓</span></a>
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
          <p><strong>{product.trial.label}</strong>。{product.trial.detail}</p>
          <div className="home-download-warning">安装包当前未进行代码签名，Windows 可能会提示风险。请确认下载来源和 SHA256 后再安装。</div>
          <div className="home-download-meta"><div><span>平台</span><strong>{product.windows.platform}</strong></div><div><span>大小</span><strong>{product.windows.size}</strong></div><div><span>版本</span><strong>{product.windows.version}</strong></div></div>
          <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows Alpha <span aria-hidden="true">↓</span></a>
          <ContactCard />
        </aside>
      </section>

      <footer className="home-footer">
        <div className="home-footer-brand"><img src={siteAsset("/xuemai-icon.png")} alt="" /><span>学脉 · HelpLearn</span></div>
        <a href="https://qm.qq.com/cgi-bin/qm/qr?k=2590930875" target="_blank" rel="noreferrer">激活、反馈与版本通知：QQ {product.feedbackQQ}</a>
        <span>© 2026 影下独作</span>
      </footer>
    </main>
  );
}
