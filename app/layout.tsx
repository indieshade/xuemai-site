import type { Metadata } from "next";
import "./globals.css";
import { siteAsset, siteUrl } from "./site-path";

const siteDescription =
  "学脉是一款本地优先的交互式 AI 学习系统。它根据你的材料与回答，规划解释、追问、练习和复习，并持续整理学习脉络。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "学脉｜交互式 AI 学习系统",
    template: "%s｜学脉",
  },
  description: siteDescription,
  applicationName: "学脉",
  category: "教育软件",
  alternates: { canonical: "/" },
  icons: { icon: siteAsset("/xuemai-icon.png"), shortcut: siteAsset("/xuemai-icon.png") },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "学脉",
    title: "学脉｜交互式 AI 学习系统",
    description: siteDescription,
    images: [{ url: siteAsset("/og.png"), width: 1731, height: 909, alt: "学脉交互式学习脉络示意" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "学脉｜交互式 AI 学习系统",
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
  name: "学脉",
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
