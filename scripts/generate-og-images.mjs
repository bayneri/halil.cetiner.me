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
const postsPattern = path.join(rootDir, "_posts/**/*.md");
const outDir = path.join(rootDir, "assets/images/og");

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 88;
const TITLE_FONT_MAX = 80;
const TITLE_FONT_MIN = 54;
const META_FONT = 24;
const SMALL_FONT = 18;
const LINE_HEIGHT = 1.08;
const MAX_TITLE_LINES = 4;
const CHAR_WIDTH_RATIO = 0.56;

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

function wrapMonospace(text, fontSize, maxWidth, maxLines) {
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
      lines.push(word.slice(0, charsPerLine - 1) + "…");
      current = "";
    }
    if (lines.length === maxLines) {
      return lines;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (lines.length > maxLines) {
    lines.length = maxLines;
  }

  if (words.join(" ").length > lines.join(" ").length) {
    const last = lines[maxLines - 1];
    if (last && !last.endsWith("…")) {
      lines[maxLines - 1] = `${last.slice(0, Math.max(0, last.length - 1))}…`;
    }
  }

  return lines;
}

function getTitleLayout(title) {
  const titleMaxWidth = WIDTH - PAD * 2;
  for (let size = TITLE_FONT_MAX; size >= TITLE_FONT_MIN; size -= 4) {
    const lines = wrapMonospace(title, size, titleMaxWidth, MAX_TITLE_LINES);
    if (lines.length <= MAX_TITLE_LINES) {
      return { size, lines };
    }
  }
  return {
    size: TITLE_FONT_MIN,
    lines: wrapMonospace(title, TITLE_FONT_MIN, titleMaxWidth, MAX_TITLE_LINES),
  };
}

function renderSvg({ title, domain, dateText }) {
  const { size: titleSize, lines } = getTitleLayout(title);
  const linePixels = titleSize * LINE_HEIGHT;
  const titleStartY = 196;
  const titleX = PAD;

  const textLines = lines
    .map((line, index) => {
      const y = titleStartY + index * linePixels;
      return `<text x="${titleX}" y="${y}" class="title" font-size="${titleSize}" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace" font-weight="700">${escapeXml(line)}</text>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .title { fill: #101010; letter-spacing: -0.2px; }
      .meta {
        fill: #2a2a2a;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
        font-size: ${META_FONT}px;
        font-weight: 600;
      }
      .small {
        fill: #5c5c5c;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
        font-size: ${SMALL_FONT}px;
        font-weight: 600;
        letter-spacing: 0.4px;
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#f3f2ef"/>
  <line x1="${PAD}" y1="92" x2="${WIDTH - PAD}" y2="92" stroke="#2f2f2f" stroke-width="2"/>
  <line x1="${PAD}" y1="${HEIGHT - 92}" x2="${WIDTH - PAD}" y2="${HEIGHT - 92}" stroke="#2f2f2f" stroke-width="2"/>
  <text x="${PAD}" y="72" class="small">halil.cetiner.me</text>
  <text x="${WIDTH - PAD}" y="72" class="small" text-anchor="end">${escapeXml(dateText)}</text>
  ${textLines}
  <text x="${PAD}" y="${HEIGHT - 114}" class="meta">
    <tspan font-weight="400">by </tspan>
    <tspan font-weight="700">Halil Cetiner</tspan>
  </text>
</svg>`;
}

async function writePng(name, svgContent) {
  const resvg = new Resvg(svgContent, {
    fitTo: { mode: "width", value: WIDTH },
  });
  const pngData = resvg.render().asPng();
  const outPath = path.join(outDir, `${name}.png`);
  await fs.writeFile(outPath, pngData);
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const files = await glob(postsPattern, { nodir: true });
  const domain = "halil.cetiner.me";

  const jobs = files.map(async (file) => {
    const raw = await fs.readFile(file, "utf8");
    const fm = matter(raw).data ?? {};
    const slug = slugFromFile(file);
    const title = fm.title || slug;
    const dateText = fm.date ? String(fm.date).slice(0, 10) : "note";
    const svg = renderSvg({ title, domain, dateText });
    await writePng(slug, svg);
    return slug;
  });

  const slugs = await Promise.all(jobs);
  const defaultSvg = renderSvg({
    title: "Notes on reliability, systems, and writing",
    domain,
    dateText: "archive",
  });
  await writePng("default", defaultSvg);

  console.log(`Generated ${slugs.length + 1} OG image(s) in ${path.relative(rootDir, outDir)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
