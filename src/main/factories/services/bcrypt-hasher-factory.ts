import { BcryptHasher } from '@/infra/cryptography'

export function makeBcryptHasher() {
  const salt = 12
  return new BcryptHasher(salt)
}
