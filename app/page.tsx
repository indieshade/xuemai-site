const learningSteps = [
  {
    label: "从模糊处开始",
    title: "一个词，也足够开始",
    body: "先进入主题，再从你的真实反应中理解兴趣、基础和方向。目标可以在学习里慢慢变清楚。",
  },
  {
    label: "保持思考",
    title: "在解释、阅读和练习之间切换",
    body: "需要理解时给出解释，需要辨别时提出问题，需要迁移时带你进入新的情境。",
  },
  {
    label: "留下脉络",
    title: "下次回来，不必重新开始",
    body: "学习节点、摘录和概念联系会逐渐形成，已经走过的路仍然可以继续。",
  },
];

const engines = ["Codex CLI", "Claude Code", "OpenCode", "Cursor Agent", "兼容模型 API"];

export default function Home() {
  return (
    <main>
      <nav className="nav-shell" aria-label="主导航">
        <a className="brand" href="#top" aria-label="学脉首页">
          <img src="/xuemai-icon.png" alt="" />
          <span>学脉</span>
        </a>
        <div className="nav-links">
          <a href="#how">怎样学习</a>
          <a href="#product">产品界面</a>
          <a href="#alpha">Alpha 测试</a>
        </div>
        <a className="nav-cta" href="#alpha">申请测试 <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-pulse" />本地优先的桌面学习系统</div>
          <h1>把一个模糊的念头，<span>变成一段真正走过的学习。</span></h1>
          <p className="hero-lead">从一个词、一本书或一份资料开始。学脉陪你解释、阅读、练习和回顾，也把沿途形成的理解慢慢整理下来。</p>
          <div className="hero-actions">
            <a className="button-primary" href="#how">看看它怎样工作 <span aria-hidden="true">↓</span></a>
            <a className="button-secondary" href="#alpha">Windows Alpha · 0.1.0-alpha.4</a>
          </div>
          <div className="hero-notes" aria-label="产品特点">
            <span>不绑定单一模型</span><span>学习数据默认保存在本机</span><span>路径会随学习变化</span>
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
              <div className="window-brand"><img src="/xuemai-icon.png" alt="" /><span>学脉</span></div>
              <div className="window-stage">学习阶段 3 / 4 · 尝试应用</div>
              <div className="window-status"><i /> AI 可用</div>
            </div>
            <img className="window-screenshot" src="/screenshots/learning-dialogue.png" alt="学脉交互式学习对话界面" />
          </div>
          <div className="floating-note note-one"><small>系统正在记住</small><strong>你能把“冲突”用在新的情境里</strong></div>
          <div className="floating-note note-two"><span>✓</span><div><small>一段学习已经形成</small><strong>下次从这里继续</strong></div></div>
        </div>
      </section>

      <section className="manifesto" id="how">
        <div className="manifesto-kicker">学习不是一问一答</div>
        <p>普通 AI 对话记住的是消息。<br />学脉想记住的是，<em>你怎样一步步形成理解。</em></p>
      </section>

      <section className="steps-section">
        <div className="section-heading"><span>一段真实学习如何发生</span><h2>你专注眼前的内容，<br />系统维护背后的脉络。</h2></div>
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
          <h2>不是给你一份课程表，<br />而是陪你把这一段走完。</h2>
          <p>学脉会根据当下内容选择合适的教学动作。解释可以停下来细看，问题可以自由回答，必要时也会出现更贴合内容的选项。</p>
          <ul><li><i />支持 PDF 与文本资料</li><li><i />保存原文和对话摘录</li><li><i />节点完成后留下可回看的学习历程</li></ul>
        </div>
        <div className="product-shot conversation-shot">
          <div className="shot-caption"><span>01</span> 在对话、阅读与练习之间自然切换</div>
          <img src="/screenshots/learning-dialogue.png" alt="学脉学习对话截图" />
        </div>
      </section>

      <section className="product-section product-section-reverse">
        <div className="product-copy">
          <span className="section-label violet">兴趣罗盘</span>
          <h2>还不知道学什么，<br />也可以先走近一点。</h2>
          <p>兴趣罗盘会从你当前在意的领域逐步缩小范围，生成三个可以立即进入的方向。它不是一次测试，也不会把这次选择当成结论。</p>
          <ul><li><i />从粗到细探索领域、行业和概念</li><li><i />由当前选择的 AI 引擎动态生成</li><li><i />保留探索记录，随时回来看看</li></ul>
        </div>
        <div className="product-shot compass-shot">
          <div className="shot-caption"><span>02</span> 从兴趣进入一段具体的学习</div>
          <img src="/screenshots/interest-compass.png" alt="学脉兴趣罗盘截图" />
        </div>
      </section>

      <section className="engine-section">
        <div className="engine-heading">
          <span className="section-label">你的学习空间</span><h2>AI 可以换，<br />走过的学习仍然留下。</h2>
          <p>连接你已经在用的本地 CLI，或直接配置兼容模型 API。模型负责生成与推理，学脉负责旅程、资料、活动和本地数据。</p>
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
          <span>Windows x64 · Alpha</span><h2>来走一段，<br />看看学习会留下什么。</h2>
          <p>当前版本面向早期体验者。安装包尚未进行商业签名，也暂时没有自动更新。</p>
          <div className="alpha-actions"><a className="button-primary" href="tencent://message/?uin=2590930875">联系测试 ↗</a><code>反馈 QQ · 2590930875</code></div>
        </div>
        <div className="alpha-meta"><div><span>版本</span><strong>0.1.0-alpha.4</strong></div><div><span>平台</span><strong>Windows x64</strong></div><div><span>数据</span><strong>本地优先</strong></div></div>
      </section>

      <footer>
        <div className="footer-brand"><img src="/xuemai-icon.png" alt="" /><div><strong>学脉</strong><span>Indie Shade Product · Created by 影下独作</span></div></div>
        <p>把一个模糊的念头，变成一段真正走过的学习。</p><span>© 2026 影下独作</span>
      </footer>
    </main>
  );
}
