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
  assert.match(html, /持续构建属于自己的理解/);
  assert.match(html, /学脉：AI交互/);
  assert.match(html, /学习系统。/);
  assert.doesNotMatch(html, /学脉：AI交互式/);
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

test("renders download, pricing, privacy, and changelog as standalone product pages", async () => {
  const download = await (await render("/download")).text();
  const pricing = await (await render("/pricing")).text();
  const privacy = await (await render("/privacy")).text();
  const changelog = await (await render("/changelog")).text();

  assert.match(download, /下载学脉 Windows Alpha/);
  assert.match(download, /460518F724CB9BFA6647B3788C1AC5D0A8F3AA8F989B4065A870908BC6E173AC/);
  assert.match(download, /尚未进行代码签名/);
  assert.match(pricing, /自动获得 7(?:<!-- -->)? 天完整体验/);
  assert.match(pricing, /¥19\.9/);
  assert.match(pricing, /¥99/);
  assert.match(pricing, /永久激活不是所有服务的一次买断/);
  assert.match(privacy, /默认写入你选择的本地文件夹/);
  assert.match(privacy, /请求会发给你选择的 AI 引擎/);
  assert.match(changelog, /0\.1\.0-alpha\.5/);
  assert.match(changelog, /更新提醒与自动更新/);
  assert.match(changelog, /这是一项计划，不是当前已上线能力/);
});

test("publishes crawl instructions and the public sitemap", async () => {
  const robots = await readOutputFile("robots.txt");
  const sitemap = await readOutputFile("sitemap.xml");
  assert.match(robots, /User-Agent: OAI-SearchBot/);
  assert.match(robots, /Sitemap: https:\/\/helplearn\.cn\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/domains\//);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/interactive-ai-learning-system\//);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/download\//);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/pricing\//);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/privacy\//);
  assert.match(sitemap, /https:\/\/helplearn\.cn\/changelog\//);
});

test("publishes brand schema and notifies IndexNow after Pages deploy", async () => {
  const layout = await readSourceFile("app/layout.tsx");
  const workflow = await readSourceFile(".github/workflows/pages.yml");
  const key = await readOutputFile("2797c545ab105d2403b1bd326352838f.txt");

  assert.match(layout, /\"@type\": \"WebSite\"/);
  assert.match(layout, /\"@type\": \"Organization\"/);
  assert.match(layout, /AI 交互学习系统/);
  assert.match(workflow, /api\.indexnow\.org\/indexnow/);
  assert.match(workflow, /needs: deploy/);
  assert.equal(key.trim(), "2797c545ab105d2403b1bd326352838f");
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
