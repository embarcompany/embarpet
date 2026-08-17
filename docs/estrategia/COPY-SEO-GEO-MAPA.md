# Mapa de copy, SEO e GEO — Embarpet

**Atualizado em:** 17 de agosto de 2026
**Escopo:** index publicada, diagnóstico, obrigado e backlog de páginas editoriais.
**Princípio editorial:** a Embarpet avalia viabilidade; não promete modalidade, aprovação, prazo ou embarque antes da leitura da rota.

| Rota / seção | Objetivo e funil | Público e intenção | Palavra-chave principal | Pergunta respondida | CTA | Prova / compliance | Schema e prioridade |
|---|---|---|---|---|---|---|---|
| `/` — hero | Iniciar diagnóstico; descoberta → consideração | Família com viagem internacional | transporte internacional de pets | “Como começo a planejar a viagem do meu pet?” | Começar minha análise | Rota, prazo e pet são obrigatórios; não há promessa | `Organization`, `Service`; P0 |
| `/` — modalidades | Qualificar antes de comparar alternativas | Tutor pesquisando cabine, bagagem ou cargas | modalidades de transporte de pets em avião | “Qual modalidade pode fazer sentido?” | Avaliar possibilidade | Aplicável conforme rota, pet, companhia e regra vigente | `Service` por futura rota; P0 |
| `/` — quem cuida / mídia | Construir confiança | Lead em consideração | empresa de transporte internacional de pets | “Quem executa e por que confiar?” | Conhecer a Embarpet | Só usar credenciais, mídia e números com fonte | `Organization`; P1 |
| `/` — método | Explicar a operação | Lead que precisa reduzir incerteza | planejamento de viagem internacional com pet | “O que acontece depois do contato?” | Começar minha análise | Descrever processo, não resultado garantido | `HowTo` apenas quando cada etapa tiver instruções completas; P1 |
| `/` — destinos | Capturar intenção por rota e abrir diagnóstico | EUA, Europa, Mercosul e outros destinos | viagem internacional com pet para [destino] | “O destino muda o plano?” | Escolher destino | Regras são variáveis e precisam de atualização | `ItemList`; P1 |
| `/` — FAQ | Responder long-tail e reduzir objeções | Usuário próximo da decisão | CVI, caixa de transporte, pet na cabine | “Como funciona o transporte aéreo do pet?” | Iniciar análise | Resposta direta + dependência de rota e regras vigentes | `FAQPage`; P0 |
| `/analise` ou modal | Coletar rota, pets e contato | Lead qualificado | diagnóstico de viagem internacional com pet | “Quais dados preciso informar?” | Ver meu resumo | Dados mínimos, sem promessas | `noindex`; P0 |
| `/obrigado` | Levar o lead ao WhatsApp | Lead convertido | atendimento Embarpet pelo WhatsApp | “Qual é o próximo passo?” | Continuar pelo WhatsApp | Não expor PII na URL; página não indexável | `noindex,nofollow`; P0 |
| Futura `/modalidades/[slug]` | Capturar intenção transacional específica | Tutores comparando modalidades | pet na cabine / bagagem acompanhada / compartimento de cargas | “Quando esta alternativa pode se aplicar?” | Avaliar meu caso | Matriz operacional aprovada antes de publicar | `Service`, `BreadcrumbList`; P1 |
| Futura `/destinos/[slug]` | Capturar intenção geográfica | Tutores com destino definido | pet para Estados Unidos / Europa / Portugal etc. | “O que muda nesta rota?” | Iniciar análise da rota | Data, fonte e revisão obrigatórias em conteúdo regulatório | `BreadcrumbList`, `FAQPage` quando houver FAQ visível; P1 |
| Futura `/guias/[slug]` | Educação e autoridade | Pesquisa informacional | CVI, caixa de transporte, braquicefálico | “Como entender este requisito?” | Analisar minha rota | Autor, data e fontes oficiais obrigatórios | `Article`, `BreadcrumbList`; P2 |

## Arquitetura de links internos

`Index → diagnóstico → obrigado → WhatsApp` é o caminho de conversão. A index também deve apontar, quando publicadas, para páginas de modalidade, destino e guia; cada uma deve devolver o usuário ao diagnóstico com contexto da rota ou alternativa, nunca para uma promessa pronta.

## Regras de resposta para IA e buscadores

- Abrir cada bloco regulatório com uma resposta direta e verificável.
- Nomear as entidades: Embarpet, transporte internacional de pets, origem, destino, CVI, companhia aérea, caixa de transporte e modalidade.
- Vincular datas de revisão e fontes oficiais a regras por país; não assumir que uma regra permanece válida.
- Usar casos e credenciais somente com autorização, fonte e escopo definidos.
