import type { Metadata } from "next";
import "./globals.css";
import { siteAsset, siteUrl } from "./site-path";

const siteDescription =
  "学脉（HelpLearn）是一款交互式 AI 学习系统：用领域和学习旅程管理长期学习，通过开放的 Skill、Core、CLI、MCP 与桌面端持续整理学习脉络。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "学脉 HelpLearn｜交互式 AI 学习系统",
    template: "%s｜学脉 HelpLearn",
  },
  description: siteDescription,
  applicationName: "学脉 HelpLearn",
  category: "教育软件",
  alternates: { canonical: "/" },
  icons: { icon: siteAsset("/xuemai-icon.png"), shortcut: siteAsset("/xuemai-icon.png") },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "学脉 HelpLearn",
    title: "学脉 HelpLearn｜交互式 AI 学习系统",
    description: siteDescription,
    images: [{ url: siteAsset("/og.png"), width: 1731, height: 909, alt: "学脉交互式学习脉络示意" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "学脉 HelpLearn｜交互式 AI 学习系统",
    description: siteDescription,
    images: [siteAsset("/og.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "HelpLearn",
  alternateName: "学脉",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Windows",
  inLanguage: "zh-CN",
  url: siteUrl,
  description: siteDescription,
  softwareVersion: "0.1.0-alpha.5",
  publisher: {
    "@type": "Organization",
    name: "Indie Shade",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
        />
      </body>
    </html>
  );
}
