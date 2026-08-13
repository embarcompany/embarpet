# Sistema de componentes do novo site

## Objetivo

Construir uma biblioteca reutilizável que preserve a identidade visual e a lógica de conversão em todas as páginas institucionais e, depois, nas LPs de campanha. Um componente não é apenas visual: deve ter propósito, conteúdo esperado, variantes, estados, acessibilidade e rastreamento definidos.

## Fundação

### Tokens de referência

Usar os valores extraídos em [brand/01-tokens-extraidos.md](brand/01-tokens-extraidos.md):

- Fundo: `--paper` e `--soft`.
- Autoridade/texto: `--teal` e `--ink`.
- Ação/progresso: `--turq` e `--turq-deep`.
- Apoio: `--lime`.
- Borda: `--line`.
- Texto secundário: `--muted`.
- Fonte: Montserrat com fallback Arial/sans-serif.
- Espaçamento-base: 8px; raios: 9/14/20px; sombra discreta.

### Regras globais

- Uma ação primária por área visível.
- CTA primário em turquesa; secundário em contorno/teal; terciário como link textual.
- Texto em botão começa com verbo: “Analisar”, “Entender”, “Explorar”, “Ver”.
- Não usar cor como único sinal de erro, sucesso ou foco.
- Todo componente interativo deve funcionar por teclado, ter foco visível e rótulo acessível.
- Evitar componentes decorativos que não expliquem, provem ou façam avançar uma decisão.
- Não usar SVGs abstratos, círculos, traços, mapas ou formas soltas como ornamento. Elementos gráficos só entram quando forem ícone funcional, dado, imagem editorial, marca ou informação de interface.
- Não usar sombras em superfícies, botões, menus, toasts ou cards. Hierarquia visual vem de bordas finas, cor, espaço, tamanho e tipografia.
- Usar ícones de forma abundante para navegação, categorias, campos, etapas, CTAs, provas e estados, desde que cada ícone tenha significado inequívoco e complemente texto visível.
- Usar PNG para fotografia, imagens editoriais e logo. SVG fica restrito a ícones funcionais; não é linguagem de ilustração ou ornamento da página.

## 1. Navegação

### `Header`

| Item | Especificação |
|---|---|
| Papel | orientar e manter a conversão acessível em qualquer página |
| Conteúdo | logo, links de primeiro nível, CTA de diagnóstico, controle de idioma quando aplicável |
| Variantes | padrão claro; contraste em seção escura; compacto no scroll; mobile |
| CTA | “Analisar a viagem do meu pet” |
| Regra | não exibir links institucionais secundários no nível principal |
| Métricas | clique por item, clique do CTA, abertura de menu mobile |

### `MegaMenu`

Usar somente para **Modalidades**, **Serviços** e **Destinos**. Cada item deve ter título, uma frase de utilidade e ícone linear de significado específico. Todos os itens navegáveis do menu devem ter ícone e texto. Não usar menu como mapa completo do site ou como área decorativa.

### `Breadcrumb`

Usar em guias, modalidades, serviços e casos. O objetivo é orientação e SEO; não precisa aparecer na home nem no diagnóstico.

### `Footer`

Quatro blocos: Embarpet, Ajuda para a viagem, Atendimento e Legal. Deve conter prova institucional compacta, canais oficiais e o link do Grupo Embarcompany, sem competir com o CTA final.

## 2. Ações e links

### `Button`

| Variante | Uso | Aparência |
|---|---|---|
| Primário | iniciar diagnóstico, enviar etapa, ação de receita | fundo `--turq`, texto escuro de alto contraste, raio médio |
| Secundário | explorar modalidade, ver serviço ou história | contorno/teal com fundo claro |
| Invertido | CTA sobre área escura | fundo claro, texto teal |
| Texto | navegação e aprofundamento | texto teal/turquesa com indicador visual de direção |
| WhatsApp contextual | continuação após diagnóstico | estilo dedicado, usado apenas quando houver contexto do caso |

Estados obrigatórios: padrão, hover, foco, ativo, desabilitado e carregando. Nunca trocar o texto de um CTA por “Enviar” sem contexto.

### `InlineAction`

Link contextual dentro de FAQ, case e card. Deve carregar a intenção na URL/analytics, por exemplo `origem=modalidade-carga-viva`.

## 3. Diagnóstico e formulários

### `DiagnosticFlow`

| Aspecto | Especificação |
|---|---|
| Papel | transformar tráfego em lead qualificado para WhatsApp |
| Forma | três etapas progressivas: viagem → pet → preparo e contato |
| Variantes | embutido no hero; página completa; compacto após conteúdo; contextual por serviço/modalidade |
| Progresso | “Etapa X de 3”, sempre honesto |
| Dados | origem, destino, data, direção da viagem, espécie, porte/peso, tutor acompanhante, passagem, microchip/vacina, nome e WhatsApp |
| Lógica | respostas adaptam microcopy, não prometem modalidade nem preço |
| Saída | resumo editável + abertura de WhatsApp contextual |

### `FormField`

Estrutura: rótulo persistente, ajuda opcional, campo, mensagem de erro e estado de confirmação. Placeholders não substituem rótulos.

Variantes: texto, telefone, autocomplete de origem/destino, seleção de opção, botões segmentados, data aproximada e campo “ainda não sei”.

### `RouteFieldGroup`

Agrupa **origem → destino** como uma única decisão de rota. Os dois campos ficam empilhados, com ícones de partida e chegada ligados por uma linha fina de interface. A linha não é ornamento: torna a relação entre os dois pontos inequívoca.

- Usar no primeiro passo do `DiagnosticFlow` e em retomadas contextuais.
- Acrescentar “Quando pretende viajar?” como campo separado, aceitando mês/ano ou “Ainda estou planejando”. Não pedir horário: ele não qualifica a análise inicial.
- Pode sugerir a cidade de origem após consentimento, sempre com “Alterar” e preenchimento manual disponíveis.
- Não calcular preço, não pedir companhia aérea e não indicar modalidade nesta etapa.

### `LocationSuggestion`

Sugere origem com base em localização aproximada ou contexto, sem assumir: “Você parte de São Paulo?” com ações **Confirmar** e **Alterar**. Depende de consentimento e deve ter fallback manual.

### `ProgressStepper`

Indicador textual e visual de etapa; não usar somente cor. Em mobile, priorizar texto e indicador compacto.

### `FormSummary`

Antes do envio, exibe rota, data e perfil do pet com ação “Editar”. Evita envio errado e reforça que a análise é personalizada.

## 4. Informação e conversão

### `Hero`

| Variante | Quando usar |
|---|---|
| Diagnóstico | home; título, apoio, prova curta, `DiagnosticFlow` e imagem real |
| Editorial | guias; título, resumo, revisão/fonte e ação secundária |
| Serviço/modalidade | páginas comerciais internas; dor, explicação curta, prova contextual e CTA |
| Case | histórias reais; rota, pet, desafio e resultado |

Nunca usar carrossel automático. Uma mensagem, uma imagem dominante e uma ação principal.

### `SectionIntro`

Eyebrow opcional, H2, apoio de até duas linhas e CTA apenas se a seção conduzir a uma decisão. Preserva respiro e escaneabilidade.

### `ServiceCard`

Título, para quem é, resultado/escopo resumido, ícone e ação. Usar em serviços; não colocar lista longa de entregas no card.

### `ModalityCard`

Título, cenário em que pode ser considerada, uma frase de desmistificação e ação “Entender esta modalidade”. Não apresentar como promessa de elegibilidade.

### `DestinationCard`

Nome de destino/região, nível de planejamento (sem classificação não validada), resumo e acesso a guia. Fase 1 aponta para hubs/guia; campanhas futuras terão LP própria.

### `RegionExplorer`

Explorador expansível de destinos para a home e para `/destinos`. A primeira camada mostra **Estados Unidos**, **União Europeia** e **Mercosul**; ao expandir, revela os países/recortes mais procurados e o caminho para o guia ou diagnóstico.

| Regra | Decisão |
|---|---|
| Papel | orientar descoberta e intenção; não substituir a análise individual |
| Primeira camada | EUA, União Europeia e Mercosul |
| Conteúdo expandido | nomes de países/recortes prioritários, texto curto e link de continuidade |
| Interação | `details/summary` acessível, com ícone de região/rota e indicador textual de expansão |
| Visual | linhas e bordas, sem sombra, sem bandeiras SVG ou ornamentos geográficos |
| Dados | seleção alimenta o contexto do diagnóstico e analytics; requisitos só aparecem em guias revisados |

### `ProcessSteps`

Quatro passos: entender → planejar → preparar → acompanhar. Cada passo usa ícone linear, título curto e até duas linhas. Deve deixar claro o que varia conforme escopo contratado.

### `ScrollRouteIn`

Bloco editorial de transição controlado pelo scroll: uma imagem PNG de pet/tutor/viagem entra no enquadramento enquanto uma mensagem curta permanece legível. É a adaptação Embarpet do padrão de *scroll fly-in* de referência.

| Aspecto | Especificação |
|---|---|
| Papel | criar respiro emocional e reforçar que uma viagem bem planejada tem etapas; não converter diretamente |
| Posição | depois de `ProcessSteps` e antes de destinos/planejamento; nunca antes do hero de diagnóstico |
| Conteúdo | eyebrow curto, título de até duas linhas e imagem PNG editorial autorizada |
| Movimento | deslocamento discreto, guiado pelo scroll e sem looping; o conteúdo deve fazer sentido completamente parado |
| Acessibilidade | `prefers-reduced-motion` mostra a composição final estática; imagem com alt descritivo |
| Restrições | sem avião/elemento 3D genérico, sem SVG decorativo, sem sombra e sem competir com CTA primário |

### `ComparisonTable`

Para comparar modalidades, requisitos ou escopos. Em mobile vira cards empilhados. Não usar para regras regulatórias sem fonte, data de revisão e escopo da comparação.

## 5. Autoridade e confiança

### `TrustStrip`

Faixa curta próxima ao hero: até quatro provas aprovadas. Exemplos permitidos somente após validação: localização, avaliação pública, volume de operações, credenciais verificáveis.

### `CredentialBadge`

Nome da credencial, ícone/assinatura, link de consulta, status e data de checagem. Nunca usar selo decorativo sem contexto de validação.

### `Metric`

Número, unidade, rótulo e data-base. Deve aceitar estado “não publicar” quando o dado não estiver auditado.

### `ReviewQuote`

Trecho curto, nome do avaliador conforme autorizado, origem/URL e referência do pet/rota quando disponível. Não editar o sentido do depoimento.

### `CaseCard`

Imagem autorizada, pet, rota, desafio, papel da Embarpet e resultado. Variante compacta para home e detalhada para `/historias/<slug>`.

### `OfficialSource`

Bloco editorial para conteúdo regulatório: entidade, título, link, última verificação e aviso de que regras podem mudar. É obrigatório em páginas de documentação, destino e animais de serviço.

## 6. Educação e conteúdo

### `FAQAccordion`

Pergunta explícita, resposta de até três linhas no contexto da home e ação “Ler guia completo” quando necessário. Usar `details/summary` ou comportamento equivalente acessível.

### `Callout`

| Variante | Uso |
|---|---|
| Atenção | prazo, regra variável, decisão que precisa de verificação |
| Dica | preparação ou próximo passo prático |
| Fonte oficial | origem de uma exigência regulatória |
| Caso especial | espécie, raça ou condição que exige análise individual |

Verde e vermelho mantêm semântica de sucesso/alerta; não reutilizar esses estados para decoração.

### `GuideMeta`

Exibe autor/responsável, data de revisão, categoria e fontes. Garante que conteúdo de alto risco tenha governança explícita.

## 7. Feedback e suporte de interface

### `Toast` e `InlineFeedback`

Mensagens de sucesso, erro ou carregamento devem ter texto explícito, ícone e anúncio acessível quando necessário. Não depender de cor ou animação.

### `EmptyState`

Para buscas/filtragens sem resultado: explicar, sugerir alternativa e levar ao diagnóstico ou WhatsApp contextual.

### `ConsentBanner`

Gerencia cookies e consentimento de localização/salvamento temporário do diagnóstico. Linguagem simples, opções claras e nenhuma coleta opcional antes de consentimento.

## Estados e acessibilidade mínimos

| Estado | Regra |
|---|---|
| Foco | contorno evidente, contraste suficiente e nunca removido |
| Erro | texto de causa e solução; `aria-describedby`/equivalente |
| Sucesso | confirmação textual, não apenas cor verde |
| Carregamento | manter rótulo ou explicar o que está acontecendo |
| Desabilitado | explicar a condição de desbloqueio quando relevante |
| Mobile | alvos de toque confortáveis, sem hover como única interação |
| Movimento | respeitar `prefers-reduced-motion` |

## Ordem de implementação

### Fundação

1. Tokens CSS e tipografia.
2. `Button`, `FormField`, foco/feedback e grid.
3. `Header`, `Footer`, `SectionIntro` e `Hero`.

### Conversão

4. `DiagnosticFlow`, `LocationSuggestion`, `ProgressStepper` e `FormSummary`.
5. Eventos de analytics do fluxo.

### Conteúdo e prova

6. `ServiceCard`, `ModalityCard`, `ProcessSteps`, `FAQAccordion` e `Callout`.
7. `TrustStrip`, `CredentialBadge`, `Metric`, `ReviewQuote`, `CaseCard` e `OfficialSource`.

### Governança

8. Catálogo visual de componentes com variantes e estados.
9. Checklist de acessibilidade e revisão de claims antes de publicar.

## Critério de aceite

Um componente só entra no design system quando:

1. tem função clara em uma página/jornada;
2. usa tokens definidos, não valores soltos;
3. tem conteúdo, estados e comportamento responsivo definidos;
4. é acessível por teclado e leitor de tela quando interativo;
5. registra o evento de conversão relevante, se aplicável;
6. não exige claim, foto, métrica ou regra regulatória sem fonte aprovada.
