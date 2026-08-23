export const product = {
  chineseName: "学脉",
  internationalName: "HelpLearn",
  feedbackQQ: "2590930875",
  windows: {
    version: "0.1.0-alpha.5",
    label: "Windows Alpha · 0.1.0-alpha.5",
    platform: "Windows x64",
    size: "121.15 MB",
    sha256: "C3EA956A2F83DA22E73014B0AB34DDFF0CB89DC610F30F8E9A4AA1BF69AB14AB",
    downloadUrl:
      "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.5/Xuemai-License-Candidate-0.1.0-alpha.5-x64.exe",
    releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.5",
  },
  trial: {
    days: 7,
    label: "7 天免费试用",
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
