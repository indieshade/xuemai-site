import "./card.css";

export default function ProductCard() {
  return (
    <main className="product-card-page">
      <section className="product-name-card" id="short-video-card">
        <div className="card-ambient card-ambient-orange" />
        <div className="card-ambient card-ambient-green" />

        <header className="name-card-header">
          <div className="name-card-brand">
            <img src="/xuemai-icon.png" alt="学脉" />
            <span>INDIE SHADE PRODUCT</span>
          </div>
          <span className="name-card-version">WINDOWS ALPHA · 0.1.0</span>
        </header>

        <div className="name-card-main">
          <div className="name-card-eyebrow"><i />本地优先的桌面学习系统</div>
          <h1>学脉</h1>
          <p>
            <span>把一个模糊的念头，</span>
            <strong>变成一段真正走过的学习。</strong>
          </p>
          <div className="name-card-route" aria-hidden="true">
            <span className="card-route-line" />
            <i><small>起念</small></i>
            <i><small>理解</small></i>
            <i><small>应用</small></i>
            <i><small>脉络</small></i>
          </div>
        </div>

        <footer className="name-card-footer">
          <div>
            <span>CREATED BY</span>
            <strong>影下独作</strong>
          </div>
          <div className="name-card-contact">
            <span>ALPHA 测试</span>
            <strong>QQ 2590930875</strong>
          </div>
        </footer>
      </section>
    </main>
  );
}
