interface AssetItem {
  path: string;
  file: File;
  blob?: Blob;
  url?: string;
}

interface Resources {
  file: File;
  path?: string;
}

const ASSET_MAP = new Map<string, AssetItem>();

export function getURLModifier() {
  return (url: string) => {
    const normalizedURL = decodeURI(url).replace(/^(\.?\/)/, "");
    if (ASSET_MAP.has(normalizedURL)) {
      const value = ASSET_MAP.get(normalizedURL);
      if (value) {
        if (!value.url) {
          let blob;
          if (!value.file.stream) {
            blob = new Blob([value.file]);
          } else {
            blob = value.file;
          }
          value.url = URL.createObjectURL(blob);
        }
        return value.url;
      } else {
        return url;
      }
    } else {
      return url;
    }
  };
}

export function createAssetUrl(value: AssetItem) {
  let blob;
  if (!value.file.stream) {
    const dotIndex = value.path.lastIndexOf(".");
    let ext = "png";
    if (dotIndex >= 0) {
      ext = value.path.substring(dotIndex + 1);
    }
    const type = ext === "svg" ? "image/svg+xml" : "image/" + ext;
    blob = new Blob([value.file], { type });
  } else {
    blob = value.file;
  }
  value.blob = blob;
  value.url = URL.createObjectURL(blob);
}

export function addAsset(path: string, resources: Resources) {
  if (!resources.file) {
    throw new Error('assert must have a file property');
  }
  resources.path = path;
  ASSET_MAP.set(path, resources as AssetItem);
}
