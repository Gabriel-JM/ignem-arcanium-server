import { JwtEncrypter } from '@/infra/cryptography/index.js'

export function makeJwtEncrypter() {
  return new JwtEncrypter(process.env.ENCRYPTER_SECRET)
}
