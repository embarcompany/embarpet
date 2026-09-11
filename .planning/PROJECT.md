# Embarpet — Plataforma Digital & Site Conversivo

## 1. Visão Geral & Contexto do Negócio
A **Embarpet (Grupo Embarcompany)** é especialista em mobilidade aérea internacional de animais de estimação (cães, gatos, aves e silvestres/exóticos). O produto digital tem como objetivo central reduzir a ansiedade de tutores em viagens internacionais complexas e qualificar a rota antes do atendimento humano pelo WhatsApp.

### Princípios Inegociáveis:
1. **A rota é a unidade de conversão:** Origem, destino, porte e prazo vêm antes de preço ou exigências regulatórias extensas.
2. **Autoridade no contexto:** Credenciais reais (IPATA/IATA, +2.000 embarques, casos verificáveis) sustentam cada argumento sem promessas falsas.
3. **Sem sombras ou clichês visuais:** Design editorial estruturado por bordas de 1px (`--ep-line`), paleta semântica (`Teal`, `Turquesa`, `Lime`) e tipografia única em **Montserrat**.
4. **Contrato Canônico de Leads:** Qualquer ponto de entrada (Hero, modal de diagnóstico, WhatsApp, destinos) produz o mesmo schema tipado `PublicLead` de [`src/lib/lead-contract.ts`](../src/lead-contract.ts).

---

## 2. Arquitetura Técnica
- **Framework:** React 19 + TypeScript 5.7 + Vite 6.
- **Renderização:** SSR + SSG Prerender estático com `scripts/prerender.mjs` e `src/entry-server.tsx`.
- **Estilos:** Tailwind CSS + CSS modularizado por feature e tokens semânticos em `src/design-system/`.
- **Hospedagem & CI:** Vercel (com headers imutáveis de cache e rewrites de rotas) + GitHub Actions para Quality Gate.
- **Base de Dados Global:** Índice de aeroportos e cidades em `src/data/`.

---

## 3. Estrutura do Repositório
```text
EMBARPET/
├── public/                       # 97 assets globais (logos, flags, vídeos, sitemap)
├── src/
│   ├── app/App.tsx               # Shell e roteamento da aplicação
│   ├── design-system/            # Tokens, botões, ícones e primitivas puras
│   ├── features/                 # Módulos de negócio (home, destinations, modalities, analysis, thank-you)
│   ├── components/ui/            # Componentes de interface compartilhados (navigation, footer, modal)
│   ├── data/                     # Dados estáticos (aeroportos, busca)
│   ├── lib/                      # Analytics, SEO, Lead Contract
│   └── i18n/                     # Internacionalização (pt-BR, en, es, ja)
├── scripts/                      # prerender.mjs e build utilities
├── .planning/                    # Memória de planejamento GSD (ROADMAP, REQUIREMENTS, STATE)
└── docs/                         # Estratégia, auditoria e copy
```

---

## 4. Governança de Git & Release
- **Branch de Produção:** `main`
- **Release Tag:** `v1.0.0-foundation-destinations`
- **Padrão de Branches:** `feat/*`, `fix/*`, `refactor/*` via Pull Requests com CI.
