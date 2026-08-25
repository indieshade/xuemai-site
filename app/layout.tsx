import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import { siteAsset, siteUrl } from "./site-path";

const siteDescription =
  "学脉（HelpLearn）把你和 AI 围绕资料、书和问题展开的讨论，整理成可以继续的学习旅程，并放回你自己的领域里。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "学脉 HelpLearn｜让 AI 对话成为可继续的学习脉络",
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
    title: "学脉 HelpLearn｜让 AI 对话成为可继续的学习脉络",
    description: siteDescription,
    images: [{ url: siteAsset("/og.png"), width: 1731, height: 909, alt: "学脉交互式学习脉络示意" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "学脉 HelpLearn｜让 AI 对话成为可继续的学习脉络",
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
