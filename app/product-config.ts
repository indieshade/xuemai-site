import { windowsRelease } from "./windows-release";

export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: windowsRelease,
  licensing: {
    freeTier: "免费创建并持续使用 1 个学习脉络和 1 个领域，没有体验倒计时。",
    expansion: "需要新增更多学习脉络或领域时，再选择年度版或永久版。",
    annualTerm: "年度版从首次激活起计算 365 天",
    permanentTerm: "永久版永久解锁本地桌面能力",
    deviceLimit: "同一购买者可激活 2 台设备",
    desktopOnly: "年度版与永久版都只覆盖学脉桌面端授权。",
    futureServices: "未来的在线服务和云端模型点数可能独立收费，不包含在桌面端授权内。",
    independentAccess: "已有内容可继续学习、阅读、整理、导出和备份。独立使用 HelpLearn Skill、Core、CLI 与 MCP 不限制领域和脉络数量。",
  },
  desktopLicenses: [
    {
      id: "annual",
      name: "年度版",
      price: "¥68",
      purchaseUrl: "https://wzyp.cn/item/jdzmo2",
      availability: "可购买" as const,
      isAvailable: true,
      term: "首次激活起 365 天",
      description: "适合按年度使用桌面端的人。",
    },
    {
      id: "permanent",
      name: "永久版",
      price: "¥199",
      purchaseUrl: "https://wzyp.cn/item/vgxadp",
      availability: "可购买" as const,
      isAvailable: true,
      term: "永久解锁本地桌面能力",
      description: "适合准备长期使用桌面端的人。",
    },
  ],
} as const;
