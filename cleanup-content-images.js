#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, "content");
const IMAGES_DIR = path.join(ROOT_DIR, "public", "images");
const REFERENCED_LIST_PATH = path.join(ROOT_DIR, "referenced-content-images.txt");

const IMAGE_EXT_REGEX = /\.(jpe?g|png|gif|webp|svg|avif|tiff?)$/i;
const CANDIDATE_REGEX =
  /[A-Za-z0-9_./%+@:-]+\.(?:jpe?g|png|gif|webp|svg|avif|tiff?)(?:\?[^\s"')\]]+|#[^\s"')\]]+)?/gi;

function hasImageExtension(filePath) {
  return IMAGE_EXT_REGEX.test(filePath);
}

async function listFilesRecursive(startDir) {
  const files = [];
  const stack = [startDir];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = await fs.readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === ".DS_Store") continue;

      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

function extractReferencedImageBasenames(content) {
  const matches = content.match(CANDIDATE_REGEX) || [];
  const names = new Set();

  for (const match of matches) {
    const withoutQueryOrHash = match.split(/[?#]/)[0];
    const normalized = withoutQueryOrHash.replace(/\\/g, "/");
    const fileName = path.posix.basename(normalized);

    if (!fileName || !hasImageExtension(fileName)) continue;

    try {
      names.add(decodeURIComponent(fileName));
    } catch {
      names.add(fileName);
    }
  }

  return names;
}

async function main() {
  const shouldApply = process.argv.includes("--apply");

  const contentFiles = await listFilesRecursive(CONTENT_DIR);
  const imageFiles = await listFilesRecursive(IMAGES_DIR);

  const referencedBasenames = new Set();

  for (const filePath of contentFiles) {
    const fileContent = await fs.readFile(filePath, "utf8");
    const names = extractReferencedImageBasenames(fileContent);
    for (const name of names) referencedBasenames.add(name);
  }

  const referencedList = Array.from(referencedBasenames).sort((a, b) =>
    a.localeCompare(b)
  );
  await fs.writeFile(REFERENCED_LIST_PATH, `${referencedList.join("\n")}\n`, "utf8");

  const existingImageFiles = imageFiles.filter((filePath) =>
    hasImageExtension(filePath)
  );

  const unreferenced = existingImageFiles.filter((filePath) => {
    const baseName = path.basename(filePath);
    return !referencedBasenames.has(baseName);
  });

  console.log(`Scanned content files: ${contentFiles.length}`);
  console.log(`Referenced image names found: ${referencedBasenames.size}`);
  console.log(`Image files in public/images: ${existingImageFiles.length}`);
  console.log(`Unreferenced files: ${unreferenced.length}`);
  console.log(`Reference list written to: ${path.relative(ROOT_DIR, REFERENCED_LIST_PATH)}`);

  if (!shouldApply) {
    console.log("\nDry run only. Re-run with --apply to delete unreferenced files.");
    return;
  }

  let deleted = 0;
  for (const filePath of unreferenced) {
    await fs.unlink(filePath);
    deleted += 1;
  }

  console.log(`Deleted files: ${deleted}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
