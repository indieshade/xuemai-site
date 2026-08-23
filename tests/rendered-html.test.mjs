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
  assert.match(html, /把一个模糊的念头/);
  assert.match(html, /交互式 AI 学习系统/);
  assert.match(html, /系统规划下一步/);
  assert.match(html, /学习脉络/);
  assert.match(html, /向下滚动，/);
  assert.match(html, /截自一次真实的《国富论》学习/);
  assert.match(html, /读懂《国富论》的核心论证/);
  assert.match(html, /已记录的理解/);
  assert.match(html, /特权垄断/);
  assert.match(html, /交互式学习，/);
  assert.match(html, /走出专属于你的学习脉络/);
  assert.match(html, /Windows x64/);
  assert.match(html, /Windows Alpha · 0\.1\.0-alpha\.5/);
  assert.match(html, /下载 Windows 测试版/);
  assert.match(html, /121\.15 MB/);
  assert.match(html, /C3EA956A2F83DA22E73014B0AB34DDFF0CB89DC610F30F8E9A4AA1BF69AB14AB/);
  assert.match(html, /github\.com\/indieshade\/xuemai-site\/releases\/download\/v0\.1\.0-alpha\.5/);
  assert.match(html, /7(?:<!-- -->)? 天免费试用/);
  assert.match(html, /30 日激活码.*永久激活/);
  assert.doesNotMatch(html, /使用权/);
  assert.match(html, /¥19\.9/);
  assert.match(html, /¥99/);
  assert.match(html, /前往购买/);
  assert.match(html, /永久激活仅覆盖桌面端授权/);
  assert.match(html, /更新提醒与自动更新（计划中）/);
  assert.match(html, /2590930875/);
  assert.doesNotMatch(html, /<br\s*\/?\s*>/i);
  assert.doesNotMatch(html, /HelpMeLearn|codex-preview|SkeletonPreview/);
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
  assert.match(sitemap, /https:\/\/helplearn\.cn\/interactive-ai-learning-system\//);
});

test("centralizes verified download and purchasable activation URLs", async () => {
  const config = await readSourceFile("app/product-config.ts");
  assert.match(config, /Xuemai-License-Candidate-0\.1\.0-alpha\.5-x64\.exe/);
  assert.match(config, /https:\/\/pay\.ldxp\.cn\/item\/vgxadp/);
  assert.match(config, /https:\/\/pay\.ldxp\.cn\/item\/b2bxj2/);
  assert.match(config, /price: "¥19\.9"/);
  assert.match(config, /price: "¥99"/);
  assert.match(config, /days: 7/);
  assert.match(config, /availability: "可购买"/);
  assert.match(config, /isAvailable: true/);
});
