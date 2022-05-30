import { JwtEncrypter } from '@/infra/cryptography'

export function makeJwtEncrypter() {
  return new JwtEncrypter(process.env.ENCRYPTER_SECRET)
}
