# Referências de interação incorporadas ao redesign

## Origem e status

Este documento incorpora dois componentes anexados como referência de produto. A arquitetura visual e de interação deve ser preservada com alta fidelidade — hierarquia, densidade, agrupamento de campos, expansão e clareza de CTA — e reconstruída na base técnica e na identidade da Embarpet. Não se copia o código, a marca, conteúdo ou promessas do produto de origem.

| Referência | Padrão identificado | Decisão para Embarpet |
|---|---|---|
| Formulário de reserva por rota | origem e destino conectados, contexto de data e CTA de tarefa | adotar no início do diagnóstico da viagem |
| Lista regional expansível | descoberta por região, países frequentes e expansão progressiva | adotar no hub `/destinos` e na seção de destinos da home |

O terceiro anexo repete a segunda referência; não introduz um terceiro padrão.

## 1. Diagnóstico por rota

### O que funciona na referência

- O usuário entende a tarefa antes de preencher: sair de um lugar e chegar a outro.
- Origem e destino aparecem como uma relação, não como campos soltos.
- A imagem contextualiza a ação e evita que o formulário pareça burocrático.
- O CTA descreve o próximo passo de uma tarefa concreta.

### Adaptação aprovada

```text
Etapa 1 de 3 — Sobre a viagem

[ ícone de partida ] De onde seu pet parte?
          │
[ ícone de chegada ] Para onde ele vai?

[ calendário ] Quando pretende viajar?  [Continuar análise]
```

- A conexão vertical é informação de interface, não um elemento decorativo.
- A data é aproximada (mês/ano ou “ainda estou planejando”); o horário não é necessário nessa fase.
- Uma sugestão de cidade pode aparecer somente após consentimento e sempre precisa de alternativa para alterar/digitar.
- A fotografia usa PNG editorial autorizado e sustenta o contexto de tutor + pet + viagem.

### Invariantes visuais a preservar

- Card de tarefa compacto e dominante, com campos visíveis e sem texto operacional excessivo.
- Ícones lineares de partida, chegada e calendário dentro da leitura do campo.
- Rota desenhada por alinhamento e conexão de interface, sem ilustração abstrata.
- CTA no mesmo bloco da tarefa e microcopy curta logo abaixo/ao redor da decisão.
- Em desktop, imagem editorial PNG e formulário convivem na mesma primeira dobra; em mobile, formulário vem antes da imagem.

### Limites obrigatórios

- Não mostrar preço instantâneo, disponibilidade de voo ou recomendação automática de modalidade.
- Não exigir todos os dados antes da pessoa entender o próximo passo.
- Não usar sombra, animação chamativa ou imagem genérica remota para dar “peso” ao formulário.

## 2. Explorador de destinos por região

### O que funciona na referência

- A pessoa explora um universo grande em uma primeira camada simples.
- Regiões evitam uma lista longa e cansativa de países.
- A expansão progressiva mantém a página escaneável em mobile.
- A exploração pode revelar intenção útil sem virar uma LP de campanha.

### Adaptação aprovada

| Entrada | Conteúdo inicial | Continuidade |
|---|---|---|
| Estados Unidos | visão geral da rota Brasil–EUA | abrir guia/requisitos revisados ou iniciar diagnóstico contextual |
| União Europeia | Portugal, Espanha, Itália, França e Alemanha como recortes de descoberta | ver demais países e consultar guia específico quando existir |
| Mercosul | Argentina, Uruguai e Paraguai como recortes de descoberta | abrir guia regional ou iniciar diagnóstico contextual |

Cada bloco deve ter título, ícone funcional de rota/região, uma frase de orientação, nomes clicáveis e o controle “Ver destinos”/“Ocultar destinos”. O componente não afirma elegibilidade, prazo ou documentação sem fonte e data de revisão.

### Invariantes visuais a preservar

- Lista de regiões em linhas amplas, com título e contexto antes de revelar detalhes.
- Expansão dentro do mesmo bloco, sem navegação inesperada nem modal.
- Países mais frequentes como ações leves e escaneáveis; o restante fica progressivamente revelado.
- CTA de continuidade forte após a exploração, mas sem aparência de botão genérico ou institucional pesado.

### Limites obrigatórios

- Não usar bandeiras externas em SVG. Se bandeiras fizerem sentido em uma futura versão, precisam ser PNG aprovados e não podem ser o único identificador do país.
- Não transformar o explorador em seletor obrigatório no hero: no diagnóstico, busca/autocomplete de destino é mais rápida.
- Não levar uma seleção diretamente a uma promessa comercial; levar a conteúdo revisado ou ao diagnóstico com o contexto preservado.

## Aplicação no mapa do site

1. **Home:** hero com `RouteFieldGroup`; mais abaixo, uma versão resumida do `RegionExplorer`.
2. **`/destinos`:** versão completa do `RegionExplorer`, seguida de guias revisados e fonte oficial quando houver regra regulatória.
3. **Diagnóstico:** origem/destino selecionados no explorador pré-preenchem o fluxo; o usuário pode editar tudo.
4. **LPs de destino (fase 2):** usam o mesmo campo de rota e recebem tráfego de campanha, mas não substituem o site institucional conversivo.

## 3. Transição de scroll narrativa

O componente de referência `ScrollFlyIn` deve ser incorporado como `ScrollRouteIn`: a mesma sensação de uma imagem atravessando/chegando ao enquadramento com o scroll, mas aplicada a uma foto PNG editorial autorizada de tutor e pet em viagem.

- **Entra depois do processo**, não na primeira dobra: o hero continua inteiramente dedicado ao diagnóstico.
- **Texto estático e central:** “Planejar a viagem é o que permite que vocês cheguem juntos.”
- **Sem CTA:** a função é dar respiro e tornar a jornada memorável; o CTA seguinte pertence ao explorador de destinos.
- **Fallback obrigatório:** com redução de movimento, a imagem fica estática e nenhuma informação depende da animação.
- **Não usar:** avião genérico, asset 3D, gradiente, sombra ou animação de enfeite.

## Critério de teste

Comparar a versão atual do hero com a versão de rota usando, no mínimo: início do diagnóstico, conclusão da etapa 1, preenchimento de origem/destino, avanço para etapa 2 e geração de lead qualificado. Para destinos, medir expansão por região, clique em guia, início de diagnóstico contextual e lead qualificado por destino.
