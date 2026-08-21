# Fundamentos e componentes

## Linguagem visual

| Fundação | Regra prática |
|---|---|
| Cor | Teal escuro sustenta autoridade; turquesa conduz ação; aqua organiza superfícies leves; dourado diferencia PetLuxo; `#F7FBFB` é fundo neutro de página. |
| Tipografia | Títulos em peso 700, frase curta e contraste alto. Destaque em título é **cor de texto**, nunca marca-texto atrás. Corpo explica uma ideia por parágrafo. |
| Espaço | Usar escala 4 / 8 / 12 / 18 / 28 / 44 / 68 / 104. Espaço representa hierarquia, não vazio arbitrário. |
| Forma | Botões são 999px. Cards e inputs usam raios consistentes e borda sutil. Sem sombra. |
| Mídia | Foto real tem papel narrativo: rota, operação, equipe, prova ou resultado. SVG é reservado a ícones e logos oficiais. |
| Movimento | Deve comunicar continuidade, foco ou intenção. Duração curta e suave; sempre respeitar `prefers-reduced-motion`. |

## Contêineres

| Tipo | Uso |
|---|---|
| Full bleed | fundo de seção, mídia editorial, hero. Conteúdo interno continua no grid seguro. |
| Marketing | index e campanhas: até 1280px com margem responsiva. |
| Leitura | guias, FAQ e texto regulatório: largura de 520–720px. |
| Fluxo | diagnóstico/modal: largura adaptada ao viewport e três áreas estáveis: cabeçalho, corpo, navegação. |

## Componentes canônicos

| Componente | Função | Uso correto |
|---|---|---|
| `SiteHeader` | contexto global, navegação e entrada para análise | fixo; não duplicar CTA concorrente |
| `ConversionHero` / `HeroRouteStarter` | transformar atenção em rota | primeira dobra de home/LP; pedir o mínimo |
| `DiagnosticFlow` | qualificar em etapas | rota → pets → detalhes → contato → obrigado/WhatsApp |
| `TrustStrip` / prova | reduzir risco percebido | 2–4 provas verificáveis, próximas à decisão |
| `ModalityRail` | explicar possibilidades comparáveis | quatro modalidades; não promete elegibilidade |
| `InternalLink` | aprofundar no site | sempre usa a família de navegação interna |
| `CaseDragCards` | prova emocional e operacional | arraste no desktop, carrossel acessível no mobile |
| `DestinationSelector` | abrir intenção por país | país orienta o plano; não encerra a análise |
| `FAQItem` | remover objeção de busca/conversão | pergunta literal, resposta direta, fonte quando regulatório |
| `Footer` | navegação auxiliar, confiança e contato | desktop em grade; mobile pode usar grupos expansíveis |

## Diagnóstico: arquitetura obrigatória

```text
Modal / página de fluxo
├── Cabeçalho: etapa + progresso + resumo vivo da rota
├── Corpo: uma decisão por vez, sempre iniciado no mesmo ponto
└── Navegação: fixa no rodapé do fluxo
    ├── primeira etapa: continuar 100%
    └── demais: voltar 50% + continuar 50%
```

- O corpo cresce até o espaço disponível; só ele rola quando for inevitável.
- Campos obrigatórios levam `*`; “Nome do pet” é opcional.
- Origem/destino são países no início do diagnóstico; autocomplete tolera escrita incompleta e erros comuns.
- A tela de obrigado é `noindex, nofollow`, mostra CTA de WhatsApp acima da dobra e passa apenas contexto não sensível.

