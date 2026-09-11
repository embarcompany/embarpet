# Roadmap Oficial — Embarpet

## Visão Geral de Milestones

```text
Milestone 1: Fundação, Design System e Destinos (v1.0.0) ──► [CONCLUÍDO]
Milestone 2: Backend, Ingestão de Leads & Supabase      ──► [PRÓXIMO]
Milestone 3: Analytics Avançado, GTM & Performance       ──► [PLANEJADO]
Milestone 4: LPs de Alta Intenção & Expansão Global     ──► [BACKLOG]
```

---

## Milestone 1: Fundação, Design System & Destinos (v1.0.0) — ✅ CONCLUÍDO

- [x] **Fase 1.1: Reorganização Arquitetural**
  - Mover aplicação para a raiz do repositório.
  - Isolar Design System em `src/design-system/`.
  - Consolidar `public/`, `scripts/`, `package.json` e `vercel.json`.
- [x] **Fase 1.2: Expansão dos 7 Destinos Prioritários**
  - Cadastro de Estados Unidos, Portugal, Espanha, Itália, Argentina, Uruguai e Paraguai.
  - Conexão de rotas dinâmicas no mega menu de navegação.
  - Geração estática SSG de todos os 7 destinos via `prerender.mjs`.
- [x] **Fase 1.3: Governança de Git & CI/CD**
  - Promoção e merge na branch `main`.
  - Tag de release `v1.0.0-foundation-destinations`.
  - Criação do pipeline de CI com GitHub Actions (`.github/workflows/ci.yml`).

---

## Milestone 2: Backend, Ingestão de Leads & Supabase — ⏳ EM ANDAMENTO

- [ ] **Fase 2.1: Esquema de Banco e Tabela de Leads no Supabase**
  - Tabela `public_leads` com RLS e idempotência.
  - Índices para busca rápida por rota, status e data.
- [ ] **Fase 2.2: Endpoint Público de Leads (`/api/public/leads`)**
  - Implementação de API Route / Edge Function com rate limit e validação de schema (`PublicLead`).
  - Chamada em `src/lead-contract.ts` disparada após preenchimento do formulário/modal.
- [ ] **Fase 2.3: Contingência e Integração de Atendimento**
  - Sincronização em segundo plano via `supabase/functions/google-sheets-sync`.
  - Disparo de notificação operacional de novo lead qualificado.

---

## Milestone 3: Analytics, GTM e Otimização — 📅 PLANEJADO

- [ ] **Fase 3.1: Configuração do Google Tag Manager (GTM) e GA4**
- [ ] **Fase 3.2: Camada de Consentimento LGPD (Cookie Banner)**
- [ ] **Fase 3.3: Auditoria Core Web Vitals (LCP, CLS, INP)**
