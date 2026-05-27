import fs from "fs";
import path from "path";

const OBSIDIAN_IMAGES = path.join(process.env.HOME, "Desktop/Research-phenomena/blog-drafts");
const ASTRO_IMAGES = path.join(process.cwd(), "website/public/images");

console.log("Watching Obsidian images folder...");

// ensure destination exists
if (!fs.existsSync(ASTRO_IMAGES)) {
  fs.mkdirSync(ASTRO_IMAGES, { recursive: true });
}

// watch folder
fs.watch(OBSIDIAN_IMAGES, (eventType, filename) => {
  if (!filename) return;

  const src = path.join(OBSIDIAN_IMAGES, filename);
  const dest = path.join(ASTRO_IMAGES, filename);

  // ignore non-files
  if (!fs.existsSync(src)) return;

  // copy file
  fs.copyFileSync(src, dest);

  console.log(`Copied: ${filename} → /public/images`);
});