import { JwtEncrypter } from '@/infra/cryptography/index.ts'

export function makeJwtEncrypter() {
  return new JwtEncrypter(process.env.ENCRYPTER_SECRET)
}
