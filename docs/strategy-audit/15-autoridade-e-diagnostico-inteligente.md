# Autoridade distribuída e diagnóstico inteligente

## Princípio

Não existe conversão acima de 100%, mas é possível elevar muito a conversão qualificada removendo atrito desnecessário e colocando a prova certa no momento em que a dúvida aparece.

O objetivo não é fazer todos preencherem o formulário. É fazer mais pessoas certas iniciarem a análise e dar ao atendimento contexto suficiente para responder rápido e bem.

## Autoridade distribuída

Autoridade não deve aparecer só no hero em forma de selo. Ela funciona melhor quando responde a uma pergunta específica.

| Momento | Dúvida do tutor | Prova que deve aparecer | Local |
|---|---|---|---|
| Hero | “Essa empresa é real?” | endereço em Guarulhos, avaliação pública, métrica aprovada e credencial verificável | próximo ao diagnóstico, em uma linha curta |
| Modalidades | “É seguro para meu pet?” | explicação técnica revisada, caso semelhante e credenciais relacionadas à operação | páginas de cabine, bagagem e carga viva |
| Documentação | “Eles sabem as regras?” | fonte oficial, data de revisão e responsável técnico/editorial | guias e páginas de destino |
| Serviços | “Eles fazem o meu tipo de caso?” | escopo explícito, parceiros/estrutura e case correspondente | páginas de serviço |
| Decisão | “Posso delegar?” | histórias completas, avaliações rastreáveis e equipe real | histórias, avaliações e Pet Luxo |
| Contato | “O que acontece depois?” | expectativa de retorno real, nome/equipe/canal e privacidade | confirmação de diagnóstico e WhatsApp |

### Biblioteca de provas reutilizáveis

O design system deve ter componentes para:

- selo/credencial com link de verificação;
- métrica com data-base e fonte;
- avaliação pública incorporada ou vinculada;
- case resumido por desafio;
- assinatura de especialista/responsável técnico;
- aviso regulatório com “revisado em” e fonte oficial;
- localização/operação em Guarulhos;
- bloco “o que está incluído” por serviço.

Nenhuma prova entra em produção sem fonte, data e responsável definidos.

## Diagnóstico como produto

O fluxo precisa parecer uma conversa orientada, não uma ficha longa. A regra é pedir **apenas o que desbloqueia o próximo passo**.

### Dados pré-preenchidos ou inferidos com transparência

| Dado | Como obter | Como usar | Limite |
|---|---|---|---|
| Localidade aproximada | geolocalização por IP ou cidade definida pelo usuário | sugerir cidade/país de origem | nunca assumir como verdade; sempre mostrar “alterar” |
| Página/origem da campanha | UTM, referrer e URL | personalizar título e registrar origem do lead | não exibir como dado sensível ao usuário |
| Destino de uma página temática | contexto da página/URL | pré-selecionar, com opção clara de editar | nunca travar a escolha |
| Retorno de visitante | cookie consentido / CRM | recuperar uma resposta anterior, se houver consentimento | oferecer editar e respeitar privacidade |
| Dispositivo e horário | dados técnicos | escolher teclado adequado, WhatsApp/call e momento de follow-up | não usar para alegações sobre o usuário |

Geolocalização precisa ser uma ajuda, não uma pergunta invasiva nem uma permissão obrigatória. O padrão é: “Você parte de São Paulo? [Sim] [Alterar]”.

## Fluxo progressivo recomendado

### Abertura contextual

```text
Vamos entender a viagem do seu pet
Leva cerca de 1 minuto. Você não precisa saber a modalidade agora.
```

### Etapa 1 — viagem

- A viagem será **saindo do Brasil** ou **chegando ao Brasil**?
- Onde seu pet está hoje? (origem sugerida, editável)
- Para onde ele vai? (destino)
- Quando pretende viajar? (mês/ano ou “ainda sem data”)

**Lógica:** se “chegando ao Brasil”, adaptar linguagem para importação e marcar rota inbound.

### Etapa 2 — pet

- Espécie: cão, gato, ave, outro.
- Porte/peso aproximado.
- Raça (opcional no primeiro momento; obrigatória se cão/gato e fluxo avançar).
- O tutor viajará no mesmo voo? sim / não / ainda não sei.

**Lógica:**

- “Ave/outro” abre rota de caso especial, sem prometer elegibilidade.
- Porte maior ou tutor não acompanhante destaca que há modalidades além da cabine, reduzindo abandono.
- Raça braquicefálica pode acionar mensagem cuidadosa: “Esse tipo de caso precisa de avaliação individual.”

### Etapa 3 — preparo e contato

- Já tem passagem? sim / não.
- Microchip e vacina antirrábica: “não sei”, “sim”, “não”.
- Nome e WhatsApp.
- Consentimento de privacidade para atendimento via WhatsApp.

Não pedir sorologia, medida de caixa, documentos ou fotos na primeira conversão. Esses dados entram em WhatsApp/CRM quando necessários.

### Confirmação útil

```text
Recebemos sua solicitação para [origem] → [destino].
Seu caso será analisado considerando o prazo, o perfil do pet e as regras aplicáveis.

[Continuar no WhatsApp]  [Voltar e editar respostas]
```

Mostrar prazo de resposta somente se houver SLA real. Ao concluir, abrir WhatsApp com mensagem pré-preenchida contendo o resumo do caso e ID do lead.

## Variações de entrada sem fragmentar o funil

| Contexto de entrada | Ajuste na primeira tela | Mesmo destino final |
|---|---|---|
| Home / Ads amplo | “Seu pet vai para outro país?” | diagnóstico padrão |
| Página de importação | “Vamos planejar a chegada do seu pet ao Brasil” | diagnóstico com rota inbound pré-selecionada |
| Página de carga viva | “Vamos avaliar a operação mais adequada para seu pet” | diagnóstico com interesse em caso complexo registrado |
| Página de cabine | “Vamos verificar se a cabine é uma possibilidade” | diagnóstico sem prometer cabine |
| Destino futuro | “Planeje a viagem do seu pet para [destino]” | destino preenchido e editável |
| Conteúdo/guia | “Quer validar isso no seu caso?” | diagnóstico padrão com tema do artigo registrado |

## Microinterações que reduzem fricção

- Autocomplete de países/cidades e busca por digitação.
- Botões de escolha grandes, com ícone e texto claro; não dropdowns longos no mobile.
- Barra de progresso honesta: “Etapa 1 de 3”.
- Resumo editável antes de enviar.
- Salvamento local temporário, apenas com consentimento, para retomar uma análise iniciada.
- Campo de telefone com máscara e validação não agressiva.
- Alternativa “Ainda não sei” em perguntas que muitos não conseguem responder.
- Explicações curtas só quando a resposta muda a estratégia.

## Não fazer

- Solicitar permissão de localização logo de início sem explicar utilidade.
- Inferir origem e esconder a possibilidade de correção.
- Fazer o usuário escolher cabine, porão ou carga antes do diagnóstico.
- Exigir cadastro/senha.
- Mostrar preço calculado sem base operacional suficiente.
- Abrir WhatsApp sem registrar a origem e o mínimo do caso.
- Usar provas genéricas ou números não auditáveis.

## Métricas do diagnóstico

| Métrica | Pergunta que responde |
|---|---|
| taxa de início por origem de tráfego | o hero e CTA motivam ação? |
| abandono por etapa e pergunta | qual pergunta cria fricção? |
| taxa de envio e clique no WhatsApp | o fluxo conclui e transfere bem? |
| taxa de lead qualificado | estamos atraindo importação/exportação com pet? |
| tempo até primeiro contato | o comercial aproveita o interesse enquanto está quente? |
| proposta e venda por contexto | quais rotas, campanhas e perfis geram receita? |

## Decisões necessárias antes de projetar o componente

1. A Embarpet pode usar geolocalização aproximada sob política de consentimento atualizada?
2. **Decidido:** WhatsApp é o único canal de conversão e de primeiro atendimento.
3. Qual sistema recebe o lead e quais campos ele precisa para atendimento imediato?
4. Qual SLA de primeira resposta é realista por horário/canal?
5. Quais credenciais, métricas, avaliações e cases estão aprovados para os componentes de prova?
