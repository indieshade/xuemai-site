import { windowsRelease } from "./windows-release";

export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: windowsRelease,
  licensing: {
    annualTerm: "年度版从首次激活起计算 365 天",
    permanentTerm: "永久版提供桌面端永久使用",
    desktopOnly: "年度版与永久版都只覆盖学脉桌面端授权。",
    futureServices: "未来的在线服务和云端模型点数可能独立收费，不包含在桌面端授权内。",
    independentAccess: "HelpLearn Skill、Core、CLI、MCP 与你选择的个人认知库，不会因桌面端授权到期或失效而被锁定。",
  },
  desktopLicenses: [
    {
      id: "annual",
      name: "年度版",
      price: null,
      purchaseUrl: null,
      availability: "即将开放" as const,
      isAvailable: false,
      term: "首次激活起 365 天",
      description: "适合按年度使用桌面端的人。",
    },
    {
      id: "permanent",
      name: "永久版",
      price: "¥99",
      purchaseUrl: "https://pay.ldxp.cn/item/vgxadp",
      availability: "可购买" as const,
      isAvailable: true,
      term: "桌面端永久使用",
      description: "适合准备长期使用桌面端的人。",
    },
  ],
} as const;
