export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: {
    version: "0.1.0-alpha.5",
    label: "Windows Alpha · 0.1.0-alpha.5",
    platform: "Windows x64",
    size: "121.15 MB",
    sha256: "460518F724CB9BFA6647B3788C1AC5D0A8F3AA8F989B4065A870908BC6E173AC",
    downloadUrl:
      "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.5/Xuemai-License-Candidate-0.1.0-alpha.5-x64.exe",
    releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.5",
  },
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
