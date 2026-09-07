import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { siteAsset, siteUrl } from "../site-path";

const title = "怎样用 AI 学一本书或一份 PDF？";
const description = "从一本书、一份 PDF 或一段材料开始，学脉把连续对话、资料来源、概念和待继续的问题放进同一条学习旅程。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/learn-from-materials/" },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: "zh-CN",
  datePublished: "2026-09-07",
  dateModified: "2026-09-07",
  mainEntityOfPage: `${siteUrl}/learn-from-materials/`,
  author: { "@type": "Organization", name: "影下独作", url: siteUrl },
  publisher: { "@type": "Organization", name: "影下独作", url: siteUrl },
};

export default function LearnFromMaterialsPage() {
  return (
    <>
      <InfoPage
        current="docs"
        eyebrow="学脉 HelpLearn · 学习方法"
        title="怎样用 AI 学一本书或一份 PDF？"
        description="从一段看不懂的话、一个不服气的判断，或者一份工作资料开始。别急着一轮问完，下一次讨论能接上前一次更重要。"
        updated="2026 年 9 月 7 日"
      >
        <section className="info-section" aria-labelledby="start-heading">
          <span className="info-index">起点</span>
          <h2 id="start-heading">别先把材料变成摘要，先找一个值得继续问的地方</h2>
          <p>一本书或一份 PDF 里，真正会留下来的通常不是全部内容，而是某个让你停下来的句子。可以问它在说什么，也可以问作者为什么这样判断，或者把它换到你的工作里试一试。</p>
          <p>学脉从这个问题开始记录。材料不是一次上传后就被遗忘的附件，它会留在对应的学习旅程里，方便回到原文核对。</p>
        </section>

        <section className="info-section" aria-labelledby="process-heading">
          <span className="info-index">一条旅程</span>
          <h2 id="process-heading">读、问、改主意，再从新问题继续</h2>
          <ol className="info-numbered-list">
            <li><strong>指认一个具体位置</strong><span>不要问“帮我总结这本书”。先指出一段材料，或者说清楚你卡在哪个概念上。</span></li>
            <li><strong>让回答经得起追问</strong><span>要求举例、找反例或解释前提。你改了看法时，新的判断也会留在原来的学习脉络里。</span></li>
            <li><strong>把未完成的问题留下来</strong><span>有些问题不是一轮对话能回答。标记它，下次打开时就能从这里接着读和讨论。</span></li>
          </ol>
        </section>

        <section className="info-section" aria-labelledby="dialogue-heading">
          <span className="info-index">真实界面</span>
          <h2 id="dialogue-heading">材料、对话与当前问题留在一起</h2>
          <p>下面这段对话从《Rules of Play》的迭代设计展开。学习者没有停在“第二章讲了什么”，而是继续问这套方法为什么必须放进制作过程检验。</p>
          <figure className="info-screenshot">
            <img src={siteAsset("/screenshots/learning-journey-dialogue.png")} alt="学脉桌面端围绕 Rules of Play 学习材料展开讨论的界面" loading="lazy" decoding="async" />
            <figcaption>材料中的原文、当下的讨论和下一步输入在同一条学习旅程中。</figcaption>
          </figure>
        </section>

        <section className="info-callout" aria-labelledby="map-heading">
          <div>
            <span>读到后面再回看</span>
            <h2 id="map-heading">一份材料会带出多个概念，它们应该能找回来。</h2>
            <p>当一个概念在不同讨论里反复出现，学习地图会把它们连起来。你可以回到来源，看看这个判断当时是怎么形成的。</p>
          </div>
          <Link className="home-button-primary" href="/learning-map/">查看学习地图 →</Link>
        </section>
      </InfoPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}
