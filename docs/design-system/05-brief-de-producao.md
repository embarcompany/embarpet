# Brief de produção para pessoas e IA

Use este checklist antes de criar uma nova página ou seção.

## Contexto que deve ser informado

- **Jornada:** qual visitante chega aqui e de qual canal?
- **Decisão:** o que ele precisa entender ou decidir agora?
- **Objeção:** qual insegurança impede o próximo passo?
- **Evidência:** que prova, fonte, imagem ou dado autorizado resolve essa insegurança?
- **Ação:** qual único CTA é esperado e qual família de botão ele usa?
- **Continuidade:** para onde a ação leva e que contexto deve ser preservado?

## Template

```md
### Página/seção
Nome:
Público e origem de tráfego:
Pergunta que responde:
Objeção principal:
Resultado esperado:

### Conteúdo
Eyebrow/pílula:
Título (trecho de destaque em cor):
Texto de apoio:
Provas autorizadas e respectivas fontes:
Mídia autorizada e alt:

### Conversão
CTA:
Família: conversão | navegação interna | interface | mídia
Destino/ação:
Evento de analytics:

### Implementação
Padrão reutilizado:
Mobile:
Estados e acessibilidade:
Regras/claims que exigem revisão:
```

## Prompt operacional para IA

> Você está criando uma página para a Embarpet, assessoria de transporte internacional de pets. Não invente regras, credenciais, preços, prazos, elegibilidade ou cases. Comece pela rota e pela decisão do tutor, não pela história institucional. Reutilize os padrões documentados em `docs/design-system/`; escolha um único CTA dominante e a família correta: avião para iniciar análise, seta em círculo para navegação interna, controles simples para interface e play para vídeo. Use título com uma ideia e destaque por cor de texto. Não use sombras, SVGs decorativos ou cards sem função. Garanta mobile, foco visível, alternativa a hover e `prefers-reduced-motion`. Entregue também: propósito, objeção, evento de analytics, fontes e descrição de como o conteúdo preserva a precisão operacional.

## Antes de aprovar

- A página responde uma pergunta de negócio e uma pergunta do usuário?
- Há informação demais antes do CTA?
- O CTA é da família correta?
- Toda foto tem função e permissão?
- Toda métrica, selo ou regra pode ser auditada?
- A página ainda funciona em mobile, teclado, zoom de 200% e redução de movimento?

