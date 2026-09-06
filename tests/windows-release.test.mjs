import assert from "node:assert/strict";
import test from "node:test";
import {
  candidateReleasesUrl,
  loadVerifiedCandidateRelease,
  parseCandidateReleaseManifest,
  parseWindowsAlphaManifest,
  resolveWindowsRelease,
} from "../scripts/sync-windows-release.mjs";

const alphaSha512 = "YpDIYYEemBlkfirtHrP+nq6zjFkRja2VmZv0cmUsJLUQoCAIjsDe6W4SnHS1Ehcuqmbbn6IjUXdr6nRTbOZK1Q==";
const alphaDownloadUrl = "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.12/Xuemai-Setup-0.1.0-alpha.12-x64.exe";
const fallback = {
  version: "0.1.0-alpha.11",
  downloadUrl: "https://github.com/indieshade/xuemai-site/releases/download/v0.1.0-alpha.11/Xuemai-Setup-0.1.0-alpha.11-x64.exe",
  releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.11",
  sizeBytes: 127276990,
  sha256: "5B30AD8F9975F638BB94E819535C1BE5E9DEA76FB2666A8E9AB5EA04DCD5FB02",
  sha512: alphaSha512,
  releaseDate: "2026-08-30T07:18:43.865Z",
};

const alphaManifest = `version: 0.1.0-alpha.12
files:
  - url: ${alphaDownloadUrl}
    sha512: ${alphaSha512}
    size: 127276991
path: ${alphaDownloadUrl}
sha512: ${alphaSha512}
releaseDate: '2026-08-31T08:00:00.000Z'
`;

const blockedCandidateVersion = "0.2.0-rc.3";
const candidateVersion = "0.2.0-rc.4";
const candidateFileName = `Xuemai-Setup-${candidateVersion}-x64.exe`;
const candidateSha512 = "PAeskJ4xXnUopd8xo642WB2GftTzWIS6vBG3pYh4Kt7sc8b2VgKFVXuJ40BfMn6MRNkOenKNOUhYM3UzTOZJ4w==";
const candidateDownloadUrl = `https://github.com/indieshade/xuemai-site/releases/download/v${candidateVersion}/${candidateFileName}`;
const candidateManifestUrl = `https://github.com/indieshade/xuemai-site/releases/download/v${candidateVersion}/alpha.yml`;
const candidateManifest = `version: ${candidateVersion}
files:
  - url: ${candidateFileName}
    sha512: ${candidateSha512}
path: ${candidateFileName}
sha512: ${candidateSha512}
releaseDate: '2026-09-06T10:23:41.535Z'
`;

function candidateRelease(version = candidateVersion) {
  const fileName = `Xuemai-Setup-${version}-x64.exe`;
  const downloadUrl = `https://github.com/indieshade/xuemai-site/releases/download/v${version}/${fileName}`;
  return {
    tag_name: `v${version}`,
    html_url: `https://github.com/indieshade/xuemai-site/releases/tag/v${version}`,
    prerelease: true,
    draft: false,
    assets: [
      { name: "alpha.yml", browser_download_url: candidateManifestUrl },
      {
        name: fileName,
        browser_download_url: downloadUrl,
        size: 202798679,
        digest: "sha256:8772aeb87d5dee4295087c5e8f15df5cb18253e07a5521ea151c00696cc55617",
      },
    ],
  };
}

test("parses alpha and candidate manifests without putting release data in page components", () => {
  assert.deepEqual(parseWindowsAlphaManifest(alphaManifest), {
    version: "0.1.0-alpha.12",
    downloadUrl: alphaDownloadUrl,
    sha512: alphaSha512,
    sizeBytes: 127276991,
    releaseDate: "2026-08-31T08:00:00.000Z",
  });
  assert.deepEqual(parseCandidateReleaseManifest(candidateManifest), {
    version: candidateVersion,
    fileName: candidateFileName,
    sha512: candidateSha512,
    releaseDate: "2026-09-06T10:23:41.535Z",
  });
  assert.throws(() => parseWindowsAlphaManifest("version: alpha.12"), /清单缺少/);
  assert.throws(() => parseCandidateReleaseManifest(candidateManifest.replace(candidateFileName, "other.exe")), /不一致/);
});

test("uses the latest verified candidate release and its bundled alpha.yml", async () => {
  const fetchImpl = async (url) => {
    if (url === candidateReleasesUrl) return new Response(JSON.stringify([candidateRelease("0.1.0-rc.9"), candidateRelease()]));
    if (url === candidateManifestUrl) return new Response(candidateManifest);
    throw new Error(`Unexpected URL: ${url}`);
  };

  const release = await resolveWindowsRelease({ fetchImpl, fallback });

  assert.equal(release.status, "verified");
  assert.equal(release.channel, "candidate");
  assert.equal(release.edition, "Windows 候选版");
  assert.equal(release.version, candidateVersion);
  assert.equal(release.downloadUrl, candidateDownloadUrl);
  assert.equal(release.sizeBytes, 202798679);
  assert.equal(release.sha512, candidateSha512);
  assert.equal(release.sha256, "8772AEB87D5DEE4295087C5E8F15DF5CB18253E07A5521EA151C00696CC55617");
  assert.equal(release.prereleaseNote, "这是候选预发布包，不是稳定版。");
});

test("does not select a candidate that was stopped from public download", async () => {
  const fetchImpl = async (url) => {
    if (url === candidateReleasesUrl) return new Response(JSON.stringify([candidateRelease(blockedCandidateVersion)]));
    throw new Error(`Unexpected URL: ${url}`);
  };

  await assert.rejects(() => loadVerifiedCandidateRelease({ fetchImpl }), /没有可用的候选版本/);
});

test("uses the alpha manifest URL and matching GitHub Release digest when no candidate is available", async () => {
  const fetchImpl = async (url) => {
    if (url === candidateReleasesUrl) return new Response(JSON.stringify([]));
    if (url === "https://updates.example.test/alpha.yml") return new Response(alphaManifest);
    if (url === "https://api.github.com/repos/indieshade/xuemai-site/releases/tags/v0.1.0-alpha.12") {
      return new Response(JSON.stringify({
        tag_name: "v0.1.0-alpha.12",
        html_url: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.12",
        assets: [{
          name: "Xuemai-Setup-0.1.0-alpha.12-x64.exe",
          browser_download_url: alphaDownloadUrl,
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
  assert.equal(release.channel, "alpha");
  assert.equal(release.version, "0.1.0-alpha.12");
  assert.equal(release.downloadUrl, alphaDownloadUrl);
  assert.equal(release.sha256, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  assert.equal(release.refreshNote, null);
});

test("falls back to the last deployed verified release when primary sources cannot be read", async () => {
  const deployed = {
    ...fallback,
    version: "0.1.0-alpha.12",
    downloadUrl: alphaDownloadUrl,
    releaseUrl: "https://github.com/indieshade/xuemai-site/releases/tag/v0.1.0-alpha.12",
    sizeBytes: 127276991,
    sha256: "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB",
  };
  const fetchImpl = async (url) => {
    if (url === candidateReleasesUrl || url === "https://updates.example.test/alpha.yml") throw new Error("offline");
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
  assert.equal(release.downloadUrl, alphaDownloadUrl);
  assert.match(release.refreshNote, /版本信息暂未刷新/);
});

test("keeps the checked-in verified release when every remote source is unavailable", async () => {
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
