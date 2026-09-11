# Requisitos do Projeto — Embarpet

## Status de Rastreabilidade

| Requisito | Descrição | Status | Milestone |
|---|---|---|---|
| `REQ-FE-01` | Home institucional conversiva com buscador de rota no Hero | ✅ Concluído | Milestone 1 |
| `REQ-FE-02` | Modal único de diagnóstico guiado e multi-etapas (`/viajar`) | ✅ Concluído | Milestone 1 |
| `REQ-FE-03` | Página de obrigado com mensagem de WhatsApp contextualizada | ✅ Concluído | Milestone 1 |
| `REQ-FE-04` | 4 páginas de modalidades (Cabine, Bagagem, Cargas, Emocional) | ✅ Concluído | Milestone 1 |
| `REQ-FE-05` | 7 Landing Pages de Destinos (EUA, PT, ES, IT, AR, UY, PY) | ✅ Concluído | Milestone 1 |
| `REQ-FE-06` | Design System estruturado e desacoplado em `src/design-system/` | ✅ Concluído | Milestone 1 |
| `REQ-FE-07` | Suporte a SSG Prerender para indexação em buscadores | ✅ Concluído | Milestone 1 |
| `REQ-FE-08` | Pipeline de CI com GitHub Actions (`tsc` + `build`) | ✅ Concluído | Milestone 1 |
| `REQ-BE-01` | Endpoint público `/api/public/leads` com validação e rate limit | ⏳ Pendente | Milestone 2 |
| `REQ-BE-02` | Ingestão segura de leads no Supabase / CRM Embarpet | ⏳ Pendente | Milestone 2 |
| `REQ-BE-03` | Sincronização e fallback de contingência (Google Sheets) | ⏳ Pendente | Milestone 2 |
| `REQ-ANA-01` | Integração de Google Tag Manager (GTM) e consentimento LGPD | ⏳ Pendente | Milestone 2 |
| `REQ-LP-01` | LPs de alta intenção por corredor e campanha (Ásia, Japão, etc.) | ⏳ Backlog | Milestone 3 |

---

## Detalhamento dos Requisitos do Próximo Milestone (Milestone 2)

### `REQ-BE-01` & `REQ-BE-02`: API Pública de Leads
- Receber payload JSON no formato do contrato `PublicLead` de [`src/lib/lead-contract.ts`](../src/lead-contract.ts).
- Validar campos mandatórios (rota, período, número de pets, contato WhatsApp, consentimento).
- Salvar lead na tabela `public_leads` do Supabase via Service Role Key protegida no backend.
- Notificar canais operacionais e responder status 200/201.
