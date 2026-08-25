const journeys = [
  {
    title: "为什么幸存者偏差会误导产品决策",
    detail: "把样本、案例和没被看见的人放回同一个判断里",
    state: "待回看",
  },
  {
    title: "随机对照试验能证明什么",
    detail: "分清相关、因果，以及实验条件的边界",
    state: "讨论中",
  },
  {
    title: "基础率忽视与市场判断",
    detail: "先看总体，再判断一个信号到底有多特别",
    state: "已整理",
  },
  {
    title: "用户满意度为什么可能失真",
    detail: "把问卷分数和真实行为放在一起看",
    state: "讨论中",
  },
];

export default function DomainWorkspace() {
  return (
    <section className="domain-workspace" aria-label="产品研究与决策领域工作台示例">
      <header className="domain-workspace-topbar">
        <div className="domain-workspace-brand"><i aria-hidden="true" />学脉</div>
        <div className="domain-workspace-tabs" aria-label="工作台分区"><strong>领域</strong><span>旅程</span><span>资料</span></div>
        <span className="domain-save-state"><i aria-hidden="true" />已自动保存</span>
      </header>
      <div className="domain-workspace-body">
        <aside className="domain-sidebar">
          <span>当前领域</span>
          <h3>产品研究与决策</h3>
          <p>4 条学习旅程 · 12 份资料 · 7 个待回看问题</p>
          <div className="domain-hub-note">
            <small>枢纽对话</small>
            <strong>满意度上升，为什么续费没有跟着上升？</strong>
            <span>从这里开一条新的学习分支</span>
          </div>
        </aside>
        <div className="domain-journey-list">
          <div className="domain-list-heading">
            <div><span>学习旅程</span><h3>围绕同一个领域，接着往下问</h3></div>
            <small>按最近讨论排序</small>
          </div>
          <ol>
            {journeys.map((journey, index) => (
              <li key={journey.title}>
                <span className="domain-journey-index">0{index + 1}</span>
                <div><strong>{journey.title}</strong><span>{journey.detail}</span></div>
                <small>{journey.state}</small>
              </li>
            ))}
          </ol>
          <div className="domain-next-question"><span>正在接续</span><strong>下一次讨论，从已有判断和没解开的疑问开始。</strong></div>
        </div>
      </div>
    </section>
  );
}
