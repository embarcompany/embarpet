# Arquitetura do redesign

## Decisão de produto

O projeto terá duas frentes deliberadamente separadas:

1. **Site institucional conversivo:** produto-base da marca. Explica a Embarpet, prova capacidade, organiza o conteúdo e transforma interesse amplo em diagnóstico qualificado.
2. **LPs de campanha:** ativos de mídia/SEO de alta intenção por destino, modalidade ou caso. Elas usam o mesmo design system e o mesmo funil, mas não carregam toda a navegação e amplitude do site-base.

A primeira fase é exclusivamente o **site institucional conversivo**. As LPs por destino serão definidas depois, a partir dessa fundação e da estratégia de campanhas.

## Estrutura atual observada

| Ativo atual | Papel aparente | Manter? | Diagnóstico |
|---|---|---|---|
| `/` | LP institucional ampla | redesenhar | concentra hero, modalidades, serviços, produtos, depoimentos e contato; serve para tráfego amplo, mas a ação inicial é genérica (`SRC-01`) |
| `/en/` | versão em inglês da LP | manter e reescrever | importante para clientes internacionais, mas deve acompanhar a nova arquitetura e conteúdo atualizado (`SRC-01`) |
| `/links` | hub para redes, WhatsApp e site | manter como utilitário | adequado para bio social; não é página de aquisição principal (`SRC-01`) |
| `/blog/` | blog e hub de conteúdo | migrar/reorganizar | possui conteúdo útil, porém navegação e estrutura estão desconectadas da LP principal (`SRC-05`, `SRC-20`) |
| `/blog/quem-somos/` | institucional | substituir por página “Sobre” | dados/contadores inconsistentes reduzem confiança (`SRC-04`) |
| `/blog/contato/` | contato genérico | substituir por diagnóstico | formulário não coleta dados mínimos do caso (`SRC-06`) |
| `/blog/postagens/` + artigos | SEO educativo | preservar URLs e melhorar | bom acervo inicial; precisa de clusters por intenção/destino e governança regulatória (`SRC-20`) |
| `lp.embarpet.com.br/asia/` | LP temática por destino/região | manter como referência e reconstruir | melhor formato atual: processo, FAQ, prova e CTA; ainda tem métricas/alegações a validar (`SRC-02`) |

## Problemas estruturais atuais

- A mesma página tenta ser anúncio, catálogo, institucional, página de serviço, loja e contato.
- A ação principal não qualifica o lead na entrada; a equipe precisa descobrir o contexto depois.
- Conteúdo, landing pages e institucional foram criados como propriedades separadas, sem uma taxonomia comum.
- Não há páginas comerciais fortes para intenções valiosas: importação, carga viva, pet grande, destinos prioritários e Pet Luxo.
- A arquitetura atual não deixa claro qual conteúdo é para aquisição, nutrição, decisão ou prova.

## Arquitetura proposta — Fase 1: site institucional conversivo

### Camada 1: conversão direta compartilhada

| Página | URL sugerida | Propósito | Tráfego principal | CTA primário |
|---|---|---|---|---|
| Home / diagnóstico | `/` | capturar a demanda ampla e iniciar triagem | Google Ads amplo, marca, direto | “Analisar a viagem do meu pet” |
| Diagnóstico | `/diagnostico` | fluxo progressivo de qualificação e entrega do lead ao atendimento | home, Ads, conteúdo e WhatsApp | “Enviar meu caso” |
| Obrigado / próximo passo | `/diagnostico/recebido` | confirmar dados, reduzir abandono e orientar expectativa de atendimento | conclusão do diagnóstico | “Falar no WhatsApp” ou aguardar contato |
| Importação | `/importacao` | explicar a frente de importação e encaminhar ao diagnóstico | navegação, busca de marca e conteúdo | “Analisar importação” |
| Carga viva | `/carga-viva` | explicar quando a modalidade pode ser necessária e atrair casos de maior valor | navegação, busca de marca e conteúdo | “Avaliar transporte do meu pet” |
| Pet Luxo | `/pet-luxo` | apresentar oferta premium e delegação integral | indicação, remarketing e navegação | “Ver se meu pet se qualifica” |

### Camada 2: serviços, modalidades e necessidades

| Tipo de página | URL modelo | Propósito | Regra |
|---|---|---|---|
| Modalidade | `/modalidades/cabine`, `/modalidades/carga-viva` | remover objeções antes do diagnóstico | tratar como possibilidade, não garantia |
| Caso especial | `/casos/pet-grande`, `/casos/braquicefalicos`, `/casos/aves-e-exoticos` | qualificar público com alta dor | ter aviso de análise individual |
| Preço orientativo | `/quanto-custa-levar-pet-para-outro-pais` | responder à intenção de preço sem falsa precisão | explicar variáveis e direcionar ao diagnóstico |

### Camada 3: confiança e decisão

| Página | URL sugerida | Propósito |
|---|---|---|
| Histórias reais | `/historias` | cases com rota, espécie, desafio, operação e resultado verificável |
| Avaliações | `/avaliacoes` | centralizar prova social com origem rastreável |
| Por que Embarpet | `/por-que-embarpet` | explicar processo, equipe, credenciais, endereço e critérios de comparação |
| Como funciona | `/como-funciona` | reduzir ansiedade com uma visão de ponta a ponta |
| Perguntas frequentes | `/perguntas-frequentes` | responder objeções recorrentes e levar a páginas específicas |

## Arquitetura de modalidades

### Hub: “Como seu pet pode viajar?”

**URL sugerida:** `/modalidades`  
**Papel:** apresentar as possibilidades sem forçar o tutor a escolher sozinho. Deve explicar que a definição depende de destino, porte, espécie, rota, companhia aérea, prazo e documentação.

| Página | URL sugerida | Medo/objeção que resolve | CTA |
|---|---|---|---|
| Pet na cabine | `/modalidades/cabine` | “Meu pet pode viajar ao meu lado?” | “Ver se meu pet pode viajar na cabine” |
| Bagagem acompanhada | `/modalidades/bagagem-acompanhada` | “Meu pet vai no mesmo voo, mas fora da cabine: como funciona?” | “Analisar a melhor modalidade” |
| Carga viva | `/modalidades/carga-viva` | “Meu pet é grande, viaja desacompanhado ou a rota exige cargo: ele pode viajar com segurança?” | “Avaliar transporte do meu pet” |
| Importação | `/importacao` | “Como trazer meu pet para o Brasil?” | “Analisar importação” |
| Serviço de assistência* | `/modalidades/animais-de-servico` | diferença entre cão de serviço, exigências e limitações | “Analisar meu caso” |

\* Não usar “suporte emocional” como modalidade comercial padrão. Conteúdo sobre esse tema requer validação jurídica, da companhia e do país de destino antes de publicação.

### Estrutura editorial de cada página

1. Quando essa modalidade costuma ser considerada.
2. O que define a elegibilidade — sem prometer aceitação.
3. Como a operação funciona, em linguagem simples.
4. Mitos e verdades.
5. Cuidados, preparação e fatores de segurança.
6. Caso real aplicável, com dados autorizados.
7. FAQ específico.
8. Diagnóstico contextual como CTA final.

### Diretriz de linguagem

Substituir “o seu pet vai viajar em X” por “X pode ser uma possibilidade para o seu caso”. A educação reduz medo, mas a decisão de modalidade deve continuar depois da análise técnica.

### Camada 4: conteúdo e SEO do institucional

| Página | URL sugerida | Propósito |
|---|---|---|
| Hub de conteúdo | `/guias` | organizar aprendizado por intenção, não apenas por ordem cronológica |
| Guia por destino | `/guias/destinos` | índice de países e regiões |
| Guia de documentação | `/guias/documentacao` | CVI, microchip, vacina, sorologia e prazos, com fontes oficiais |
| Guia de modalidades | `/guias/modalidades` | cabine, bagagem acompanhada, carga viva e caixa de transporte |
| Guia de planejamento | `/guias/planejamento` | cronograma, custos, caixa, dia do embarque e mudança internacional |
| Artigos | `/guias/<slug>` | responder uma intenção concreta, com CTA para diagnóstico |

### Camada 5: institucional e suporte

| Página | URL sugerida | Propósito |
|---|---|---|
| Sobre a Embarpet | `/sobre` | história, estrutura, missão e legitimidade |
| Equipe e credenciais | `/equipe-e-credenciais` | rostos, especialidades, parceiros e validação de certificações |
| Contato | `/contato` | canais gerais; não substitui o diagnóstico comercial |
| Grupo Embarcompany | link externo ou `/grupo` | explicar ecossistema sem diluir a proposta principal |
| Carreiras, política, termos | rotas utilitárias | transparência e obrigações legais |
| Inglês | `/en/` e equivalentes prioritários | atender demanda internacional, com conteúdo próprio e não mera tradução automática |

## Navegação recomendada

### Cabeçalho principal

- Como funciona
- Destinos
- Modalidades
- Histórias reais
- Guias
- CTA destacado: **Analisar a viagem do meu pet**

### Rodapé / menu secundário

- Sobre a Embarpet
- Equipe e credenciais
- Avaliações
- Contato
- Grupo Embarcompany
- Carreiras
- Termos, privacidade, acessibilidade

## Regras para não criar um “institucional disfarçado”

1. Toda página comercial deve responder uma intenção e ter um CTA contextual.
2. Páginas de serviço não devem duplicar catálogo; devem explicar quando aquele caminho se aplica.
3. Uma página de destino deve falar do destino e do caso, não apenas repetir a home trocando o título.
4. O histórico institucional entra como prova depois da necessidade do cliente, nunca no hero da aquisição.
5. O diagnóstico é o único funil compartilhado por todas as páginas; origem, campanha e intenção precisam ser registrados.

## Ordem de implementação

### Lançamento mínimo de alto impacto

1. Home institucional conversiva.
2. Diagnóstico e página de confirmação.
3. Como funciona.
4. Histórias reais + avaliações.
5. Importação, carga viva e Pet Luxo.
6. Hub de guias, preservando redirecionamentos do blog atual.

## Fase 2: LPs de campanha

As LPs não são páginas internas comuns nem cópias da home. Cada uma terá um objetivo de mídia específico, mensagem própria, prova adequada ao corredor e o mesmo fluxo de diagnóstico da fase 1.

| Família de LP | Primeira prioridade | Objetivo |
|---|---|---|
| Por corredor/destino | EUA, União Europeia, Mercosul | capturar intenção explícita de quem já sabe para onde vai |
| Por necessidade | carga viva, importação, pet grande | capturar dores que indicam maior complexidade e valor |
| Por oferta | Pet Luxo | converter público de alta delegação/ticket |

### Expansão orientada por dados

- LP de cada destino só após confirmar demanda de Ads, qualidade do lead e capacidade operacional.
- Conteúdo por caso especial conforme termos de busca e objeções reais do atendimento.
- Versão em inglês para as páginas que efetivamente recebem demanda internacional.

## Migração e SEO

- Fazer inventário de URLs atuais, tráfego, backlinks e conversões antes de desligar qualquer rota.
- Preservar URLs de artigos que já indexam; quando houver mudança, usar redirecionamento 301 um-para-um.
- Não migrar texto regulatório sem revisão técnica e fontes atualizadas.
- Manter páginas comerciais e artigos com objetivos distintos; uma não substitui a outra.

## Decisões que faltam para congelar a arquitetura

1. A página de carga viva será explícita no menu ou descoberta por busca/ads e casos especiais?
2. Pet Luxo é prioridade de crescimento agora ou oferta de nicho?
3. O novo site unificará blog e LP no mesmo domínio/tecnologia?
4. Quais provas reais estão aprovadas para publicação (números, cases, fotos e avaliações)?
