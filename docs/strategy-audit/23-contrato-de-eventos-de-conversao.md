# Contrato de eventos de conversão

**Status:** implementado no frontend; coleta externa depende de consentimento e de um container GTM/GA4 aprovado.  
**Código:** `design-system/src/lib/analytics.ts`

## Princípio

O site mede intenção e avanço de funil, nunca dados pessoais. Nome, telefone, texto livre de campos e a rota completa não entram nos eventos.

## Eventos implementados

| Evento | Quando dispara | Contexto permitido |
|---|---|---|
| `analysis_started` | primeira interação efetiva com o diagnóstico | origem da interface; fluxo mobile ou hero |
| `route_completed` | rota e período válidos | presença de origem/destino; período selecionado |
| `pets_completed` | dados dos pets concluídos | quantidade e espécies |
| `analysis_completed` | resumo preparado | quantidade de pets e período |
| `modality_clicked` | CTA ou detalhe de modalidade | modalidade e ação |
| `whatsapp_clicked` | início da conversa pela assistente flutuante | origem da CTA; existência de rota |

## Como integrar GTM/GA4

1. Implementar a plataforma de consentimento aprovada pela empresa.
2. Após o aceite de analytics, definir `window.__embarpConsentGranted = true`.
3. Carregar o container GTM/GA4 aprovado; a camada passa a inserir os eventos no `window.dataLayer`.
4. Criar no GTM as tags de evento com o mesmo nome e marcar `analysis_completed` como conversão primária no GA4.
5. Validar no Preview do GTM e no DebugView do GA4 antes de publicar campanhas.

## Limites e governança

- Não adicionar PII a `trackConversionEvent`.
- Não carregar GA4/GTM antes do consentimento aprovado.
- Alterações de nomenclatura devem atualizar este documento, GTM e o painel do funil na mesma entrega.
- Eventos são também emitidos como `CustomEvent("embarp:conversion")`, permitindo teste local sem analytics instalado.
