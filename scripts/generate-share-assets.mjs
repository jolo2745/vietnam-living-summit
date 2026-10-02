import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const logoPath = `${publicDir}images/vietnam-living-summit-logo-trimmed.png`;
const navy = "#071e32";

await mkdir(`${publicDir}social`, { recursive: true });
const logo = await sharp(logoPath).resize({ width: 620 }).toBuffer();
const shade = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="shade"><stop stop-color="${navy}" stop-opacity=".76"/><stop offset="1" stop-color="${navy}" stop-opacity=".36"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
</svg>`);

for (const [photo, output] of [
  ["hanoi-west-lake-dusk.jpg", "attendee-preview.jpg"],
  ["business-meeting-hero-sharp.jpg", "partner-preview.jpg"],
]) {
  await sharp(`${publicDir}images/${photo}`)
    .resize(1200, 630, { fit: "cover" })
    .composite([{ input: shade }, { input: logo, gravity: "centre" }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${publicDir}social/${output}`);
}

async function icon(size) {
  const logo = await sharp(logoPath).resize({ width: Math.round(size * 0.92) }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: navy } })
    .composite([{ input: logo, gravity: "centre" }])
    .png()
    .toBuffer();
}

await writeFile(`${publicDir}icon.png`, await icon(96));
await writeFile(`${publicDir}apple-touch-icon.png`, await icon(180));

// ICO supports PNG entries, retaining the same artwork at each browser size.
const sizes = [16, 32, 48, 96];
const images = await Promise.all(sizes.map(icon));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (let i = 0; i < sizes.length; i++) {
  const entry = 6 + i * 16;
  directory[entry] = sizes[i];
  directory[entry + 1] = sizes[i];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(images[i].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
}
await writeFile(`${publicDir}favicon.ico`, Buffer.concat([directory, ...images]));
console.log("Generated branded social previews and site icons.");
