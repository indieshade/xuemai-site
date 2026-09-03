"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { product } from "./product-config";
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
  const [copied, setCopied] = useState<"qq" | "hash" | null>(null);
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
      <h3>选择桌面端授权</h3>
      <p>
        {product.licensing.annualTerm}，{product.licensing.permanentTerm}。{product.licensing.deviceLimit}。{product.licensing.desktopOnly}
      </p>
      <div className="purchase-options" aria-label="桌面端授权方案">
        {product.desktopLicenses.map((option) => (
          <div className="purchase-state" key={option.id}>
            <span>{option.price ? <small>{option.price}</small> : null}{option.name}</span>
            {option.isAvailable && option.purchaseUrl ? (
              <a href={option.purchaseUrl} target="_blank" rel="noreferrer">购买{option.name}</a>
            ) : (
              <strong>{option.availability}</strong>
            )}
          </div>
        ))}
      </div>
      <p className="contact-license-boundary">{product.licensing.futureServices} {product.licensing.independentAccess}</p>
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
            : "激活、使用反馈和版本通知可通过 QQ 或微信联系。"}
      </div>
      <div className="download-hash">
        <span>SHA256</span>
        <code>{product.windows.sha256}</code>
        <button type="button" onClick={() => handleCopy("hash", product.windows.sha256)}>
          {copied === "hash" ? "已复制 ✓" : "复制校验值"}
        </button>
      </div>
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
