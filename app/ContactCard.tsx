"use client";

import { useState } from "react";

const CONTACT_QQ = "2590930875";

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
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  const handleCopy = async () => {
    try {
      await copyText(CONTACT_QQ);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2600);
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div className="contact-card" id="contact">
      <span className="contact-kicker">申请体验 · 交流反馈</span>
      <h3>添加作者 QQ</h3>
      <p>当前不开放在线下载。添加时备注“学脉测试”，我会把测试方式和注意事项发给你。</p>
      <button className="contact-copy" type="button" onClick={handleCopy}>
        <span><small>QQ</small>{CONTACT_QQ}</span>
        <strong>{status === "copied" ? "已复制 ✓" : status === "failed" ? "请手动复制" : "复制号码"}</strong>
      </button>
      <div className="contact-feedback" role="status" aria-live="polite">
        {status === "copied"
          ? "已复制到剪贴板，现在可以打开 QQ 添加好友。"
          : status === "failed"
            ? "浏览器未允许自动复制，请选中号码手动复制。"
            : "版本通知和测试交流目前都通过 QQ。"}
      </div>
    </div>
  );
}
