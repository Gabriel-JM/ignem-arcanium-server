import { EmailAlreadyInUseError } from '@/data/errors'
import { Encrypter, TextHasher } from '@/data/protocols/cryptography'
import { UniqueIdGenerator } from '@/data/protocols/identification'
import { CheckAccountByEmailRepository, CreateAccountRepository } from '@/data/protocols/repository'
import { CreateAccount, CreateAccountParams, CreateAccountResult } from '@/domain/usecases'

export class DbCreateAccount implements CreateAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly uniqueIdGenerator: UniqueIdGenerator,
    private readonly textHasher: TextHasher,
    private readonly createAccountRepository: CreateAccountRepository,
    private readonly encrypter: Encrypter
  ) {}
  
  async create(params: CreateAccountParams): Promise<CreateAccountResult> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(params.email)

    if (exists) {
      throw new EmailAlreadyInUseError()
    }

    const id = this.uniqueIdGenerator.generate()

    const hashedPassword = await this.textHasher.hash(params.password)

    await this.createAccountRepository.create({
      id,
      name: params.name,
      email: params.email,
      password: hashedPassword
    })

    const token = await this.encrypter.encrypt({ id, name: params.name })

    return {
      name: params.name,
      token
    }
  }
}
