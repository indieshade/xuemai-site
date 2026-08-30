export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: {
    version: "0.1.0-alpha.10",
    label: "Windows Alpha · 0.1.0-alpha.10",
    platform: "Windows x64",
    size: "121.38 MB",
    sha256: "A26522C9821D6F1CCEF37A66430A4BFF48F814D75E12A97B1024C025461C4409",
    downloadUrl:
      "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.10/Xuemai-Setup-0.1.0-alpha.10-x64.exe",
    releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.10",
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
