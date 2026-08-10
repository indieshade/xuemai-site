"use client";

import { useEffect, useRef, useState } from "react";

type DialogueMessage = {
  id: string;
  role: "learner" | "mentor";
  phase: number;
  content: string;
};

const messages: DialogueMessage[] = [
  {
    id: "division-question",
    role: "learner",
    phase: 0,
    content:
      "我认为分工主要是把串行的任务拆解为了更高效的小任务，以及识别到可以并行的任务，从而把原来串行的任务进一步提效。",
  },
  {
    id: "division-answer",
    role: "mentor",
    phase: 0,
    content:
      "你的“瓶颈拆解”和“串行转并行”抓住了两条关键机制：熟练度提升、切换成本归零。斯密还补了一条——专注一道工序的人，更容易发明改进工具。",
  },
  {
    id: "market-question",
    role: "learner",
    phase: 1,
    content:
      "所以人其实只是适应环境，做得更加专精或者更加不专精；影响这个环境的因素有很多，是这个意思吗？",
  },
  {
    id: "market-answer",
    role: "mentor",
    phase: 1,
    content:
      "方向是对的。但斯密的推论不是找一个规划者去设计分工，而是拆除关税、行会与专卖等壁垒，让交换范围扩大，分工自然深化。",
  },
  {
    id: "monopoly-question",
    role: "learner",
    phase: 2,
    content:
      "政府退场之后，市场自由发展，难道不会有垄断吗？它会不会反过来阻碍交换？斯密预测过这种情况吗？",
  },
  {
    id: "monopoly-answer",
    role: "mentor",
    phase: 2,
    content:
      "这个问题问得很准。斯密反对政府制造的特权垄断，也警惕商人合谋；他留给政府的职能是司法、反欺诈与维护竞争规则，而不是替市场定价和分配资源。",
  },
  {
    id: "mercantilism-question",
    role: "learner",
    phase: 3,
    content: "我选择：了解斯密当时反对的重商主义——对比才能看出他真正的突破。",
  },
  {
    id: "mercantilism-answer",
    role: "mentor",
    phase: 3,
    content:
      "很好。重商主义把财富等同于金银、把贸易当成零和；斯密换掉了问题：财富来自分工的产出，交换让双方把资源用到更有效率的地方。",
  },
  {
    id: "wine-question",
    role: "learner",
    phase: 4,
    content:
      "进口同等质量却更便宜的葡萄酒，等于省下生产它的劳动力，并把这些劳动力释放给更合适的生产；市场会用价格继续判断这种交换。",
  },
  {
    id: "wine-answer",
    role: "mentor",
    phase: 4,
    content:
      "你用“节省生产力”解释得很准。斯密会说，强制自给自足等于放弃不同地区的优势；价格信号不需要贸易总指挥，也会持续引导交换。",
  },
];

const phases = [
  {
    title: "分工如何提效",
    detail: "从你的“串行 → 并行”类比出发",
    objective: "辨认分工的三条提效机制",
  },
  {
    title: "市场范围的限制",
    detail: "从效率推到交换环境",
    objective: "理解为什么分工不能凭意愿发生",
  },
  {
    title: "自由与竞争的边界",
    detail: "用“垄断怎么办”压力测试斯密",
    objective: "区分特权垄断与维护竞争规则",
  },
  {
    title: "重商主义的对比",
    detail: "看斯密究竟换掉了什么问题",
    objective: "区分财富、金银与贸易的不同前提",
  },
  {
    title: "交换如何创造国富",
    detail: "用进口葡萄酒检验论证链",
    objective: "把价格、优势与资源流动连起来",
  },
  {
    title: "形成自己的论证链",
    detail: "把本轮理解沉淀为可回看的脉络",
    objective: "从对话进入下一次判断",
  },
];

export default function LearningDialogue() {
  const [activePhase, setActivePhase] = useState(0);
  const triggerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observers = triggerRefs.current.flatMap((trigger, phase) => {
      if (!trigger) return [];

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActivePhase(phase);
        },
        { threshold: 0.55 },
      );

      observer.observe(trigger);
      return [observer];
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  const completedMessages = messages.filter((message) => message.phase <= activePhase);
  const visibleStart = Math.max(0, completedMessages.length - 3);
  const isFinal = activePhase === phases.length - 1;
  const currentPhase = phases[activePhase];

  return (
    <section className="learning-demo-section" aria-labelledby="learning-demo-heading">
      <div className="learning-demo-shell">
        <header className="learning-demo-header">
          <span className="section-label">截自一次真实的《国富论》学习</span>
          <h2 id="learning-demo-heading">
            向下滚动，
            <br className="dialogue-heading-break" />
            看一段对话怎样继续。
          </h2>
          <p>不是堆叠答案，而是把你的判断接进一条正在形成的学习脉络。</p>
        </header>

        <div className="learning-demo-scroll">
          <div className="learning-demo-stage">
            <div className={`dialogue-mockup dialogue-workspace-shell ${isFinal ? "is-final" : ""}`}>
              <div className="dialogue-topbar">
                <span className="dialogue-brand"><i />学脉</span>
                <div className="dialogue-nav" aria-label="产品导航">
                  <span className="is-current">学习</span>
                  <span>脉络</span>
                  <span>资料</span>
                </div>
                <span className="dialogue-live"><i />已自动保存</span>
              </div>

              <div className="dialogue-workspace">
                <aside className="learning-sidebar" aria-label="当前学习脉络">
                  <div className="learning-sidebar-head">
                    <span>当前学习</span>
                    <strong>读懂《国富论》的核心论证</strong>
                    <small>卷一 · 分工与市场范围</small>
                  </div>

                  <div className="learning-objective">
                    <span>本轮目标</span>
                    <p>{currentPhase.objective}</p>
                  </div>

                  <ol className="learning-trail">
                    {phases.map((phase, index) => (
                      <li
                        className={index < activePhase ? "is-complete" : index === activePhase ? "is-active" : ""}
                        key={phase.title}
                      >
                        <i>{index < activePhase ? "✓" : String(index + 1).padStart(2, "0")}</i>
                        <div>
                          <strong>{phase.title}</strong>
                          <span>{phase.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <div className="learning-memory">
                    <span>已记录的理解</span>
                    <p>“串行任务拆解 + 识别可并行步骤”</p>
                  </div>
                </aside>

                <section className="conversation-pane" aria-label="学习对话摘录">
                  <header className="conversation-header">
                    <div>
                      <span>正在推进</span>
                      <strong>{currentPhase.title}</strong>
                    </div>
                    <div className="conversation-meta">
                      <span>对话摘录</span>
                      <i>{activePhase + 1} / {phases.length}</i>
                    </div>
                  </header>

                  <div className="conversation-context">
                    <span>学习材料</span>
                    <strong>《国富论》· “劳动分工受市场范围限制”</strong>
                    <small>根据你的回答调整下一步</small>
                  </div>

                  <div className="dialogue-thread" aria-live="polite">
                    {messages.map((message) => {
                      const completedIndex = completedMessages.findIndex(
                        (completedMessage) => completedMessage.id === message.id,
                      );
                      const isVisible = completedIndex >= visibleStart;
                      const isLatest = completedIndex === completedMessages.length - 1;

                      return (
                        <article
                          className={`dialogue-message dialogue-message-${message.role} ${
                            isVisible ? "is-visible" : ""
                          } ${isLatest ? "is-latest" : ""}`}
                          key={message.id}
                          aria-hidden={!isVisible}
                        >
                          <span>{message.role === "learner" ? "你" : "学脉 · 引导"}</span>
                          <p>{message.content}</p>
                        </article>
                      );
                    })}
                  </div>

                  <div className="dialogue-composer" aria-label="继续学习输入框示意">
                    <span>沿着当前学习脉络继续往下带我学习</span>
                    <kbd>Enter</kbd>
                    <i>发送</i>
                  </div>
                </section>
              </div>

              <div className={`dialogue-claim ${isFinal ? "is-visible" : ""}`}>
                <span>本轮学习已形成脉络</span>
                <p>这不是对话结束，而是下一次判断可以从这里继续。</p>
                <ul>
                  <li>分工不只拆步骤，也积累改进洞察</li>
                  <li>市场范围决定分工能走多深</li>
                  <li>交换节省生产力，也需要竞争规则</li>
                </ul>
                <strong>
                  交互式学习，
                  <br className="slogan-break" />
                  走出专属于你的学习脉络。
                </strong>
              </div>

              <div className="dialogue-progress" aria-hidden="true">
                {phases.map((phase, index) => (
                  <i className={index <= activePhase ? "is-active" : ""} key={phase.title} />
                ))}
              </div>
            </div>
          </div>

          <div className="dialogue-scroll-triggers" aria-hidden="true">
            {phases.map((phase, index) => (
              <div
                className="dialogue-scroll-trigger"
                key={phase.title}
                ref={(element) => {
                  triggerRefs.current[index] = element;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
