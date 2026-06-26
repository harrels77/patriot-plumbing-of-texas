// Browser-only helpers: detect iPhone HEIC (even when mislabeled .jpg via magic
// bytes), convert to JPEG with heic2any, and resize. The customer never converts
// anything — this is invisible and happens in their browser before upload.

async function looksLikeHeic(file: File): Promise<boolean> {
  try {
    const buf = new Uint8Array(await file.slice(0, 32).arrayBuffer());
    const ftyp = String.fromCharCode(...Array.from(buf.slice(4, 8)));
    if (ftyp !== "ftyp") return false;
    const brand = String.fromCharCode(...Array.from(buf.slice(8, 12))).toLowerCase();
    return ["heic","heix","hevc","heim","heis","hevm","hevs","mif1","msf1","heif"].includes(brand);
  } catch {
    return false;
  }
}

function resizeBlobToJpeg(
  blob: Blob,
  maxDim = 1568,
  quality = 0.85,
): Promise<{ dataUrl: string; base64: string; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      const longest = Math.max(w, h);
      if (longest > maxDim) {
        const s = maxDim / longest;
        w = Math.round(w * s);
        h = Math.round(h * s);
      }
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("no canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve({ dataUrl, base64: dataUrl.split(",")[1] ?? "", width: w, height: h });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image load failed"));
    };
    img.src = url;
  });
}

export interface ProcessedPhoto {
  dataUrl: string;
  base64: string;
  mediaType: "image/jpeg";
  width: number;
  height: number;
  sizeKB: number;
}

export async function fileToResizedJpeg(file: File): Promise<ProcessedPhoto> {
  let blob: Blob = file;
  if (await looksLikeHeic(file)) {
    const heic2any = (await import("heic2any")).default;
    const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.85 });
    blob = Array.isArray(out) ? out[0] : (out as Blob);
  }
  const { dataUrl, base64, width, height } = await resizeBlobToJpeg(blob);
  const sizeKB = Math.round((base64.length * 3) / 4 / 1024);
  return { dataUrl, base64, mediaType: "image/jpeg", width, height, sizeKB };
}
