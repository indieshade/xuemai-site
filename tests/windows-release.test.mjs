import assert from "node:assert/strict";
import test from "node:test";
import { parseWindowsAlphaManifest, resolveWindowsRelease } from "../scripts/sync-windows-release.mjs";

const sha512 = "YpDIYYEemBlkfirtHrP+nq6zjFkRja2VmZv0cmUsJLUQoCAIjsDe6W4SnHS1Ehcuqmbbn6IjUXdr6nRTbOZK1Q==";
const downloadUrl = "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.12/Xuemai-Setup-0.1.0-alpha.12-x64.exe";
const fallback = {
  version: "0.1.0-alpha.11",
  downloadUrl: "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.11/Xuemai-Setup-0.1.0-alpha.11-x64.exe",
  releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.11",
  sizeBytes: 127276990,
  sha256: "5B30AD8F9975F638BB94E819535C1BE5E9DEA76FB2666A8E9AB5EA04DCD5FB02",
  sha512,
  releaseDate: "2026-08-30T07:18:43.865Z",
};

const manifest = `version: 0.1.0-alpha.12
files:
  - url: ${downloadUrl}
    sha512: ${sha512}
    size: 127276991
path: ${downloadUrl}
sha512: ${sha512}
releaseDate: '2026-08-31T08:00:00.000Z'
`;

test("parses the Windows alpha manifest without relying on a release number in site components", () => {
  assert.deepEqual(parseWindowsAlphaManifest(manifest), {
    version: "0.1.0-alpha.12",
    downloadUrl,
    sha512,
    sizeBytes: 127276991,
    releaseDate: "2026-08-31T08:00:00.000Z",
  });
  assert.throws(() => parseWindowsAlphaManifest("version: alpha.12"), /清单缺少/);
});

test("uses the manifest URL and the matching GitHub Release digest as one verified release", async () => {
  const fetchImpl = async (url) => {
    if (url === "https://updates.example.test/alpha.yml") return new Response(manifest);
    if (url === "https://api.github.com/repos/indieshade/xuemai-site/releases/tags/v0.1.0-alpha.12") {
      return new Response(JSON.stringify({
        tag_name: "v0.1.0-alpha.12",
        html_url: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.12",
        assets: [{
          name: "Xuemai-Setup-0.1.0-alpha.12-x64.exe",
          browser_download_url: downloadUrl,
          size: 127276991,
          digest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        }],
      }));
    }
    throw new Error(`Unexpected URL: ${url}`);
  };

  const release = await resolveWindowsRelease({
    fetchImpl,
    fallback,
    sourceUrl: "https://updates.example.test/alpha.yml",
  });

  assert.equal(release.status, "verified");
  assert.equal(release.version, "0.1.0-alpha.12");
  assert.equal(release.downloadUrl, downloadUrl);
  assert.equal(release.sha256, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  assert.equal(release.refreshNote, null);
});

test("falls back to the last deployed verified release when the manifest cannot be read", async () => {
  const deployed = {
    ...fallback,
    version: "0.1.0-alpha.12",
    downloadUrl,
    releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.12",
    sizeBytes: 127276991,
    sha256: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
  };
  const fetchImpl = async (url) => {
    if (url === "https://updates.example.test/alpha.yml") throw new Error("offline");
    if (url === "https://site.example.test/windows-release.json") return new Response(JSON.stringify(deployed));
    throw new Error(`Unexpected URL: ${url}`);
  };

  const release = await resolveWindowsRelease({
    fetchImpl,
    fallback,
    sourceUrl: "https://updates.example.test/alpha.yml",
    deployedFallbackUrl: "https://site.example.test/windows-release.json",
  });

  assert.equal(release.status, "fallback");
  assert.equal(release.version, "0.1.0-alpha.12");
  assert.equal(release.downloadUrl, downloadUrl);
  assert.match(release.refreshNote, /版本信息暂未刷新/);
});

test("keeps the checked-in verified release when both remote sources are unavailable", async () => {
  const fetchImpl = async () => {
    throw new Error("offline");
  };

  const release = await resolveWindowsRelease({
    fetchImpl,
    fallback,
    sourceUrl: "https://updates.example.test/alpha.yml",
    deployedFallbackUrl: "https://site.example.test/windows-release.json",
  });

  assert.equal(release.status, "fallback");
  assert.equal(release.version, fallback.version);
  assert.equal(release.downloadUrl, fallback.downloadUrl);
  assert.match(release.refreshNote, /最近一次已验证/);
});
