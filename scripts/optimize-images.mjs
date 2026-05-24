import { readFile, readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = new URL("../public/images/", import.meta.url);
const projectRoot = new URL("../", import.meta.url);
const maxWidth = Number.parseInt(process.env.IMAGE_MAX_WIDTH || "1600", 10);
const maxHeight = Number.parseInt(process.env.IMAGE_MAX_HEIGHT || "1600", 10);
const webpQuality = Number.parseInt(process.env.IMAGE_WEBP_QUALITY || "78", 10);
const extensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const convertibleExtensions = new Set([".jpg", ".jpeg", ".png"]);
const referenceRoots = [
  new URL("../src/", import.meta.url).pathname,
  new URL("../README.md", import.meta.url).pathname,
  new URL("../public/images/README.md", import.meta.url).pathname
];
const textExtensions = new Set([".astro", ".css", ".html", ".js", ".json", ".md", ".mdx", ".mjs", ".ts", ".tsx", ".txt"]);

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

async function collectTextFiles(target) {
  const entries = await readdir(target, { withFileTypes: true }).catch(async () => {
    const file = await stat(target).catch(() => null);
    return file?.isFile() ? null : [];
  });

  if (entries === null) return [target];
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectTextFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function imageUrl(filePath) {
  return `/images/${path.relative(imageRoot.pathname, filePath).split(path.sep).join("/")}`;
}

async function optimizeImage(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const original = await stat(filePath);
  const metadata = await sharp(filePath).metadata();

  if (
    extension === ".webp" &&
    (!metadata.width || metadata.width <= maxWidth) &&
    (!metadata.height || metadata.height <= maxHeight)
  ) {
    return { filePath, outputPath: filePath, changed: false, converted: false, before: original.size, after: original.size };
  }

  const outputPath = convertibleExtensions.has(extension)
    ? path.join(path.dirname(filePath), `${path.basename(filePath, extension)}.webp`)
    : filePath;
  const temporaryPath = `${outputPath}.optimized`;

  let pipeline = sharp(filePath)
    .rotate()
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: "inside",
      withoutEnlargement: true
    });

  pipeline = pipeline.webp({ quality: webpQuality, effort: 6 });

  await pipeline.toFile(temporaryPath);
  const optimized = await stat(temporaryPath);

  if (extension === ".webp" && optimized.size >= original.size) {
    await unlink(temporaryPath);
    return { filePath, outputPath, changed: false, converted: false, before: original.size, after: original.size };
  }

  await rename(temporaryPath, outputPath);

  if (outputPath !== filePath) {
    await unlink(filePath);
  }

  return {
    filePath,
    outputPath,
    changed: true,
    converted: outputPath !== filePath,
    before: original.size,
    after: optimized.size
  };
}

async function updateImageReferences(conversions) {
  if (conversions.length === 0) return [];

  const replacements = conversions.flatMap(({ filePath, outputPath }) => {
    const from = imageUrl(filePath);
    const to = imageUrl(outputPath);
    return [
      [`/public${from}`, to],
      [`public${from}`, to],
      [from, to]
    ];
  });
  const files = (await Promise.all(referenceRoots.map((target) => collectTextFiles(target)))).flat();
  const changedFiles = [];

  for (const file of files) {
    let content = await readFile(file, "utf8");
    const original = content;

    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }

    if (content === original) continue;

    await writeFile(file, content);
    changedFiles.push(path.relative(projectRoot.pathname, file));
  }

  return changedFiles;
}

const images = await collectImages(imageRoot.pathname);

if (images.length === 0) {
  console.log("No images found in public/images.");
  process.exit(0);
}

let saved = 0;
const conversions = [];

for (const image of images) {
  const result = await optimizeImage(image);
  const relativePath = path.relative(imageRoot.pathname, result.filePath);
  const outputRelativePath = path.relative(imageRoot.pathname, result.outputPath);

  if (!result.changed) {
    console.log(`${relativePath}: already optimized (${formatBytes(result.before)})`);
    continue;
  }

  saved += result.before - result.after;
  if (result.converted) {
    conversions.push({ filePath: result.filePath, outputPath: result.outputPath });
    console.log(`${relativePath}: converted to ${outputRelativePath} (${formatBytes(result.before)} -> ${formatBytes(result.after)})`);
  } else {
    console.log(`${relativePath}: ${formatBytes(result.before)} -> ${formatBytes(result.after)}`);
  }
}

const changedReferences = await updateImageReferences(conversions);

if (changedReferences.length > 0) {
  console.log(`Updated image references in ${changedReferences.join(", ")}.`);
}

console.log(`Saved ${formatBytes(saved)} across ${images.length} image(s).`);
