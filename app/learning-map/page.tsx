import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { siteAsset, siteUrl } from "../site-path";

const title = "学习地图和概念关系有什么用？";
const description = "学脉的学习地图把同一条学习旅程中的概念、来源、相邻问题和已有判断放在一起，帮助学习者回看关系并继续追问。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/learning-map/" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: "zh-CN",
  datePublished: "2026-09-07",
  dateModified: "2026-09-07",
  mainEntityOfPage: `${siteUrl}/learning-map/`,
  author: { "@type": "Organization", name: "影下独作", url: siteUrl },
  publisher: { "@type": "Organization", name: "影下独作", url: siteUrl },
};

export default function LearningMapPage() {
  return (
    <>
      <InfoPage
        current="docs"
        eyebrow="学脉 HelpLearn · 学习地图"
        title="学习地图和概念关系有什么用？"
        description="学习地图不是另一种待填写的思维导图。它从学习过程里长出来，把已经谈过的概念、来源和待解决的问题放在一起。"
        updated="2026 年 9 月 7 日"
      >
        <section className="info-section" aria-labelledby="map-heading">
          <span className="info-index">看关系</span>
          <h2 id="map-heading">你不必记住每一段对话，但应该找得回一个判断从哪里来</h2>
          <p>学习时很容易留下一个结论，却忘了它来自哪篇材料、哪个例子，或者哪次反驳。概念关系把这些线索接起来，让你回看时不只看见一个孤立的名词。</p>
          <p>这不等于自动替你画出一张“正确地图”。连接来自实际学习过程，仍然可以继续补充、修正或推翻。</p>
        </section>

        <section className="info-section" aria-labelledby="relationship-heading">
          <span className="info-index">点开一个概念</span>
          <h2 id="relationship-heading">通常会回到三种东西：来源、相邻概念和还没解决的问题</h2>
          <ol className="info-numbered-list">
            <li><strong>来源</strong><span>它在哪一份资料、哪段讨论里出现过？回到原文，避免只记得一个脱离上下文的结论。</span></li>
            <li><strong>相邻概念</strong><span>它和哪些概念一起出现，彼此是补充、前提，还是冲突？这往往比单独背定义更有用。</span></li>
            <li><strong>下一轮问题</strong><span>如果关系里有跳步或矛盾，就从那里继续。地图给的是入口，不是标准答案。</span></li>
          </ol>
        </section>

        <section className="info-section" aria-labelledby="constellation-heading">
          <span className="info-index">真实界面</span>
          <h2 id="constellation-heading">概念星图把一个学习片段展开</h2>
          <p>这个例子围绕《Rules of Play》中的 meaningful play 展开。右侧保留概念的解释、出现位置和相邻概念；中间的连线让学习者知道下一次该回到哪里。</p>
          <figure className="info-screenshot">
            <img src={siteAsset("/screenshots/learning-journey-concepts.png")} alt="学脉 Concept Constellation 概念关系图，以 meaningful play 为中心展示相邻概念和来源" loading="lazy" decoding="async" />
            <figcaption>概念星图：点击一个概念，可以回到它的说明、来源和相邻关系。</figcaption>
          </figure>
        </section>

        <section className="info-callout" aria-labelledby="domain-heading">
          <div>
            <span>不只是一条旅程</span>
            <h2 id="domain-heading">当多个学习问题开始互相影响，就把它们放进同一个领域。</h2>
            <p>领域工作台适合把不同资料、不同学习旅程里的关系放在一起看。它特别适合需要长期积累的问题。</p>
          </div>
          <Link className="home-button-primary" href="/domains/">了解领域工作台 →</Link>
        </section>
      </InfoPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
