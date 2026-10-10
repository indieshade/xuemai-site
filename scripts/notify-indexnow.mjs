import { pathToFileURL } from "node:url";

export function indexNowPayload(sitemap, key) {
  if (!/^[a-zA-Z0-9-]{8,128}$/.test(key ?? "")) throw new Error("Invalid IndexNow key");
  const urlList = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))];
  if (!urlList.length) throw new Error("Sitemap contains no URLs");
  for (const address of urlList) {
    const url = new URL(address);
    if (url.origin !== "https://helplearn.cn") throw new Error("Unexpected sitemap host");
  }
  return { host: "helplearn.cn", key, keyLocation: `https://helplearn.cn/${key}.txt`, urlList };
}

async function notify() {
  const sitemap = await fetch("https://helplearn.cn/sitemap.xml", { signal: AbortSignal.timeout(30_000) });
  if (!sitemap.ok) throw new Error(`Sitemap HTTP ${sitemap.status}`);
  const payload = indexNowPayload(await sitemap.text(), process.env.INDEXNOW_KEY);
  const result = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  if (!result.ok) throw new Error(`IndexNow HTTP ${result.status}`);
  console.log(`IndexNow accepted ${payload.urlList.length} sitemap URLs (HTTP ${result.status})`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  notify().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
