# Shell Starter (Fase 1 + extensao Fase 2)

Este diretorio contem um kit pronto para copiar em um repositorio Shell SPA.

## Conteudo

- src/styles/shell-theme.css
- src/components/ShellSidebar.tsx
- src/components/ShellTopbar.tsx
- src/pages/FinancasContainerPage.tsx
- src/mf/remoteEvents.ts
- src/mf/types.ts
- src/mf/loadFinancasRemote.ts

## Ordem recomendada

1. Instalar o design system compartilhado: npm i gabri-ui-components.
2. Copiar o conteudo de src para src do repositorio da shell.
3. Importar styles/shell-theme.css no bootstrap da shell.
4. Renderizar FinancasContainerPage na rota /financas.
5. Apontar o remoteUrl para o dominio publicado do modulo de Financas.
6. Evoluir para Module Federation usando loadFinancasRemote e contrato mount/unmount.
