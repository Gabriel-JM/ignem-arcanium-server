import bcrypt from 'bcrypt'
import { HashComparer, TextHasher } from '@/data/protocols/cryptography/index.js'

export class BcryptHasher implements TextHasher, HashComparer {
  #salt: number
  
  constructor (salt: number) {
    this.#salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.#salt)

    return hash
  }

  async compare(input: string, valueToCompare: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(input, valueToCompare)

    return isEqual
  }
}
