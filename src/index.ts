/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import prompts, { type Falsy } from "prompts";
import { downloadTemplate } from "giget";
import Spinner from "kisig";
import larser from "larser";
import { readFile, writeFile } from "fs/promises";
import { execSync } from "node:child_process";

const args = larser(process.argv, {
  aliases: {
    language: ["l"],
    prettier: ["p"],
    packageManager: ["m"],
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

console.clear();

console.log(`\x1b[1;94mcreate-vitepress-app\x1b[0m`);
process.on("SIGINT", process.exit);
const answers = await prompts(
  [
    {
      name: "d",
      message: "Where do you want to create your Vitepress app ?",
      type: args._[0] ? (null as Falsy) : "text",
    },
    {
      name: "l",
      message: "What language do you want to use ?",
      type: args.l ? (null as Falsy) : "select",
      choices: [
        { title: "Typescript", value: "ts" },
        { title: "Javascript", value: "js" },
      ],
    },
    {
      name: "p",
      message: "Do you want to enable prettier ?",
      type: args.p ? (null as Falsy) : "toggle",
      initial: true,
      active: "yes",
      inactive: "no",
    },
  ],
  {
    onCancel: () => process.exit(),
  }
);

if (answers.l) args.l = answers.l;
if (answers.d) args._[0] = answers.d;
if (answers.p) args.p = answers.p;

const dir = args._[0].replace(/\/$/, "");

const spinner = new Spinner("Initializing your Vitepress app...");

try {
  const base = "github:create-vitepress-app/core/templates/";
  const cfg = { force: true, dir };

  await Promise.all([
    downloadTemplate(`${base}shared`, cfg),
    downloadTemplate(`${base}${args.l}`, cfg),
    args.p ? downloadTemplate(`${base}prettier`, cfg) : Promise.resolve(),
  ]);

  if (args.p) {
    const data = await readFile(`${dir}/package.json`, "utf-8");
    const obj = JSON.parse(data);

    obj.devDependencies.prettier = "^2.8.3";

    await writeFile(`${dir}/package.json`, JSON.stringify(obj));
  }

  spinner.success();
} catch (err) {
  spinner.error(err);
  process.exit(1);
}

console.clear();

const nextSteps = [
  "\x1b[1;94mNext steps:\x1b[0m",
  dir === "." ? "" : `\n· cd ${dir}`,
  "",
  "\n· npm start",
];

const answer = await prompts(
  {
    message: "Would you like to install dependencies now ?",
    type: args.m ? (null as Falsy) : "select",
    name: "m",
    choices: [
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" },
      { title: "pnpm", value: "pnpm" },
      { title: "No", value: "n" },
    ],
  },
  {
    onCancel: () => process.exit(0),
  }
);

if (answer.m) args.m = answer.m;

if (args.m === "n") {
  nextSteps[2] = "\n· npm install";
} else {
  execSync(`cd ${dir} && ${args.m} install`, {
    stdio: "inherit",
  });
}

console.clear();
console.log(...nextSteps);
