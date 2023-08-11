import { JwtEncrypter } from '@/account/infra/cryptography/index.js'

export function makeJwtEncrypter() {
  return new JwtEncrypter(process.env.ENCRYPTER_SECRET)
}
