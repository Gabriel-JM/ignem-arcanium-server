import bcrypt from 'bcrypt'
import { TextHasher } from '@/data/protocols/cryptography'

export class BcryptAdapter implements TextHasher {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }
}
