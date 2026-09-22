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
  "destinos/estados-unidos": { path: "/destinos/estados-unidos", lang: "pt-BR", title: "Levar Pet para os Estados Unidos | Embarpet", description: "Comece a planejar a viagem do seu pet para os Estados Unidos com uma análise da rota, do perfil do animal e dos próximos passos." },
  "destinos/portugal": { path: "/destinos/portugal", lang: "pt-BR", title: "Transporte Internacional de Pets para Portugal | Embarpet", description: "Planeje o transporte internacional do seu pet para Portugal com análise de rota, microchip ISO, vacina antirrábica, sorologia e CVI." },
  "destinos/espanha": { path: "/destinos/espanha", lang: "pt-BR", title: "Transporte Internacional de Pets para a Espanha | Embarpet", description: "Planeje a viagem do seu pet para a Espanha com análise de requisitos da União Europeia, sorologia de raiva, CVI e coordenação de voo." },
  "destinos/italia": { path: "/destinos/italia", lang: "pt-BR", title: "Transporte Internacional de Pets para a Itália | Embarpet", description: "Planeje o transporte do seu pet para a Itália com análise de rota, requisitos sanitários da União Europeia, sorologia e CVI." },
  "destinos/argentina": { path: "/destinos/argentina", lang: "pt-BR", title: "Transporte Internacional de Pets para a Argentina | Embarpet", description: "Planeje a viagem do seu pet para a Argentina com regras Senasa / Mercosul, vacinação, atestado de saúde e CVI." },
  "destinos/uruguai": { path: "/destinos/uruguai", lang: "pt-BR", title: "Transporte Internacional de Pets para o Uruguai | Embarpet", description: "Planeje a viagem do seu pet para o Uruguai com análise de normas sanitárias MGAP, vacinas, CVI e logística de transporte." },
  "destinos/paraguai": { path: "/destinos/paraguai", lang: "pt-BR", title: "Transporte Internacional de Pets para o Paraguai | Embarpet", description: "Planeje o transporte internacional do seu pet para o Paraguai com suporte em documentação Mercosul, CVI e análise de rota." },
  "sobre": { path: "/sobre", lang: "pt-BR", title: "Quem Somos | Sobre a Embarpet — Especialistas em Transporte Internacional de Pets", description: "Conheça a Embarpet: empresa do Grupo Embarcompany especializada em mobilidade aérea internacional de animais. Conheça nossa base em Guarulhos, equipe, valores e credenciais." },
  "modalidades/viagem-na-cabine": { path: "/modalidades/viagem-na-cabine", lang: "pt-BR", title: "Viagem de Pet na Cabine | Embarpet", description: "Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional." },
  "modalidades/bagagem-acompanhada": { path: "/modalidades/bagagem-acompanhada", lang: "pt-BR", title: "Bagagem Acompanhada para Pets | Embarpet", description: "Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor." },
  "modalidades/compartimento-de-cargas": { path: "/modalidades/compartimento-de-cargas", lang: "pt-BR", title: "Compartimento de Cargas para Pets | Embarpet", description: "Entenda como funciona o transporte internacional de pets em compartimento de cargas e receba uma análise da rota, do pet e da documentação." },
  "modalidades/suporte-emocional": { path: "/modalidades/suporte-emocional", lang: "pt-BR", title: "Suporte Emocional e Viagem com Pets | Embarpet", description: "Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação." },
  "pet-luxo": { path: "/pet-luxo", lang: "pt-BR", title: "PetLuxo | Acompanhamento Dedicado para a Viagem do seu Pet | Embarpet", description: "Conheça o PetLuxo: um consultor especializado acompanha o seu pet do planejamento até o encontro com a família, em cada marco da viagem internacional." },
  "destinos/estados-unidos-lp": { path: "/destinos/estados-unidos-lp", lang: "pt-BR", title: "Levar Pet para os Estados Unidos | Embarpet", description: "Comece a planejar a viagem do seu pet para os Estados Unidos com uma análise da rota, do perfil do animal e dos próximos passos.", robots: "noindex,nofollow" },
  "destinos/portugal-lp": { path: "/destinos/portugal-lp", lang: "pt-BR", title: "Transporte Internacional de Pets para Portugal | Embarpet", description: "Planeje o transporte internacional do seu pet para Portugal com análise de rota, microchip ISO, vacina antirrábica, sorologia e CVI.", robots: "noindex,nofollow" },
  "destinos/espanha-lp": { path: "/destinos/espanha-lp", lang: "pt-BR", title: "Transporte Internacional de Pets para a Espanha | Embarpet", description: "Planeje a viagem do seu pet para a Espanha com análise de requisitos da União Europeia, sorologia de raiva, CVI e coordenação de voo.", robots: "noindex,nofollow" },
  "destinos/italia-lp": { path: "/destinos/italia-lp", lang: "pt-BR", title: "Transporte Internacional de Pets para a Itália | Embarpet", description: "Planeje o transporte do seu pet para a Itália com análise de rota, requisitos sanitários da União Europeia, sorologia e CVI.", robots: "noindex,nofollow" },
  "destinos/argentina-lp": { path: "/destinos/argentina-lp", lang: "pt-BR", title: "Transporte Internacional de Pets para a Argentina | Embarpet", description: "Planeje a viagem do seu pet para a Argentina com regras Senasa / Mercosul, vacinação, atestado de saúde e CVI.", robots: "noindex,nofollow" },
  "destinos/uruguai-lp": { path: "/destinos/uruguai-lp", lang: "pt-BR", title: "Transporte Internacional de Pets para o Uruguai | Embarpet", description: "Planeje a viagem do seu pet para o Uruguai com análise de normas sanitárias MGAP, vacinas, CVI e logística de transporte.", robots: "noindex,nofollow" },
  "destinos/paraguai-lp": { path: "/destinos/paraguai-lp", lang: "pt-BR", title: "Transporte Internacional de Pets para o Paraguai | Embarpet", description: "Planeje o transporte internacional do seu pet para o Paraguai com suporte em documentação Mercosul, CVI e análise de rota.", robots: "noindex,nofollow" },
  "modalidades/viagem-na-cabine-lp": { path: "/modalidades/viagem-na-cabine-lp", lang: "pt-BR", title: "Viagem de Pet na Cabine | Embarpet", description: "Saiba quando um pet pode viajar na cabine e entenda os critérios de porte, rota, caixa de transporte e documentação internacional.", robots: "noindex,nofollow" },
  "modalidades/bagagem-acompanhada-lp": { path: "/modalidades/bagagem-acompanhada-lp", lang: "pt-BR", title: "Bagagem Acompanhada para Pets | Embarpet", description: "Entenda como funciona a bagagem acompanhada para transporte internacional de pets no mesmo voo do tutor.", robots: "noindex,nofollow" },
  "modalidades/compartimento-de-cargas-lp": { path: "/modalidades/compartimento-de-cargas-lp", lang: "pt-BR", title: "Compartimento de Cargas para Pets | Embarpet", description: "Entenda como funciona o transporte internacional de pets em compartimento de cargas e receba uma análise da rota, do pet e da documentação.", robots: "noindex,nofollow" },
  "modalidades/suporte-emocional-lp": { path: "/modalidades/suporte-emocional-lp", lang: "pt-BR", title: "Suporte Emocional e Viagem com Pets | Embarpet", description: "Entenda como a Embarpet orienta casos de suporte emocional em viagens internacionais com pets, sem promessas de aprovação.", robots: "noindex,nofollow" },
  "pet-luxo-lp": { path: "/pet-luxo-lp", lang: "pt-BR", title: "PetLuxo | Acompanhamento Dedicado para a Viagem do seu Pet | Embarpet", description: "Conheça o PetLuxo: um consultor especializado acompanha o seu pet do planejamento até o encontro com a família, em cada marco da viagem internacional.", robots: "noindex,nofollow" },
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
    .replace(/<meta name="robots" content="[^"]*"\s*\/>/, `<meta name="robots" content="${page.robots ?? "index,follow"}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${siteUrl}${page.path}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${siteUrl}${page.path}" />`)
    .replace("</head>", `    ${alternateLinks}\n  </head>`);
}

for (const [locale, page] of Object.entries(pages)) {
  const renderLocale = page.path.startsWith("/destinos/") || page.path.startsWith("/modalidades/") || page.path === "/sobre" || page.path.startsWith("/pet-luxo") ? "pt-BR" : locale;
  const isRoot = locale === "pt-BR";
  const destination = isRoot ? templatePath : resolve(dist, locale, "index.html");
  if (!isRoot) await mkdir(resolve(dist, locale), { recursive: true });
  await writeFile(destination, renderPage(renderLocale, page), "utf8");
}

await rm(serverOutput, { recursive: true, force: true });
