declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CLIENT_URL: string
      DB_URL: string
      SHOW_LOGS: string
      ENCRYPTER_SECRET: string
    }
  }
}

export {}
