import dotenvSafe from 'dotenv-safe'

export function loadEnvs() {
  try {
    dotenvSafe.config()
  } catch(err) {
    const error = err as Error
    if (error.name === 'MissingEnvVarsError') {
      throw err
    }
  }
}
