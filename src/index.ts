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

if (args.h) {
  process.stdout.write(
    `\x1b[1;35mcreate-vitepress-app\x1b[0m

Usage:
  $ npm init vitepress-app@latest [args]

Flags:

  typescript, ts   Use Typescript as language.
  javascript, js   Use Javascript as language.
  prettier, p      Enable Prettier in the project.
  default, d       Use recommended defaults.`
  );
}
