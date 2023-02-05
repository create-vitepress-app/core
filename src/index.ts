/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prompts, { Falsy } from "prompts";
import { downloadTemplate } from "giget";
import Spinner from "kisig";
import larser from "larser";

const args = larser(process.argv, {
  aliases: {
    language: ["l"],
    prettier: ["p"],
    help: ["h"],
  },
});

if (args.h) {
  console.log(
    `\x1b[1;94mcreate-vitepress-app\x1b[0m

Usage:

  $ npm init vitepress-app@latest [directory] [args]

Flags:

  language, l   Language to use. (ts, js)
  prettier, p   Enable Prettier in the project.

Options:

  directory     Directory to create project in.`
  );
}
