import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function render(pathname = "/") {
  const relativePath = pathname === "/" ? "index.html" : path.join(pathname.slice(1), "index.html");
  const html = await readFile(path.join(projectRoot, "out", relativePath), "utf8");
  return new Response(html, { status: 200, headers: { "content-type": "text/html" } });
}

async function readOutputFile(filename) {
  return readFile(path.join(projectRoot, "out", filename), "utf8");
}

async function readSourceFile(filename) {
  return readFile(path.join(projectRoot, filename), "utf8");
}

test("renders the 学脉 landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>学脉/);
  assert.match(html, /HelpLearn/);
  assert.match(html, /AI交互式学习系统/);
  assert.match(html, /和 AI 聊过的东西，别让它散掉/);
  assert.match(html, /在学脉，围绕一本书、一份资料或一个问题展开的讨论/);
  assert.match(html, /screenshots\/learning-home\.png/);
  assert.match(html, /下载学脉桌面端/);
  assert.match(html, /免费安装 HelpLearn Skill/);
  assert.match(html, /对话结束了，学习还可以继续/);
  assert.match(html, /先聊起来，整理交给学脉/);
  assert.match(html, /围绕领域持续构建理解/);
  assert.match(html, /产品研究与决策/);
  assert.match(html, /用户满意度为什么可能失真/);
  assert.match(html, /资料放在哪里，由你决定/);
  assert.match(html, /学习脉络/);
  assert.match(html, /Windows x64/);
  assert.match(html, /Windows Alpha · 0\.1\.0-alpha\.5/);
  assert.match(html, /下载 Windows Alpha/);
  assert.match(html, /121\.15 MB/);
  assert.match(html, /460518F724CB9BFA6647B3788C1AC5D0A8F3AA8F989B4065A870908BC6E173AC/);
  assert.match(html, /github\.com\/indieshade\/xuemai-site\/releases\/download\/v0\.1\.0-alpha\.5/);
  assert.match(html, /首次启动自动获得 7(?:<!-- -->)? 天完整体验/);
  assert.match(html, /30 日激活码.*永久激活/);
  assert.doesNotMatch(html, /使用权/);
  assert.doesNotMatch(html, /14 天|试用码|alpha\.4/);
  assert.match(html, /¥19\.9/);
  assert.match(html, /¥99/);
  assert.match(html, /前往购买/);
  assert.match(html, /永久激活仅覆盖桌面端授权/);
  assert.match(html, /2590930875/);
  assert.match(html, /添加微信咨询/);
  assert.doesNotMatch(html, /<br\s*\/?\s*>/i);
  assert.doesNotMatch(html, /Core · CLI · MCP/);
  assert.doesNotMatch(html, /持续生长的认知空间|更完整的理解|核心产品能力|不会预先锁死路径/);
  assert.doesNotMatch(html, /HelpMeLearn|codex-preview|SkeletonPreview/);
});

test("renders the domain workspace page", async () => {
  const response = await render("/domains");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /把相关的学习，放回同一个问题里/);
  assert.match(html, /产品研究与决策/);
  assert.match(html, /随机对照试验能证明什么/);
  assert.match(html, /枢纽对话/);
  assert.match(html, /新问题不必另起炉灶|新的学习分支/);
  assert.match(html, /一条旅程可以从一本书或一个问题开始/);
});

test("renders the promotional poster route", async () => {
  const response = await render("/poster");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /promo-card/);
  assert.match(html, /领域与学习旅程/);
  assert.match(html, /2590930875/);
});

test("renders the short-video product card route", async () => {
  const response = await render("/card");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /short-video-card/);
  assert.match(html, /WINDOWS ALPHA/);
  assert.match(html, /0\.1\.0-ALPHA\.5/);
  assert.match(html, /2590930875/);
});

test("renders the search-ready interactive learning guide", async () => {
  const response = await render("/interactive-ai-learning-system");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /什么是交互式 AI 学习系统？/);
  assert.match(html, /开放组件负责学习架构/);
  assert.match(html, /Windows Alpha/);
  assert.match(html, /0\.1\.0-alpha\.5/);
  assert.match(html, /它和普通 AI 对话有什么不同？/);
  assert.match(html, /从《国富论》的分工，走到“垄断怎么办”/);
  assert.match(html, /SoftwareApplication/);
  assert.match(html, /https:\/\/helplearn\.cn\/og\.png/);
});

test("publishes crawl instructions and the public sitemap", async () => {
  const robots = await readOutputFile("robots.txt");
  const sitemap = await readOutputFile("sitemap.xml");
  assert.match(robots, /User-Agent: OAI-SearchBot/);
  assert.match(robots, /Sitemap: https:\/\/helplearn\.cn\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/domains\//);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/interactive-ai-learning-system\//);
});

test("centralizes verified download and purchasable activation URLs", async () => {
  const config = await readSourceFile("app/product-config.ts");
  const contactCard = await readSourceFile("app/ContactCard.tsx");
  assert.match(config, /Xuemai-License-Candidate-0\.1\.0-alpha\.5-x64\.exe/);
  assert.match(config, /https:\/\/pay\.ldxp\.cn\/item\/vgxadp/);
  assert.match(config, /https:\/\/pay\.ldxp\.cn\/item\/b2bxj2/);
  assert.match(config, /price: "¥19\.9"/);
  assert.match(config, /price: "¥99"/);
  assert.match(config, /days: 7/);
  assert.match(config, /首次启动自动获得 7 天完整体验/);
  assert.match(config, /availability: "可购买"/);
  assert.match(config, /isAvailable: true/);
  assert.match(contactCard, /contact\/wechat-qr\.jpg/);
  assert.match(contactCard, /role="dialog"/);
});
