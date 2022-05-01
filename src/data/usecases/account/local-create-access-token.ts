import { Encrypter } from '@/data/protocols/cryptography'
import { CreateAccessToken } from '@/domain/usecases'

export class LocalCreateAccessToken implements CreateAccessToken {
  constructor(private readonly encrypter: Encrypter) {}
  
  async create(accountId: string): Promise<string> {
    return await this.encrypter.encrypt(accountId)
  }
}
