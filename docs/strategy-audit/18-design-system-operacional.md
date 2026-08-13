# Design system operacional — Embarpet

## Propósito

Este documento transforma a IDV e a estratégia do novo site em um sistema utilizável por design, conteúdo e desenvolvimento. Ele complementa o [sistema de componentes](17-sistema-de-componentes.md): aquele descreve cada componente; este define como o conjunto se comporta como produto.

## 1. Princípios de produto

1. **A necessidade vem antes da empresa.** A interface começa pela viagem do pet, não pela história institucional.
2. **Complexidade em progressão.** Mostrar o mínimo necessário para a próxima decisão; detalhes ficam disponíveis quando forem úteis.
3. **Autoridade contextual.** Provas aparecem junto da dúvida que ajudam a resolver.
4. **Cuidado sem infantilização.** Emoção vem de pessoas, pets e histórias reais; não de decoração genérica.
5. **Precisão sem promessa.** Modalidade, preço, prazo e regras são condicionais até a análise do caso.
6. **Uma ação dominante.** Cada área visível tem um próximo passo inequívoco.
7. **Nenhum ornamento sem função.** Sem sombras, gradientes dominantes, formas abstratas ou SVGs decorativos.

## 2. Fundação visual

### Paleta de interface

| Papel semântico | Token | Uso | Nunca usar para |
|---|---|---|---|
| Marca / autoridade | `--teal #05434A` | títulos, navegação escura, texto de alta ênfase | feedback de erro ou fundo de alerta |
| Ação | `--turq #00D1E2` | CTA primário, progresso, seleção principal | blocos extensos de texto ou fundo decorativo maciço |
| Ação em ênfase | `--turq-deep #009DAC` | hover, ícone ativo, links de alto contraste | texto pequeno em fundo branco sem teste de contraste |
| Apoio | `--lime #C6D783` | tags informativas e apoio de confiança | texto corrido, sucesso sem texto ou CTA primário |
| Texto | `--ink #193F43` | corpo, label, dados e descrições | grandes superfícies de destaque |
| Texto secundário | `--muted #5E7F82` | metadados, apoio e legenda | informação essencial |
| Estrutura | `--line #D8E8E5` | bordas, divisores, inputs | texto ou ícone de ação |
| Fundo de apoio | `--soft #F4FAF8` | áreas de contexto e callouts | substituir foto ou hierarquia |
| Fundo base | `--paper #FFFFFF` | páginas e cartões | contraste insuficiente de elementos claros |

**Pendente:** definir tokens numéricos de sucesso, alerta, foco e desabilitado após teste de contraste AA.

### Tipografia

| Papel | Família | Peso | Regra |
|---|---|---:|---|
| Display / H1 | Montserrat | 700–800 | máximo de 3 linhas em desktop e 4 em mobile |
| H2 | Montserrat | 700 | uma ideia por seção |
| H3 / card | Montserrat | 700 | título curto e concreto |
| Corpo / UI | Montserrat | 400–500 | legível, sem condensar para caber |
| Rótulo / eyebrow | Montserrat | 700–800 | caixa alta opcional, jamais como texto longo |

**Escala proposta para web (inferência):** `12 / 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64`, com `clamp()` nos títulos principais. Confirmar em protótipo responsivo antes de congelar.

### Espaço, borda e forma

- Base de espaçamento: 8px; composição: `8 / 12 / 18 / 28 / 44 / 68`.
- Raios: 9px (controles), 14px (cards), 20px (formulário de diagnóstico e superfícies-chave).
- Sem sombra em qualquer superfície.
- Bordas de 1px em `--line`; borda de foco não pode depender de `--line`.
- Usar cor de fundo para separar blocos apenas quando melhora entendimento; não empilhar containers visuais.

## 3. Grade e responsividade

### Contêineres

| Contexto | Largura | Uso |
|---|---|---|
| Leitura | até 72ch | guias, FAQs, texto regulatório |
| Conteúdo | até 900px | páginas informativas e casos |
| Marketing | até 1240px | home, heros, grades e prova social |
| Full bleed | 100% | foto editorial ou faixa institucional, com conteúdo interno alinhado ao grid |

### Grade proposta

| Breakpoint | Colunas | Margem lateral mínima | Comportamento |
|---|---:|---:|---|
| 1280px+ | 12 | 48px | cards 3/4/6 colunas; hero em duas colunas |
| 900–1279px | 12 | 32px | reduzir lacunas e manter leitura confortável |
| 700–899px | 8 | 24px | hero pode empilhar; cards em duas colunas |
| 0–699px | 4 | 20px | conteúdo em uma coluna; formulário por etapa |

### Regras responsivas

- Conteúdo nunca fica escondido só porque não cabe: empilhar, resumir ou abrir detalhe.
- Hover não pode ser único meio de descobrir uma ação.
- Menu desktop vira acordeão no mobile.
- Diagnóstico embedded vira fluxo de uma coluna no mobile.
- Tabelas tornam-se comparação por cards, ou têm scroll explícito quando a tabela é indispensável.
- A imagem editorial deve cortar por ponto focal validado; nunca distorcer.

## 4. Anatomia de componentes

Todos os componentes reutilizáveis devem documentar estes itens:

| Campo | Exigência |
|---|---|
| Nome e papel | qual problema resolve e em qual jornada aparece |
| Anatomia | partes visíveis nomeadas: ícone, título, apoio, ação, metadado etc. |
| Variantes | só quando representam intenção ou contexto diferente |
| Estados | padrão, hover, foco, ativo, carregando, sucesso, erro e desabilitado quando aplicável |
| Conteúdo | limites de caracteres, tom e exemplos aceitos |
| Responsivo | como muda de desktop para mobile |
| Acessibilidade | semântica, teclado, foco, anúncio de mudança e contraste |
| Analytics | evento, propriedades e momento de disparo |
| Fonte de prova | obrigatória para credencial, métrica, review, case ou regra |

## 5. Biblioteca obrigatória

### Primitivos

- `Container`, `Stack`, `Inline`, `Grid`, `Divider`, `Section`, `Surface`.
- `Text`, `Heading`, `Eyebrow`, `Link`, `Icon`, `Image`.
- `Button`, `IconButton` (somente quando houver `aria-label`), `Tag`, `Badge` e `Status`.

### Navegação

- Header desktop e mobile.
- Mega menu, menu acordeão, breadcrumb e footer.
- Navegação de idioma, quando a versão em inglês entrar.
- Navegação de retorno/edição no diagnóstico.

### Formulários

- Text input, telefone, autocomplete localidade/país, select, radio card, checkbox de consentimento, data aproximada.
- Label, ajuda, validação, resumo editável, stepper e confirmação.
- Estados de carregamento e recuperação de erro.

### Conteúdo comercial

- Hero, section intro, service card, modality card, destination card, process steps, comparison table, CTA band.
- Foto PNG editorial com legenda/opcional origem e regras de proporção.

### Prova e educação

- Trust strip, credencial verificável, métrica datada, avaliação, case, fonte oficial, FAQ, callout, guia-meta e timeline/checklist.

### Feedback

- Toast, erro inline, sucesso inline, empty state, loading/skeleton sem sombra e consent banner.

## 6. Regras para ícones e imagens

### Ícones

- Todo item de navegação, campo, etapa, categoria, CTA, estado ou prova deve usar ícone + texto quando isso melhorar escaneabilidade.
- Usar ícones lineares de uma única família; tamanho consistente por contexto: 16px (UI), 20px (card), 24px (destaque).
- Ícone não substitui texto essencial.
- SVG é exclusivo para ícone funcional ou dado vetorial; não usar para ilustração, textura ou forma de fundo.

### Imagens

- PNG é o formato-padrão para logo, fotografia e imagem editorial.
- Imagem precisa ter função: contextualizar a viagem, mostrar preparação, provar operação ou humanizar um case.
- Acessibilidade: toda imagem informativa recebe alt específico; imagem decorativa é omitida se não acrescentar informação.
- Manter inventário de licença, consentimento, origem, data e usos permitidos.
- Logo usa o PNG oficial adequado ao contraste; não redesenhar nem substituir por texto.

## 7. Padrões de página

### Home institucional

`Header → Hero + Diagnóstico → Trust strip → Modalidades → Processo → Serviços → Cases → Destinos → FAQ → CTA final → Footer`.

### Serviço / modalidade

`Breadcrumb → Hero contextual → Quando se aplica → Como funciona → Pontos de atenção → Case/prova → FAQ → Diagnóstico contextual`.

### Guia editorial

`Breadcrumb → Título + resumo → Guide meta → Conteúdo escaneável → Callouts/fontes → FAQ → CTA para diagnóstico`.

### História real

`Hero com rota e pet → Desafio → Plano/participação → Resultado → Depoimento/origem → Próximo caso ou diagnóstico`.

### Diagnóstico

`Stepper → Uma pergunta por decisão → Validação imediata → Resumo editável → Confirmação → WhatsApp com contexto`.

## 8. Conteúdo, microcopy e localização

- Botões iniciam com verbo e evitam “enviar”, “clique aqui” e “saiba mais” solto.
- Rótulos explicam o dado: “Quando pretende viajar?” e não “Data”.
- Oferecer “Ainda não sei” onde a incerteza é normal.
- Mensagens de erro explicam causa e correção: “Informe o país de destino para continuarmos.”
- Não prometer cabine, autorização, prazo, preço ou ausência de quarentena antes da análise.
- Conteúdo regulatório sempre identifica fonte oficial e data de revisão.

## 9. Acessibilidade mínima de produção

- Conformidade alvo: WCAG 2.2 AA, sujeita a validação de desenvolvimento.
- Todo foco visível; nenhum elemento clicável sem nome acessível.
- Contraste testado para texto, borda de foco e estados.
- Erros associados ao campo e anunciados de forma acessível.
- Formularios navegáveis inteiramente por teclado.
- Zoom de 200% sem perda de informação ou ação.
- `prefers-reduced-motion` respeitado.
- Imagens PNG otimizadas, dimensões definidas e carregamento responsável para evitar layout shift.

## 10. Analytics de design system

| Evento | Propriedades mínimas |
|---|---|
| `cta_clicked` | `cta_label`, `component`, `page`, `section`, `intent`, `utm_*` |
| `diagnostic_started` | `entry_point`, `page`, `intent`, `utm_*` |
| `diagnostic_step_completed` | `step`, `route_direction`, `species`, `destination_known` |
| `diagnostic_abandoned` | `last_step`, `last_field`, `page`, `intent` |
| `diagnostic_submitted` | `lead_id`, `route_direction`, `species`, `entry_point` |
| `content_engaged` | `content_type`, `slug`, `section`, `source_status` |
| `proof_clicked` | `proof_type`, `proof_id`, `verification_url` |

Não registrar conteúdo sensível de campos em ferramentas de analytics sem base legal e aprovação.

## 11. Governança

### Papéis

| Papel | Responsabilidade |
|---|---|
| Marketing | intenção, CTA, campanha, métrica e aprovação de copy |
| Operações | escopo real de serviço, viabilidade e fluxo de atendimento |
| Responsável técnico/jurídico | regras sanitárias, companhia, documentos, claims regulatórios |
| Design | consistência, usabilidade, acessibilidade e evolução do sistema |
| Desenvolvimento | implementação, performance, testes e instrumentação |

### Processo de alteração

1. Identificar jornada, problema e métrica.
2. Verificar se já existe componente/padrão que resolve o caso.
3. Se não existir, escrever proposta com anatomia, estados e acessibilidade.
4. Validar conteúdo e evidência quando houver claim.
5. Prototipar no playground.
6. Testar desktop/mobile, teclado e leitura de conteúdo.
7. Aprovar, documentar e só então levar à produção.

### Critérios de prontidão para produção

- Layout e componente aprovados no playground.
- Copy aprovada e sem claims não verificados.
- Imagens PNG licenciadas/consentidas, otimizadas e com alt.
- Estados de erro, loading, sucesso e mobile implementados.
- Acessibilidade básica testada.
- Eventos de analytics definidos e validados.
- URL, metadata e redirecionamento definidos quando for nova página.

## 12. Backlog de fechamento

1. Definir tokens de foco, sucesso, alerta, erro, hover e disabled com contraste AA.
2. Definir escala tipográfica e line-height finais no protótipo responsivo.
3. Criar catálogo de ícones com nomes, tamanho e contexto.
4. Criar registro de imagens PNG com licença e autorização.
5. Documentar conteúdo real de credenciais, métricas, cases e avaliações.
6. Definir padrão de otimização das imagens para web (dimensão, compressão e carregamento).
7. Validar a home com os primeiros usuários/atendimento antes de implementar produção.
