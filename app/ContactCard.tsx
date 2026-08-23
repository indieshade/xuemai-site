"use client";

import { useState } from "react";
import { product } from "./product-config";

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function ContactCard() {
  const [copied, setCopied] = useState<"qq" | "hash" | null>(null);
  const [failed, setFailed] = useState(false);

  const handleCopy = async (kind: "qq" | "hash", value: string) => {
    try {
      await copyText(value);
      setCopied(kind);
      setFailed(false);
      window.setTimeout(() => setCopied(null), 2600);
    } catch {
      setFailed(true);
    }
  };

  return (
    <div className="contact-card" id="contact">
      <span className="contact-kicker">激活与反馈</span>
      <h3>获取激活码</h3>
      <div className="trial-notice">
        <strong>{product.trial.label}</strong>
        <span>先下载测试版，试用后激活即可。</span>
      </div>
      <p>
        可按需要选择 30 日激活码或永久激活。购买并输入激活码后即可继续使用；永久激活仅覆盖桌面端授权。
      </p>
      <div className="purchase-options" aria-label="激活码购买状态">
        {product.purchaseOptions.map((option) => (
          <div className="purchase-state" key={option.purchaseUrl}>
            <span><small>{option.price}</small>{option.name}</span>
            {option.isAvailable ? (
              <a href={option.purchaseUrl} target="_blank" rel="noreferrer">前往购买</a>
            ) : (
              <strong>{option.availability} · 即将开放</strong>
            )}
          </div>
        ))}
      </div>
      <button className="contact-copy" type="button" onClick={() => handleCopy("qq", product.feedbackQQ)}>
        <span><small>QQ</small>{product.feedbackQQ}</span>
        <strong>{copied === "qq" ? "已复制 ✓" : failed ? "请手动复制" : "复制号码"}</strong>
      </button>
      <div className="contact-feedback" role="status" aria-live="polite">
        {copied === "qq"
          ? "已复制到剪贴板，现在可以打开 QQ 添加好友。"
          : failed
            ? "浏览器未允许自动复制，请选中号码手动复制。"
            : "激活、使用反馈和版本通知目前都通过 QQ。"}
      </div>
      <div className="download-hash">
        <span>SHA256</span>
        <code>{product.windows.sha256}</code>
        <button type="button" onClick={() => handleCopy("hash", product.windows.sha256)}>
          {copied === "hash" ? "已复制 ✓" : "复制校验值"}
        </button>
      </div>
    </div>
  );
}
