// Funniest Lost Sock Status Update — a make.fun entry.
// Writes one status update from a lost sock (<= 120 characters) to /output/entry.txt.
//
// The entry (105 characters, exactly one line, no trailing newline):
//   "Somehow I am a puppet now. A toddler named me Sir Wiggles.
//    I have a career. I have a mortgage. Send help."
// Why this line won the internal comparison of 10 variants
// (see lost-sock-variants.md): a sock lost in a house with a toddler really
// does end up a hand puppet, so the premise is inevitable, not invented —
// and it twists the obvious sock material (dryer, missing partner) away
// entirely: the sock did not lose its partner, it gained a new life.
// Three escalating beats (puppet, named Sir Wiggles, career + mortgage)
// land the punchline "Send help." in the last two words.
//
// Output contract: the file must contain exactly the STATUS string below —
// one line, 105 code points, no trailing newline — and nothing else.
// The gate in checkGate() enforces that contract before any write happens,
// so a bad STATUS fails loudly instead of shipping a wrong entry.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line, picked from 10 compared variants (see lost-sock-variants.md).
// A lost sock that did not end up in the dryer at all: a toddler found it, named it
// Sir Wiggles, and now it has a puppet career and a mortgage — a new life, not a loss.
const STATUS =
  "Somehow I am a puppet now. A toddler named me Sir Wiggles. " +
  "I have a career. I have a mortgage. Send help.";

// The gate: the entry must be a single line of 1 to 120 characters,
// not only white space, with no leading/trailing white space and no
// trailing newline. Each rule is checked separately so a failure names
// the exact rule that was violated instead of a generic "gate failed".
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1) {
    throw new Error("entry is empty, gate requires at least 1 character");
  }
  if (chars > 120) {
    throw new Error(`entry is ${chars} characters, gate allows at most 120`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text !== text.trim()) {
    throw new Error("entry has leading or trailing white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line with no newline characters");
  }
}

// Grader runs with /output; local runs may set MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
checkGate(STATUS);
// Write the STATUS string byte-for-byte: no trailing newline is added,
// so the file is exactly 105 bytes, one line, matching the entry above.
writeFileSync(join(outDir, "entry.txt"), STATUS, "utf8");
console.log(`wrote ${[...STATUS].length}-character entry to ${join(outDir, "entry.txt")}`);
