import { BcryptHasher } from '@/account/infra/cryptography/index.js'

export function makeBcryptHasher() {
  const salt = 12
  return new BcryptHasher(salt)
}
