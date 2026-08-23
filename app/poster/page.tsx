import { siteAsset } from "../site-path";

export default function Poster() {
  return (
    <main className="poster-page">
      <section className="poster-card" id="promo-card">
        <header className="poster-header">
          <div className="poster-brand"><img src={siteAsset("/xuemai-icon.png")} alt="" /><div><strong>学脉 · HelpLearn</strong><span>交互式 AI 学习系统</span></div></div>
          <span>WINDOWS ALPHA</span>
        </header>
        <div className="poster-copy">
          <span className="poster-kicker"><i />不只回答问题，也延续你的学习</span>
          <h1>把一个模糊的念头，<br /><em>变成一段真正走过的学习。</em></h1>
          <p>从一个词、一本书或一份资料开始。<br />在解释、阅读、练习和复习中，慢慢形成自己的学习脉络。</p>
        </div>
        <div className="poster-path" aria-hidden="true">
          <div className="poster-path-line" />
          <div className="poster-path-node pn-1"><i /><span>兴趣</span></div><div className="poster-path-node pn-2"><i /><span>理解</span></div><div className="poster-path-node pn-3"><i /><span>应用</span></div><div className="poster-path-node pn-4"><i /><span>脉络</span></div>
        </div>
        <div className="poster-window">
          <div className="poster-window-bar"><span><img src={siteAsset("/xuemai-icon.png")} alt="" />学脉</span><small>学习阶段 3 / 4 · 尝试应用</small><i>● AI 可用</i></div>
          <img src={siteAsset("/screenshots/learning-dialogue.png")} alt="学脉学习界面" />
        </div>
        <div className="poster-features"><span>领域与学习旅程</span><span>资料伴读与摘录</span><span>个人认知库</span><span>跨 Agent 记录</span></div>
        <footer className="poster-footer"><span>Indie Shade Product · Created by 影下独作</span><strong>Alpha 测试 · QQ 2590930875</strong></footer>
      </section>
    </main>
  );
}
