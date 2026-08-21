# Sistema de composição Embarpet

Este diretório é a fonte de decisão para novas páginas da Embarpet. Ele complementa o playground e o código: explica **por que** uma peça existe, **onde** ela entra na jornada e **como** reaproveitá-la sem transformar cada página em uma nova landing.

## Ordem de consulta

1. [Princípios e governança](00-principios-e-governanca.md)
2. [Fundamentos e componentes](01-fundamentos-e-componentes.md)
3. [Padrões de seção](02-padroes-de-secao.md)
4. [Arquiteturas de página](03-arquiteturas-de-pagina.md)
5. [Página dourada: index](04-pagina-dourada-index.md)
6. [Brief de produção para pessoas e IA](05-brief-de-producao.md)

## Relação com o código

| Fonte | Papel |
|---|---|
| `design-system/src/features/home/HomePage.tsx` | composição real da index aprovada |
| `design-system/src/features/home/home.css` | layout, responsividade e estilos específicos da home |
| `design-system/src/components/ui/buttons.tsx` | famílias oficiais de CTA |
| `design-system/src/design-system/buttons.css` | tokens e animações dos botões |
| `design-system/src/components/ui/diagnostic-flow.tsx` | diagnóstico guiado e suas etapas |
| `design-system/src/components/ui/navigation.tsx` | navegação e cabeçalho |
| `design-system/src/components/ui/footer.tsx` | rodapé e atalhos institucionais |
| `design-system/src/components/ui/case-drag-cards.tsx` | provas sociais e histórias reais |

## Regra de precedência

1. Regras regulatórias e operação real vencem copy e layout.
2. Este sistema vence preferências isoladas de uma página.
3. A index é a referência visual aprovada; uma nova página só cria exceção quando documenta motivo, impacto e como a exceção será reutilizada.

