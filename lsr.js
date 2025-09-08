// lsr.js
const fs = require("fs");
const path = require("path");

const IGNORE = [
  "node_modules",
  ".next",
  ".git",
  "dist",
  "out",
  ".turbo",
  "coverage",
];

function listDir(dir, depth = 0, maxDepth = 6) {
  if (depth > maxDepth) return "";
  let indent = "  ".repeat(depth);
  let output = "";

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (IGNORE.includes(item.name)) continue;
      output += `${indent}${item.name}\n`;
      if (item.isDirectory()) {
        output += listDir(path.join(dir, item.name), depth + 1, maxDepth);
      }
    }
  } catch (e) {
    // skip permission errors etc
  }

  return output;
}

console.log(listDir(process.cwd(), 0, 4));
