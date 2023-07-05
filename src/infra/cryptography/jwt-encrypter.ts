import jwt from 'jsonwebtoken'
import { Decrypter, Encrypter, EncryptionVerifier } from '@/data/protocols/cryptography/index.ts'

export class JwtEncrypter implements Encrypter, EncryptionVerifier, Decrypter {
  #secret: string
  
  constructor(secret: string) {
    this.#secret = secret
  }
  
  verify(value: string): boolean {
    try {
      jwt.verify(value, this.#secret)
      return true
    } catch {
      return false
    }
  }

  async decrypt<T = unknown>(value: string): Promise<T | null> {
    try {
      return await jwt.verify(value, this.#secret) as T
    } catch {
      return null
    }
  }

  async encrypt(data: Record<string, unknown>): Promise<string> {
    const token = await jwt.sign(data, this.#secret, {
      expiresIn: '8d'
    })

    return token
  }
  
}
