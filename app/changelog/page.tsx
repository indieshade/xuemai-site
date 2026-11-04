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

      <section className="info-section" aria-labelledby="monthly-launch">
        <span className="info-index">2026 年 11 月 4 日 · 授权更新</span><h2 id="monthly-launch">新增 ¥9.9／30 天版</h2>
        <p>首次激活起 30 天，一个激活码绑定 1 台设备，不自动续费。年度版与永久版继续提供；三种方案解锁相同的本地桌面能力，模型费用独立。当前 0.5.1 已支持这种期限授权。</p>
      </section>

      <section className="info-section" aria-labelledby="released">
        <span className="info-index">已发布</span>
        <h2 id="released">{product.windows.version}</h2>
        <ul className="info-check-list">
          <li>{product.windows.edition}安装包已更新至 {product.windows.version}。</li>
          <li>免费持续使用 1 个学习脉络和 1 个领域，新增更多时再选择年度版或永久版；模型费用独立计算。</li>
          <li>价值罗盘先展示可持续探索的知识方向与简短学习价值；选中后再看长期命题、知识范围、案例和起步方式，区分学科方向与内部切口。</li>
          <li>重新推荐时从原始选择和本人表达出发，保留旧探索记录；继续讨论某条建议时仍带入对应上下文。</li>
          <li>罗盘对话补齐提交后的处理状态，并沿用学习对话的消息、输入和错误恢复交互。</li>
          <li>有效的澄清回复不必附带新问题或推荐，也能正常展示、保存和恢复，避免被误报为回答失败。</li>
          <li>推荐呈现前使用局部草稿校对，只修有具体依据的原文片段，允许正确内容原样保留，不更换方向名称或领域、脉络归属。</li>
          <li>校对超时、失败或修改无效时，保留已生成的推荐并明确提示校对未完成，不把有效产出整体标为失败。</li>
          <li>增加文字版本、位置与小规模演算的只读核对。复杂示例仍可能漏检，推荐和校对结果不代表事实认证或用户已经理解。</li>
        </ul>
      </section>

      <section className="info-section" aria-labelledby="release-050">
        <span className="info-index">此前更新</span>
        <h2 id="release-050">0.5.0 · 价值罗盘</h2>
        <ul className="info-check-list">
          <li>兴趣罗盘升级为“价值罗盘”，保留“查看推荐”和“说说想法”两个入口；可以按学科、分支或跨学科主题逐步寻找方向。</li>
          <li>方向可以继续已有脉络、在领域内开始，或保存到领域的待探索；开始学习时完整带入原问题、案例与起点。</li>
          <li>返回、切换候选或重启后保留已保存、已开始的关联；继续原脉络不再重新提交首轮教学。</li>
          <li>统计示例增加计数核对，区分已观察结果、未知结果、事件频次与去重人数比例；暂时超时在剩余预算内补试一次。</li>
        </ul>
      </section>

      <section className="info-section" aria-labelledby="release-044">
        <span className="info-index">此前更新</span>
        <h2 id="release-044">0.4.4 · 地图与成果导图</h2>
        <ul className="info-check-list">
          <li>关系图只保留一个关闭叉号，取消聚焦改为全景图标；理解练习入口与地图工具栏分别留出空间，避免遮挡。</li>
          <li>学习成果导图的加减按钮改为居中的矢量图标，展开、收起状态更清楚，按钮颜色不再受连线样式影响。</li>
          <li>学习成果导图支持拖动空白处移动视图，保留滚轮和方向键操作；新增“定位当前条目”，移远后可快速返回。</li>
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
