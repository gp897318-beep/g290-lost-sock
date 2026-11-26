// Funniest Lost Sock Status Update — a make.fun entry.
// Writes one status update from a lost sock (<= 120 characters) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line, picked from 10 compared variants (see lost-sock-variants.md).
// A lost sock that did not end up in the dryer at all: a toddler found it, named it
// Sir Wiggles, and now it has a puppet career and a mortgage — a new life, not a loss.
const STATUS =
  "Somehow I am a puppet now. A toddler named me Sir Wiggles. " +
  "I have a career. I have a mortgage. Send help.";

// The gate: 1 to 120 characters, not only white space.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 120) {
    throw new Error(`entry is ${chars} characters, gate is 1-120`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// Grader runs with /output; local runs may set MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
checkGate(STATUS);
writeFileSync(join(outDir, "entry.txt"), STATUS, "utf8");
console.log(`wrote ${[...STATUS].length}-character entry to ${join(outDir, "entry.txt")}`);
