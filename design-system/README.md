# Embarpet Design System

Base em TSX para o novo site institucional conversivo e para futuras landing pages por destino. Este diretório é isolado do CRM atual: pode ser levado para um projeto React/Next/Vite sem alterar o produto em operação.

Leia primeiro o [documento mestre do sistema](DESIGN_SYSTEM.md): ele define a lógica de tipografia, espaço, botões, campos, cards, conteúdo, provas e padrões de página.

## Estrutura

| Arquivo | Responsabilidade |
|---|---|
| `src/tokens.css` | cores, tipografia, grid, espaçamento, raios e estados globais |
| `src/icons.tsx` | ícones lineares funcionais usados pelo sistema |
| `src/primitives.tsx` | botão, container, seção, campo e feedback |
| `src/components.tsx` | componentes de conversão, conteúdo e autoridade |
| `src/patterns.tsx` | composições reutilizáveis de páginas |
| `src/playground.tsx` | catálogo vivo: fundamentos, componentes e padrões |
| `src/index.ts` | API pública para importar o sistema |
| `src/components/ui/` | componentes integrados dos prompts: formulário de rota, acordeão de destinos e scroll fly-in |

## Regras inegociáveis

- Sem sombras, gradientes ou SVGs decorativos.
- PNG para logo e fotografia editorial. SVG somente para ícones funcionais.
- Ícone acompanha texto; nunca é o único portador de significado.
- Cada página tem uma ação primária por área visível.
- Não prometer preço, modalidade, prazo ou requisito regulatório sem análise/fonte atual.

## Uso

```tsx
import {
  Button,
  RouteFieldGroup,
  DestinationExplorer,
  ConversionHero,
} from "@embarpets/design-system";
import "@embarpets/design-system/tokens.css";
```

O playground é a fonte visual de verdade. Antes de criar uma página nova, montar a página com os componentes existentes; criar um componente novo apenas quando a necessidade não for uma variante de um já existente.

## Um banco / vários fronts

Todos os formulários e o WhatsApp devem produzir o mesmo \`PublicLead\` de [\`src/lead-contract.ts\`](src/lead-contract.ts). A diferença entre eles é somente \`source\` e a apresentação. O CRM existente não expõe ainda um endpoint público de lead; antes de produção, criar \`/api/public/leads\` com rate limit, consentimento, validação e encaminhamento seguro ao Supabase/CRM. Não reutilizar o endpoint interno de embarques.

## Estrutura solicitada pelos prompts

O diretório `src/components/ui` foi criado para manter componentes de interface descobríveis e reaproveitáveis, seguindo o padrão shadcn. O projeto agora tem TypeScript, Tailwind e os pacotes `framer-motion` e `lucide-react`; não foi necessário instalar o CLI do shadcn porque não há componentes shadcn de terceiros a inicializar.
