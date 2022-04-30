import jwt from 'jsonwebtoken'
import { Encrypter } from '@/data/protocols/cryptography'

export class JwtEncrypter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(id: string): Promise<string> {
    const token = await jwt.sign({ id }, this.secret, {
      expiresIn: '8d'
    })

    return token
  }
}
