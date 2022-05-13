import jwt from 'jsonwebtoken'
import { Encrypter, EncryptionVerifier } from '@/data/protocols/cryptography'

export class JwtEncrypter implements Encrypter, EncryptionVerifier {
  constructor(private readonly secret: string) {}
  
  verify(value: string): boolean {
    try {
      jwt.verify(value, this.secret)
      return true
    } catch {
      return false
    }
  }

  async encrypt(id: string): Promise<string> {
    const token = await jwt.sign({ id }, this.secret, {
      expiresIn: '8d'
    })

    return token
  }
  
}
