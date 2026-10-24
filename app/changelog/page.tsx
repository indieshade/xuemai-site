import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "../InfoPage";
import { product } from "../product-config";

export const metadata: Metadata = {
  title: "学脉更新记录：Windows 版改动、已知问题与安装说明",
  description: "查看学脉 HelpLearn Windows 桌面端的版本改动、已知问题、下载校验方式，以及后续更新安排。",
  alternates: { canonical: "/changelog/" },
};

export default function ChangelogPage() {
  return (
    <InfoPage
      current="docs"
      eyebrow="学脉 HelpLearn · 更新记录"
      title="版本、已知问题和接下来的安排"
      description="这里记录已经发布的变化，也把尚未上线的计划单独写清楚。"
      updated={product.windows.releasedOn}
    >
      <section className="info-release" aria-labelledby="current-release">
        <div><span>当前版本</span><h2 id="current-release">{product.windows.label}</h2></div>
        <a className="home-button-primary" href={product.windows.releaseUrl} target="_blank" rel="noreferrer">查看 GitHub Release <span aria-hidden="true">↗</span></a>
      </section>

      <section className="info-section" aria-labelledby="released">
        <span className="info-index">已发布</span>
        <h2 id="released">{product.windows.version}</h2>
        <ul className="info-check-list">
          <li>{product.windows.edition}安装包已更新至 {product.windows.version}。</li>
          <li>免费持续使用 1 个学习脉络和 1 个领域，新增更多时再选择年度版或永久版；模型费用独立计算。</li>
          <li>正文旁以小图标和数字提示新增概念与关系，悬停查看关系小图和完整说明；和思考入口共用窄栏，减少正文中的重复信息。</li>
          <li>区分本轮新增与已有概念复用，无法确认新增归属的旧记录明确显示为本轮涉及；概念预览保留自己的表达依据。</li>
          <li>领域对话补齐联网按钮，与普通学习对话共用搜索、网页阅读和引用原文入口。</li>
          <li>普通回答与后台记录分开处理，减少有效回答被误报为格式错误；记录或地图修改失败仍明确提示。</li>
          <li>支持在模型菜单调整适用模型的思考开关和档位；取消固定回复字数、句数和段数限制，讲解与口播按当前任务展开。</li>
        </ul>
      </section>

      <section className="info-section" aria-labelledby="known-issues">
        <span className="info-index">已知情况</span>
        <h2 id="known-issues">安装时可能看到 Windows 风险提示</h2>
        <p>当前安装包尚未进行代码签名。请从官网或 GitHub Release 下载，并在安装前核对 SHA256。其他使用问题可以通过 QQ 2590930875 或官网微信入口反馈。</p>
        <p>语音听写首次使用需下载本地模型；英文、专名和数字可能识别有误，请发送前校对。模型整理和理解记录也不代表已经掌握。</p>
      </section>

      <section className="info-section info-callout" aria-labelledby="next-version">
        <span className="info-index">当前更新方式</span>
        <h2 id="next-version">发现新版本后，由你决定是否安装</h2>
        <p>可以在桌面端设置中检查新版本，或从官网下载页获取安装包。安装前请保存当前工作并备份重要资料。</p>
        <Link className="info-text-link" href="/download/">查看当前可下载版本 →</Link>
      </section>
    </InfoPage>
  );
}
