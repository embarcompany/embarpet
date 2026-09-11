# Estado Atual do Projeto — GSD

**Data:** 2026-09-11  
**Milestone Ativo:** Milestone 2 (Backend, Ingestão de Leads & Supabase)  
**Status do Milestone 1:** Concluído com sucesso (v1.0.0)  
**Branch Atual:** `main` (sincronizada com `origin/main`)  
**Último Commit:** `658c92f`

---

## Métricas de Progresso

- **Milestones:** 1 / 4 Concluídos (25%)
- **Páginas de Destino Ativas:** 7 / 7 (100%)
- **Páginas de Modalidades Ativas:** 4 / 4 (100%)
- **Páginas Institucionais:** 1 / 1 (Quem Somos `/sobre`)
- **Status do Build:** ✅ Passando (TypeScript + Vite + SSR + Prerender SSG)
- **CI Quality Gate:** ✅ Ativo (`.github/workflows/ci.yml`)

---

## Decisões Arquiteturais Registradas

1. **Website na Raiz:** Estrutura unificada com Design System em `src/design-system/` e features em `src/features/`.
2. **Contrato Canônico de Leads:** `PublicLead` em `src/lib/lead-contract.ts` é a fonte da verdade para dados de formulários e WhatsApp.
3. **SSG Multidestinos:** 7 países pré-renderizados estaticamente no build para SEO indexável.
4. **Governança de Branches:** Branch `main` protegida como produção; feature branches no padrão `feat/*`.

---

## Próxima Ação Recomendada

Iniciar a **Fase 2.1 do Milestone 2**:
- Planejar a integração do endpoint `/api/public/leads` e esquema de persistência no Supabase.
- Comando recomendado: `gsd-plan-phase 2` ou `gsd-discuss-phase 2`.
