#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { glob } from "glob";
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const postsPattern = path.join(rootDir, "_posts/notes/**/*.md");
const outDir = path.join(rootDir, "assets/images/og");

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 64;
const CHAR_WIDTH_RATIO = 0.52;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function slugFromFile(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  return basename.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function wrapText(text, fontSize, maxWidth, maxLines) {
  const charsPerLine = Math.max(8, Math.floor(maxWidth / (fontSize * CHAR_WIDTH_RATIO)));
  const words = String(text).replace(/\s+/g, " ").trim().split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= charsPerLine) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
    } else {
      lines.push(`${word.slice(0, charsPerLine - 1)}…`);
      current = "";
    }

    if (lines.length === maxLines) break;
  }

  if (current && lines.length < maxLines) lines.push(current);

  if (words.join(" ").length > lines.join(" ").length) {
    const lastIndex = Math.min(lines.length, maxLines) - 1;
    const last = lines[lastIndex];
    if (last && !last.endsWith("…")) {
      lines[lastIndex] = `${last.slice(0, Math.max(0, last.length - 1))}…`;
    }
  }

  return lines.slice(0, maxLines);
}

function getTitleLayout(title, { maxSize, minSize, maxLines, maxWidth }) {
  for (let size = maxSize; size >= minSize; size -= 2) {
    const lines = wrapText(title, size, maxWidth, maxLines);
    if (lines.join(" ").replaceAll("…", "").length >= String(title).length - 1) {
      return { size, lines };
    }
  }

  return {
    size: minSize,
    lines: wrapText(title, minSize, maxWidth, maxLines),
  };
}

function imageMime(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".png") return "image/png";
  if (extension === ".webp") return "image/webp";
  return "image/jpeg";
}

function formatDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  const match = String(value ?? "").match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : "note";
}

async function imageDataUri(filePath) {
  const bytes = await fs.readFile(filePath);
  return `data:${imageMime(filePath)};base64,${bytes.toString("base64")}`;
}

function renderPostSvg({ title, dateText, heroDataUri }) {
  const { size, lines } = getTitleLayout(title, {
    maxSize: 62,
    minSize: 42,
    maxLines: 3,
    maxWidth: WIDTH - PAD * 2,
  });
  const lineHeight = size * 1.08;
  const lastBaseline = HEIGHT - 66;
  const firstBaseline = lastBaseline - (lines.length - 1) * lineHeight;
  const metaY = firstBaseline - 48;

  const titleLines = lines
    .map((line, index) => `<text x="${PAD}" y="${firstBaseline + index * lineHeight}" class="title" font-size="${size}">${escapeXml(line)}</text>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
      <stop offset="34%" stop-color="#0b1017" stop-opacity="0" />
      <stop offset="66%" stop-color="#0b1017" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#0b1017" stop-opacity="0.92" />
    </linearGradient>
    <style>
      .title { fill: #ffffff; font-family: Arial, Helvetica, sans-serif; font-weight: 600; letter-spacing: -0.7px; }
      .meta { fill: #f1f1ef; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace; font-size: 19px; font-weight: 500; letter-spacing: 0.5px; }
      .site { fill: #171a1d; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace; font-size: 17px; font-weight: 600; letter-spacing: 0.4px; }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#f3f2ef" />
  <image href="${heroDataUri}" x="0" y="0" width="${WIDTH}" height="${HEIGHT}" preserveAspectRatio="xMidYMid slice" />
  <rect width="100%" height="100%" fill="url(#scrim)" />
  <rect x="${PAD}" y="42" width="192" height="38" rx="19" fill="#f3f2ef" fill-opacity="0.94" />
  <text x="${PAD + 18}" y="67" class="site">halil.cetiner.me</text>
  <text x="${PAD}" y="${metaY}" class="meta">${escapeXml(dateText)}</text>
  ${titleLines}
</svg>`;
}

function renderFallbackSvg() {
  const title = "Notes on reliability, systems, and writing";
  const { size, lines } = getTitleLayout(title, {
    maxSize: 76,
    minSize: 52,
    maxLines: 3,
    maxWidth: WIDTH - 176,
  });
  const lineHeight = size * 1.08;
  const textLines = lines
    .map((line, index) => `<text x="88" y="${196 + index * lineHeight}" font-size="${size}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace" font-weight="700" fill="#101010">${escapeXml(line)}</text>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3f2ef" />
  <line x1="88" y1="92" x2="1112" y2="92" stroke="#2f2f2f" stroke-width="2" />
  <line x1="88" y1="538" x2="1112" y2="538" stroke="#2f2f2f" stroke-width="2" />
  <text x="88" y="72" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace" font-size="18" font-weight="600" fill="#5c5c5c">halil.cetiner.me</text>
  ${textLines}
  <text x="88" y="516" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace" font-size="24" font-weight="600" fill="#2a2a2a">by Halil Cetiner</text>
</svg>`;
}

async function writePng(name, svgContent) {
  const resvg = new Resvg(svgContent, { fitTo: { mode: "width", value: WIDTH } });
  const pngData = resvg.render().asPng();
  await fs.writeFile(path.join(outDir, `${name}.png`), pngData);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const files = await glob(postsPattern, { nodir: true });

  const jobs = files.map(async (file) => {
    const raw = await fs.readFile(file, "utf8");
    const fm = matter(raw).data ?? {};
    const slug = slugFromFile(file);
    const title = fm.title || slug;
    const dateText = formatDate(fm.date);
    const heroPath = fm.image ? path.join(rootDir, String(fm.image).replace(/^\/+/, "")) : null;
    const svg = heroPath
      ? renderPostSvg({ title, dateText, heroDataUri: await imageDataUri(heroPath) })
      : renderFallbackSvg();
    await writePng(slug, svg);
    return slug;
  });

  const slugs = await Promise.all(jobs);
  await writePng("default", renderFallbackSvg());
  console.log(`Generated ${slugs.length} hero-backed OG card(s) and one fallback in ${path.relative(rootDir, outDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
