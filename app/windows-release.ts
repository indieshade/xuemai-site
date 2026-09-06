import release from "./windows-release.generated.json";

export type WindowsRelease = {
  status: "verified" | "fallback";
  refreshNote: string | null;
  channel: "alpha" | "candidate";
  edition: "Windows 版";
  prereleaseNote: string | null;
  version: string;
  label: string;
  platform: "Windows x64";
  sizeBytes: number;
  size: string;
  sha256: string;
  sha512: string;
  downloadUrl: string;
  releaseUrl: string;
  releaseDate: string;
  releasedOn: string;
};

export const windowsRelease = release as WindowsRelease;
