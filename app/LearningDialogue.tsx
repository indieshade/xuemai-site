"use client";

import { useEffect, useRef, useState } from "react";

const scenes = [
  {
    eyebrow: "从一个真实困惑开始",
    title: "不是“学过了”，而是“我到底懂了吗？”",
    body: "你不必先把问题说得很完整。学脉会从一句模糊的感受开始，帮你找到值得继续追问的地方。",
  },
  {
    eyebrow: "在回应里暴露理解",
    title: "让你的判断，决定下一步怎么学",
    body: "系统不急着给结论。它先邀请你解释、辨别，再根据你的回答切换到更合适的学习动作。",
  },
  {
    eyebrow: "把过程留成脉络",
    title: "每一次卡住，也成为下一次出发的依据",
    body: "你的困惑、回答、例子和练习会被整理回来；下次打开时，不必重新从一片空白开始。",
  },
  {
    eyebrow: "这才是交互式学习",
    title: "不是多聊几句，而是走完一段学习",
    body: "答案会过去，学习留下来的脉络会继续陪你往下走。",
  },
];

type DialogueMessage = {
  phase: number;
  role: "learner" | "system" | "summary";
  label: string;
  text: string;
};

const messages: DialogueMessage[] = [
  {
    phase: 0,
    role: "learner",
    label: "你",
    text: "我总觉得自己把知识点记住了，但过两天就说不清它到底在讲什么。",
  },
  {
    phase: 0,
    role: "system",
    label: "学脉",
    text: "先不用急着记更多。试着用自己的话说说：你觉得“记住”和“理解”最大的差别是什么？",
  },
  {
    phase: 1,
    role: "learner",
    label: "你",
    text: "记住像是能复述；理解应该是换一个例子，也知道它为什么成立。",
  },
  {
    phase: 1,
    role: "system",
    label: "学脉",
    text: "很好。那我们不再重复定义，换一个新情境，看看你能不能用这个判断解释它。",
  },
  {
    phase: 2,
    role: "summary",
    label: "学习脉络 · 已更新",
    text: "你已经区分了“复述”与“迁移”。下一步：用一个自己的例子验证这个判断。",
  },
];

export default function LearningDialogue() {
  const [activeScene, setActiveScene] = useState(0);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const index = Number(visibleEntry.target.getAttribute("data-scene"));
          setActiveScene(index);
        }
      },
      { rootMargin: "-34% 0px -38% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    const currentScenes = sceneRefs.current;
    currentScenes.forEach((scene) => scene && observer.observe(scene));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="learning-demo-section" aria-labelledby="learning-demo-title">
      <div className="learning-demo-shell">
        <header className="learning-demo-header">
          <span className="section-label">一段正在发生的学习</span>
          <h2 id="learning-demo-title">往下走，看一段学习<br className="desktop-break" />怎样被真正推进。</h2>
          <p>这不是聊天记录的堆叠，而是一段会依据你的回答继续变化的学习过程。</p>
        </header>

        <div className="learning-demo-stage" aria-label="交互式学习对话示例">
          <div className="dialogue-mockup">
            <div className="dialogue-topbar">
              <div className="dialogue-product"><i /><span>学脉</span></div>
              <span>学习进行中</span>
              <div className="dialogue-live"><i />AI 正在陪学</div>
            </div>

            <div className="dialogue-context">
              <span>当前主题</span>
              <strong>理解，究竟发生在什么时候？</strong>
              <small>学习阶段 {Math.min(activeScene + 1, 3)} / 3</small>
            </div>

            <div className="dialogue-thread" aria-live="polite">
              {messages.map((message, index) => (
                <article
                  className={`dialogue-message ${message.role} ${activeScene >= message.phase ? "is-visible" : ""}`}
                  key={`${message.role}-${index}`}
                >
                  <span>{message.label}</span>
                  <p>{message.text}</p>
                </article>
              ))}
            </div>

            <div className={`dialogue-claim ${activeScene === scenes.length - 1 ? "is-visible" : ""}`}>
              <span>学习不是一串回答</span>
              <strong>交互式学习，<br className="slogan-break" />走出专属于你的学习脉络。</strong>
            </div>

            <div className="dialogue-progress" aria-hidden="true">
              {scenes.map((scene, index) => <i className={activeScene >= index ? "is-active" : ""} key={scene.title} />)}
            </div>
          </div>
        </div>

        <div className="learning-demo-story">
          {scenes.map((scene, index) => (
            <article
              className={`learning-scene ${activeScene === index ? "is-active" : ""}`}
              data-scene={index}
              key={scene.title}
              ref={(element) => { sceneRefs.current[index] = element; }}
            >
              <span>0{index + 1} · {scene.eyebrow}</span>
              <h3>{scene.title}</h3>
              <p>{scene.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
