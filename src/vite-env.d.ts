/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FINANCAS_REMOTE_URL?: string
  readonly VITE_FINANCAS_ALLOWED_ORIGINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}