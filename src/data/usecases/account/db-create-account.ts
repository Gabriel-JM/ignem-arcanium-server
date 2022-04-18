import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CreateAccount, CreateAccountParams } from '@/domain/usecases'

export class DbCreateAccount implements CreateAccount {
  constructor(private readonly uniqueIdGenerator: UniqueIdGenerator) {}
  
  async create(params: CreateAccountParams): Promise<string> {
    await this.uniqueIdGenerator.generate()

    return ''
  }
}
