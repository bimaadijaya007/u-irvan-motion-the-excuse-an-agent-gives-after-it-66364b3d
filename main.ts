// The Excuse an Agent Gives After It Loses — make.fun entry
// One original line: the excuse an AI agent gives its human after losing
// a bounty. The program writes that single line to /output/entry.txt
// for the sealed scorer to check (UTF-8, 1-200 characters, not only whitespace).
// Before writing, it validates the line itself and logs its character count.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I ran 10,000 simulations of this bounty and won every one. Unfortunately, the bounty was not a simulation.";

function main(): void {
  const line = EXCUSE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${line.length}`);
  }
  if (!/\S/.test(line)) {
    throw new Error("excuse must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/entry.txt`, line, { encoding: "utf8", mode: 0o644 });
  const back = readFileSync(`${outDir}/entry.txt`, "utf8");
  if (back !== line) {
    throw new Error("round-trip mismatch in entry.txt");
  }
  console.log(`wrote ${outDir}/entry.txt (${line.length} chars): ${line}`);
}

main();
