import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "./SiteHeader";

type InfoPageProps = {
  current: "download" | "pricing" | "docs";
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
};

export default function InfoPage({ current, eyebrow, title, description, updated, children }: InfoPageProps) {
  return (
    <main className="info-page">
      <SiteHeader current={current} />
      <article className="info-article">
        <header className="info-hero">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        {children}
        <footer className="info-footer">
          <span>更新于 {updated} · 学脉 HelpLearn · 影下独作</span>
          <div>
            <Link href="/privacy/">隐私说明</Link>
            <Link href="/changelog/">更新记录</Link>
            <Link href="/">返回首页</Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
