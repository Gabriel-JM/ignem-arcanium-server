import { EmailAlreadyInUseError } from '@/data/errors/index.js'
import { Encrypter, TextHasher } from '@/data/protocols/cryptography/index.js'
import { UniqueIdGenerator } from '@/data/protocols/identification/index.js'
import { CheckAccountByEmailRepository, CreateAccountRepository } from '@/data/protocols/repository/index.js'
import { created } from '@/presentation/helpers/http.js'
import { Controller } from '@/common/presentation/protocols/index.js'

export interface CreateAccountParams {
  name: string
  email: string
  password: string
}

export class CreateAccountController implements Controller {
  #checkAccountByEmailRepository: CheckAccountByEmailRepository
  #uniqueIdGenerator: UniqueIdGenerator
  #textHasher: TextHasher
  #createAccountRepository: CreateAccountRepository
  #encrypter: Encrypter
  
  constructor(
    checkAccountByEmailRepository: CheckAccountByEmailRepository,
    uniqueIdGenerator: UniqueIdGenerator,
    textHasher: TextHasher,
    createAccountRepository: CreateAccountRepository,
    encrypter: Encrypter
  ) {
    this.#checkAccountByEmailRepository = checkAccountByEmailRepository
    this.#uniqueIdGenerator = uniqueIdGenerator
    this.#textHasher = textHasher
    this.#createAccountRepository = createAccountRepository
    this.#encrypter = encrypter
  }
  
  async handle(params: CreateAccountParams) {
    const exists = await this.#checkAccountByEmailRepository.checkByEmail(params.email)

    if (exists) {
      throw new EmailAlreadyInUseError()
    }

    const id = this.#uniqueIdGenerator.generate('accounts')

    const hashedPassword = await this.#textHasher.hash(params.password)

    await this.#createAccountRepository.create({
      id,
      name: params.name,
      email: params.email,
      password: hashedPassword
    })

    const token = await this.#encrypter.encrypt({ id, name: params.name })

    return created({
      name: params.name,
      token
    })
  }
}
