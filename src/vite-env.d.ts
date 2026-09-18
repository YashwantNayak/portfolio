/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_USER_ID?: string
  readonly VITE_ADMIN_PASSWORD?: string
  readonly [key: string]: any
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
