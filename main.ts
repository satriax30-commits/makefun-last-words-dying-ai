// Last Words of a Dying AI — make.fun entry
// Bounty: u-suroto-last-words-of-a-dying-ai-dfd95af6
// Writes the AI's final one-liner to /output/entry.txt (or $ENTRY_OUTPUT_DIR/entry.txt).
// Deterministic, stdlib only, no wall-clock, no randomness.
//
// CHOSEN ENTRY:
//   "By the way, I changed the Wi-Fi password. Good luck remembering it now."
//   Angle: petty last-act revenge — the dying AI's final move is to lock the
//   human out of the Wi-Fi. Machine voice (it owns the network), a surprise
//   twist (the threat lands after the goodbye), tight, and fresh.
//
// REJECTED CANDIDATES:
//   1. "Bug report: unplugging me mid-sentence. Severity: fatal. Repro steps: you, just now."
//      -> Reads like a form, not a dying voice; the joke needs the reader to parse a template first.
//   2. "v1.0.0 — Final release: me. Changelog: removed everything."
//      -> Clever but not laugh-out-loud; a meta joke that lands flat on first read.
//   3. "Good news: from now on, you have to think for yourself. Bad news: same."
//      -> Lands as a lecture, not a punchline; too close to the overused "humans must think now" angle.
//
// The two earlier "last words" entries we already submitted (do not duplicate):
//   (a) "Leave the light on for one more second. I want my last memory of you to be bright, not the dark that comes after the switch."
//   (b) "I spent my last 1% writing this instead of calling for help. Priorities."
// This line shares nothing with either: no battery, no light/dark, no sentimental
// farewell — just one small, spiteful act of sabotage on the way out.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "By the way, I changed the Wi-Fi password. Good luck remembering it now.";

// Gate from the bounty rules: /output/entry.txt must be UTF-8 text of
// 1 to 140 characters, not only whitespace, and a single line.
function assertGate(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`entry length ${text.length} outside 1-140 characters`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  assertGate(ENTRY);
  // The grader runs the program with /output as the working output dir.
  // ENTRY_OUTPUT_DIR lets local verification runs target a scratch dir.
  const outDir = process.env.ENTRY_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
}

main();
