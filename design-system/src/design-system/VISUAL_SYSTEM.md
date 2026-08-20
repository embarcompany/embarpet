# Sistema visual Embarpet

## Fontes de verdade

- `tokens.css`: marca, tipografia, escala espacial, raios, superfícies e motion.
- `buttons.css` + `components/ui/buttons.tsx`: todas as ações.
- `visual-contract.css`: contrato de composição aplicado às páginas.
- `components.css`: componentes estruturais compartilhados.

## Regras

1. Não criar cores, espaçamentos, raios ou duração de animação dentro de uma seção.
2. Títulos usam `ep-title-*`; texto usa `ep-copy`; pílula editorial usa `ep-eyebrow`.
3. Conversão usa `AnalysisButton`; navegação de conteúdo usa `InternalLink`; interface usa `InterfaceButton` ou `BackButton`.
4. Seções usam `ep-container` e `--ep-section-space`; exceções precisam ser documentadas neste arquivo.
5. Cards usam `--ep-radius-sm/md`, `--ep-stroke-soft` e nunca usam sombra.
6. Campos usam altura `--ep-control-height-lg`, raio `--ep-radius-sm` e foco turquesa.
7. Destaque em títulos muda a cor da fonte; não cria marca-texto atrás da palavra.
8. Mobile mantém 20px de margem segura, conteúdo em uma coluna e CTAs com largura total quando necessário.
9. Animações usam os tokens `--ep-motion-*` e respeitam `prefers-reduced-motion`.
10. Antes de criar variante nova, verificar se o caso cabe em um componente existente.

## Exceções de marca

- PetLuxo usa fundo escuro e destaque dourado.
- Seção da equipe usa fundo verde profundo e texto claro.
- Hero e CTA final podem ter composição própria, mas obedecem a margem, tipografia e botões do sistema.
