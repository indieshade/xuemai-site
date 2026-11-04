"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { product } from "./product-config";
import LicenseOptions from "./LicenseOptions";
import Link from "next/link";
import { siteAsset } from "./site-path";

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
  const [copied, setCopied] = useState<"qq" | null>(null);
  const [failed, setFailed] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);

  useEffect(() => {
    if (!wechatOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setWechatOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [wechatOpen]);

  const handleCopy = async (kind: "qq", value: string) => {
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
      <span className="contact-kicker">解锁更多学习空间</span>
      <h3>多个方向，一起学下去</h3>
      <p>不限学习脉络与领域数量，三档功能相同。</p>
      <LicenseOptions />
      <p className="purchase-note">不自动续费 · 自备 AI 引擎，模型费用另计</p>
      <Link className="info-text-link" href="/pricing/">激活与授权说明 →</Link>
      <details className="purchase-details">
        <summary>购买或使用遇到问题？</summary>
      <button className="contact-copy" type="button" onClick={() => handleCopy("qq", product.feedbackQQ)}>
        <span><small>QQ</small>{product.feedbackQQ}</span>
        <strong>{copied === "qq" ? "已复制 ✓" : failed ? "请手动复制" : "复制号码"}</strong>
      </button>
      <button className="contact-wechat" type="button" onClick={() => setWechatOpen(true)} aria-haspopup="dialog" aria-expanded={wechatOpen}>
        <span><small>微信</small>添加微信咨询</span>
        <strong>查看二维码 ↗</strong>
      </button>
      <div className="contact-feedback" role="status" aria-live="polite">
        {copied === "qq"
          ? "已复制到剪贴板，现在可以打开 QQ 添加好友。"
          : failed
            ? "浏览器未允许自动复制，请选中号码手动复制。"
            : ""}
      </div>
      </details>
      {wechatOpen && typeof document !== "undefined" ? createPortal(
        <div className="contact-modal" role="presentation">
          <button className="contact-modal-backdrop" type="button" aria-label="关闭微信二维码" onClick={() => setWechatOpen(false)} />
          <section className="contact-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="wechat-dialog-title">
            <button className="contact-modal-close" type="button" aria-label="关闭微信二维码" onClick={() => setWechatOpen(false)}>×</button>
            <span>微信咨询</span>
            <h3 id="wechat-dialog-title">扫码添加影下独作</h3>
            <img src={siteAsset("/contact/wechat-qr.jpg")} alt="影下独作的微信二维码" />
            <p>微信扫一扫，添加我为好友。</p>
          </section>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
