# Busca global de cidades

A busca local já cobre aeroportos comerciais globais, aliases, IATA e pequenos erros de digitação. Para ampliar a cobertura de cidades sem aeroporto próprio, configure no Vercel:

```text
VITE_GOOGLE_MAPS_API_KEY=sua_chave
```

No projeto Google Cloud, habilite **Maps JavaScript API** e **Places API (New)**. Restrinja a chave aos domínios da Embarpet. A interface usa sessões do Places e indica o aeroporto comercial mais próximo apenas como sugestão operacional.

Para atualizar a base local, execute:

```bash
node scripts/build-airport-index.mjs
```

O script usa o conjunto público OurAirports e grava `src/data/airports.global.json`.
