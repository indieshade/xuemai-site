import { siteAsset } from "./site-path";

const views = [
  {
    id: "dialogue",
    label: "对话",
    note: "围绕《Rules of Play》的一段材料继续追问，不必从头再说一遍。",
    image: "/screenshots/learning-journey-dialogue.png",
    alt: "学脉桌面端的学习对话界面，围绕 Rules of Play 中的迭代设计展开讨论。",
  },
  {
    id: "map",
    label: "学习地图",
    note: "把这条旅程里已经出现的概念、节点和线索放回一张图里。",
    image: "/screenshots/learning-journey-map.png",
    alt: "学脉桌面端的学习地图界面，展示学习脉络中的概念节点与关系。",
  },
  {
    id: "concepts",
    label: "概念关系",
    note: "从一个概念回到它的来源、相邻概念和具体使用情境。",
    image: "/screenshots/concept-graph.png",
    alt: "学脉桌面端的概念关系图，展示概念之间的连接和来源。",
  },
  {
    id: "records",
    label: "资料与记录",
    note: "读过的资料、留下的判断和待继续的问题，都可以回头核对。",
    image: "/screenshots/domain-records.png",
    alt: "学脉桌面端的资料与记录界面，展示学习过程中的综合记录。",
  },
] as const;

const inputId = (viewId: (typeof views)[number]["id"]) => `learning-journey-${viewId}`;

export default function LearningJourneyGallery() {
  return (
    <figure className="learning-journey-gallery">
      {views.map((view, index) => (
        <input
          className="learning-journey-input"
          defaultChecked={index === 0}
          id={inputId(view.id)}
          key={view.id}
          name="learning-journey-view"
          type="radio"
          value={view.id}
        />
      ))}

      <div className="learning-journey-stage">
        {views.map((view) => (
          <div className="learning-journey-slide" data-view={view.id} key={view.id}>
            <img alt={view.alt} decoding="async" loading="eager" src={siteAsset(view.image)} />
          </div>
        ))}
      </div>

      <figcaption className="learning-journey-caption">
        <div aria-label="选择学习脉络视图" className="learning-journey-tabs">
          {views.map((view, index) => (
            <label htmlFor={inputId(view.id)} key={view.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{view.label}</strong>
            </label>
          ))}
        </div>
        {views.map((view) => <p data-view={view.id} key={view.id}>{view.note}</p>)}
      </figcaption>
    </figure>
  );
}
