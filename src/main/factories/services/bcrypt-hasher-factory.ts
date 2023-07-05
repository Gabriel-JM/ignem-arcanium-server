import { BcryptHasher } from '@/infra/cryptography/index.ts'

export function makeBcryptHasher() {
  const salt = 12
  return new BcryptHasher(salt)
}
