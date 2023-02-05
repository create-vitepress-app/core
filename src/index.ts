/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prompts, { Falsy } from "prompts";
import { downloadTemplate } from "giget";
import Spinner from "kisig";
import larser from "larser";

const args = larser(process.argv, {
  aliases: {
    typescript: ["ts"],
    javascript: ["js"],
    prettier: ["p"],
    default: ["d"],
    help: ["h"],
  },
});

if (args.ts && args.js) {
  console.error("Conflicting Arguments: --ts and --js");
  process.exit(1);
}

if (args.h) {
  console.log(
    `\x1b[1;94mcreate-vitepress-app\x1b[0m

Usage:

  $ npm init vitepress-app@latest [directory] [args]

Flags:

  typescript, ts   Use Typescript as language.
  javascript, js   Use Javascript as language.
  prettier, p      Enable Prettier in the project.
  default, d       Use recommended defaults.

Options:

  directory        Directory to create project in.`
  );
}
