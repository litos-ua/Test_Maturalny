import { useState, useEffect} from "react";

interface ApkInfo {
  version: string;
  build: number;
  sizeKBytes: number;
  releaseDate: string;
  url: string;
}

export function useApkInfo() {
  const [apk, setApk] = useState<ApkInfo | null>(null);
  useEffect(() => {
    fetch("/download/version.json", { cache: "no-store" })
      .then(res => (res.ok ? res.json() : null))
      .then(setApk)
      .catch(() => setApk(null));
  }, []);
  return apk;
}