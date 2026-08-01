import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the 学脉 landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>学脉/);
  assert.match(html, /把一个模糊的念头/);
  assert.match(html, /学习不是一问一答/);
  assert.match(html, /Windows x64/);
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
  assert.match(html, /2590930875/);
});
