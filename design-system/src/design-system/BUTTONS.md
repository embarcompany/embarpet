# Botões Embarpet

Fonte visual: `/design-system/botoes`  
Implementação: `src/components/ui/buttons.tsx`  
Tokens e estados: `src/design-system/buttons.css`

## Hierarquia

- `AnalysisButton`: iniciar, continuar ou retomar a análise da viagem. É a única CTA com avião.
- `InternalLink`: navegar para conteúdo do site. Usa cápsula com seta.
- `InterfaceButton`: ações funcionais de fluxo; variantes `primary`, `secondary`, `ghost` e `danger`.
- `BackButton`: retorno dentro de formulários e modais.
- `CircleIconButton`: controles compactos; exige `label` acessível.

## Regras

- Alturas: `38px` (sm), `46px` (md), `54px` (lg).
- Raio: `999px` em todos os botões.
- Peso do texto: `700`.
- Use apenas um `AnalysisButton` dominante por contexto visual.
- Use `fullWidth` em formulários, cards estreitos e mobile; não para links editoriais soltos.
- Em `fullWidth`, o `InternalLink` mantém o texto à esquerda e o núcleo da seta no extremo direito.
- O avião completa o percurso mesmo após a saída do hover e também responde ao foco por teclado.
- O avião estacionado aparece de forma sutil no repouso. `demoAutoPlay` e `demoDelay` existem exclusivamente para a página do design system.
- A CTA interna expande a cápsula na direção da seta; o núcleo acompanha o movimento sem deformar.
- Botões de interface com seta expandem na direção da ação: avançar à direita e voltar à esquerda.
- O crescimento usa uma transição contínua de `420ms`: texto, espaço interno, cápsula e seta se movem como uma única peça.
- Respeitar `prefers-reduced-motion`; nesse modo, o texto permanece visível e o avião não anima.
- Não recriar CTAs em CSS de seção. Se um novo caso surgir, estenda este sistema.
- Não usar símbolo textual `→`; use o núcleo de seta do `InternalLink` ou ícone Lucide no `InterfaceButton`.
- CTAs do diagnóstico não devem ser desativados: o clique valida e destaca os campos obrigatórios. `disabled` fica reservado a ações tecnicamente impossíveis.
