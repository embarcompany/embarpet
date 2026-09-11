# Estado completo do projeto Embarpet

**Atualizado em:** 2026-09-11<br>
**Repositório:** `C:\Users\usuario\Documents\EMBARPET`<br>
**Aplicação:** `design-system/`<br>
**Branch de trabalho:** `codex/embarp-site`<br>
**Último commit de contexto:** `a276a89` — `docs: capture destination expansion handoff`

Este documento é o ponto de partida para qualquer IA, desenvolvedor ou pessoa que continue o projeto. Ele registra o que existe de fato no código, o que foi aprovado como direção de produto e o que ainda não está conectado ou concluído.

## 1. Produto e objetivo

O projeto é o novo site institucional/conversivo da **Embarpet**, para famílias que precisam transportar pets internacionalmente. A proposta não é uma calculadora de requisitos nem uma enciclopédia regulatória: é qualificar a rota, o prazo e o perfil do pet para iniciar uma conversa contextualizada com a equipe pelo WhatsApp.

O funil que já existe no frontend é:

```text
Landing / LP de destino
  → CTA abre o diagnóstico guiado
  → rota, período, pets e contato
  → página de obrigado
  → WhatsApp com mensagem e contexto da viagem
```

Prioridade de negócio: aumentar análises iniciadas e leads qualificados, preservando a leitura humana da rota. Qualquer conteúdo de país, modalidade ou documentação deve evitar promessas absolutas: regras dependem de espécie, aeroporto, companhia, origem, destino e data.

## 2. O que está entregue

### Experiência e páginas

- **Home conversiva** em `src/features/home/HomePage.tsx`, com hero, formulário de rota, autoridade, modalidades, serviços, destinos, FAQ, provas e CTAs.
- **Diagnóstico guiado** em `src/components/ui/diagnostic-flow.tsx`, usado pelo modal e pela página `/viajar`.
- **Modal único de análise** em `src/components/ui/analysis-modal.tsx`; as páginas informam apenas a rota inicial e o `analyticsSource`.
- **Página de obrigado** em `/obrigado`, com mensagem de WhatsApp pré-montada em `src/features/thank-you/ThankYouPage.tsx`.
- **Quatro páginas de modalidades:** cabine, bagagem acompanhada, compartimento de cargas e suporte emocional; conteúdo em `src/features/modalities/modality-content.ts`.
- **LP de Estados Unidos** em `/destinos/estados-unidos`, construída como página de referência para a expansão por países.
- **PetLuxo** extraído como componente compartilhado (`src/components/ui/pet-luxo-section.tsx`) e usado tanto na home quanto na LP de destino.
- **Página interna de botões** em `/design-system/botoes`.

### Design e responsividade

- Identidade visual e tokens próprios, com CSS por feature e componentes reutilizáveis.
- A LP dos Estados Unidos recebeu um ciclo extenso de ajustes desktop/mobile: hero, títulos balanceados, carrosséis, tabela comparativa adaptada, CTA sticky, modal centralizado e safe spacing.
- O padrão desejado é: texto de apoio com destaques semibold, títulos visualmente equilibrados, nenhuma rolagem horizontal no mobile e CTAs claros para o modal único.
- Há ativos próprios em `public/`, incluindo logos, fotos de operação, provas, avatares, vídeos curtos e bandeiras. Não gerar imagens por IA sem uma solicitação explícita.

### Conversão, tracking e dados de rota

- `src/lib/analytics.ts` emite eventos `embarp:conversion` e, quando há consentimento, envia dados não pessoais ao `window.dataLayer`.
- Eventos existentes incluem início/conclusão de análise, envio de formulário, lead criado, clique no WhatsApp e clique de modalidade.
- O contrato de lead único está em `src/lead-contract.ts` (`PublicLead`): origem do CTA, página, rota, período, pets, contato e consentimento.
- O `DiagnosticFlow` gera os eventos e redireciona para `/obrigado` com dados de contexto na query string.
- As LPs de destino já rastreiam a posição de CTA por fonte, no formato `destination_<pais>_<placement>`.
- A busca de cidades/aeroportos usa dados locais em `src/data/` e hooks próprios, incluindo índice global de aeroportos.

### SEO e rotas

- Metadados de página são controlados por `src/lib/seo.ts`; rotas específicas definem título, description e canonical.
- `npm run build` executa TypeScript, build Vite, SSR e `scripts/prerender.mjs`.
- A lista atual de páginas prerenderizadas inclui home PT/EN/ES/JA, quatro modalidades e Estados Unidos.
- `public/sitemap.xml` já lista essas mesmas rotas públicas; `robots.txt` bloqueia páginas de obrigado.
- `vercel.json` possui rewrites SPA para modalidades, destinos, análise, obrigado e os idiomas atualmente configurados no deploy.

## 3. Arquitetura real

| Área | Onde está | Papel |
|---|---|---|
| Entrada/roteamento | `src/app/App.tsx` | Roteador manual por pathname; resolve modalidades e destinos por slug. |
| Home | `src/features/home/` | Página conversiva principal e seu CSS. |
| Destinos | `src/features/destinations/` | LP compartilhada, seções, estilos e registry de conteúdo. |
| Modalidades | `src/features/modalities/` | Conteúdo e página compartilhada das quatro formas de embarque. |
| Diagnóstico | `src/components/ui/diagnostic-flow.tsx` | Formulário multi-etapas, pets, contato, eventos e redirecionamento. |
| Componentes transversais | `src/components/ui/` | Header, footer, modal, botões, WhatsApp, PetLuxo e interações. |
| Contratos e utilitários | `src/lead-contract.ts`, `src/lib/` | Lead, SEO, flags, analytics e helpers. |
| Dados | `src/data/`, `src/hooks/` | Aeroportos, cidades e sugestões de países. |
| Build/deploy | `package.json`, `scripts/`, `vercel.json` | Vite, prerender e regras de hosting. |

### Ponto importante sobre destinos

`DestinationUnitedStatesPage.tsx` é um nome legado. O arquivo exporta `DestinationPage`, que já aceita qualquer `DestinationLandingContent`. Não criar uma página TSX por país.

O registry em `src/features/destinations/destination-content.ts` é a fonte única por destino. Hoje ele possui apenas `unitedStatesDestination`; `App.tsx` já resolve qualquer slug que seja adicionado ao registry.

## 4. Estado do funil e integrações

### O que funciona no frontend

- CTAs da home e da LP EUA abrem o diagnóstico ou navegam para a entrada de análise apropriada.
- LP de Estados Unidos pré-preenche Brasil → Estados Unidos; a pessoa pode editar/inverter a rota.
- Período informado no hero é repassado para o modal e mantém a etapa correta selecionada.
- Ao concluir o fluxo, o usuário chega à página de obrigado e pode abrir o WhatsApp oficial com texto contextualizado.
- O frontend emite eventos de conversão sem expor PII ao payload de analytics.

### O que ainda **não** está conectado

- `submitLead()` existe em `src/lead-contract.ts`, apontando para `/api/public/leads`, mas o fluxo atual não o chama.
- Não há rota/API pública de leads no repositório; portanto o formulário ainda **não grava** o lead em banco/CRM antes do redirecionamento.
- O README cita a necessidade de um endpoint público com validação, rate limit, consentimento e encaminhamento seguro ao CRM/Supabase. Isto é backlog real, não funcionalidade entregue.
- Não há configuração de credenciais, Supabase, CRM, GTM ou API keys versionada no app.
- O comportamento de promoção automática de preview para produção no Vercel não pode ser confirmado pelo repositório; `vercel.json` só descreve rewrites e cache.

## 5. Navegação e destinos

O mega menu da home mostra estes destinos prioritários:

1. Estados Unidos
2. Portugal
3. Espanha
4. Itália
5. Argentina
6. Uruguai
7. Paraguai

**Estado atual:** somente Estados Unidos aponta para `/destinos/estados-unidos`. Os outros seis links ainda levam a `/#destinos`, abrindo a experiência genérica da home.

### Decisão aprovada para a próxima expansão

Criar LPs próprias para todos os sete destinos do menu, usando a mesma página e o mesmo modal. A ordem recomendada é:

1. Fundação do registry, URLs e menu.
2. Portugal, Espanha e Itália.
3. Argentina, Uruguai e Paraguai.
4. QA de navegação, SEO, CTA, prefill de rota e mobile.

Para cada destino novo, criar configuração com:

- slug, `analyticsKey`, país, ISO, bandeira e metadata;
- hero e copy de chegada adaptados ao país;
- FAQs específicas e seguras;
- cartões de contexto local com imagens reais/aprovadas;
- fonte de CTA compatível com o modelo atual;
- entrada no prerender e no sitemap;
- link final no mega menu.

Não incluir Canadá, França, Alemanha, Países Baixos ou outros países agora: eles não são promessa do menu atual e devem ser priorizados por campanha, volume comercial ou intenção de busca.

## 6. Decisões de produto e design já tomadas

- A ordem narrativa da LP de destino trabalha desejo → autoridade → risco → quebra da falsa solução → método → atendimento → comparação → prova → objeções → conversão.
- A seção de alerta sobre IA/ChatGPT é estática; a antiga animação de “IA escrevendo” foi removida por decisão do usuário.
- A página de destino usa o mesmo modal da home, não uma experiência paralela.
- Os cards de serviços não são CTAs individuais; a CTA da seção abre o modal.
- “Saiba mais” das modalidades e do PetLuxo, dentro de uma LP de destino, abre o modal em vez de sair da LP.
- Avaliações são apresentadas visualmente em trilhos; antes de usar como “reais” em produção, confirmar a fonte e a atualização do conteúdo.
- Footer inclui créditos externos: Igor Marin Santos → `igormarin.com.br`; Fernando Montuan → `montuan.com.br`.
- Credenciais de autoridade exibidas incluem IPATA/IATA e +2.000 embarques; manter a prova visual e copy coerentes com o material aprovado pela empresa.

## 7. Qualidade e comandos

| Objetivo | Comando |
|---|---|
| TypeScript | `npx tsc --noEmit` |
| Build completo + prerender | `npm run build` |
| Servidor local | `npm run dev` |
| Checagem de espaços em diff | `git diff --check` |

Antes de commit, executar pelo menos TypeScript e `git diff --check`; ao mexer em rotas, SEO, assets ou prerender, rodar o build completo.

## 8. Situação de documentação

- `.planning/codebase/` contém mapeamento do código: arquitetura, stack, convenções, integrações, testes, estrutura e preocupações.
- `.planning/PROJECT.md` registra o escopo de destinos aprovado.
- `.planning/HANDOFF.json` é a versão legível por máquina da pausa.
- `.planning/.continue-here.md` é a síntese curta da pausa específica de destinos.
- Este arquivo (`.planning/PROJECT-STATUS.md`) é a visão transversal do projeto inteiro.
- O `README.md` de raiz descreve bem a intenção inicial, mas tem trechos históricos que não devem ser tratados como fonte de verdade técnica sem conferir `package.json` e o código atual.

## 9. Limites e cuidados para a próxima IA

- Não usar `git reset --hard`, `git checkout --` ou operações destrutivas para “limpar” o worktree.
- Há diretórios não rastreados na raiz do repositório que não pertencem ao app (`../.agents/`, `../_brand_assets_…`, `../data/`, `../outputs/` e similares). Preservar e não adicionar ao commit do site.
- Alterações devem ocorrer dentro de `design-system/`, salvo solicitação explícita.
- Não repetir estruturas de páginas ou copiar CSS por país: configurar o registry e estender apenas o que realmente variar.
- Não apresentar exigência regulatória como definitiva sem pesquisa atual e fonte primária.
- Não gerar imagens nesta fase; deixar placeholders/URLs aprovadas até haver curadoria visual.

## 10. Próximo passo recomendado

Para seguir com controle, iniciar a expansão de destinos como projeto GSD a partir de `.planning/PROJECT.md`, criando requisitos e um roadmap antes do código. A primeira implementação deve ser a **fundação**: ampliar o registry, alinhar slugs/menu/prerender/sitemap e validar a LP EUA como template. Só então cadastrar os seis países.

---
*Documento de handoff transversal criado para continuidade por outra IA ou equipe.*
