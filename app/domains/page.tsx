import type { Metadata } from "next";
import Link from "next/link";
import DomainWorkspace from "../DomainWorkspace";
import { product } from "../product-config";
import SiteHeader from "../SiteHeader";

const skillUrl = "https://github.com/indieshade/helplearn-skill#readme";

export const metadata: Metadata = {
  title: "领域工作台：把多条学习旅程放回同一个问题",
  description: "学脉的领域工作台把彼此有关的学习旅程、资料和待解决的问题放在一起，方便回看联系，也方便从新问题继续。",
  alternates: { canonical: "/domains/" },
};

export default function DomainsPage() {
  return (
    <main className="domains-page">
      <SiteHeader current="domains" />

      <section className="domains-hero">
        <div>
          <span className="home-kicker">学脉 · 领域工作台</span>
          <h1>把相关的学习，放回同一个问题里。</h1>
          <p>一条旅程可以从一本书或一个问题开始，也可以在后来加入领域。领域不是课程表，它只是把彼此有关的讨论放在一起，方便你回头看，也方便从新问题继续。</p>
          <div className="home-actions">
            <a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows Alpha <span aria-hidden="true">↓</span></a>
            <Link className="home-button-secondary" href="/">返回首页</Link>
          </div>
        </div>
      </section>

      <section className="domains-showcase">
        <div className="domains-section-heading"><span>工作台示例</span><h2>一本书、一份研究和一次争论，都可以回到同一个领域。</h2></div>
        <DomainWorkspace />
      </section>

      <section className="domains-steps" aria-label="领域工作台的使用步骤">
        <article><span>01</span><h2>先开一条旅程</h2><p>从读一本书、整理一份 PDF，或是工作里冒出来的疑问开始。先聊起来，不必先把整个领域列成计划。</p></article>
        <article><span>02</span><h2>需要时放进领域</h2><p>当新的讨论和旧问题有关，把它们放进同一个领域。资料、来源和已经做出的判断仍然能找回来。</p></article>
        <article><span>03</span><h2>从枢纽对话继续</h2><p>回看几条旅程时，矛盾和遗漏会变得明显。把它写成一个新问题，就能开出下一条学习分支。</p></article>
      </section>

      <section className="domains-case">
        <div><span className="home-kicker">领域案例</span><h2>产品研究与决策，不会被一次访谈或一份问卷讲完。</h2></div>
        <p>先研究幸存者偏差，再讨论实验能说明什么，最后回到满意度与续费的矛盾。它们不是四个孤立的话题，而是同一个判断不断被补充、质疑和修正的过程。</p>
      </section>

      <section className="domains-cta">
        <div><span>{product.windows.label}</span><h2>从一段对话开始，把以后还想回看的问题放进领域。</h2><p>{product.licensing.annualTerm}；{product.licensing.permanentTerm}。</p></div>
        <div><a className="home-button-primary" href={product.windows.downloadUrl} target="_blank" rel="noreferrer">下载 Windows Alpha <span aria-hidden="true">↓</span></a><a className="home-button-secondary" href={skillUrl} target="_blank" rel="noreferrer">安装免费 Skill <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
