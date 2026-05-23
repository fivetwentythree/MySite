import { readdir, rename, stat, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = new URL("../public/images/", import.meta.url);
const maxWidth = Number.parseInt(process.env.IMAGE_MAX_WIDTH || "1600", 10);
const maxHeight = Number.parseInt(process.env.IMAGE_MAX_HEIGHT || "1600", 10);
const jpegQuality = Number.parseInt(process.env.IMAGE_JPEG_QUALITY || "78", 10);
const webpQuality = Number.parseInt(process.env.IMAGE_WEBP_QUALITY || "78", 10);
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const formatter = new Intl.NumberFormat("en", { maximumFractionDigits: 1 });

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${formatter.format(bytes / 1024)} KB`;
  return `${formatter.format(bytes / 1024 / 1024)} MB`;
}

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectImages(fullPath)));
      continue;
    }

    if (entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const original = await stat(filePath);
  const temporaryPath = `${filePath}.optimized`;

  let pipeline = sharp(filePath)
    .rotate()
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: "inside",
      withoutEnlargement: true
    });

  if (extension === ".jpg" || extension === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: jpegQuality, mozjpeg: true, progressive: true });
  } else if (extension === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else if (extension === ".webp") {
    pipeline = pipeline.webp({ quality: webpQuality, effort: 6 });
  }

  await pipeline.toFile(temporaryPath);
  const optimized = await stat(temporaryPath);

  if (optimized.size >= original.size) {
    await unlink(temporaryPath);
    return { filePath, changed: false, before: original.size, after: original.size };
  }

  await rename(temporaryPath, filePath);
  return { filePath, changed: true, before: original.size, after: optimized.size };
}

const images = await collectImages(imageRoot.pathname);

if (images.length === 0) {
  console.log("No images found in public/images.");
  process.exit(0);
}

let saved = 0;

for (const image of images) {
  const result = await optimizeImage(image);
  const relativePath = path.relative(imageRoot.pathname, result.filePath);

  if (!result.changed) {
    console.log(`${relativePath}: already optimized (${formatBytes(result.before)})`);
    continue;
  }

  saved += result.before - result.after;
  console.log(`${relativePath}: ${formatBytes(result.before)} -> ${formatBytes(result.after)}`);
}

console.log(`Saved ${formatBytes(saved)} across ${images.length} image(s).`);
