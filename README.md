# Shell Host de Financas

Shell SPA em React + Vite para consumir o modulo de Financas no plano em 2 fases:

- Fase 1: consumo do build estatico em modo embed
- Fase 2: evolucao para Module Federation em runtime

## Design System Compartilhado

Esta shell usa a biblioteca `gabri-ui-components` (mesma base visual do MFE) para componentes de UI como:

- Button
- Card
- MetricCard
- DataTable

## Kit pronto para copiar

- Guia: shell-starter/README.md
- Arquivos-base: shell-starter/src

## Rodando localmente

1. Instale dependencias:

```bash
npm install
```

2. Defina a URL do modulo remoto (opcional):

```bash
set VITE_FINANCAS_REMOTE_URL=http://localhost:3003/
```

Sem variavel, o default de desenvolvimento ja aponta para `http://localhost:3003/`.

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
- Validacao de origem permitida para injetar o remote
- Eventos basicos host/modulo no window:
  - financas:loaded
  - financas:load_error
  - financas:retry

## Producao (Vercel)

Defina no projeto da shell na Vercel:

- `VITE_FINANCAS_REMOTE_URL=https://<seu-mfe>.vercel.app/`
- `VITE_FINANCAS_ALLOWED_ORIGINS=https://<seu-mfe>.vercel.app`

Opcionalmente, adicione mais origens separadas por virgula:

- `VITE_FINANCAS_ALLOWED_ORIGINS=https://<mfe-a>.vercel.app,https://<mfe-b>.vercel.app`

## Pontos de extensao para Fase 2

- Contrato tipado de microfrontend em src/mf/types.ts
- Loader reservado para remote federado em src/mf/loadFinancasRemote.ts

Quando o remoto federado estiver publicado, o iframe pode ser substituido por mount/unmount com lazy-load por rota.
