import bcrypt from 'bcrypt'
import { HashComparer, TextHasher } from '@/data/protocols/cryptography'

export class BcryptHasher implements TextHasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }

  async compare(input: string, valueToCompare: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(input, valueToCompare)

    return isEqual
  }
}
