#!/usr/bin/env node

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join, resolve } from "path";
import { homedir } from "os";

const SKILL_NAME = "ethglobal-idea-validator";
const SKILL_MD = readFileSync(new URL("./SKILL.md", import.meta.url), "utf8");

const args = process.argv.slice(2);
const projectMode = args.includes("--project");
const cursorMode = args.includes("--cursor");
const allMode = args.includes("--all");

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function write(path, content) {
  writeFileSync(path, content, "utf8");
  console.log(`  wrote → ${path}`);
}

function installClaudeCode(global) {
  const base = global
    ? join(homedir(), ".claude", "skills", SKILL_NAME)
    : join(process.cwd(), ".claude", "skills", SKILL_NAME);
  ensureDir(base);
  write(join(base, "SKILL.md"), SKILL_MD);
  console.log(
    `  Claude Code: skill available as /${SKILL_NAME}${global ? " (global)" : " (project)"}`
  );
}

function installCursor() {
  const rulesDir = join(process.cwd(), ".cursor", "rules");
  ensureDir(rulesDir);
  // Cursor .mdc = plain markdown with an optional frontmatter block Cursor reads
  // Strip Claude Code frontmatter, add Cursor-style description comment at top
  const mdc =
    `---\ndescription: ETHGlobal hackathon idea validator — finds similar past projects, prizes winners, and scores non-winners by worth. Activate when validating a hackathon idea or searching ETHGlobal showcase.\nalwaysApply: false\n---\n\n` +
    SKILL_MD.replace(/^---[\s\S]*?---\n\n?/, "");
  write(join(rulesDir, `${SKILL_NAME}.mdc`), mdc);
  console.log(`  Cursor: rule available in .cursor/rules/${SKILL_NAME}.mdc`);
}

console.log(`\nInstalling ${SKILL_NAME}...\n`);

if (allMode) {
  installClaudeCode(false);
  installCursor();
} else if (cursorMode) {
  installCursor();
} else if (projectMode) {
  installClaudeCode(false);
} else {
  // Default: global Claude Code install
  installClaudeCode(true);
}

console.log("\nDone.\n");
console.log("Usage flags:");
console.log("  (none)       → Claude Code global  (~/.claude/skills/)");
console.log("  --project    → Claude Code project  (.claude/skills/ here)");
console.log("  --cursor     → Cursor               (.cursor/rules/ here)");
console.log("  --all        → Claude Code project + Cursor (both, project-local)");
