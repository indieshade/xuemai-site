"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { siteAsset } from "./site-path";

const slides = [
  {
    id: "dialogue",
    label: "对话",
    image: "/screenshots/domain-workspace-rc3-safe.png",
    alt: "学脉领域工作台的对话视图，展示同一领域内的学习脉络和持续追问。",
    description: "从一个具体问题开始，在同一条学习脉络里继续讨论。",
  },
  {
    id: "map",
    label: "认知地图",
    image: "/screenshots/domain-cognitive-map.png",
    alt: "学脉领域工作台的认知地图视图，展示概念节点、关系和概念证据。",
    description: "把概念、它们之间的关系和仍待验证的问题放在一起。",
  },
  {
    id: "records",
    label: "领域记录",
    image: "/screenshots/domain-records.png",
    alt: "学脉领域工作台的领域记录视图，展示跨学习旅程的综合记录和待继续追问的内容。",
    description: "回看跨旅程的判断、依据和下一步要继续追问的地方。",
  },
] as const;

type DomainWorkspaceCarouselProps = {
  className?: string;
};

export default function DomainWorkspaceCarousel({ className = "" }: DomainWorkspaceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const captionId = useId();
  const activeSlide = slides[activeIndex];

  function showSlide(index: number) {
    setActiveIndex((index + slides.length) % slides.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  }

  return (
    <figure className={`domain-carousel ${className}`.trim()} aria-describedby={captionId} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="domain-carousel-stage">
        <img src={siteAsset(activeSlide.image)} alt={activeSlide.alt} />
      </div>
      <figcaption id={captionId} className="domain-carousel-caption">
        <div className="domain-carousel-controls">
          <div className="domain-carousel-tabs" role="group" aria-label="选择领域工作台展示界面">
            {slides.map((slide, index) => (
              <button
                aria-pressed={index === activeIndex}
                key={slide.id}
                onClick={() => showSlide(index)}
                type="button"
              >
                {slide.label}
              </button>
            ))}
          </div>
          <div className="domain-carousel-navigation">
            <button aria-label="查看上一张界面" className="domain-carousel-arrow" onClick={() => showSlide(activeIndex - 1)} type="button">←</button>
            <span aria-live="polite">{activeIndex + 1} / {slides.length}</span>
            <button aria-label="查看下一张界面" className="domain-carousel-arrow" onClick={() => showSlide(activeIndex + 1)} type="button">→</button>
          </div>
        </div>
        <p><strong>{activeSlide.label}</strong>{activeSlide.description}</p>
      </figcaption>
    </figure>
  );
}
