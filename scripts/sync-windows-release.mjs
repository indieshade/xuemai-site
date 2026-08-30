import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const manifestUrl = "https://updates.helplearn.cn/windows/alpha.yml";
export const liveFallbackUrl = "https://helplearn.cn/windows-release.json";

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

export function parseWindowsAlphaManifest(source) {
  const version = requiredMatch(source, /^version:\s*([^\r\n]+)$/m, "version");
  const downloadUrl = requiredMatch(source, /^\s*-\s*url:\s*(https:\/\/[^\s]+)$/m, "files[0].url");
  const sha512 = requiredMatch(source, /^\s*sha512:\s*([^\r\n]+)$/m, "files[0].sha512");
  const size = Number(requiredMatch(source, /^\s*size:\s*(\d+)\s*$/m, "files[0].size"));
  const releaseDate = requiredMatch(source, /^releaseDate:\s*([^\r\n]+)$/m, "releaseDate");

  if (!/^\d+\.\d+\.\d+-alpha\.\d+$/.test(version)) throw new Error("清单版本格式不正确");
  if (!Number.isSafeInteger(size) || size <= 0) throw new Error("清单文件大小不正确");
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(sha512)) throw new Error("清单 SHA512 格式不正确");

  return { version, downloadUrl, sha512, sizeBytes: size, releaseDate };
}

function parseGithubDownloadUrl(downloadUrl) {
  const match = new URL(downloadUrl).pathname.match(
    /^\/([^/]+)\/([^/]+)\/releases\/download\/(v[^/]+)\/([^/]+\.exe)$/,
  );
  if (new URL(downloadUrl).hostname !== "github.com" || !match) throw new Error("清单下载地址不是 GitHub Release 安装包");

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
  if (typeof version !== "string" || !/^\d+\.\d+\.\d+-alpha\.\d+$/.test(version)) throw new Error("回退版本号无效");
  if (typeof downloadUrl !== "string" || typeof releaseUrl !== "string") throw new Error("回退下载地址无效");
  if (!Number.isSafeInteger(sizeBytes) || sizeBytes <= 0) throw new Error("回退文件大小无效");
  if (typeof sha256 !== "string" || !/^[A-Fa-f0-9]{64}$/.test(sha256)) throw new Error("回退 SHA256 无效");
  if (typeof sha512 !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(sha512)) throw new Error("回退 SHA512 无效");
  if (typeof releaseDate !== "string") throw new Error("回退发布日期无效");

  const { tag, fileName } = parseGithubDownloadUrl(downloadUrl);
  if (tag !== `v${version}` || !fileName.includes(version)) throw new Error("回退版本与下载地址不一致");
  if (releaseUrl !== `https://github.com/indieshade/xuemai-site/releases/tag/v${version}`) throw new Error("回退 Release 地址无效");

  return { version, downloadUrl, releaseUrl, sizeBytes, sha256: sha256.toUpperCase(), sha512, releaseDate };
}

function toPublicRelease(release, status, refreshNote) {
  return {
    status,
    refreshNote,
    version: release.version,
    label: `Windows Alpha · ${release.version}`,
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
  const digest = typeof asset?.digest === "string" ? asset.digest.match(/^sha256:([a-f0-9]{64})$/i) : null;
  if (
    !asset
    || !digest
    || asset.size !== manifest.sizeBytes
    || release.tag_name !== tag
    || release.html_url !== `https://github.com/${owner}/${repository}/releases/tag/${tag}`
  ) throw new Error("Release 安装包校验信息不完整");

  return toPublicRelease({
    ...manifest,
    sha256: digest[1],
    releaseUrl: release.html_url,
    releaseDate: manifest.releaseDate,
  }, "verified", null);
}

export async function resolveWindowsRelease({
  fetchImpl = fetch,
  fallback,
  sourceUrl = manifestUrl,
  deployedFallbackUrl = liveFallbackUrl,
} = {}) {
  if (!fallback) throw new Error("缺少本地回退版本信息");

  try {
    return await loadVerifiedManifestRelease({ fetchImpl, sourceUrl });
  } catch (primaryError) {
    try {
      const deployed = normalizeFallback(await getJson(deployedFallbackUrl, fetchImpl));
      return toPublicRelease(deployed, "fallback", fallbackNotice);
    } catch {
      const checkedIn = normalizeFallback(fallback);
      return toPublicRelease(checkedIn, "fallback", fallbackNotice);
    }
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
