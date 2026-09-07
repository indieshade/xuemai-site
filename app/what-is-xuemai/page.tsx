import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { siteUrl } from "../site-path";

const title = "学脉是什么？";
const description = "学脉（HelpLearn）是一套 AI 交互学习系统，把围绕书、PDF 和问题展开的对话整理成可继续的学习旅程，并放回自己的领域。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/what-is-xuemai/" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: "zh-CN",
  datePublished: "2026-09-07",
  dateModified: "2026-09-07",
  mainEntityOfPage: `${siteUrl}/what-is-xuemai/`,
  author: { "@type": "Organization", name: "影下独作", url: siteUrl },
  publisher: { "@type": "Organization", name: "影下独作", url: siteUrl },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "学脉和普通 AI 聊天有什么不同？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "普通 AI 聊天适合回答眼前的问题。学脉会把讨论过的材料、概念、判断和待继续的问题留在一条学习旅程里，下一次可以从已有内容继续。",
      },
    },
    {
      "@type": "Question",
      name: "学脉的数据放在哪里？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "学习记录默认保存在用户指定的本地文件夹，可备份和迁移。使用 AI 服务时，完成该次请求所需的内容会发送给用户选择的 AI 服务商。",
      },
    },
  ],
};

export default function WhatIsXuemaiPage() {
  return (
    <>
      <InfoPage
        current="docs"
        eyebrow="学脉 HelpLearn · 产品说明"
        title="学脉是什么？"
        description="学脉（HelpLearn）是一套 AI 交互学习系统。它把围绕一本书、一份 PDF 或一个问题的讨论整理成学习旅程，让你下次能从已经想过的地方继续。"
        updated="2026 年 9 月 7 日"
      >
        <section className="info-section" aria-labelledby="journey-heading">
          <span className="info-index">从对话开始</span>
          <h2 id="journey-heading">一次对话可以变成一条学习旅程</h2>
          <p>读材料时，问题常常会变。先是“这句话是什么意思”，接着是“这个观点凭什么成立”，最后又回到“它能不能解释我手头的事”。学脉把这些变化留在同一条旅程里。</p>
          <p>旅程里有对话、资料、概念关系和需要回头看的地方。它们不是一份自动生成的课程表，而是你已经走过的学习过程。</p>
        </section>

        <section className="info-section" aria-labelledby="workspace-heading">
          <span className="info-index">长期整理</span>
          <h2 id="workspace-heading">相关旅程可以放进同一个领域</h2>
          <p>一本书讲不完一个领域。你可能从产品研究里的幸存者偏差开始，后来又读到实验设计和市场判断。领域工作台把这些旅程放在一起，方便比较、补充，或者从旧问题接着问。</p>
          <Link className="info-text-link" href="/domains/">查看领域工作台的具体样子 →</Link>
        </section>

        <section className="info-section" aria-labelledby="ways-heading">
          <span className="info-index">两种使用方式</span>
          <h2 id="ways-heading">可以用桌面端管理，也可以先在 Agent 里开始</h2>
          <ol className="info-numbered-list">
            <li><strong>学脉桌面端</strong><span>集中管理领域、学习旅程、资料、复习和跨 Agent 记录。适合希望长期保存与回看学习过程的人。</span></li>
            <li><strong>HelpLearn Skill</strong><span>免费安装到兼容 Agent，在对话里使用同一套学习方法；不使用桌面端也可以开始。</span></li>
          </ol>
        </section>

        <section className="info-section info-faq" aria-labelledby="faq-heading">
          <span className="info-index">常见问题</span>
          <h2 id="faq-heading">先弄清这几件事</h2>
          <details>
            <summary>学脉和普通 AI 聊天有什么不同？</summary>
            <p>普通 AI 聊天适合回答眼前的问题。学脉会把讨论过的材料、概念、判断和待继续的问题留在一条学习旅程里，下一次可以从已有内容继续。</p>
          </details>
          <details>
            <summary>学脉的数据放在哪里？</summary>
            <p>学习记录默认保存在你指定的本地文件夹，可以备份和迁移。使用 AI 服务时，完成该次请求所需的内容会发送给你选择的 AI 服务商。</p>
          </details>
        </section>

        <section className="info-callout" aria-labelledby="start-heading">
          <div>
            <span>从实际材料开始</span>
            <h2 id="start-heading">先拿一本书、一份 PDF 或一个正在想的问题来试。</h2>
            <p>不需要先列完整计划。材料里的一个难点，已经足够开始一条学习旅程。</p>
          </div>
          <Link className="home-button-primary" href="/learn-from-materials/">看怎样围绕资料学习 →</Link>
        </section>
      </InfoPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
