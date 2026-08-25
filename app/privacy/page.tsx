import type { Metadata } from "next";
import InfoPage from "../InfoPage";

export const metadata: Metadata = {
  title: "隐私与数据说明",
  description: "了解学脉 HelpLearn 的学习记录、本地文件夹、AI 服务请求和数据迁移边界。",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      current="docs"
      eyebrow="学脉 HelpLearn · 数据说明"
      title="资料放在哪里，由你决定"
      description="学脉把学习记录放在你指定的本地文件夹。你可以备份和迁移，也可以在不再使用桌面端时继续保留这些文件。"
      updated="2026 年 8 月 25 日"
    >
      <section className="info-section" aria-labelledby="local-data">
        <span className="info-index">学习记录</span>
        <h2 id="local-data">默认写入你选择的本地文件夹</h2>
        <p>领域、学习旅程、资料索引、复习记录和跨 Agent 的相关记录，由你选择存放位置。它们不是只能在学脉里打开的封闭数据：可以自行备份、迁移和整理。</p>
      </section>

      <section className="info-section" aria-labelledby="model-boundary">
        <span className="info-index">AI 服务</span>
        <h2 id="model-boundary">请求会发给你选择的 AI 引擎</h2>
        <p>当你发起一次需要 AI 回答的学习互动时，为完成这次请求而提供的文字、资料内容或上下文，可能会被发送给你选用的 AI 服务商。不同引擎的处理规则和数据保留政策各不相同，请以对应服务商的说明为准。</p>
        <p>学脉不要求你绑定某一个模型。更换或停止使用桌面端，不会把已经保存在本地的学习记录锁住。</p>
      </section>

      <section className="info-section" aria-labelledby="api-key">
        <span className="info-index">密钥与安全</span>
        <h2 id="api-key">API Key 只应由你自己保管</h2>
        <p>如果你自行配置 AI 服务，请不要把 API Key 发给他人、写进公开截图或提交到代码仓库。需要更换密钥时，应当在对应服务商后台完成撤销和新建。</p>
      </section>

      <section className="info-section info-callout" aria-labelledby="alpha-boundary">
        <span className="info-index">测试版本</span>
        <h2 id="alpha-boundary">重要资料请保留自己的备份</h2>
        <p>当前为 Windows Alpha 测试版。我们会继续修复问题，但不把测试软件当成唯一存档位置。对你重要的学习资料，请定期复制或备份到你信任的位置。</p>
      </section>
    </InfoPage>
  );
}
