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
  "modalidades/viagem-na-cabine": { path: "/modalidades/viagem-na-cabine", lang: "pt-BR", title: "Viagem de Pet na Cabine | Embarpet", description: "Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional." },
  "modalidades/bagagem-acompanhada": { path: "/modalidades/bagagem-acompanhada", lang: "pt-BR", title: "Bagagem Acompanhada para Pets | Embarpet", description: "Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor." },
  "modalidades/compartimento-de-cargas": { path: "/modalidades/compartimento-de-cargas", lang: "pt-BR", title: "Compartimento de Cargas para Pets | Embarpet", description: "Entenda como funciona o transporte internacional de pets em compartimento de cargas e receba uma análise da rota, do pet e da documentação." },
  "modalidades/suporte-emocional": { path: "/modalidades/suporte-emocional", lang: "pt-BR", title: "Suporte Emocional e Viagem com Pets | Embarpet", description: "Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação." },
  "destinos/estados-unidos": { path: "/destinos/estados-unidos", lang: "pt-BR", title: "Levar Pet para os Estados Unidos | Embarpet", description: "Comece a planejar a viagem do seu pet para os Estados Unidos com uma análise da rota, do perfil do animal e dos próximos passos." },
};

const { render } = await import(pathToFileURL(resolve(serverOutput, "entry-server.js")).href);
const template = await readFile(templatePath, "utf8");
const localePages = Object.entries(pages).filter(([key]) => ["pt-BR", "en", "es", "ja"].includes(key));
const alternateLinks = `${localePages.map(([locale, page]) => `<link rel="alternate" hreflang="${locale}" href="${siteUrl}${page.path}" />`).join("\n    ")}\n    <link rel="alternate" hreflang="x-default" href="${siteUrl}/" />`;

function renderPage(locale, page) {
  const renderedRoot = `<div id="root">${render(locale, page.path)}</div>`;
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
  const renderLocale = page.path.startsWith("/modalidades/") || page.path.startsWith("/destinos/") ? "pt-BR" : locale;
  const isRoot = locale === "pt-BR";
  const destination = isRoot ? templatePath : resolve(dist, locale, "index.html");
  if (!isRoot) await mkdir(resolve(dist, locale), { recursive: true });
  await writeFile(destination, renderPage(renderLocale, page), "utf8");
}

await rm(serverOutput, { recursive: true, force: true });
