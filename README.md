# Shell Host de Financas

Shell SPA em React + Vite para consumir o modulo de Financas no plano em 2 fases:

- Fase 1: consumo do build estatico em modo embed
- Fase 2: evolucao para Module Federation em runtime

## Rodando localmente

1. Instale dependencias:

```bash
npm install
```

2. Defina a URL do modulo remoto (opcional, recomendado):

```bash
set VITE_FINANCAS_REMOTE_URL=https://seu-dominio-financas/
```

3. Suba a shell:

```bash
npm run dev
```

4. Abra:

- http://localhost:5173/
- http://localhost:5173/financas

## Validacoes implementadas

- Rota da shell em /financas
- Navegacao para /, /transactions/ e /analytics/ dentro do modulo
- Fallback visual em erro de carregamento
- Retry com backoff exponencial
- Eventos basicos host/modulo no window:
  - financas:loaded
  - financas:load_error
  - financas:retry

## Pontos de extensao para Fase 2

- Contrato tipado de microfrontend em src/mf/types.ts
- Loader reservado para remote federado em src/mf/loadFinancasRemote.ts

Quando o remoto federado estiver publicado, o iframe pode ser substituido por mount/unmount com lazy-load por rota.
