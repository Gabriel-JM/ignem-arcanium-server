import { TextHasher } from '@/data/protocols/cryptography'
import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CreateAccount, CreateAccountParams } from '@/domain/usecases'

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly textHasher: TextHasher
  ) {}
  
  async create(params: CreateAccountParams): Promise<string> {
    this.uniqueIdGenerator.generate()

    this.textHasher.hash(params.password)

    return ''
  }
}
