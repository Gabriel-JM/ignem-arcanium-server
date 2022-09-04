import { AccountNotFoundError } from '@/data/errors/index.js'
import { Encrypter, HashComparer } from '@/data/protocols/cryptography/index.js'
import { FindAccountByEmailRepository } from '@/data/protocols/repository/index.js'
import { AccountLogin, AccountLoginParams, AccountLoginResult } from '@/domain/usecases/index.js'

export class DbAccountLogin implements AccountLogin {
  #findAccountByEmailRepository: FindAccountByEmailRepository
  #hashComparer: HashComparer
  #encrypter: Encrypter
  
  constructor(
    findAccountByEmailRepository: FindAccountByEmailRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter
  ) {
    this.#findAccountByEmailRepository = findAccountByEmailRepository
    this.#hashComparer = hashComparer
    this.#encrypter = encrypter
  }
  
  async login(params: AccountLoginParams): Promise<AccountLoginResult> {
    const account = await this.#findAccountByEmailRepository.findByEmail(params.email)

    if (!account) {
      throw new AccountNotFoundError()
    }

    const isEqual = await this.#hashComparer.compare(params.password, account.password)

    if (!isEqual) {
      throw new AccountNotFoundError()
    }

    const token = await this.#encrypter.encrypt({
      id: account.id,
      name: account.name
    })

    return {
      name: account.name,
      token
    }
  }
}
