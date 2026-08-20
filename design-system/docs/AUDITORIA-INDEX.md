# Auditoria da index Embarpet

Data: 20/08/2026  
Regra desta auditoria: a index aprovada é a referência visual. Nenhuma seção deve ser redesenhada por uma regra abstrata do design system.

## Resumo executivo

A composição e o storytelling da index estão maduros. Os problemas restantes são majoritariamente de arquitetura, comportamento e manutenção — não de direção visual.

Prioridades encontradas:

1. **CTAs do diagnóstico com comportamento quebrado**: há links para `#analise` e chamadas a `scrollIntoView()` para um elemento que não existe mais. O fluxo atual abre por `embarp:open-analysis`.
2. **Quatro implementações concorrentes de botão**: `ep-ds-button`, `ep-button`, `ep-nav-cta` e CTAs locais da home possuem regras e animações próprias.
3. **CSS acumulado de alto risco**: `home.css` tem 2.416 linhas, 101 media queries e 421 ocorrências de `!important`. O visual está aprovado, mas pequenas alterações podem produzir regressões difíceis de prever.
4. **Recursos externos no caminho visual**: thumbnail do YouTube e ícones do Instagram dependem de URLs externas, contrariando a estratégia de assets locais já aplicada às bandeiras e logos.
5. **Prova social repetida em excesso potencial**: `+2.000` aparece na hero, histórias, autoridade e CTA final. A repetição reforça confiança, mas quatro aparições com tratamentos distintos diluem a força do dado.

## Auditoria seção por seção

### 1. Header

- **Aprovado**: hierarquia, idioma, megamenu e CTA principal.
- **Dívida**: o CTA usa `ep-nav-cta`, uma implementação exclusiva fora do design system.
- **Ação recomendada**: documentar esse comportamento como referência de conversão antes de qualquer extração. Não migrar agora.

### 2. Hero

- **Aprovado**: hook, prova social, composição visual, VSL sob demanda e início do diagnóstico.
- **Atenção**: o CTA mobile possui implementação própria (`ep-hero-mobile-analysis`).
- **Ação recomendada**: preservar. Usá-lo como referência de proporção do avião no catálogo de botões.

### 3. Carrossel de embarques

- **Aprovado**: função de transição e variedade de imagens.
- **Atenção**: duplicar o conjunto no DOM é correto para o loop; não confundir essa duplicação técnica com repetição visual indevida.
- **Ação recomendada**: nenhuma mudança visual.

### 4. Modalidades

- **Aprovado**: cards, imagens, hierarquia e CTA `Saiba mais` em largura total.
- **Consistente**: usa `InternalLink`, o componente reutilizável mais alinhado ao padrão aprovado.
- **Ação recomendada**: tratar esta seção como referência de navegação interna em cards.

### 5. Equipe / Thamires Félix

- **Aprovado**: contraste, retrato, identidade e posicionamento da copy.
- **Consistente**: CTA usa `InternalLink` sobre fundo escuro.
- **Ação recomendada**: nenhuma alteração visual.

### 6. Método Embarpet

- **Aprovado**: framework cronológico e leitura em duas colunas.
- **Erro funcional**: CTA e cards usam `href="#analise"`; isso não abre o modal atual.
- **Dívida visual**: CTA usa `ep-home-process__cta`, não o componente canônico de conversão.
- **Ação recomendada**: em uma correção isolada, disparar `embarp:open-analysis` preservando integralmente o CSS atual.

### 7. Embarpet na mídia

- **Aprovado**: hierarquia editorial, VSL e cards de matérias.
- **Consistente**: `Assistir completo` usa `InternalLink`.
- **Dívida de performance**: thumbnail vem de `i.ytimg.com`.
- **Ação recomendada**: armazenar thumbnail local otimizada; não alterar layout.

### 8. Histórias reais

- **Aprovado**: canvas desktop, carrossel mobile e CTA.
- **Consistente**: `Veja mais histórias` usa `InternalLink`.
- **Dívida de performance**: ícone do Instagram é carregado da Wikimedia em cada card.
- **Ação recomendada**: substituir por asset SVG local oficial.

### 9. PetLuxo

- **Aprovado**: diferenciação premium, vídeo leve e estrutura do conteúdo.
- **Erro funcional**: `Avaliar PetLuxo` procura `#analise`, que não existe.
- **Dívida visual**: usa o botão legado `ep-button`, apesar de ser uma ação de conversão.
- **Ação recomendada**: corrigir somente o evento de abertura; preservar o botão até haver comparação visual aprovada.

### 10. Destinos

- **Aprovado**: seleção de países e ligação direta com a análise.
- **Consistente**: seleção já chama `startFromDestination()` e abre o modal com contexto.
- **Ação recomendada**: nenhuma.

### 11. Experiência comprovada

- **Aprovado**: bento, credenciais e CTA institucional.
- **Consistente**: usa `InternalLink`.
- **Atenção estratégica**: é a quarta camada de autoridade após hero, equipe e histórias; manter somente se a densidade continuar boa em testes reais.

### 12. FAQ

- **Aprovado**: intenção de busca, escaneabilidade e profundidade.
- **Ação recomendada**: nenhuma mudança visual. Validar apenas schema/SEO em auditoria separada.

### 13. CTA final

- **Aprovado**: encerramento visual e reforço da conversão.
- **Erro funcional**: botão procura `#analise`, que não existe.
- **Dívida visual**: usa `ep-button--primary`, não o CTA de conversão documentado.
- **Ação recomendada**: trocar apenas a ação pelo evento do modal; não alterar aparência.

### 14. Footer

- **Aprovado**: arquitetura, redes e utilidade.
- **Erro funcional**: links “Começar uma análise” e “Falar sobre a viagem” apontam para `#analise` e não abrem o modal.
- **Ação recomendada**: usar um único helper/evento de abertura do diagnóstico.

## Diagnóstico do design system de botões

O catálogo estava errado por declarar-se “fonte de verdade” enquanto a index aprovada possui outras implementações em produção.

Famílias reais encontradas:

| Função | Implementação atual | Referência aprovada |
|---|---|---|
| Conversão no header | `ep-nav-cta` | Header |
| Conversão na hero mobile | `ep-hero-mobile-analysis` | Hero |
| Conversão no método | `ep-home-process__cta` | Método |
| Conversão genérica | `AnalysisButton` | Ainda não adotado pela index |
| Navegação interna | `InternalLink` | Modalidades, equipe, mídia, histórias e autoridade |
| Interface de formulário | `ep-button` legado + regras do modal | Diagnóstico |

Correção aplicada ao playground:

- a index passou a ser declarada como referência;
- o avião não fica mais estacionado no botão;
- a animação ocorre apenas por hover ou foco;
- a demonstração automática foi removida;
- navegação interna usa tamanho médio como padrão, inclusive em “Assistir completo”.

## Sequência segura para correções futuras

1. Corrigir somente os CTAs quebrados para abrirem o modal, sem alterar CSS.
2. Centralizar a abertura em um helper/componente único.
3. Localizar thumbnail do YouTube e ícone do Instagram.
4. Congelar screenshots de referência da index.
5. Somente então consolidar CSS duplicado, uma família de botão por vez.

Não fazer uma migração visual global enquanto não houver comparação por screenshot e aprovação de cada seção.
