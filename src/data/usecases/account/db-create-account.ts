import { TextHasher } from '@/data/protocols/cryptography'
import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CreateAccountRepository } from '@/data/protocols/repository'
import { CreateAccount, CreateAccountParams } from '@/domain/usecases'

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly textHasher: TextHasher,
    private readonly createAccountRepository: CreateAccountRepository
  ) {}
  
  async create(params: CreateAccountParams): Promise<string> {
    const id = this.uniqueIdGenerator.generate()

    const hashedPassword = this.textHasher.hash(params.password)

    await this.createAccountRepository.create({
      id,
      name: params.name,
      email: params.email,
      password: hashedPassword
    })

    return id
  }
}
