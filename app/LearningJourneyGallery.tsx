import ProductScreenshot from "./ProductScreenshot";

const views = [
  {
    id: "dialogue",
    label: "对话",
    note: "从“如何坚持写作”开始，区分行动习惯与作品效果。",
    image: "/screenshots/learning-journey-dialogue.png",
    alt: "学脉桌面端的学习对话界面，围绕写作习惯、反馈与复盘展开讨论；内容为演示样例。",
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
    image: "/screenshots/learning-journey-concepts.png",
    alt: "学脉桌面端的分层概念关系图，展示一个概念与相邻概念和资料来源的连接。",
  },
  {
    id: "records",
    label: "资料与记录",
    note: "读过的资料、留下的判断和待继续的问题，都可以回头核对。",
    image: "/screenshots/learning-journey-records.png",
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
            <ProductScreenshot alt={view.alt} src={view.image} />
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
