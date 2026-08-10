import ContactCard from "./ContactCard";
import LearningDialogue from "./LearningDialogue";
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

const engines = ["Codex CLI", "Claude Code", "OpenCode", "Cursor Agent", "兼容模型 API"];

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
          <a href="#product">产品界面</a>
          <a href="#alpha">Alpha 测试</a>
        </div>
        <a className="nav-cta" href="#contact">联系作者 <span aria-hidden="true">↓</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-pulse" />本地优先的交互式 AI 学习系统</div>
          <h1><span className="hero-title-system">交互式 AI</span><span className="hero-title-system hero-title-system-tail">学习系统，</span><span className="hero-title-promise">陪你真正学下去。</span></h1>
          <p className="hero-lead">学脉会根据你正在学的内容，持续安排解释、追问、阅读、练习和复习。你不必独自在聊天记录、笔记与待办之间拼凑计划；系统规划下一步，也持续总结这段学习已经形成的脉络。</p>
          <div className="hero-actions">
            <a className="button-primary" href="#how">看看它怎样辅助学习 <span aria-hidden="true">↓</span></a>
            <a className="button-secondary" href="#contact">Windows Alpha · 0.1.0-alpha.5</a>
          </div>
          <div className="hero-notes" aria-label="产品特点">
            <span>系统规划下一步</span><span>交互式推进学习</span><span>持续总结学习脉络</span>
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
          <span className="section-label violet">系统规划学习的起点</span>
          <h2>还没想好学什么，<br className="desktop-break" />系统先帮你定起点。</h2>
          <p>兴趣罗盘会从你当下在意的内容逐步缩小范围，生成几个可立即进入的学习方向。它不是一次测试，而是系统为接下来一段学习做的起点规划。</p>
          <ul><li><i />从粗到细探索领域、行业和概念</li><li><i />由你选择的 AI 引擎动态生成方向</li><li><i />保留探索记录，作为下一次规划的依据</li></ul>
        </div>
        <div className="product-shot compass-shot">
          <div className="shot-caption"><span>02</span> 从兴趣出发，规划一段具体的学习</div>
          <img src={siteAsset("/screenshots/interest-compass.png")} alt="学脉兴趣罗盘截图" />
        </div>
      </section>

      <LearningDialogue />

      <section className="engine-section">
        <div className="engine-heading">
          <span className="section-label">学习脉络，始终由你保存</span><h2>AI 可以换。<br className="desktop-break" />学习脉络一直在。</h2>
          <p>你可以按自己已有的习惯连接本地 CLI 或模型 API。引擎负责生成与推理；学习的计划、节点、材料、练习和总结，始终由学脉保留在本地。</p>
        </div>
        <div className="engine-console">
          <div className="console-top"><span>AI 引擎</span><small>由你选择</small></div>
          {engines.map((engine, index) => (
            <div className="engine-row" key={engine}><span className={`engine-light light-${index}`} /><strong>{engine}</strong><small>{index === engines.length - 1 ? "直接连接" : "本地 CLI"}</small><i>{index === 1 ? "当前使用" : "可连接"}</i></div>
          ))}
          <div className="console-foot"><span>学习数据</span><strong>默认保存在本机</strong></div>
        </div>
      </section>

      <section className="alpha-section" id="alpha">
        <div className="alpha-path" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="alpha-copy">
          <span>Windows x64 · Alpha</span><h2>来走一段，看看学习会留下什么。</h2>
          <p>当前版本面向早期体验者。安装包尚未进行商业签名，也暂时没有自动更新。</p>
          <div className="alpha-actions"><a className="button-primary" href="#contact">获取测试方式 ↓</a><code>暂不开放在线下载</code></div>
        </div>
        <aside className="alpha-aside">
          <div className="alpha-meta"><div><span>版本</span><strong>0.1.0-alpha.5</strong></div><div><span>平台</span><strong>Windows x64</strong></div><div><span>数据</span><strong>本地优先</strong></div></div>
          <ContactCard />
        </aside>
      </section>

      <footer>
        <div className="footer-brand"><img src={siteAsset("/xuemai-icon.png")} alt="" /><div><strong>学脉</strong><span>Indie Shade Product · Created by 影下独作</span></div></div>
        <p>把一个模糊的念头，变成一段真正走过的学习。</p><span>© 2026 影下独作</span>
      </footer>
    </main>
  );
}
