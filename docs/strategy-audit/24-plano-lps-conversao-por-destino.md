# Plano — páginas de destino orientadas à conversão

**Status:** aprovado como direção; execução pendente.
**Objetivo:** transformar cada `/destinos/{slug}` em uma landing page de alta intenção para mídia paga e tráfego orgânico, sem duplicar a home institucional nem depender de conteúdo regulatório frágil.

## Decisões registradas

1. A rota pública é `/destinos/{slug}` — não haverá uma família paralela de URLs para LPs.
2. Cada página de destino é uma **LP de conversão**, não um guia técnico ou uma enciclopédia sobre o país.
3. A personalização principal é o **caso da família**: origem, destino, período, espécie/porte e necessidade percebida.
4. A página pode nomear o país no contexto e na linguagem da jornada, mas evita publicar regras sanitárias, prazos, custos, elegibilidade ou promessas que exigiriam revisão constante.
5. A index permanece como página institucional e de descoberta. As páginas de destino tratam de intenção específica e levam ao mesmo diagnóstico/qualificação.

## Hipótese de conversão

Quem chega por uma busca ou anúncio como “levar cachorro para Portugal” não quer, primeiro, dominar legislação. Em geral, quer reduzir a chance de algo dar errado e descobrir se sua situação tem caminho.

A página deve trocar ansiedade por uma próxima ação simples:

> “Você vai levar seu pet para **{destino}**. Conte o básico do caso e a Embarpet ajuda a organizar os próximos passos.”

O valor prometido é clareza e acompanhamento na análise da jornada; não aprovação, prazo, preço ou disponibilidade.

## Arquitetura de URLs

```text
/destinos                         Hub de escolha de destino
/destinos/estados-unidos          LP específica
/destinos/portugal                LP específica
/destinos/espanha                 LP específica
/destinos/italia                  LP específica
```

Cada URL deve ser canônica e indexável somente quando tiver conteúdo, mídia e metadados próprios. Variações de campanha usam UTMs; não criam cópias de página.

## Blueprint da página

## Direção criativa: da apreensão ao plano

A página não deve parecer um comparador de regras, uma agência de viagens genérica ou uma página institucional reduzida. A sensação procurada é: **“meu caso é complexo, mas não estou sozinho e há uma forma segura de começar.”**

O arco emocional é curto e deliberado:

```text
“Tenho medo de errar”
        ↓
“Não preciso dominar tudo agora”
        ↓
“Eles vão entender o meu caso”
        ↓
“Posso começar por uma decisão simples”
```

O país contextualiza a história; o protagonista visual e verbal é sempre a família e o pet.

### Promessa-mãe de copy

**Eyebrow:** `Brasil → {destino}`
**H1:** `Levar seu pet para {destino} não precisa ser um salto no escuro.`
**Apoio:** `Uma viagem internacional pede decisões que façam sentido juntas. Conte o básico do seu caso e comece a organizar os próximos passos com quem acompanha jornadas como a sua.`
**CTA:** `Começar o planejamento`

Essa promessa é específica o suficiente para uma campanha de destino e suficientemente estável para não depender de legislação, prazo ou modalidade. Ela deve prevalecer sobre fórmulas como “documentação completa”, “especialista em regras” ou “leve seu pet sem preocupação”, que soam genéricas ou fazem promessas implícitas.

## Roteiro visual e de copy ideal

| Ordem | Função de conversão | Copy-chave | Composição de design |
|---|---|---|---|
| 1. Hero + início da análise | Capturar intenção enquanto a ansiedade está alta | `Levar seu pet para {destino} não precisa ser um salto no escuro.` | Split hero. À esquerda: copy, prova curta e os primeiros campos. À direita: uma foto editorial real de tutor e pet em contexto de viagem/chegada, com área de respiro para o animal. Nada de colagem de bandeiras ou monumento turístico. |
| 2. Nomear a dor | Fazer a pessoa se reconhecer antes de explicar serviço | `Você não precisa descobrir tudo sozinho antes de começar.` | Fundo claro e uma frase grande. Ao redor, três cartões finos com dúvidas humanas: `“Será que dá tempo?”`, `“Qual é o melhor caminho para ele?”`, `“E se um detalhe atrapalhar a viagem?”`. São espelhos da preocupação, não promessas de solução. |
| 3. Transformar ansiedade em método | Mostrar que existe um caminho concreto | `A gente começa pelo que você já sabe.` | Linha de jornada de três etapas, em sentido Brasil → {destino}. Cada etapa tem número, ícone e uma frase curta. Sem timeline legal e sem datas. |
| 4. Personalização do caso | Reforçar que destino sozinho não define a resposta | `Nenhuma viagem é só sobre o país de chegada.` | Composição “mapa de decisão”: destino no centro e cartões leves para pet, período, família e rota. É uma ilustração de relações; não é um mapa geográfico nem lista de requisitos. |
| 5. Possibilidades com segurança | Tirar a pressão de escolher modalidade sozinho | `Antes de decidir como ele viaja, entendemos o que faz sentido para vocês.` | Quatro cartões de possibilidades em grid ou carrossel mobile. Ícone linear + título + uma frase condicional. Fotos entram apenas como detalhes de contexto, não como promessa de cabine/carga. |
| 6. Prova humana | Substituir medo por confiança verificável | `Histórias reais começam com uma pergunta parecida com a sua.` | Um case grande, editorial, com foto real da família/pet e uma legenda de rota. O texto descreve desafio e acompanhamento; não inventa resultado. Sem case específico, trocar por uma faixa de autoridade e equipe real. |
| 7. Remover a última barreira | Responder dúvidas sem despejar informação | `Você não precisa ter todas as respostas para falar com a gente.` | FAQ em acordeão, visual limpo, duas colunas no desktop. Perguntas em linguagem de decisão, não de órgão regulador. |
| 8. Fechamento | Retomar intenção com baixa fricção | `Vamos começar a desenhar a viagem do seu pet para {destino}?` | Faixa escura Embarpet, com imagem recortada de pet/família chegando ao destino ou em gesto de encontro. Um único CTA e uma opção secundária discreta de conversar com a equipe. |

### 1. Hero: layout e conteúdo exatos

O hero precisa funcionar mesmo se a pessoa ler apenas esta dobra.

```text
Brasil → {destino}

Levar seu pet para {destino} não precisa ser um salto no escuro.

Uma viagem internacional pede decisões que façam sentido juntas.
Conte o básico do seu caso e comece a organizar os próximos passos.

[ Origem: Brasil / cidade ]
[ Quando vocês pretendem viajar? ]
[ Quem vai viajar? cão | gato | outro ]

[ Começar o planejamento → ]

Prova curta aprovada: +2.000 embarques / avaliação / credenciais
```

**Imagem:** uma única fotografia real, com alto valor emocional e operacional: tutor olhando para o pet, família no aeroporto ou um reencontro em um ambiente que sugira chegada. O pet deve ser o ponto focal, mas a presença humana evita estética de banco de imagens. Para cada destino, a variação pode ser o contexto de fundo sutil, a paleta de recorte e a rota textual — não um monumento caricato.

**Não usar:** avião voando sobre bandeira, mapa com linhas luminosas, pets em óculos de piloto, mosaico de fotos, vídeo que atrapalhe o formulário, ou imagem de caixa de transporte como principal se ela reforçar apreensão.

### 2. A seção da dor: design que acolhe, sem dramatizar

Copy proposta:

> `É normal que uma viagem como essa pareça grande demais no começo.`
>
> `O destino importa. Mas o perfil do seu pet, o momento da sua família e a forma de organizar as decisões também.`

Visualmente, é uma pausa depois do hero: fundo `--soft`, texto grande em teal e três pequenas “perguntas que rondam a cabeça”. Ícones: `Clock3`, `HeartHandshake` e `CircleHelp`. Não ilustrar medo com pet triste, documentos caindo ou alertas vermelhos.

### 3. O método: tornar a próxima ação visível

Copy proposta:

1. **Você conta o que já sabe.** `Destino, período e perfil do pet já nos dão um ponto de partida.`
2. **Nós lemos a jornada por inteiro.** `A rota, as possibilidades e os pontos que precisam de atenção entram na mesma conversa.`
3. **Vocês seguem com um plano.** `A equipe orienta os próximos marcos conforme o caso avança.`

Visual: uma rota horizontal minimalista no desktop e vertical no mobile. Usar `MapPin`, `SearchCheck` e `Route`/`Plane` da mesma família de ícones. A linha da rota é um elemento funcional que guia leitura; ela não deve virar uma animação decorativa de mapa-múndi.

### 4. O mapa de decisão: explicar sem ensinar legislação

Copy proposta:

> `O país de chegada é só uma parte da decisão.`
>
> `Por isso, a análise conecta destino, momento da viagem e perfil do seu pet antes de indicar os próximos passos.`

Visual: um painel de “conexões” com `{destino}` no centro e quatro nós: `Seu pet`, `Sua rota`, `Seu momento`, `A jornada da família`. Ícones recomendados: `PawPrint`, `Plane`, `CalendarDays`, `UsersRound`. Linhas de 1px em `--line`, sem infográfico complexo. Esse é o módulo visual que diferencia a LP: ele mostra que a resposta não cabe em uma busca do Google.

### 5. Modalidades: liberdade antes de tecnicidade

Copy de abertura:

> `Existem caminhos possíveis. O certo é descobrir qual conversa com a viagem de vocês.`

Cada cartão usa um ícone funcional, uma frase de contexto e uma imagem pequena de apoio opcional:

- **Mais perto de você** — `Quando a viagem pode ser planejada com o pet próximo à família.` — ícone `Armchair` ou `Plane`.
- **No mesmo voo** — `Quando a jornada de tutor e pet precisa ser coordenada.` — ícone `PlaneTakeoff`.
- **Operação dedicada** — `Quando porte, rota ou planejamento pedem outra estrutura.` — ícone `PackageCheck`.
- **Acompanhamento especializado** — `Quando a família busca presença ainda mais próxima nos marcos combinados.` — ícone `HeartHandshake`.

Os títulos comerciais podem continuar os nomes oficiais de modalidade abaixo da descrição, em menor destaque. A primeira leitura fala da necessidade da pessoa; o detalhe técnico fica disponível depois.

### 6. Prova: uma história, não uma parede de logos

Copy proposta:

> `Toda jornada começa com uma dúvida. Esta também começou.`

O case deve ter apenas quatro elementos: foto real, rota, desafio humano (ex.: mudança de país, primeira viagem, família separada) e o papel real da Embarpet. Um botão secundário pode abrir a história completa. Credenciais e logos ficam em uma faixa discreta abaixo, como reforço — não como o centro emocional da seção.

### 7. Fechamento: voltar ao que importa

Copy proposta:

> `O destino é {destino}. A viagem é de vocês.`
>
> `Comece pelo que já sabe. O restante a gente organiza junto.`

CTA: `Começar a análise da viagem`.

Visual: teal profundo, tipografia branca e uma única foto recortada de encontro entre humano e pet. O CTA turquesa deve ser a única área de alta saturação. Não repetir carrossel de provas, muitos links ou um menu completo neste fechamento.

## Kit de arte para produção

| Ativo | Papel | Direção |
|---|---|---|
| Foto principal por destino | Fazer a situação parecer real | Tutor + pet + ambiente de deslocamento/chegada; composição horizontal com espaço para copy. |
| Foto de case | Prova humana | Material autorizado, com pet e pessoa identificáveis quando permitido; legenda com contexto real. |
| Microfoto de modalidade | Dar textura sem fazer promessa | Detalhe de momento: pet junto ao tutor, caixa preparada, equipe em operação. Nunca usar como “garantia” de modalidade. |
| Ícones lineares | Escaneabilidade e método | Lucide, 20–24px, teal; apenas `MapPin`, `CalendarDays`, `PawPrint`, `UsersRound`, `SearchCheck`, `Route`, `PlaneTakeoff`, `PackageCheck`, `HeartHandshake`, `CircleHelp`. |
| Bandeira do destino | Contexto, não decoração | Pequena, circular ou retangular, ao lado de `Brasil → {destino}`. Não repetir em cards ou fundos. |

## Movimento, mobile e densidade

- Animação deve comunicar continuidade: progresso discreto da rota e entrada suave dos passos. Respeitar `prefers-reduced-motion`.
- Em mobile, hero vira copy → foto → três campos/CTA. A pessoa não pode precisar passar por uma imagem alta para iniciar o diagnóstico.
- Não usar carrossel automático. Cases e modalidades podem ter scroll horizontal manual, com indicação clara.
- A página completa deve ter de seis a oito decisões visuais. Se uma seção não reduz ansiedade, aumenta clareza ou abre o diagnóstico, ela sai.

## Requisitos funcionais do template

### 1. Hero: nomeia a situação, não a burocracia

- Título: “Vai levar seu pet para **{destino}**?”
- Texto de apoio: experiência, leitura do caso e planejamento da viagem.
- Prova institucional curta, apenas com claims aprovados.
- Formulário em poucos passos: origem, período aproximado e pet. O destino já vem preenchido e visível.
- CTA: “Entender os próximos passos” ou “Começar a análise da viagem”.

Evitar: listas de exigências, siglas, prazo garantido, “documentação completa” sem contexto ou CTA de WhatsApp como primeira e única ação.

### 2. Bloco de acolhimento da dor

Apresenta a situação sem tom técnico:

> “Uma viagem internacional envolve decisões que precisam conversar entre si: o perfil do pet, o destino, a companhia aérea, a caixa e o momento da família.”

O objetivo é normalizar a dúvida e justificar a análise. Não se apresenta como uma lista legal do país.

### 3. Como a análise ajuda naquele caso

Três passos consistentes em todos os destinos:

1. Entendemos a rota e o momento da viagem.
2. Avaliamos o perfil do pet e as possibilidades da jornada.
3. Organizamos um plano de próximos passos com acompanhamento.

O destino pode aparecer no título e em microcopy, mas a lógica continua segura mesmo quando regras externas mudam.

### 4. Possibilidades, sem pré-julgamento

Introduzir modalidades como possibilidades que precisam de análise: cabine, bagagem acompanhada, compartimento de cargas e acompanhamento especializado quando aplicável. A copy deve deixar claro que não há indicação automática por destino.

### 5. Prova que reduz risco percebido

Ordem de preferência:

- Case real daquele destino, com autorização e escopo verdadeiro.
- Case de jornada comparável, identificado como tal.
- Autoridade institucional: operações realizadas, equipe, credenciais e mídia — somente claims atualizados e aprovados.

Nunca fabricar um case por país, nem transformar uma foto em prova de resultado que ela não demonstra.

### 6. FAQ de decisão

Perguntas universais com a referência ao destino, mas respostas estáveis e não regulatórias:

- “Ainda dá tempo de planejar uma viagem para {destino}?”
- “Meu pet pode viajar comigo para {destino}?”
- “Como vocês definem a modalidade da viagem?”
- “O que preciso informar para começar a análise?”
- “Vocês acompanham a preparação da viagem?”

As respostas explicam o processo de avaliação, não fazem afirmações sobre regras vigentes no país.

### 7. CTA de fechamento

Repete o contexto — “Vamos começar a planejar a viagem do seu pet para {destino}?” — e abre/continua o diagnóstico. WhatsApp entra como ação secundária e rastreada após a qualificação ou na página de obrigado.

## Módulo de conteúdo

O template recebe um objeto pequeno, editorial e seguro. Exemplo conceitual:

```ts
type DestinationPage = {
  slug: string;
  name: string;
  countryLabel: string;
  heroImage: string;
  heroImageAlt: string;
  seo: { title: string; description: string; ogImage: string };
  caseStudy?: ApprovedCase;
  approvedProofIds: string[];
  faqTone?: "planejamento" | "acompanhamento" | "primeira-viagem";
};
```

Não entram nesse módulo: regras legais, datas, preços, prazo de emissão, listas de documentos, companhia aérea recomendada ou qualquer informação variável. Caso se decida publicar esses dados depois, eles serão um módulo editorial separado, com fonte oficial, responsável, data de revisão e plano de atualização.

## Regras de UX e mídia paga

- A mensagem do anúncio e o H1 devem usar o mesmo destino e a mesma promessa principal.
- Destino pré-selecionado reduz esforço, mas o usuário pode alterá-lo.
- O formulário pede apenas o necessário para o próximo passo. Dados pessoais só entram no momento em que houver valor percebido.
- A LP não replica menu, conteúdo nem múltiplas rotas da home; navegação compacta, logo e saída clara bastam.
- Mobile é a referência de desenho. CTA e primeiro passo do diagnóstico devem aparecer sem depender de muito scroll.
- Sem urgência artificial, contadores, promessa de aprovação ou afirmações operacionais não comprovadas.

## Tracking e definição de sucesso

Reaproveitar o contrato de eventos existente e acrescentar apenas contexto não pessoal:

| Evento | Contexto adicional permitido | Uso |
|---|---|---|
| `destination_page_view` | `destination`, `campaign`, `landing_variant` | leitura de entrada por página |
| `analysis_started` | `source: destination_lp`, `destination` | intenção inicial |
| `route_completed` | `destination_preselected: true/false` | qualidade e ajuste de rota |
| `analysis_completed` | `destination`, `pet_count`, `species` | conversão primária |
| `whatsapp_clicked` | `source`, `destination`, `qualified: true/false` | conversão assistida |

Não registrar nome, telefone, texto livre, data completa de viagem ou rota detalhada nos eventos de Ads/analytics.

Métricas de decisão: taxa de início e conclusão do diagnóstico, custo por diagnóstico concluído, taxa de lead qualificado, contato realizado e venda por destino/campanha. Clique no WhatsApp isolado não é métrica principal.

## Fases de execução futuras

1. **Fundação:** implementar rota `/destinos`, template e metadados por destino; corrigir a rota atual de análise para um único destino canônico.
2. **Piloto:** publicar Estados Unidos e Portugal com conteúdo aprovado, provas disponíveis e criativos alinhados.
3. **Instrumentação:** validar consentimento, GTM/GA4/Ads e funil em ambiente de teste antes de ativar mídia.
4. **Lançamento controlado:** uma campanha e uma variante por destino; estabelecer volume e período mínimos antes de decidir mudanças.
5. **Expansão:** adicionar destinos somente com pacote mínimo de mídia, SEO e copy aprovado.

## Pacote mínimo para liberar um novo destino

- Nome, slug, mercado/idioma e criativos aprovados.
- Meta title, description e imagem social próprios.
- Hero e microcopy revisados.
- Ao menos uma prova institucional aprovada; case específico somente se verdadeiro e autorizado.
- FAQ processual revisado.
- Evento de destino validado e URL de campanha testada.
- Responsável editorial definido.

## Critérios de aceite

- A página identifica o destino acima da dobra e abre o diagnóstico com esse destino preenchido.
- Nenhuma seção depende de informação regulatória variável para fazer sentido.
- O mesmo template funciona sem case específico.
- Todo CTA principal chega ao diagnóstico funcional e todos os eventos respeitam consentimento e não incluem PII.
- A experiência mobile mantém mensagem, primeiro campo e CTA compreensíveis na primeira interação.
