import type { Metadata } from "next";
import "./globals.css";
import "./home.css";
import { product } from "./product-config";
import { siteAsset, siteUrl } from "./site-path";

const siteDescription =
  "学脉（HelpLearn）是一套 AI 交互学习系统，把你围绕资料、书和问题展开的讨论整理成可以继续的学习旅程，并放回自己的领域里。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "学脉 HelpLearn｜AI 交互学习系统",
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
    title: "学脉 HelpLearn｜AI 交互学习系统",
    description: siteDescription,
    images: [{ url: siteAsset("/og.png"), width: 1731, height: 909, alt: "学脉交互式学习脉络示意" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "学脉 HelpLearn｜AI 交互学习系统",
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
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software`,
  name: "HelpLearn",
  alternateName: "学脉",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Windows",
  inLanguage: "zh-CN",
  url: siteUrl,
  description: siteDescription,
  softwareVersion: product.windows.version,
  downloadUrl: product.windows.downloadUrl,
  publisher: { "@id": `${siteUrl}/#organization` },
  offers: product.purchaseOptions.map((option) => ({
    "@type": "Offer",
    name: option.name,
    price: option.price.replace("¥", ""),
    priceCurrency: "CNY",
    availability: "https://schema.org/InStock",
    url: option.purchaseUrl,
  })),
};

const siteSchemas = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "影下独作",
      alternateName: "Indie Shade",
      url: siteUrl,
      logo: `${siteUrl}/xuemai-icon.png`,
      sameAs: ["https://github.com/indieshade", "https://github.com/indieshade/helplearn-skill"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "学脉 HelpLearn",
      alternateName: ["学脉", "HelpLearn"],
      url: siteUrl,
      inLanguage: "zh-CN",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    softwareApplication,
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchemas) }}
        />
      </body>
    </html>
  );
}
