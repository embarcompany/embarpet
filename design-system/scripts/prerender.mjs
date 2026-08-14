import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const serverOutput = resolve(dist, "server");
const templatePath = resolve(dist, "index.html");

const { render } = await import(pathToFileURL(resolve(serverOutput, "entry-server.js")).href);
const template = await readFile(templatePath, "utf8");
const html = template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);

if (html === template) throw new Error("Não foi possível localizar o root da aplicação para pré-renderização.");

await writeFile(templatePath, html, "utf8");
await rm(serverOutput, { recursive: true, force: true });
