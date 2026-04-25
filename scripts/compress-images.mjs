import fs from "node:fs/promises";
import path from "node:path";
import fg from "fast-glob";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, "public", "images");
const DRY_RUN = process.argv.includes("--dry-run");

const files = await fg("**/*.{jpg,jpeg,png,webp,avif}", {
  cwd: IMG_DIR,
  onlyFiles: true,
});

let before = 0;
let after = 0;
let written = 0;
let skipped = 0;
let errored = 0;

for (const relPath of files) {
  const fullPath = path.join(IMG_DIR, relPath);
  const ext = path.extname(fullPath).toLowerCase();
  try {
    const input = await fs.readFile(fullPath);
    if (input.length === 0) {
      skipped += 1;
      continue;
    }

    before += input.length;

    let pipeline = sharp(input, { failOn: "none" }).rotate();

    if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({
        quality: 82,
        mozjpeg: true,
        progressive: true,
        chromaSubsampling: "4:4:4",
      });
    } else if (ext === ".png") {
      pipeline = pipeline.png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 10,
      });
    } else if (ext === ".webp") {
      pipeline = pipeline.webp({ quality: 82, effort: 6 });
    } else if (ext === ".avif") {
      pipeline = pipeline.avif({ quality: 50, effort: 6 });
    }

    const output = await pipeline.toBuffer();
    after += output.length;

    if (!DRY_RUN && output.length < input.length) {
      await fs.writeFile(fullPath, output);
      written += 1;
    }
  } catch {
    errored += 1;
  }
}

const savedBytes = before - after;
const savedMb = savedBytes / 1024 / 1024;
const beforeMb = before / 1024 / 1024;
const afterMb = after / 1024 / 1024;
const savedPct = before > 0 ? (savedBytes / before) * 100 : 0;

console.log(`Files scanned: ${files.length}`);
console.log(`Before: ${beforeMb.toFixed(2)} MB`);
console.log(`After:  ${afterMb.toFixed(2)} MB`);
console.log(`Saved:  ${savedMb.toFixed(2)} MB (${savedPct.toFixed(2)}%)`);
console.log(`Files rewritten: ${written}`);
console.log(`Files skipped (empty): ${skipped}`);
console.log(`Files errored: ${errored}`);
console.log(DRY_RUN ? "Dry run only. No files were modified." : "Compression complete.");
