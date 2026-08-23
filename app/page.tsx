import Link from "next/link";
import ContactCard from "./ContactCard";
import LearningDialogue from "./LearningDialogue";
import { product } from "./product-config";
import { siteAsset } from "./site-path";

const learningSteps = [
  {
    label: "系统规划",
    title: "根据当前状态，安排下一步学什么",
    body: "从你的主题、材料和回答里判断：现在该解释、追问、阅读，还是练习。学习不必靠你一个人排进度。",
  },
  {
    label: "交互学习",
    title: "在回应里参与，而不只是看答案",
    body: "系统会在解释、阅读和练习之间切换；你每一次回答和选择，都会成为下一步互动的依据。",
  },
  {
    label: "脉络总结",
    title: "把已经形成的理解整理回来",
    body: "学习节点、摘录、练习和概念联系会逐渐沉淀成可回看的脉络，帮助你知道自己走到了哪里。",
  },
];

const productLayers = [
  { name: "HelpLearn Skill", detail: "学习大脑与交互指导", access: "免费开放" },
  { name: "Core · CLI · MCP", detail: "旅程、证据与概念的数据交互基础", access: "免费开放" },
  { name: "学脉桌面端", detail: "领域、资料、复习与跨 Agent 记录的集中管理", access: "激活授权" },
];

export default function Home() {
  return (
    <main>
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="学脉首页">
          <img src={siteAsset("/xuemai-icon.png")} alt="" />
          <span>学脉</span>
        </a>
        <div className="nav-links">
          <a href="#how">怎样学习</a>
          <a href="#architecture">产品架构</a>
          <a href="#download">Alpha 测试</a>
        </div>
          <a className="nav-cta" href="#download">下载测试版 <span aria-hidden="true">↓</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-pulse" />学脉 · HelpLearn｜交互式 AI 学习系统</div>
          <h1><span className="hero-title-system">交互式 AI</span><span className="hero-title-system hero-title-system-tail">学习系统，</span><span className="hero-title-promise">让每一步都留在你的学习里。</span></h1>
          <p className="hero-lead">学脉会根据你正在学的内容，持续安排解释、追问、阅读、练习和复习。领域保存长期关心的问题，领域里的多条学习旅程则把每一次推进、证据和概念联系起来。</p>
          <div className="hero-actions">
            <a className="button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows 测试版 <span aria-hidden="true">↓</span></a>
            <a className="button-secondary" href="#contact">获取激活码</a>
          </div>
          <div className="hero-notes" aria-label="产品特点">
            <span>{product.windows.label}</span><span>领域与学习旅程</span><span>免费开放组件</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="学脉学习过程示意">
          <div className="thread-map" aria-hidden="true">
            <div className="thread-line thread-line-a" /><div className="thread-line thread-line-b" />
            <div className="thread-node node-seed"><i /><small>起点</small><strong>一个模糊的念头</strong></div>
            <div className="thread-node node-read"><i /><small>正在形成</small><strong>阅读与解释</strong></div>
            <div className="thread-node node-practice"><i /><small>尝试应用</small><strong>自己的判断</strong></div>
          </div>
          <div className="app-window hero-window">
            <div className="window-bar">
              <div className="window-brand"><img src={siteAsset("/xuemai-icon.png")} alt="" /><span>学脉</span></div>
              <div className="window-stage">学习阶段 3 / 4 · 尝试应用</div>
              <div className="window-status"><i /> AI 可用</div>
            </div>
            <img className="window-screenshot" src={siteAsset("/screenshots/learning-dialogue.png")} alt="学脉交互式学习对话界面" />
          </div>
          <div className="floating-note note-one"><small>系统正在记住</small><strong>你能把“冲突”用在新的情境里</strong></div>
          <div className="floating-note note-two"><span>✓</span><div><small>一段学习已经形成</small><strong>下次从这里继续</strong></div></div>
        </div>
      </section>

      <section className="manifesto" id="how">
        <div className="manifesto-kicker">AI 不只回答，也参与学习</div>
        <p><span className="manifesto-sentence">学脉不只是对话框。</span><br className="desktop-break" /><span className="manifesto-sentence">它会安排学习、<br className="mobile-break" />邀请回应，</span><br className="desktop-break" /><em className="manifesto-sentence">把每一步汇成<br className="mobile-break" />学习脉络。</em></p>
      </section>

      <section className="steps-section">
        <div className="section-heading"><span>系统如何陪你把学习推进下去</span><h2>系统规划下一步，<br className="desktop-break" />也总结学习脉络。</h2></div>
        <div className="steps-grid">
          {learningSteps.map((step, index) => (
            <article className="step-card" key={step.title}>
              <div className="step-index">0{index + 1}</div><span>{step.label}</span><h3>{step.title}</h3><p>{step.body}</p><div className="step-thread"><i /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-section" id="product">
        <div className="product-copy">
          <span className="section-label">交互式学习</span>
          <h2>AI 不只回答。<br className="desktop-break" />它会带你互动学习。</h2>
          <p>学脉不把学习当成单次问答。它会根据当前内容选择合适的教学动作：需要理解时解释，需要辨别时提问，需要迁移时带你练习；你的回应会继续影响后面的安排。</p>
          <ul><li><i />系统根据当前学习状态安排下一步互动</li><li><i />在对话、阅读和练习之间自然切换</li><li><i />把每一次互动沉淀进学习脉络</li></ul>
        </div>
        <div className="product-shot conversation-shot">
          <div className="shot-caption"><span>01</span> 根据当前学习状态，安排下一步互动</div>
          <img src={siteAsset("/screenshots/learning-dialogue.png")} alt="学脉学习对话截图" />
        </div>
      </section>

      <section className="product-section product-section-reverse">
        <div className="product-copy">
          <span className="section-label violet">长期认知容器</span>
          <h2>一个领域，<br className="desktop-break" />容纳多条学习旅程。</h2>
          <p>领域不是一门上完就结束的课，而是你愿意长期积累的主题。它可以包含读书、补概念、工作中的问题和新的资料；每条旅程都有自己的目标、证据、阶段总结和待复习内容。</p>
          <ul><li><i />在同一个领域里并行管理多条学习旅程</li><li><i />资料、证据和概念可以持续回到对应领域</li><li><i />从已经形成的脉络出发，继续下一次学习</li></ul>
        </div>
        <div className="product-shot compass-shot">
          <div className="shot-caption"><span>02</span> 把一段段学习放回同一条长期脉络</div>
          <img src={siteAsset("/screenshots/concept-graph.png")} alt="学脉整理学习概念与脉络的界面" />
        </div>
      </section>

      <LearningDialogue />

      <section className="engine-section" id="architecture">
        <div className="engine-heading">
          <span className="section-label">HelpLearn 0.3 产品架构</span><h2>开放学习架构，<br className="desktop-break" />和更完整的桌面体验。</h2>
          <p>HelpLearn 的 Skill、Core、CLI 和 MCP 免费开放。你可以在其他 Agent 中使用这套学习架构，并把旅程、证据和概念写入自己选择的个人认知库；学脉桌面端则把领域、学习旅程、资料、复习和跨 Agent 记录集中起来。</p>
        </div>
        <div className="engine-console">
          <div className="console-top"><span>学习架构</span><small>0.3</small></div>
          {productLayers.map((layer, index) => (
            <div className="engine-row" key={layer.name}><span className={`engine-light light-${index}`} /><strong>{layer.name}</strong><small>{layer.detail}</small><i>{layer.access}</i></div>
          ))}
          <div className="console-foot"><span>下一版本重点</span><strong>更新提醒与自动更新（计划中）</strong></div>
        </div>
      </section>

      <section className="alpha-section" id="download">
        <div className="alpha-path" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="alpha-copy">
          <span>{product.windows.label}</span><h2>下载测试版，<br className="desktop-break" />在桌面端管理你的学习。</h2>
          <p>当前版本支持输入激活码、重新校验，以及设备解绑或移除凭据。被授权状态阻断的操作会在激活成功后恢复。安装包尚未进行代码签名，Windows 可能会提示风险；请确认下载来源和 SHA256 后再安装。</p>
          <div className="alpha-actions"><a className="button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows 测试版 ↓</a><a className="button-secondary" href="#contact">获取激活码</a></div>
        </div>
        <aside className="alpha-aside">
          <div className="alpha-meta"><div><span>版本</span><strong>{product.windows.version}</strong></div><div><span>平台</span><strong>{product.windows.platform}</strong></div><div><span>大小</span><strong>{product.windows.size}</strong></div></div>
          <ContactCard />
        </aside>
      </section>

      <footer>
        <div className="footer-brand"><img src={siteAsset("/xuemai-icon.png")} alt="" /><div><strong>学脉 · HelpLearn</strong><span>Indie Shade Product · Created by 影下独作</span></div></div>
        <p>把一个模糊的念头，变成一段真正走过的学习。<Link href="/interactive-ai-learning-system/">了解交互式 AI 学习系统 →</Link></p><span>© 2026 影下独作</span>
      </footer>
    </main>
  );
}
