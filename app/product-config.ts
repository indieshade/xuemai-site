export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: {
    version: "0.1.0-alpha.9",
    label: "Windows Alpha · 0.1.0-alpha.9",
    platform: "Windows x64",
    size: "121.38 MB",
    sha256: "79F373AE5EC7C898BE48787CCBB57CEB0D2DB81E6C64A6D4C2E6FE5BB9699BFC",
    downloadUrl:
      "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.9/Xuemai-Setup-0.1.0-alpha.9-x64.exe",
    releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.9",
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
