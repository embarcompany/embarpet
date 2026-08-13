# Referências e padrões para o redesign

## Regra de uso

Referências servem para aprender arquitetura, hierarquia, interação e princípios de conversão. Não copiar texto, promessas, métricas, casos, imagens, identidade ou estruturas proprietárias de concorrentes.

## Pet Viajante — leitura da home atual

**Fonte analisada:** `SRC-14` e catálogo de contexto interno fornecido pelo usuário (`REF-01`).

### Padrões que funcionam

| Padrão | Como aparece | Por que é relevante para a Embarpet |
|---|---|---|
| Hero com qualificação | simulador em três etapas no topo: espécie, origem/destino/data e contato | reduz atrito e transforma tráfego de Google Ads em lead com contexto |
| Oferta traduzida em resultado | CTA pede simulação/valores e análise, não apenas “contato” | o tutor quer saber se a viagem é viável antes de entender o serviço |
| Prova acima da dobra | métricas, avaliação e diferenciais próximos ao hero | ajuda a reduzir desconfiança em um mercado de alto risco percebido |
| Explicação em três passos | análise → estratégia → acompanhamento | torna uma operação complexa compreensível e menos ameaçadora |
| Objeções transformadas em conteúdo | preço, porão, documentação, braquicefálicos, prazos e cabine | educa sem exigir que o lead conheça termos técnicos |
| Cases com contexto | rota, modalidade, problema e resultado | prova capacidade melhor que depoimentos genéricos |
| Hub editorial por intenção | guias sobre confiança, custos, medos, processo e destinos | cria ativos de SEO e suporte a mídia paga |

### O que adaptar para a Embarpet

1. **CTA principal:** “Solicitar análise da viagem do meu pet” ou “Descobrir a melhor forma de meu pet viajar”.  
   Evitar prometer modalidade ou valor antes da análise.
2. **Formulário progressivo:** origem, destino, data aproximada, espécie; depois nome, telefone e e-mail.  
   Campos de porte, raça, peso e tutor acompanhante podem entrar na confirmação ou WhatsApp, sem impedir a conversão inicial.
3. **Módulo de viabilidade:** explicar que cabine, bagagem acompanhada, carga viva ou importação são definidos conforme pet, rota, companhia e requisitos do destino.
4. **Prova específica:** mostrar casos de carga viva, pets grandes, importação, Ásia, espécies especiais e operação em Guarulhos, desde que autorizados e verificáveis.
5. **Conteúdo por intenção:** priorizar dúvidas que atraem demanda de Google Ads e levam naturalmente à análise: destino, prazo, custo, cabine, pet grande/carga e documentação.

### O que não reproduzir sem validação ou sem aderência ao negócio

- Faixas de preço, números de pets, avaliações, equipe, suporte ou presença internacional do concorrente.
- Promessas de aprovação, “sem risco”, viabilização judicial ou cabine para casos que não se apliquem.
- Linguagem de liderança/número um sem evidência independente.
- Conteúdo regulatório sem fonte oficial atualizada.

## Direção para a LP principal da Embarpet

### Prioridade de negócio

Maximizar **volume de leads qualificados** advindos de Google Ads. Para a Embarpet, um lead qualificado é uma demanda de importação ou exportação internacional com pet. A modalidade de maior valor, carga viva, é identificada após o diagnóstico — não deve virar uma barreira ou promessa na aquisição.

### Arquitetura sugerida

1. **Hero:** dor ampla + promessa de diagnóstico + formulário de baixa fricção.
2. **Compatibilidade:** “Como seu pet pode viajar?” com as modalidades condicionais.
3. **Processo:** quatro etapas, do diagnóstico ao desembarque.
4. **Por que Embarpet:** provas verificáveis de operação, especialistas e capacidade.
5. **Casos reais:** por desafio e rota, não apenas elogios genéricos.
6. **Objeções essenciais:** cabine, pet grande, porão/cargo, documentação, prazo e preço.
7. **CTA final:** análise de viabilidade / cotação contextual.

### Hipótese a testar

Uma LP que oferece “análise de viabilidade” tende a ser mais fiel ao modelo de assessoria do que uma LP que promete “orçamento instantâneo”. Comparar em experimento controlado:

- Variante A: “Solicitar análise da viagem”.
- Variante B: “Receber estimativa para meu caso”.

Critério de decisão: custo por lead qualificado, taxa de atendimento, taxa de proposta e taxa de venda; não apenas preenchimento de formulário.

## Referências intersetoriais complementares

| Referência | Problema equivalente | Padrão para absorver | Limite de adaptação |
|---|---|---|---|
| [Uber](https://www.uber.com/br/pt-br/) | usuário quer resolver uma necessidade imediatamente | formulário como produto no hero; institucional fora da ação principal | não prometer instantaneidade operacional onde há análise humana |
| [Wise](https://wise.com/) | processo internacional, variáveis, risco e necessidade de confiança | tornar a complexidade visível em dados simples; segmentar por necessidade e destino; provar transparência ao longo da jornada | não mostrar estimativa numérica falsa nem igualar regras de destinos diferentes |
| [Lemonade](https://www.lemonade.com/) | compra de serviço que costuma gerar ansiedade e desconfiança | linguagem simples, jornada guiada de cotação e prova de facilidade antes do detalhe técnico | evitar promessas de “instantâneo” ou preço inicial que não corresponda à assessoria |

### Síntese de produto para a Embarpet

**Uber** define o primeiro clique: “comece sua solicitação”.  
**Wise** define a clareza: “entenda o que muda no seu caso internacional”.  
**Lemonade** define o tom: “uma jornada complexa pode ser simples de iniciar”.

O resultado desejado é uma interface de **diagnóstico de viagem internacional para pets**: leve para começar, clara para entender, humana para concluir.

## Referência Uber

**Fonte analisada:** `SRC-17`.

### O princípio que importa

A home da Uber não começa explicando “quem é a Uber”. Ela abre com o trabalho que o usuário quer realizar: informar origem e destino para ver preços. A marca se prova pela utilidade do fluxo. O institucional existe em uma camada secundária — navegação “Sobre” e rodapé — sem competir com a ação primária.

### Padrões observados

| Padrão | Como a Uber aplica | Adaptação para a Embarpet |
|---|---|---|
| Ação antes da explicação | formulário de partida/destino no hero | triagem de viabilidade no hero: origem, destino, data e espécie |
| Contexto automático | cidade e opção de alterar localização | detectar/permitir definir país ou cidade de origem, sem presumi-la |
| CTA como próximo passo | “Ver preços” só aparece após os campos essenciais | “Ver possibilidades para meu pet” após dados mínimos; seguir ao contato somente depois |
| Formulário como interface de produto | campos grandes, ordenados pela tarefa e baixo texto | experiência de diagnóstico em etapas, não formulário burocrático |
| Audiências separadas | navegação para viajar, ganhar dinheiro e empresa | navegação por intenção: transportar pet, importar para o Brasil, Pet Luxo e conteúdo/empresa |
| Institucional em segundo plano | “Sobre” e rodapé; módulos comerciais no corpo da home | história, equipe, carreira, grupo e imprensa fora do fluxo principal, mas acessíveis |
| Conteúdo como continuação da intenção | módulos de viagem, motorista e empresa têm CTAs próprios | módulos de casos/modalidades/destinos fecham com a ação adequada, não com CTA genérico |

### O que a Embarpet não deve copiar literalmente

A Uber pode estimar preço a partir de origem e destino porque seu produto é altamente padronizado. A Embarpet é uma assessoria de caso variável: pet, espécie, porte, raça, documentação, companhia, rota e data mudam a viabilidade. Portanto, não criar falsa precisão nem chamar um diagnóstico de “simulação de preço”.

### Tradução para a LP principal

**Hero recomendado:**

> **Seu pet vai para outro país? Descubra a forma mais viável de realizar a viagem.**  
> Informe alguns dados e nossa equipe analisa a rota, as exigências e as possibilidades para o seu caso.

**Etapa 1 — a viagem:** origem, destino e mês/data prevista.  
**Etapa 2 — o pet:** espécie e porte/peso aproximado.  
**Etapa 3 — contato:** nome e WhatsApp, com consentimento claro.  
**Conclusão:** “Recebemos seu caso. Vamos analisar a viabilidade e orientar os próximos passos.”

Isso entrega uma interação de produto logo no hero, preserva a honestidade comercial e produz um lead utilizável para atendimento.

### Navegação recomendada

| Primário | Secundário / institucional |
|---|---|
| Como funciona | Sobre a Embarpet |
| Destinos | Equipe e credenciais |
| Modalidades | Grupo Embarcompany |
| Histórias reais | Conteúdos/Blog |
| Solicitar análise | Carreiras, imprensa, termos e privacidade |

O objetivo não é esconder o institucional; é deixá-lo fortalecer a confiança após a pessoa entender que a Embarpet resolve o caso dela.

## Evidências adicionadas

| ID | Fonte | Tipo | Data | Uso |
|---|---|---|---|---|
| SRC-14 | [Pet Viajante — home](https://petviajante.com.br/) | concorrente | 12/08/2026 | arquitetura de conversão, simulador, prova e cases |
| SRC-15 | [Pet Viajante — guia](https://petviajante.com.br/guia) | concorrente | 12/08/2026 | organização editorial por intenção |
| SRC-16 | [Pet Viajante — custos](https://petviajante.com.br/quanto-custa-transporte-internacional-pet) | concorrente | 12/08/2026 | educação de preço e fatores de complexidade |
| SRC-17 | [Uber Brasil — home](https://www.uber.com/br/pt-br/) | referência de produto | 12/08/2026 | formulário no hero, CTA e separação entre produto e institucional |
| SRC-18 | [Wise — home](https://wise.com/) | referência de produto | 12/08/2026 | clareza em processo internacional, segmentação e ferramenta no hero |
| SRC-19 | [Lemonade — home](https://www.lemonade.com/) | referência de produto | 12/08/2026 | cotação guiada e redução de ansiedade em serviço complexo |
| REF-01 | `C:/Users/usuario/Downloads/petviajante-guia-contexto.md` | material fornecido pelo usuário | 12/08/2026 | inventário de temas, intenções e precauções editoriais |
