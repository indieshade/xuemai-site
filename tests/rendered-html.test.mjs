import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const release = JSON.parse(await readFile(path.join(projectRoot, "app", "windows-release.generated.json"), "utf8"));

function asLiteralPattern(value) {
  return new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
}

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
  assert.match(html, asLiteralPattern(release.label));
  assert.match(html, /下载 Windows Alpha/);
  assert.match(html, asLiteralPattern(release.size));
  assert.match(html, asLiteralPattern(release.sha256));
  assert.match(html, asLiteralPattern(release.downloadUrl));
  assert.match(html, /年度版与永久版 · 同一购买者 2 台设备/);
  assert.match(html, /年度版从首次激活起计算 365(?:<!-- -->)? 天/);
  assert.match(html, /永久版永久解锁本地桌面能力/);
  assert.match(html, /同一购买者可激活 2(?:<!-- -->)? 台设备/);
  assert.doesNotMatch(html, /使用权/);
  assert.doesNotMatch(html, /免费试用|试用期|7(?:<!-- -->)? 天|30(?:<!-- -->)? 日激活码|30日激活码|b2bxj2|Pro/);
  assert.match(html, /¥68/);
  assert.match(html, /¥199/);
  assert.match(html, /购买(?:<!-- -->)?年度版/);
  assert.match(html, /购买(?:<!-- -->)?永久版/);
  assert.match(html, /https:\/\/wzyp\.cn\/item\/jdzmo2/);
  assert.match(html, /https:\/\/wzyp\.cn\/item\/vgxadp/);
  assert.doesNotMatch(html, /¥99|pay\.ldxp\.cn|即将开放/);
  assert.match(html, /"offers":\[\{"@type":"Offer","name":"年度版","price":"68"/);
  assert.match(html, /"name":"永久版","price":"199","priceCurrency":"CNY","availability":"https:\/\/schema\.org\/InStock","url":"https:\/\/wzyp\.cn\/item\/vgxadp"/);
  assert.match(html, /年度版与永久版都只覆盖学脉桌面端授权/);
  assert.match(html, /个人认知库，不会因桌面端授权到期或失效而被锁定/);
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
  assert.match(html, asLiteralPattern(release.label.toUpperCase()));
  assert.match(html, /2590930875/);
});

test("renders the search-ready interactive learning guide", async () => {
  const response = await render("/interactive-ai-learning-system");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /什么是交互式 AI 学习系统？/);
  assert.match(html, /开放组件负责学习架构/);
  assert.match(html, /Windows Alpha/);
  assert.match(html, asLiteralPattern(release.version));
  assert.match(html, /它和普通 AI 对话有什么不同？/);
  assert.match(html, /从《国富论》的分工，走到“垄断怎么办”/);
  assert.match(html, /SoftwareApplication/);
  assert.match(html, /https:\/\/helplearn\.cn\/og\.png/);
  assert.match(html, /桌面端授权包含哪些内容/);
  assert.match(html, /年度版从首次激活起计算 365(?:<!-- -->)? 天/);
  assert.match(html, /同一购买者可激活 2(?:<!-- -->)? 台设备/);
  assert.doesNotMatch(html, /免费试用|试用期|7(?:<!-- -->)? 天|30(?:<!-- -->)? 日激活码|30日激活码|b2bxj2|Pro/);
});

test("renders download, pricing, privacy, and changelog as standalone product pages", async () => {
  const download = await (await render("/download")).text();
  const pricing = await (await render("/pricing")).text();
  const privacy = await (await render("/privacy")).text();
  const changelog = await (await render("/changelog")).text();

  assert.match(download, /下载学脉 Windows Alpha/);
  assert.match(download, asLiteralPattern(release.sha256));
  assert.match(download, /尚未进行代码签名/);
  assert.match(download, /年度版与永久版/);
  assert.match(download, /年度版从首次激活起计算 365(?:<!-- -->)? 天/);
  assert.match(download, /同一购买者可激活 2(?:<!-- -->)? 台设备/);
  assert.match(pricing, /年度版或永久版/);
  assert.match(pricing, /首次激活起 365(?:<!-- -->)? 天/);
  assert.match(pricing, /¥68/);
  assert.match(pricing, /¥199/);
  assert.match(pricing, /购买(?:<!-- -->)?年度版/);
  assert.match(pricing, /购买(?:<!-- -->)?永久版/);
  assert.match(pricing, /同一购买者可激活 2(?:<!-- -->)? 台设备/);
  assert.match(pricing, /桌面端授权和在线服务分开/);
  assert.match(pricing, /个人认知库，不会因桌面端授权到期或失效而被锁定/);
  assert.match(privacy, /默认写入你选择的本地文件夹/);
  assert.match(privacy, /请求会发给你选择的 AI 引擎/);
  assert.match(changelog, asLiteralPattern(release.version));
  assert.match(changelog, /启动后会静默检查更新/);
  assert.match(changelog, /安装前会征求你的确认/);
  assert.doesNotMatch(changelog, /下一版本重点：更新提醒与自动更新/);

  for (const html of [download, pricing, changelog]) {
    assert.doesNotMatch(html, /免费试用|试用期|7(?:<!-- -->)? 天|30(?:<!-- -->)? 日激活码|30日激活码|b2bxj2|Pro/);
  }
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

test("publishes the same verified Windows release data used by the pages", async () => {
  const publicRelease = JSON.parse(await readOutputFile("windows-release.json"));

  assert.deepEqual(publicRelease, release);
  assert.match(publicRelease.version, /^\d+\.\d+\.\d+-alpha\.\d+$/);
  assert.match(publicRelease.downloadUrl, new RegExp(`/v${publicRelease.version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`));
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
  assert.match(workflow, /release:\s+types: \[published\]/);
  assert.match(workflow, /cron: "17 \*\/6 \* \* \*"/);
  assert.equal(key.trim(), "2797c545ab105d2403b1bd326352838f");
});

test("centralizes release data and keeps download entry points free of hardcoded release URLs", async () => {
  const config = await readSourceFile("app/product-config.ts");
  const contactCard = await readSourceFile("app/ContactCard.tsx");
  const releaseModule = await readSourceFile("app/windows-release.ts");
  const entryPointFiles = [
    "app/page.tsx",
    "app/domains/page.tsx",
    "app/download/page.tsx",
    "app/changelog/page.tsx",
    "app/interactive-ai-learning-system/page.tsx",
    "app/card/page.tsx",
    "app/layout.tsx",
  ];

  assert.match(config, /import \{ windowsRelease \} from "\.\/windows-release"/);
  assert.doesNotMatch(config, /releases\/download|0\.1\.0-alpha\./);
  assert.match(releaseModule, /windows-release\.generated\.json/);
  assert.doesNotMatch(releaseModule, /github\.com\/indieshade\/xuemai-site\/releases\/download/);
  for (const file of entryPointFiles) {
    const source = await readSourceFile(file);
    assert.doesNotMatch(source, /github\.com\/indieshade\/xuemai-site\/releases\/download|Xuemai-Setup-0\.1\.0-alpha|0\.1\.0-alpha\.\d+/);
  }
  assert.match(config, /desktopLicenses/);
  assert.match(config, /id: "annual"/);
  assert.match(config, /name: "年度版"/);
  assert.match(config, /annualTerm: "年度版从首次激活起计算 365 天"/);
  assert.match(config, /deviceLimit: "同一购买者可激活 2 台设备"/);
  assert.match(config, /id: "permanent"/);
  assert.match(config, /name: "永久版"/);
  assert.match(config, /https:\/\/wzyp\.cn\/item\/jdzmo2/);
  assert.match(config, /https:\/\/wzyp\.cn\/item\/vgxadp/);
  assert.match(config, /price: "¥68"/);
  assert.match(config, /price: "¥199"/);
  assert.doesNotMatch(config, /b2bxj2|pay\.ldxp\.cn|¥99|30 日|30日|trial|7 天|Pro|即将开放/);
  assert.match(config, /availability: "可购买"/);
  assert.match(config, /isAvailable: true/);
  assert.match(contactCard, /contact\/wechat-qr\.jpg/);
  assert.match(contactCard, /role="dialog"/);
  assert.match(contactCard, /desktopLicenses/);
  assert.doesNotMatch(contactCard, /purchaseOptions|product\.trial|30 日|30日|7 天/);
});
