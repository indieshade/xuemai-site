import type { Metadata } from "next";
import Link from "next/link";
import { product } from "../product-config";
import { siteAsset, siteUrl } from "../site-path";

const title = "什么是交互式 AI 学习系统？";
const description =
  "交互式 AI 学习系统会根据学习材料和学习者的回答，决定下一步该解释、追问、练习还是复习。了解学脉（HelpLearn）如何用领域与学习旅程整理学习脉络。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/interactive-ai-learning-system/" },
  openGraph: {
    type: "article",
    url: "/interactive-ai-learning-system/",
    title: `${title}｜学脉`,
    description,
    images: [{ url: siteAsset("/og.png"), width: 1731, height: 909, alt: "学脉交互式学习脉络示意" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title}｜学脉`,
    description,
    images: [siteAsset("/og.png")],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: "zh-CN",
  datePublished: "2026-08-11",
  dateModified: "2026-08-23",
  mainEntityOfPage: `${siteUrl}/interactive-ai-learning-system/`,
  author: { "@type": "Organization", name: "Indie Shade" },
  publisher: { "@type": "Organization", name: "Indie Shade", url: siteUrl },
};

const comparisonRows = [
  ["起点", "输入一个问题", "从主题、材料或一个困惑开始"],
  ["下一步", "回答当前问题", "根据回答决定解释、追问、阅读或练习"],
  ["过程", "主要是一串对话记录", "把节点、理解和卡点整理成学习脉络"],
  ["下一次打开", "需要重新交代上下文", "从已经形成的脉络继续"],
];

export default function InteractiveAiLearningSystemPage() {
  return (
    <main className="guide-page">
      <nav className="nav-shell guide-nav" aria-label="主导航">
        <Link className="brand" href="/" aria-label="学脉首页">
          <img src={siteAsset("/xuemai-icon.png")} alt="" />
          <span>学脉</span>
        </Link>
        <div className="nav-links">
          <a href="#difference">怎样不同</a>
          <a href="#process">怎样推进</a>
          <a href="#faq">常见问题</a>
        </div>
        <a className="nav-cta" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载测试版 <span aria-hidden="true">↓</span></a>
      </nav>

      <article className="guide-article">
        <header className="guide-hero">
          <div>
            <span className="guide-kicker">学脉 · HelpLearn｜产品说明</span>
            <h1>什么是交互式 AI 学习系统？</h1>
            <p>
              它不只给出一次回答。它会依据你正在读的材料、刚刚作出的判断和已经卡住的地方，决定下一步该解释、追问、举例、练习还是复习。
            </p>
          </div>
          <aside className="guide-fact" aria-label="页面要点">
            <span>一句话</span>
            <strong>让对话继续服务于学习，而不是停在一次问答。</strong>
          </aside>
        </header>

        <section className="guide-section guide-definition" aria-labelledby="definition-heading">
          <h2 id="definition-heading">交互式学习，指的是下一步会随你的回答改变</h2>
          <p>
            普通聊天工具很适合查一个概念、改一段文字或快速讨论一个想法。但学习常常不是这样结束的：你会理解一部分、误解一部分，再在一个新例子里发现自己并没有真的会用。
          </p>
          <p>
            学脉把这些回应当成学习过程的一部分。它根据当前状态安排一个合适的动作，再把已经形成的理解保留下来，让下一次学习能接着往前走。
          </p>
        </section>

        <section className="guide-section" id="difference" aria-labelledby="difference-heading">
          <span className="guide-index">01 · 对比</span>
          <h2 id="difference-heading">它和普通 AI 对话有什么不同？</h2>
          <div className="guide-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">场景</th>
                  <th scope="col">普通 AI 对话</th>
                  <th scope="col">学脉的学习过程</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([topic, chat, xuemai]) => (
                  <tr key={topic}>
                    <th scope="row">{topic}</th>
                    <td>{chat}</td>
                    <td>{xuemai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="guide-section" id="process" aria-labelledby="process-heading">
          <span className="guide-index">02 · 过程</span>
          <h2 id="process-heading">一段学习怎样被推进</h2>
          <ol className="guide-steps">
            <li>
              <strong>从一个真实起点开始</strong>
              <p>可以是一份材料、一本书、一个职业问题，或者一句还没想清楚的困惑。</p>
            </li>
            <li>
              <strong>用回应判断下一步</strong>
              <p>当你能复述但无法迁移时，系统会换例子或安排练习；当你提出新的反例，系统会沿着这个反例继续。</p>
            </li>
            <li>
              <strong>把理解写回学习脉络</strong>
              <p>已经讲清的概念、仍有疑问的地方和下一步方向会被整理下来，不必下次从一片空白重新开始。</p>
            </li>
          </ol>
        </section>

        <section className="guide-section" aria-labelledby="architecture-heading">
          <span className="guide-index">03 · 产品架构</span>
          <h2 id="architecture-heading">开放组件负责学习架构，桌面端负责把过程管理起来</h2>
          <p>
            HelpLearn Skill、Core、CLI 和 MCP 免费开放。它们让你在其他 Agent 中使用同一套学习架构，并把旅程、证据和概念写入自己选择的个人认知库。
          </p>
          <p>
            学脉桌面端是更完整的可视化管理界面：领域作为长期认知容器，领域内可放入多条学习旅程，并集中查看资料、复习和跨 Agent 记录。
          </p>
        </section>

        <section className="guide-section guide-case" aria-labelledby="case-heading">
          <div className="guide-case-copy">
            <span className="guide-index">04 · 一个学习片段</span>
            <h2 id="case-heading">从《国富论》的分工，走到“垄断怎么办”</h2>
            <p>
              在一次《国富论》学习中，学习者先用“把串行任务拆解成更高效的小任务”解释分工。系统没有重复定义，而是把这个判断接到熟练度、切换成本与工具改进上。
            </p>
            <p>
              随后问题从“分工为什么提效”走向“市场范围为什么限制分工”，再走到“政府退场后会不会出现垄断”。一段学习因此不是同一问题的反复回答，而是一条逐步展开的论证链。
            </p>
            <Link className="guide-link" href="/#how">查看产品如何辅助学习 <span aria-hidden="true">↓</span></Link>
          </div>
          <figure>
            <img src={siteAsset("/screenshots/learning-dialogue.png")} alt="学脉根据学习者回答推进《国富论》学习对话的界面" />
            <figcaption>示意界面：对话、学习目标与已经形成的理解在同一处继续。</figcaption>
          </figure>
        </section>

        <section className="guide-section guide-boundary" aria-labelledby="boundary-heading">
          <h2 id="boundary-heading">它不替你学，也不要求按固定顺序完成</h2>
          <p>
            学脉不会假装知道每个人都应按同一个顺序学习。它做的是在你已经提供的材料和回答中找到下一步：有时是解释，有时是让你自己举例，有时是把一段已经走通的理解整理回来。
          </p>
        </section>

        <section className="guide-section guide-faq" id="faq" aria-labelledby="faq-heading">
          <span className="guide-index">05 · 常见问题</span>
          <h2 id="faq-heading">使用学脉前，可能会关心的几件事</h2>
          <details>
            <summary>学脉会替我生成一整套固定课程吗？</summary>
            <p>不会。它从你的主题和材料开始，再根据过程中的回答安排下一步。学习方向可以变化，系统需要记住的是变化发生在哪里。</p>
          </details>
          <details>
            <summary>学习数据在哪里？</summary>
            <p>你可以在其他 Agent 中选择个人认知库来保存旅程、证据和概念；桌面端则集中管理领域、学习旅程、资料、复习和跨 Agent 记录。</p>
          </details>
          <details>
            <summary>现在可以下载吗？</summary>
            <p>可以。当前提供 Windows Alpha {product.windows.version}，文件大小 {product.windows.size}。它尚未进行代码签名，Windows 可能会提示风险；请从官网或 GitHub Release 下载并核对 SHA256。</p>
          </details>
          <details>
            <summary>桌面端授权包含哪些内容？</summary>
            <p>{product.licensing.annualTerm}；{product.licensing.permanentTerm}。{product.licensing.desktopOnly} {product.licensing.futureServices} {product.licensing.independentAccess}</p>
          </details>
        </section>

        <footer className="guide-footer">
          <p>最后更新：2026 年 8 月 23 日 · 学脉 HelpLearn · Indie Shade</p>
          <Link href="/">返回学脉首页 <span aria-hidden="true">↑</span></Link>
        </footer>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </main>
  );
}
