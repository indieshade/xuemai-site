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

test("renders the 学脉 landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>学脉/);
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
  assert.match(html, /当前不开放在线下载/);
  assert.match(html, /2590930875/);
  assert.doesNotMatch(html, /<br\s*\/?\s*>/i);
  assert.doesNotMatch(html, /HelpMeLearn|codex-preview|SkeletonPreview/);
});

test("renders the promotional poster route", async () => {
  const response = await render("/poster");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /promo-card/);
  assert.match(html, /动态学习路径/);
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
