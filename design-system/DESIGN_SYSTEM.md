# Sistema de design Embarpet

## Trabalho do sistema

O sistema deve fazer a pessoa sentir, nesta ordem: **segurança, clareza e acolhimento**. Ele não existe para “deixar bonito”; existe para reduzir a ansiedade de uma decisão complexa e conduzir à análise de viagem.

1. **A rota é a unidade de conversão.** Origem, destino e período vêm antes de modalidade, preço ou dados extensos.
2. **Autoridade aparece no contexto.** Provas, fontes e credenciais ficam perto da dúvida que respondem.
3. **Forma segue decisão.** Cards, acordeões, campos e imagens só existem quando organizam uma escolha, explicam algo ou comprovam capacidade.
4. **Editorial, não template.** Espaço generoso, tipografia expressiva, linhas estruturais e fotografia com propósito substituem pilhas de cards arredondados.
5. **Movimento tem função.** Transição explica hierarquia, continuidade ou mudança de estado. Com redução de movimento, tudo continua compreensível.

## Fundamentos

### Cor semântica

| Token | Trabalho | Nunca usar para |
|---|---|---|
| `--ep-teal` | fundo de autoridade, títulos em alto contraste | alerta, decoração aleatória |
| `--ep-turq` | ação principal, progresso, foco | texto longo ou superfície dominante |
| `--ep-turq-deep` | rótulos, ícones, links de apoio | CTA primário |
| `--ep-lime` | encerramento positivo e apoio editorial | sucesso de formulário |
| `--ep-soft` | seção de processo, agrupamento leve | card de produto repetido |
| `--ep-line` | estrutura e separação | simular sombra |
| `--ep-danger` / `--ep-success` | estado com mensagem explícita | decoração |

### Tipografia

Montserrat é a única família de interface. A personalidade vem da escala e do contraste, não de misturar fontes.

| Papel | Token | Regra |
|---|---|---|
| Eyebrow | `--ep-font-size-xs` | caixa alta, tracking largo, sempre curto |
| UI/label | `--ep-font-size-sm` | peso 700–800; rótulo persistente |
| Corpo | `--ep-font-size-body` | até ~70 caracteres de largura |
| Lead | `--ep-font-size-lead` | uma ideia, no máximo três linhas |
| Títulos | `h4 → h1` | tracking negativo e linha compacta |

Não centralizar texto longo. Não usar título grande dentro de card pequeno. Nunca diminuir corpo abaixo de 12px.

### Espaço e composição

- Base de 4px; o ritmo dominante é 8 / 12 / 18 / 28 / 44 / 68 / 104.
- Seção editorial: 104–136px desktop, 76px mobile.
- Conteúdo: até 1280px; textos de leitura: 520–720px.
- Borda de 1px organiza áreas. **Sombra é proibida.**
- Raios 7/10/14px; não usar pílulas exceto tag pequena ou estado.

## Primitives

### Botões

| Variante | Papel | Forma |
|---|---|---|
| Primário | início do diagnóstico, avanço de etapa | turquesa, 48px, verbo + ícone direcional opcional |
| Secundário | aprofundar serviço/modalidade | contorno teal, fundo branco |
| Texto | conteúdo relacionado | sem caixa; sublinhado visível |
| Perigoso | ação irreversível operacional | vermelho; não usar em marketing |

Não usar “Enviar”, “Saiba mais” ou dois primários na mesma área. Em mobile, CTA de fluxo ocupa a largura disponível.

### Campos

Todo campo possui rótulo, área de toque de 48px, foco turquesa e mensagem de ajuda/erro. Placeholder exemplifica, nunca identifica. Campos de origem/destino entram em `RouteFieldGroup`, não isolados.

### Cards

Card não é a superfície padrão do sistema. Só existem três famílias:

| Família | Uso | Característica |
|---|---|---|
| Rail | modalidades e opções comparáveis | colunas com borda, sem caixa flutuante |
| Editorial | case, guia, imagem com narrativa | foto PNG e texto; uma borda externa |
| Interativo | escolha, credencial ou estado | foco, borda e feedback; sem sombra |

Se os elementos não são comparáveis, use seção editorial/lista, não grid de cards.

## Componentes

### Conversão

- `RideBookingForm`: referência de rota adaptada; entrada de alto valor.
- `RouteFieldGroup`: primitive da rota; usado em hero, retoma e LP.
- `DiagnosticForm`: etapa completa com metadado e aviso.
- `FormChoice`: decisão segmentada com explicação curta.
- `ProgressStepper`: etapa textual; não depender apenas de cor.

### Navegação e conteúdo

- `Header`: logo PNG, máximo cinco links, CTA persistente.
- `ModalityRail`: quatro possibilidades comparáveis; não é uma prateleira.
- `ProcessList`: sequência vertical de execução.
- `InternationalTransfer`: explorador de destinos, abertura progressiva e preservação de contexto.
- `FAQItem`: pergunta explícita + resposta curta + link de guia.

### Confiança

- `TrustStrip`: três/quatro provas curtas perto do hero.
- `SourceBlock`: fonte, data de checagem e aviso de atualização.
- `CaseCard`: foto autorizada, rota, desafio, participação e resultado.
- `Metric`: unidade, data-base e fonte; ocultar quando não auditado.

## Padrões de página

| Padrão | Sequência obrigatória |
|---|---|
| Home conversiva | hero de rota → confiança → modalidades → processo → narrativa → destinos → FAQ → retomada |
| Modalidade | cenário → desmistificação → como analisamos → prova/fonte → diagnóstico contextual |
| Serviço | dor → escopo → processo → casos → diagnóstico |
| Destino | contexto da rota → fonte/revisão → pontos a considerar → FAQ → diagnóstico pré-preenchido |
| LP de campanha | promessa específica validada → rota contextual → prova → objeções → CTA |

## Critérios de aceite

Um componente/página só entra em produção quando:

1. usa tokens sem valores soltos;
2. tem versão mobile e foco visível;
3. não usa sombra, gradiente ou SVG decorativo;
4. usa PNG aprovado quando precisar de mídia;
5. tem papel claro na jornada e evento de analytics;
6. não contém claim, métrica ou regra regulatória não aprovada;
7. respeita `prefers-reduced-motion` quando tem animação.
