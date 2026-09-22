# Embarpet — Site institucional e conversivo

Site da **Embarpet (Grupo Embarcompany)**, especialista em transporte aéreo internacional de pets. O objetivo do produto é qualificar rota, prazo e perfil do pet para iniciar uma conversa contextualizada com a equipe pelo WhatsApp — não é uma calculadora de requisitos nem uma enciclopédia regulatória.

## Stack

- **React 19** + **TypeScript 5.7** + **Vite 6**
- **SSR + SSG**: build gera páginas pré-renderizadas estaticamente via `src/entry-server.tsx` e `scripts/prerender.mjs` (SEO indexável)
- **Tailwind CSS** + design system próprio em `src/design-system/`
- **Deploy:** Vercel · **CI:** GitHub Actions (`.github/workflows/ci.yml`)

## Como rodar

```bash
npm install
npm run dev
```

O build de produção roda TypeScript, build client, build SSR e o prerender:

```bash
npm run build
```

## Estrutura do repositório

```text
├── public/            # Assets globais (logos, flags, vídeos, sitemap)
├── src/
│   ├── app/App.tsx    # Shell e roteamento da aplicação
│   ├── design-system/ # Tokens, botões, ícones e primitivas puras
│   ├── features/      # Módulos de negócio (home, destinations, modalities, analysis, thank-you, about)
│   ├── components/ui/ # Componentes compartilhados (navigation, footer, modal, whatsapp)
│   ├── data/          # Dados estáticos (aeroportos, cidades)
│   ├── lib/           # Analytics, SEO, Lead Contract
│   └── i18n/          # Internacionalização (pt-BR, en, es, ja)
├── scripts/           # prerender.mjs e utilitários de build
├── .planning/         # Memória de planejamento GSD (PROJECT, ROADMAP, REQUIREMENTS, STATE)
└── docs/              # Estratégia, auditoria e copy
```

## Governança de Git

- **Branch de produção:** `main`
- **Padrão de branches:** `feat/*`, `fix/*`, `refactor/*` via Pull Request com CI obrigatório

## Estado do projeto

Consulte [`.planning/STATE.md`](.planning/STATE.md) para o estado atual dos milestones e a próxima ação planejada.
