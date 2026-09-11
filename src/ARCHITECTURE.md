# Estrutura do front-end

- `design-system/`: tokens, primitivas, padrões e componentes visuais reutilizáveis. Não contém copy nem estado específico de página.
- `features/home/`: composição, conteúdo e estilos exclusivos da Index conversiva.
- `components/ui/`: componentes interativos compartilháveis (formulário, header, footer, WhatsApp, cards e animações).
- `data/`: fontes de dados auditáveis, como cidades e aeroportos.
- `lead-contract.ts`: contrato único dos dados de lead, independente do frontend do formulário.
- `app/`: composição da aplicação e futuras rotas.

Ao criar uma LP, reutilize o `design-system/` e os módulos de `components/ui/`; mantenha copy, imagens e regras exclusivas dentro de `features/<nome-da-lp>/`.
