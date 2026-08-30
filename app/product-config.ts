import { windowsRelease } from "./windows-release";

export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: windowsRelease,
  trial: {
    days: 7,
    label: "首次启动自动获得 7 天完整体验",
    detail: "无需额外操作，体验结束后输入激活码即可继续使用。",
  },
  purchaseOptions: [
    {
      name: "30 日激活码",
      price: "¥19.9",
      purchaseUrl: "https://pay.ldxp.cn/item/b2bxj2",
      availability: "可购买" as const,
      isAvailable: true,
    },
    {
      name: "永久激活码",
      price: "¥99",
      purchaseUrl: "https://pay.ldxp.cn/item/vgxadp",
      availability: "可购买" as const,
      isAvailable: true,
    },
  ],
} as const;
