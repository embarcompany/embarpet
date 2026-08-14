# Backlog técnico — SEO, GEO, conversão e performance

**Status:** em execução — Fase 1 iniciada em 14 de agosto de 2026
**Escopo:** index Embarpet em `design-system/`  
**Princípio:** publicar somente claims, credenciais e regras com aprovação interna e fonte registrável.

## Objetivo

Fazer a home ser encontrada, compreendida e convertida com segurança: visitantes iniciam a análise; buscadores e IAs entendem a Embarpet como especialista em transporte internacional de pets; marketing mede o avanço até o lead qualificado.

## Pré-requisitos de negócio

| ID | Decisão necessária | Dono sugerido | Saída esperada |
|---|---|---|---|
| DEC-01 | Confirmar domínio canônico | direção + web | URL final com HTTPS, preferencialmente `https://www.embarpet.com.br/` |
| DEC-02 | Validar volume, Google e IATA/IPATA | operação + direção | fonte, data de corte e aprovação por claim |
| DEC-03 | Definir analytics | marketing | IDs GA4/GTM e política de consentimento |
| DEC-04 | Validar regras e links das modalidades | operação + jurídico | matriz de conteúdo aprovado |
| DEC-05 | Confirmar root directory da Vercel | web | local correto de `vercel.json` e headers |

## Fase 1 — Fundação SEO e entidade pública

| ID | Tarefa técnica | Arquivos principais | Critério de aceite |
|---|---|---|---|
| SEO-01 | Title, description, canonical, robots e OG/Twitter | `design-system/index.html` | title aprovado, description, canonical final e metatags completas |
| SEO-02 | Imagem social 1200×630 | `design-system/public/og-embarpet.jpg` | aparece corretamente no debugger de compartilhamento |
| SEO-03 | `robots.txt` e `sitemap.xml` | `design-system/public/` | ambos respondem 200 e apontam ao domínio canônico |
| SEO-04 | Schema `Organization`, `LocalBusiness` e `Service` | `index.html` ou módulo pré-renderizado | Rich Results Test sem erros e sem dados não validados |
| SEO-05 | Schema `FAQPage` | `HomePage.tsx` + schema | schema coincide com FAQ visível |
| SEO-06 | Padronizar autoridade em texto | `HomePage.tsx`, `patterns.tsx`, `case-drag-cards.tsx` | uma única versão aprovada: `+2.000 pets transportados`; IATA/IPATA também em texto |

**Progresso:** SEO-01 e SEO-03 foram implementados com o domínio canônico assumido em DEC-01; Organization, Service e uma base de FAQPage também foram adicionados. A imagem Open Graph ainda usa o asset editorial existente e deve ser substituída por uma composição social 1200×630 aprovada em SEO-02. LocalBusiness permanece pendente para não publicar endereço/CNPJ sem validação. RENDER-01 e RENDER-02 foram iniciados com pré-render estático da home no build Vite.

**Dependências:** DEC-01 e DEC-02.  
**Fora de escopo:** criar LPs ou trocar o design system.

## Fase 2 — HTML inicial indexável

| ID | Tarefa técnica | Arquivos principais | Critério de aceite |
|---|---|---|---|
| RENDER-01 | Escolher estratégia de pré-render para Vite | `vite.config.ts`, `package.json` | decisão documentada e build reproduzível |
| RENDER-02 | Pré-renderizar `/` durante o build | scripts/configuração em `design-system/` | `dist/index.html` já contém H1, copy, FAQ e links principais |
| RENDER-03 | Hidratar apenas interações | `main.tsx`, `App.tsx` quando necessário | formulário, menu, carrosséis e animações permanecem funcionais |
| RENDER-04 | Validar HTML publicado | build + produção | crawler sem JS encontra conteúdo e não há divergência relevante entre HTML e tela |

**Direção:** pré-render estático da home, mantendo React; não migrar todo o projeto agora.

## Fase 3 — Copy e conversão

| ID | Tarefa | Arquivos principais | Critério de aceite |
|---|---|---|---|
| CVR-01 | Atualizar hero e microcopy | `HomePage.tsx` | headline aprovada, descrição curta e `Leva menos de 2 minutos` |
| CVR-02 | Padronizar CTAs | `HomePage.tsx`, `components.tsx`, `patterns.tsx` | CTA principal usa `Iniciar análise`, `Avaliar esta possibilidade` ou `Falar com especialista` |
| CVR-03 | Remover preço relativo e avisos precoces | `HomePage.tsx`, `components.tsx` | sem `$`, `$$`, `$$$`, liminar ou promessa de menor investimento nos cards |
| CVR-04 | Explicar próximo passo | `diagnostic-flow.tsx` e CTAs | usuário entende que rota, data e pet são avaliados antes de qualquer recomendação |
| CVR-05 | CTAs contextuais | `HomePage.tsx` | há próxima ação após modalidades, destinos, método, equipe e FAQ |
| CVR-06 | Expandir FAQ | `HomePage.tsx` | inclui espécies, CVI, PETC/AVIH/AVI, cabine, antecedência, importação e negativa da companhia |

**Guardrails:** sem promessas de cabine, prazo, liminar, quarentena, aceitação ou embarque antes de análise.

## Fase 4 — Arquitetura de autoridade e conteúdo

| ID | Tarefa | Arquivos principais | Critério de aceite |
|---|---|---|---|
| AUTH-01 | Separar `Quem somos` de `Embarpet na mídia` | `HomePage.tsx`, `home.css` | cada seção possui propósito, heading e CTA próprios |
| AUTH-02 | Estruturar imprensa | novo componente em `src/components/ui/` | PEGN/Globo, Catraca Livre e Visite Brasília têm veículo, título e link externo |
| AUTH-03 | Consolidar credenciais | `HomePage.tsx`, `patterns.tsx` | número, Google e IATA/IPATA possuem equivalência textual e alt útil |
| AUTH-04 | Criar modelo de case | `case-drag-cards.tsx`, futuro conteúdo em `src/data/` | case contém rota, desafio, participação e autorização |
| AUTH-05 | Planejar páginas indexáveis | novas rotas/páginas | backlog para modalidades, destinos e histórias; iniciar por EUA, UE e Mercosul |

## Fase 5 — Performance e mídia

| ID | Tarefa técnica | Arquivos principais | Critério de aceite |
|---|---|---|---|
| PERF-01 | Converter imagens grandes para WebP/AVIF | `design-system/public/` | imagens decorativas de ~1 MB+ substituídas/justificadas; versões responsivas definidas |
| PERF-02 | Lazy loading e dimensões explícitas | `components.tsx`, `HomePage.tsx`, UI | mídia abaixo da dobra usa `loading="lazy"` e `decoding="async"` quando aplicável |
| PERF-03 | Unificar mosaico de autoridade | asset novo + `HomePage.tsx` | cinco imagens dão lugar a uma composição otimizada com alt contextual |
| PERF-04 | Otimizar vídeos | `HomePage.tsx`, `case-drag-cards.tsx` | preview curto + poster; vídeo completo após som; sem pré-carregamento indevido |
| PERF-05 | Code splitting para blocos pesados | `HomePage.tsx` | histórias, vídeos e animações não compõem custo crítico da primeira dobra |
| PERF-06 | Cache imutável dos assets com hash | `vercel.json` no root efetivo | `Cache-Control: public, max-age=31536000, immutable` validado |

**Métrica de saída:** Lighthouse mobile e Core Web Vitals registrados antes/depois.

## Fase 6 — Tracking e otimização

| ID | Evento/tarefa | Disparo ou aceite |
|---|---|---|
| EVT-01 | `analysis_started` | início do diagnóstico; registra origem da CTA e viewport |
| EVT-02 | `route_completed` | origem, destino e prazo válidos |
| EVT-03 | `pets_completed` | espécie e quantidade preenchidas |
| EVT-04 | `analysis_completed` | resumo enviado; conversão principal, não pageview |
| EVT-05 | `whatsapp_clicked` | origem do clique e contexto disponível |
| EVT-06 | `modality_clicked` e `media_clicked` | modalidade/veículo e CTA registrados |
| TRACK-01 | Integrar GTM/GA4 após consentimento | não dispara antes da política aprovada |
| TRACK-02 | Criar painel de funil | CTA → rota → pets → conclusão → WhatsApp/lead |

## Ordem de execução

1. DEC-01 a DEC-05.
2. SEO-01 a SEO-06.
3. RENDER-01 a RENDER-04.
4. CVR-01 a CVR-06.
5. PERF-01 a PERF-06.
6. AUTH-01 a AUTH-05 conforme aprovação de conteúdo.
7. TRACK-01 e eventos, após consentimento e ferramenta definidos.

## Definition of Done

- `npm run build` passa.
- Nenhum claim ou regra sem fonte aprovada entra na página.
- Metas, schema, links e HTML final são validados na URL publicada.
- Mudança revisada em desktop e mobile.
- Um commit/PR por escopo.
- Todo novo claim entra na matriz de evidências da Embarpet.
