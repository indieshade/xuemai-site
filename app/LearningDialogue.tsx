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
    id: "question-1",
    role: "learner",
    phase: 0,
    content: "如果要高效学习，先学什么比较好呢？",
  },
  {
    id: "answer-1",
    role: "mentor",
    phase: 0,
    content:
      "先从“利润最大化”入手。它贯穿微观经济学：从完全竞争到完全垄断，最优产量都绕不开同一条规则——边际收益等于边际成本。",
  },
  {
    id: "question-2",
    role: "learner",
    phase: 1,
    content: "好，那就开始教我吧。",
  },
  {
    id: "answer-2",
    role: "mentor",
    phase: 1,
    content:
      "好。我们用一个完整例子走一遍“利润最大化”：既看 MR = MC 怎样发挥作用，也把完全竞争和完全垄断的区别看清。",
  },
  {
    id: "question-3",
    role: "learner",
    phase: 2,
    content:
      "MR 和 MC 全称是什么？成本和价格都 10 元不就不亏不赚了吗？垄断的部分我还没理解清楚，能用图更直观地解释吗？",
  },
  {
    id: "answer-3",
    role: "mentor",
    phase: 2,
    content:
      "先拆开第一个问题：MR 是边际收益，MC 是边际成本。“两者相等”不是不赚不亏，而是多生产一单位时，新增收入恰好等于新增成本。接下来我们把它画到图上。",
  },
];

const phases = [0, 1, 2, 3];

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

  return (
    <section className="learning-demo-section" aria-labelledby="learning-demo-heading">
      <div className="learning-demo-shell">
        <header className="learning-demo-header">
          <span className="section-label">截自一次真实的经济学学习</span>
          <h2 id="learning-demo-heading">
            向下滚动，
            <br className="dialogue-heading-break" />
            看一段对话怎样继续。
          </h2>
          <p>每一次追问，都会决定下一步该从哪里继续。</p>
        </header>

        <div className="learning-demo-scroll">
          <div className="learning-demo-stage">
            <div className={`dialogue-mockup ${isFinal ? "is-final" : ""}`}>
              <div className="dialogue-topbar">
                <span className="dialogue-brand"><i />学脉</span>
                <span className="dialogue-status">学习进行中</span>
                <span className="dialogue-live"><i />AI 正在陪学</span>
              </div>

              <div className="dialogue-context">
                <span>当前材料</span>
                <strong>2026 金博老师经济学（1–10）解析整理</strong>
                <small>对话摘录 · 已隐去时间信息</small>
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
                      <span>{message.role === "learner" ? "你" : "学脉"}</span>
                      <p>{message.content}</p>
                    </article>
                  );
                })}
              </div>

              <div className={`dialogue-claim ${isFinal ? "is-visible" : ""}`}>
                <span>不是更多回答，而是下一步刚好接住你。</span>
                <strong>
                  交互式学习，
                  <br className="slogan-break" />
                  走出专属于你的学习脉络。
                </strong>
              </div>

              <div className="dialogue-progress" aria-hidden="true">
                {phases.map((phase) => (
                  <i className={phase <= activePhase ? "is-active" : ""} key={phase} />
                ))}
              </div>
            </div>
          </div>

          <div className="dialogue-scroll-triggers" aria-hidden="true">
            {phases.map((phase) => (
              <div
                className="dialogue-scroll-trigger"
                key={phase}
                ref={(element) => {
                  triggerRefs.current[phase] = element;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
