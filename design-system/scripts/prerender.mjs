import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const serverOutput = resolve(dist, "server");
const templatePath = resolve(dist, "index.html");
const siteUrl = "https://www.embarpet.com.br";

const pages = {
  "pt-BR": { path: "/", lang: "pt-BR", title: "Transporte Internacional de Pets | Embarpet", description: "Planeje o transporte internacional do seu pet com análise de rota, documentação e possibilidades de embarque." },
  en: { path: "/en/", lang: "en", title: "International Pet Transport | Embarpet", description: "Plan your pet’s international trip with route analysis, documentation and air-travel options." },
  es: { path: "/es/", lang: "es", title: "Transporte Internacional de Mascotas | Embarpet", description: "Planifica el viaje internacional de tu mascota con análisis de ruta, documentación y opciones de transporte aéreo." },
  ja: { path: "/ja/", lang: "ja", title: "国際ペット輸送 | Embarpet", description: "ルート、書類、航空輸送の選択肢を確認しながら、ペットの国際移動を計画できます。" },
};

const { render } = await import(pathToFileURL(resolve(serverOutput, "entry-server.js")).href);
const template = await readFile(templatePath, "utf8");
const alternateLinks = `${Object.entries(pages).map(([locale, page]) => `<link rel="alternate" hreflang="${locale}" href="${siteUrl}${page.path}" />`).join("\n    ")}\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`;

function renderPage(locale, page) {
  const renderedRoot = `<div id="root">${render(locale)}</div>`;
  if (!template.includes('<div id="root"></div>')) throw new Error("Could not find the application root for prerendering.");
  return template
    .replace('<div id="root"></div>', renderedRoot)
    .replace(/<html lang="[^"]+">/, `<html lang="${page.lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${siteUrl}${page.path}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${siteUrl}${page.path}" />`)
    .replace("</head>", `    ${alternateLinks}\n  </head>`);
}

for (const [locale, page] of Object.entries(pages)) {
  const destination = locale === "pt-BR" ? templatePath : resolve(dist, locale, "index.html");
  if (locale !== "pt-BR") await mkdir(resolve(dist, locale), { recursive: true });
  await writeFile(destination, renderPage(locale, page), "utf8");
}

await rm(serverOutput, { recursive: true, force: true });
