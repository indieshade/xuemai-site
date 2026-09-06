import { siteAsset } from "./site-path";

const slides = [
  {
    id: "dialogue",
    label: "对话",
    eyebrow: "从问题继续",
    image: "/screenshots/domain-workspace-rc3-safe.png",
    alt: "学脉领域工作台的对话视图，展示同一领域内的学习脉络和持续追问。",
    description: "从一个具体问题开始，在同一条学习脉络里继续讨论。",
  },
  {
    id: "map",
    label: "认知地图",
    eyebrow: "看见概念关系",
    image: "/screenshots/domain-cognitive-map.png",
    alt: "学脉领域工作台的认知地图视图，展示概念节点、关系和概念证据。",
    description: "把概念、它们之间的关系和仍待验证的问题放在一起。",
  },
  {
    id: "records",
    label: "领域记录",
    eyebrow: "回到跨旅程记录",
    image: "/screenshots/domain-records.png",
    alt: "学脉领域工作台的领域记录视图，展示跨学习旅程的综合记录和待继续追问的内容。",
    description: "回看跨旅程的判断、依据和下一步要继续追问的地方。",
  },
] as const;

type DomainWorkspaceCarouselProps = {
  className?: string;
};

export default function DomainWorkspaceCarousel({ className = "" }: DomainWorkspaceCarouselProps) {
  return (
    <figure className={`domain-carousel ${className}`.trim()}>
      {slides.map((slide, index) => (
        <input
          className="domain-carousel-input"
          defaultChecked={index === 0}
          id={viewId(slide.id)}
          key={slide.id}
          name="domain-workspace-view"
          type="radio"
          value={slide.id}
        />
      ))}

      <header className="domain-carousel-header">
        <div>
          <span>领域工作台 / 视图导航</span>
          <strong>同一个领域，换一种方式看。</strong>
        </div>
        <p>
          {slides.map((slide, index) => <b data-view={slide.id} key={slide.id}>{String(index + 1).padStart(2, "0")}</b>)}
          <span>/ {String(slides.length).padStart(2, "0")}</span>
        </p>
      </header>

      <div className="domain-carousel-stage">
        {slides.map((slide) => (
          <div className="domain-carousel-slide" data-view={slide.id} key={slide.id}>
            <img
              alt={slide.alt}
              decoding="sync"
              fetchPriority="high"
              loading="eager"
              src={siteAsset(slide.image)}
            />
          </div>
        ))}
        <div className="domain-carousel-stage-nav" aria-label="图片切换">
          <label aria-label="查看上一张界面" className="domain-carousel-arrow" data-direction="previous" data-view="dialogue" htmlFor="domain-workspace-records">←</label>
          <label aria-label="查看上一张界面" className="domain-carousel-arrow" data-direction="previous" data-view="map" htmlFor="domain-workspace-dialogue">←</label>
          <label aria-label="查看上一张界面" className="domain-carousel-arrow" data-direction="previous" data-view="records" htmlFor="domain-workspace-map">←</label>
          <label aria-label="查看下一张界面" className="domain-carousel-arrow" data-direction="next" data-view="dialogue" htmlFor="domain-workspace-map">→</label>
          <label aria-label="查看下一张界面" className="domain-carousel-arrow" data-direction="next" data-view="map" htmlFor="domain-workspace-records">→</label>
          <label aria-label="查看下一张界面" className="domain-carousel-arrow" data-direction="next" data-view="records" htmlFor="domain-workspace-dialogue">→</label>
        </div>
      </div>

      <figcaption className="domain-carousel-caption">
        <div aria-label="选择领域工作台展示界面" className="domain-carousel-tabs">
          {slides.map((slide, index) => (
            <label htmlFor={viewId(slide.id)} key={slide.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{slide.label}</strong><small>{slide.eyebrow}</small></div>
              <i aria-hidden="true">↗</i>
            </label>
          ))}
        </div>
        {slides.map((slide) => (
          <p data-view={slide.id} key={slide.id}><span>正在查看</span><strong>{slide.label}</strong>{slide.description}</p>
        ))}
      </figcaption>
    </figure>
  );
}

const viewId = (slideId: (typeof slides)[number]["id"]) => `domain-workspace-${slideId}`;
