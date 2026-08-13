# Tokens extraídos da IDV

## Cores

| Token | Valor | Uso extraído |
|---|---:|---|
| `--turq` | `#00D1E2` | ações, destaque e progresso |
| `--turq-deep` | `#009DAC` | ícones e ênfase de interface |
| `--teal` | `#05434A` | títulos, texto principal e áreas institucionais |
| `--teal-soft` | `#0B5B62` | apoio do verde-petróleo |
| `--lime` | `#C6D783` | ênfase suave/apoio |
| `--ink` | `#193F43` | texto escuro em fundo claro |
| `--muted` | `#5E7F82` | texto secundário |
| `--line` | `#D8E8E5` | bordas e divisores |
| `--soft` | `#F4FAF8` | fundo de apoio |
| `--paper` | `#FFFFFF` | fundo base |

Verde de sucesso e vermelho de alerta existem como regra semântica, mas não têm hexadecimal definido na fonte.

## Tipografia

| Família | Pesos | Uso |
|---|---|---|
| Montserrat | 400, 500, 600, 700, 800 | interface, títulos, corpo e controles |
| Arial, sans-serif | fallback | pilha de segurança |

## Fundação de layout

| Item | Valor/regra extraída |
|---|---|
| Espaçamento | 8, 12, 18, 28, 44 e 68 px |
| Raios | 9, 14 e 20 px |
| Sombra | `0 18px 45px rgba(5,67,74,.07)` |
| Leitura editorial | `72ch` |
| Conteúdo | até `900px` |
| Breakpoints existentes | 850, 700, 600, 520 e 480 px |

## Componentes e estados

- Ícones: `lucide-react`, SVG inline e linguagem linear consistente.
- Cards: borda fina, raio moderado e sombra discreta.
- Estados de hover, foco, desabilitado e erro ainda não estão definidos como sistema completo; definir antes de implementar componentes finais.

Origem: `C:/Users/usuario/Documents/ChatGPT/Zero ao CVI/app/globals.css` e `Materiais/AGENTS.md`.
