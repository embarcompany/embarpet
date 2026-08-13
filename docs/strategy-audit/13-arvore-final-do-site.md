# Árvore final do site institucional conversivo

## Princípio de navegação

A pessoa chega procurando uma solução para a viagem do pet, não uma descrição da empresa. Por isso a navegação prioriza entendimento e diagnóstico; o institucional aparece como camada de confiança.

## Cabeçalho principal

```text
Logo Embarpet
├── Como funciona
├── Modalidades
│   ├── Visão geral: Como seu pet pode viajar?
│   ├── Pet na cabine
│   ├── Bagagem acompanhada
│   ├── Carga viva
│   └── Animais de serviço
├── Serviços
│   ├── Assessoria internacional completa
│   ├── Importação para o Brasil
│   ├── Processo veterinário e documentação
│   └── Pet Luxo
├── Destinos
│   └── Explorar destinos e requisitos
├── Histórias reais
├── Guias
└── [CTA] Analisar a viagem do meu pet
```

### Regra de interface

- Em desktop, **Modalidades**, **Serviços** e **Destinos** podem abrir megamenus curtos, orientados a tarefas.
- Em mobile, usar acordeões; o CTA de diagnóstico fica fixo ou visível no topo.
- Não usar “Sobre” como item principal. Ele fica no menu auxiliar/rodapé.
- Evitar mais de sete escolhas de primeiro nível antes do CTA.

## Páginas de primeiro nível

```text
/
├── /diagnostico
│   └── /diagnostico/recebido
├── /como-funciona
├── /modalidades
│   ├── /modalidades/cabine
│   ├── /modalidades/bagagem-acompanhada
│   ├── /modalidades/carga-viva
│   └── /modalidades/animais-de-servico
├── /servicos
│   ├── /assessoria-internacional
│   ├── /importacao
│   ├── /processo-veterinario-e-documentacao
│   └── /pet-luxo
├── /destinos
├── /historias
│   └── /historias/<slug-do-caso>
├── /avaliacoes
├── /por-que-embarpet
├── /guias
│   ├── /guias/destinos
│   ├── /guias/documentacao
│   ├── /guias/modalidades
│   ├── /guias/planejamento
│   └── /guias/<slug-do-artigo>
├── /perguntas-frequentes
├── /sobre
├── /equipe-e-credenciais
├── /contato
├── /links
├── /en
└── rotas legais
    ├── /privacidade
    ├── /termos
    └── /acessibilidade
```

## Navegação secundária e rodapé

```text
Embarpet
├── Sobre a Embarpet
├── Equipe e credenciais
├── Avaliações
├── Histórias reais
├── Contato
└── Grupo Embarcompany

Ajuda para a viagem
├── Como funciona
├── Modalidades
├── Destinos
├── Guias
└── Perguntas frequentes

Atendimento
├── WhatsApp
├── Telefone
├── E-mail
└── Endereço em Guarulhos

Legal
├── Privacidade
├── Termos
├── Acessibilidade
└── Preferências de cookies
```

## Mapa de propósito e CTA

| Grupo | Intenção do visitante | Página de entrada | Próxima ação |
|---|---|---|---|
| Demanda ampla | “Preciso levar meu pet para outro país” | Home | iniciar diagnóstico |
| Insegurança | “Como isso funciona?” | Como funciona / Modalidades | entender e iniciar diagnóstico |
| Modalidade | “Meu pet pode ir na cabine/no porão/em carga?” | página da modalidade | verificar viabilidade |
| Serviço | “Preciso importar / delegar toda a viagem” | página do serviço | analisar o caso |
| Decisão | “Posso confiar?” | histórias, avaliações, por que Embarpet | iniciar diagnóstico |
| Pesquisa | “Quais documentos, prazos e regras?” | guias e FAQ | diagnóstico ou conteúdo relacionado |
| Institucional | “Quem está por trás?” | sobre, equipe e credenciais | aprofundar confiança / contato |

## O que fica fora da Fase 1

- LPs de mídia por EUA, União Europeia, Mercosul ou países específicos.
- LPs de campanhas sazonais, parceiros ou remarketing.
- Calculadora/estimador de valor com preço; o diagnóstico substitui essa promessa até haver base de dados suficiente.

Esses ativos serão criados na Fase 2, reutilizando navegação, componentes, provas, formulário e rastreamento do institucional.

## Decisões já tomadas

- “Carga Viva” fica visível dentro de **Modalidades**, não como item principal do cabeçalho.
- O diagnóstico é a conversão principal compartilhada por todo o site.
- O institucional é necessário, mas secundário à jornada do tutor.
- O site-base antecede as LPs por destino.
