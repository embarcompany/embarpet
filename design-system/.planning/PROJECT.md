# Embarpet — expansão de destinos

## O que é

A Embarpet é um site de conversão para transporte internacional de pets, com um diagnóstico guiado que encaminha a família para atendimento pelo WhatsApp. A próxima evolução é transformar a landing page já construída para os Estados Unidos em uma plataforma de destinos: páginas próprias, consistentes e rastreáveis para cada rota exposta no header.

## Valor central

Uma família que escolhe um destino precisa iniciar uma análise já contextualizada para aquela rota, sem encontrar uma página genérica ou ter de repetir informações básicas.

## Contexto de negócio

- **Cliente:** famílias que levam pets em viagens ou mudanças internacionais.
- **Conversão:** início do diagnóstico e continuidade do atendimento pelo WhatsApp.
- **Métrica prioritária:** análises iniciadas e leads qualificados por destino/origem de CTA.
- **Estratégia:** usar LPs específicas para tráfego pago e orgânico, preservando uma única base de componentes e evitando conteúdo jurídico imutável.

## Requisitos

### Validados

- ✓ A aplicação React/Vite já possui uma LP funcional para `/destinos/estados-unidos` — existente.
- ✓ A LP de destino reutiliza `DestinationPage`, `AnalysisModal` e seções compartilhadas — existente.
- ✓ O modal recebe rota, período e origem de CTA; no destino EUA, a rota Brasil → Estados Unidos já é pré-preenchida e pode ser invertida — existente.
- ✓ O conteúdo de destino é centralizado em `src/features/destinations/destination-content.ts` — existente.
- ✓ O header da home já apresenta os sete destinos prioritários — existente, com apenas EUA apontando para uma LP própria.

### Ativos

- [ ] Publicar LPs próprias para Portugal, Espanha, Itália, Argentina, Uruguai e Paraguai usando a mesma arquitetura dos Estados Unidos.
- [ ] Fazer todos os destinos do header apontarem para suas URLs finais, mantendo “Outros destinos” como entrada genérica de análise.
- [ ] Criar conteúdo próprio por país: metadados, hero, FAQ, contexto visual, copy de rota e rastreamento de CTA.
- [ ] Validar SEO técnico, responsividade, roteamento, pré-preenchimento do modal e atribuição em todas as sete LPs.

### Fora de escopo

- Canadá, França, Alemanha, Países Baixos e outros destinos — não estão no header prioritário; avaliar depois por campanha, volume comercial ou intenção de busca.
- Regras veterinárias/aeroportuárias apresentadas como verdades permanentes — exigências variam por rota, espécie, companhia e data; a copy deve orientar análise, não substituir validação operacional.
- Sete componentes/páginas duplicados — a expansão deve acontecer via configuração tipada e seções compartilhadas.
- Geração de imagens por IA — o usuário pediu para não gerar imagens agora; usar somente ativos aprovados ou fontes reais com licença adequada.

## Contexto técnico

- Repositório: `C:\Users\usuario\Documents\EMBARPET` (worktree principal); app em `design-system/`.
- Branch atual: `codex/embarp-site`; remoto: `https://github.com/embarcompany/embarpet.git`.
- Stack: React 19, TypeScript, Vite 6, CSS próprio e `lucide-react`.
- Build completo: `npm run build` (TypeScript, cliente, SSR e prerender). Checagem rápida: `npx tsc --noEmit`.
- O roteamento é manual em `src/app/App.tsx`; `/destinos/:slug` resolve `getDestinationLanding(slug)`.
- A fonte única de configuração é `src/features/destinations/destination-content.ts` e hoje registra somente EUA.
- A página compartilhada está em `src/features/destinations/DestinationUnitedStatesPage.tsx`; apesar do nome legado, exporta `DestinationPage` e recebe qualquer `DestinationLandingContent`.
- O header padrão está em `src/components/ui/navigation.tsx`. Os destinos visíveis são EUA, Portugal, Espanha, Itália, Argentina, Uruguai e Paraguai. Atualmente os seis últimos ainda apontam para `/#destinos`.
- O mapa técnico anterior está em `.planning/codebase/` e deve ser lido antes de alterações estruturais.

## Restrições

- **Arquitetura:** uma página compartilhada e configurações tipadas por destino — evita divergência visual e comportamental.
- **Conversão:** todo CTA de LP deve abrir o mesmo `AnalysisModal`, levando rota e `analyticsSource` corretos — preserva o funil existente.
- **SEO:** cada país precisa de canonical, title, description, H1, FAQs e contexto próprios — evita páginas finas/duplicadas.
- **Conteúdo regulatório:** não cravar exigências fixas sem fonte e data — reduz risco de informação desatualizada.
- **Qualidade visual:** desktop e mobile; nenhum overflow horizontal, margens seguras e tipografia já estabelecida na LP EUA.
- **Git:** não incluir os diretórios não rastreados que vivem na raiz do repositório e não pertencem ao app (`../.agents/`, `../_brand_assets_…`, `../data/`, `../outputs/` etc.).

## Decisões-chave

| Decisão | Motivo | Resultado |
|----------|--------|-----------|
| Cobrir os sete destinos do header | O menu não deve prometer destinos e levar a um bloco genérico | — Pendente |
| EUA é a página de referência | Já concentra a narrativa, modal, CTA tracking e responsividade aprovados | ✓ Bom |
| Agrupar execução em Europa e Mercosul | Permite revisão editorial e técnica por contexto de rota | — Pendente |
| Manter o conteúdo em um registry tipado | Escala destinos sem duplicar TSX/CSS ou quebrar o modal | ✓ Bom |
| Priorizar conversão contextual, não enciclopédia regulatória | A Embarpet oferece análise de rota; regras devem ser confirmadas pelo caso | ✓ Bom |

## Plano inicial recomendado

1. **Fundação:** ampliar o schema/registry se necessário, adicionar slugs e corrigir os links do header.
2. **Europa:** configurar Portugal, Espanha e Itália com copy, FAQ, SEO e cartões locais próprios.
3. **Mercosul:** configurar Argentina, Uruguai e Paraguai com o mesmo nível de individualização.
4. **Validação:** testar as sete URLs, prerender/canonicals, CTA/modal, fonte do lead, desktop/mobile e links do menu.

## Evolução

Este documento deve ser atualizado a cada fase e marco de entrega.

1. Mover requisitos entregues para **Validados** com o commit/fase correspondente.
2. Registrar decisões de rota, SEO e conteúdo que alterem o padrão de expansão.
3. Adicionar novos destinos apenas quando houver justificativa comercial, de campanha ou de busca.

---
*Última atualização: 2026-09-11, após mapeamento do código e definição do escopo dos destinos.*
