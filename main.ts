import * as fs from "node:fs";
import * as path from "node:path";

// One Word From Your Ex.
//
// The single word my ex would use to describe me: "almost".
// Almost the one. Almost grown up. Almost ready. Almost worth staying for.
// It is not an insult, it is a verdict, and that is exactly why it stings:
// every almost is a door that stayed shut by one inch.
const WORD = "almost";
const OUTPUT_NAME = "entry.txt";
const FALLBACK_OUTPUT_DIR = "/output";

function outputDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR;
  return configured !== undefined && configured !== "" ? configured : FALLBACK_OUTPUT_DIR;
}

function emptyDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
  for (const name of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

function run(): void {
  const dir = outputDir();
  emptyDir(dir);
  fs.writeFileSync(path.join(dir, OUTPUT_NAME), `${WORD}\n`, "utf8");
}

run();
