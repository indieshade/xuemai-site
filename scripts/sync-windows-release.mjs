import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const manifestUrl = "https://updates.helplearn.cn/windows/alpha.yml";
export const candidateReleasesUrl = "https://api.github.com/repos/indieshade/xuemai-site/releases?per_page=100";
export const liveFallbackUrl = "https://helplearn.cn/windows-release.json";

const releaseRepository = "indieshade/xuemai-site";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackPath = path.join(projectRoot, "app", "windows-release-fallback.json");
const generatedPath = path.join(projectRoot, "app", "windows-release.generated.json");
const publicReleasePath = path.join(projectRoot, "public", "windows-release.json");
const fallbackNotice = "版本信息暂未刷新，当前仍提供最近一次已验证的版本。";

function requiredMatch(source, expression, field) {
  const match = source.match(expression);
  if (!match?.[1]) throw new Error(`清单缺少 ${field}`);
  return match[1].trim().replace(/^['"]|['"]$/g, "");
}

function releaseChannel(version) {
  if (/^\d+\.\d+\.\d+-rc\.\d+$/.test(version)) return "candidate";
  if (/^\d+\.\d+\.\d+-alpha\.\d+$/.test(version)) return "alpha";
  throw new Error("版本号格式不正确");
}

function compareReleaseVersions(left, right) {
  const parse = (version) => {
    const match = version.match(/^(\d+)\.(\d+)\.(\d+)-(alpha|rc)\.(\d+)$/);
    if (!match) throw new Error("版本号格式不正确");
    return {
      major: Number(match[1]),
      minor: Number(match[2]),
      patch: Number(match[3]),
      channel: match[4],
      channelNumber: Number(match[5]),
    };
  };
  const leftVersion = parse(left);
  const rightVersion = parse(right);
  for (const field of ["major", "minor", "patch"]) {
    if (leftVersion[field] !== rightVersion[field]) return leftVersion[field] - rightVersion[field];
  }
  const channelRank = { alpha: 0, rc: 1 };
  if (channelRank[leftVersion.channel] !== channelRank[rightVersion.channel]) {
    return channelRank[leftVersion.channel] - channelRank[rightVersion.channel];
  }
  return leftVersion.channelNumber - rightVersion.channelNumber;
}

function fileNameFromManifestReference(fileReference) {
  if (/^https:\/\//.test(fileReference)) return parseGithubDownloadUrl(fileReference).fileName;
  if (!/^[^/\\]+\.exe$/.test(fileReference)) throw new Error("候选清单安装包路径不正确");
  return fileReference;
}

export function parseWindowsAlphaManifest(source) {
  const version = requiredMatch(source, /^version:\s*([^\r\n]+)$/m, "version");
  const downloadUrl = requiredMatch(source, /^\s*-\s*url:\s*(https:\/\/[^\s]+)$/m, "files[0].url");
  const sha512 = requiredMatch(source, /^\s*sha512:\s*([^\r\n]+)$/m, "files[0].sha512");
  const size = Number(requiredMatch(source, /^\s*size:\s*(\d+)\s*$/m, "files[0].size"));
  const releaseDate = requiredMatch(source, /^releaseDate:\s*([^\r\n]+)$/m, "releaseDate");

  if (releaseChannel(version) !== "alpha") throw new Error("清单版本格式不正确");
  if (!Number.isSafeInteger(size) || size <= 0) throw new Error("清单文件大小不正确");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(sha512)) throw new Error("清单 SHA512 格式不正确");

  return { version, downloadUrl, sha512, sizeBytes: size, releaseDate };
}

export function parseCandidateReleaseManifest(source) {
  const version = requiredMatch(source, /^version:\s*([^\r\n]+)$/m, "version");
  const fileReference = requiredMatch(source, /^\s*-\s*url:\s*([^\r\n]+)$/m, "files[0].url");
  const sha512 = requiredMatch(source, /^\s*sha512:\s*([^\r\n]+)$/m, "files[0].sha512");
  const releaseDate = requiredMatch(source, /^releaseDate:\s*([^\r\n]+)$/m, "releaseDate");
  const pathReference = requiredMatch(source, /^path:\s*([^\r\n]+)$/m, "path");
  const fileName = fileNameFromManifestReference(fileReference);

  if (releaseChannel(version) !== "candidate") throw new Error("候选清单版本格式不正确");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(sha512)) throw new Error("候选清单 SHA512 格式不正确");
  if (pathReference !== fileName) throw new Error("候选清单 path 与安装包不一致");

  return { version, fileName, sha512, releaseDate };
}

function parseGithubDownloadUrl(downloadUrl) {
  const parsed = new URL(downloadUrl);
  const match = parsed.pathname.match(/^\/([^/]+)\/([^/]+)\/releases\/download\/(v[^/]+)\/([^/]+\.exe)$/);
  if (parsed.hostname !== "github.com" || !match) throw new Error("清单下载地址不是 GitHub Release 安装包");

  const [, owner, repository, tag, fileName] = match;
  return { owner, repository, tag, fileName: decodeURIComponent(fileName) };
}

function formatFileSize(sizeBytes) {
  return `${(sizeBytes / 1024 ** 2).toFixed(2)} MB`;
}

function formatReleaseDate(releaseDate) {
  const match = releaseDate.match(/^(\d{4})-(\d{2})-(\d{2})T/);
  if (!match) throw new Error("清单发布日期格式不正确");
  return `${match[1]} 年 ${Number(match[2])} 月 ${Number(match[3])} 日`;
}

function normalizeFallback(candidate) {
  if (!candidate || typeof candidate !== "object") throw new Error("回退版本信息无效");

  const { version, downloadUrl, releaseUrl, sizeBytes, sha256, sha512, releaseDate } = candidate;
  releaseChannel(version);
  if (typeof downloadUrl !== "string" || typeof releaseUrl !== "string") throw new Error("回退下载地址无效");
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes <= 0) throw new Error("回退文件大小无效");
  if (typeof sha256 !== "string" || !/^[A-Fa-f0-9]{64}$/.test(sha256)) throw new Error("回退 SHA256 无效");
  if (typeof sha512 !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(sha512)) throw new Error("回退 SHA512 无效");
  if (typeof releaseDate !== "string") throw new Error("回退发布日期无效");

  const { tag, fileName } = parseGithubDownloadUrl(downloadUrl);
  if (tag !== `v${version}` || !fileName.includes(version)) throw new Error("回退版本与下载地址不一致");
  if (releaseUrl !== `https://github.com/${releaseRepository}/releases/tag/v${version}`) throw new Error("回退 Release 地址无效");

  return { version, downloadUrl, releaseUrl, sizeBytes, sha256: sha256.toUpperCase(), sha512, releaseDate };
}

function toPublicRelease(release, status, refreshNote) {
  const channel = releaseChannel(release.version);
  // 发布通道用于校验与回退策略；面向访客只统一称为 Windows 版。
  const edition = "Windows 版";
  return {
    status,
    refreshNote,
    channel,
    edition,
    prereleaseNote: null,
    version: release.version,
    label: `${edition} · ${release.version}`,
    platform: "Windows x64",
    sizeBytes: release.sizeBytes,
    size: formatFileSize(release.sizeBytes),
    sha256: release.sha256.toUpperCase(),
    sha512: release.sha512,
    downloadUrl: release.downloadUrl,
    releaseUrl: release.releaseUrl,
    releaseDate: release.releaseDate,
    releasedOn: formatReleaseDate(release.releaseDate),
  };
}

async function getJson(url, fetchImpl) {
  const response = await fetchImpl(url, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "helplearn-site-release-sync" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`请求版本信息失败（${response.status}）`);
  return response.json();
}

function githubAssetDigest(asset) {
  const digest = typeof asset?.digest === "string" ? asset.digest.match(/^sha256:([a-f0-9]{64})$/i) : null;
  if (!digest) throw new Error("Release 安装包校验信息不完整");
  return digest[1];
}

function compareCandidateTags(left, right) {
  const leftParts = left.match(/^v(\d+)\.(\d+)\.(\d+)-rc\.(\d+)$/)?.slice(1).map(Number);
  const rightParts = right.match(/^v(\d+)\.(\d+)\.(\d+)-rc\.(\d+)$/)?.slice(1).map(Number);
  if (!leftParts || !rightParts) return 0;
  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) return rightParts[index] - leftParts[index];
  }
  return 0;
}

export async function loadVerifiedCandidateRelease({ fetchImpl = fetch, sourceUrl = candidateReleasesUrl } = {}) {
  const releases = await getJson(sourceUrl, fetchImpl);
  if (!Array.isArray(releases)) throw new Error("候选版本列表无效");

  const release = releases
    .filter((candidate) => candidate?.prerelease === true && candidate?.draft === false && /^v\d+\.\d+\.\d+-rc\.\d+$/.test(candidate?.tag_name ?? ""))
    .sort((left, right) => compareCandidateTags(left.tag_name, right.tag_name))[0];
  if (!release) throw new Error("没有可用的候选版本");

  const manifestAsset = release.assets?.find((asset) => asset?.name === "alpha.yml");
  if (typeof manifestAsset?.browser_download_url !== "string") throw new Error("候选版本缺少 alpha.yml");
  const manifestResponse = await fetchImpl(manifestAsset.browser_download_url, {
    headers: { Accept: "text/yaml, text/plain" },
    signal: AbortSignal.timeout(8000),
  });
  if (!manifestResponse.ok) throw new Error(`无法读取候选清单（${manifestResponse.status}）`);

  const manifest = parseCandidateReleaseManifest(await manifestResponse.text());
  const tag = `v${manifest.version}`;
  const downloadUrl = `https://github.com/${releaseRepository}/releases/download/${tag}/${manifest.fileName}`;
  const releaseUrl = `https://github.com/${releaseRepository}/releases/tag/${tag}`;
  const asset = release.assets?.find((candidate) => candidate?.name === manifest.fileName && candidate?.browser_download_url === downloadUrl);

  if (
    release.tag_name !== tag
    || release.html_url !== releaseUrl
    || !asset
    || !Number.isSafeInteger(asset.size)
    || asset.size <= 0
  ) throw new Error("候选 Release 与清单不一致");

  return toPublicRelease({
    version: manifest.version,
    downloadUrl,
    releaseUrl,
    sizeBytes: asset.size,
    sha256: githubAssetDigest(asset),
    sha512: manifest.sha512,
    releaseDate: manifest.releaseDate,
  }, "verified", null);
}

export async function loadVerifiedManifestRelease({ fetchImpl = fetch, sourceUrl = manifestUrl } = {}) {
  const response = await fetchImpl(sourceUrl, {
    headers: { Accept: "text/yaml, text/plain" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`无法读取更新清单（${response.status}）`);

  const manifest = parseWindowsAlphaManifest(await response.text());
  const { owner, repository, tag, fileName } = parseGithubDownloadUrl(manifest.downloadUrl);
  if (tag !== `v${manifest.version}` || !fileName.includes(manifest.version)) throw new Error("清单版本与安装包不一致");

  const release = await getJson(`https://api.github.com/repos/${owner}/${repository}/releases/tags/${tag}`, fetchImpl);
  const asset = release.assets?.find(
    (candidate) => candidate?.name === fileName && candidate?.browser_download_url === manifest.downloadUrl,
  );
  if (
    !asset
    || asset.size !== manifest.sizeBytes
    || release.tag_name !== tag
    || release.html_url !== `https://github.com/${owner}/${repository}/releases/tag/${tag}`
  ) throw new Error("Release 安装包校验信息不完整");

  return toPublicRelease({
    ...manifest,
    sha256: githubAssetDigest(asset),
    releaseUrl: release.html_url,
    releaseDate: manifest.releaseDate,
  }, "verified", null);
}

export async function resolveWindowsRelease({
  fetchImpl = fetch,
  fallback,
  sourceUrl = manifestUrl,
  candidateSourceUrl = candidateReleasesUrl,
  deployedFallbackUrl = liveFallbackUrl,
} = {}) {
  if (!fallback) throw new Error("缺少本地回退版本信息");

  try {
    return await loadVerifiedCandidateRelease({ fetchImpl, sourceUrl: candidateSourceUrl });
  } catch {
    let lastVerified = normalizeFallback(fallback);
    try {
      const deployed = normalizeFallback(await getJson(deployedFallbackUrl, fetchImpl));
      if (compareReleaseVersions(deployed.version, lastVerified.version) > 0) lastVerified = deployed;
    } catch {
      // The checked-in release remains the safe fallback when the deployed copy is unreachable.
    }

    try {
      const manifestRelease = await loadVerifiedManifestRelease({ fetchImpl, sourceUrl });
      if (compareReleaseVersions(manifestRelease.version, lastVerified.version) >= 0) {
        return manifestRelease;
      }
    } catch {
      // Keep the last verified release below.
    }

    return toPublicRelease(lastVerified, "fallback", fallbackNotice);
  }
}

export async function syncWindowsRelease({ fetchImpl = fetch } = {}) {
  const fallback = JSON.parse(await readFile(fallbackPath, "utf8"));
  const release = await resolveWindowsRelease({ fetchImpl, fallback });
  const serialized = `${JSON.stringify(release, null, 2)}\n`;

  await mkdir(path.dirname(generatedPath), { recursive: true });
  await mkdir(path.dirname(publicReleasePath), { recursive: true });
  await Promise.all([
    writeFile(generatedPath, serialized),
    writeFile(publicReleasePath, serialized),
  ]);

  return release;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  syncWindowsRelease()
    .then((release) => console.log(`Windows release: ${release.version} (${release.status})`))
    .catch((error) => {
      console.error("无法生成 Windows 发布信息", error);
      process.exitCode = 1;
    });
}
