import type { ReactNode } from "react";

type DemoFrameProps = {
  active: "map" | "records";
  children: ReactNode;
};

function DemoFrame({ active, children }: DemoFrameProps) {
  return (
    <div className="domain-demo-frame" aria-label={active === "map" ? "领域认知地图界面演示" : "领域记录界面演示"}>
      <header className="domain-demo-topbar">
        <span className="domain-demo-brand"><i aria-hidden="true" /> 学脉</span>
        <span className="domain-demo-domain">产品研究与决策</span>
        <nav aria-label="领域视图演示">
          <span>对话</span>
          <span className={active === "map" ? "is-active" : ""}>认知地图</span>
          <span className={active === "records" ? "is-active" : ""}>领域记录</span>
        </nav>
      </header>
      {children}
    </div>
  );
}

export function DomainCognitiveMapDemo() {
  return (
    <DemoFrame active="map">
      <div className="domain-demo-map">
        <header className="domain-demo-panel-heading">
          <div><span>领域认知地图</span><h3>把判断、证据和待验证的问题放在一起</h3></div>
          <small>3 条学习脉络 · 6 个概念</small>
        </header>
        <div className="domain-demo-map-paths">
          <article>
            <span>来自访谈</span>
            <strong>幸存者偏差</strong>
            <p>只看留下的人，结论可能会偏。</p>
          </article>
          <b aria-hidden="true">→</b>
          <article className="is-current">
            <span>当前概念</span>
            <strong>样本不等于市场全貌</strong>
            <p>需要把流失、沉默和未触达的人一起算进来。</p>
          </article>
          <b aria-hidden="true">→</b>
          <article>
            <span>继续验证</span>
            <strong>补一组流失用户访谈</strong>
            <p>先确认离开的原因，再决定下一步实验。</p>
          </article>
        </div>
        <div className="domain-demo-map-inspector">
          <div><span>关系</span><strong>用户满意度 ≠ 持续使用</strong></div>
          <p>满意度问卷可以告诉你当下的感受，但还要和留存、复购等行为记录一起看。</p>
          <small>依据：用户满意度为什么可能失真 · 领域对话</small>
        </div>
      </div>
    </DemoFrame>
  );
}

export function DomainRecordsDemo() {
  return (
    <DemoFrame active="records">
      <div className="domain-demo-records">
        <section className="domain-demo-synthesis">
          <header><div><span>领域综合</span><h3>当前判断</h3></div><button type="button">整理当前理解</button></header>
          <p>产品决策不能只看愿意留下反馈的人。先确认样本覆盖了谁，再讨论实验结果能说明什么。</p>
          <ul>
            <li>满意度高，不一定意味着会继续使用。</li>
            <li>小样本的变化，需要和基础率一起看。</li>
          </ul>
          <footer><span>来自 3 条学习脉络</span><span>仍待追问：流失发生在哪一步？</span></footer>
        </section>
        <section className="domain-demo-history" aria-label="最近带回领域的学习记录">
          <header><span>最近带回领域</span><strong>旅程里的新变化</strong></header>
          <article><div><strong>幸存者偏差会如何误导产品决策？</strong><span>补充了“谁没有出现在样本里”的判断。</span></div><em>新记录 →</em></article>
          <article><div><strong>随机对照试验能证明什么</strong><span>区分相关、因果和暂时波动。</span></div><em>新记录 →</em></article>
          <article><div><strong>用户满意度为什么可能失真</strong><span>把问卷结果和行为数据放在一起看。</span></div><em>新记录 →</em></article>
        </section>
      </div>
    </DemoFrame>
  );
}
