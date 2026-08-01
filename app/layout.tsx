import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "学脉｜把模糊的念头变成一段真正走过的学习",
  description: "学脉是一款本地优先的桌面学习软件。从一个词、一本书或一份资料开始，在对话、阅读、练习和复习中逐渐形成自己的学习脉络。",
  icons: { icon: "/xuemai-icon.png", shortcut: "/xuemai-icon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
