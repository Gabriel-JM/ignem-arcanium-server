import { AccountNotFoundError } from '@/data/errors/index.js'
import { Encrypter, HashComparer } from '@/data/protocols/cryptography/index.js'
import { FindAccountByEmailRepository } from '@/data/protocols/repository/index.js'
import { ok } from '@/presentation/helpers/http.js'
import { Controller } from '@/presentation/protocols/index.js'

export interface AccountLoginParams {
  email: string
  password: string
}

export class AccountLoginController implements Controller {
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
  
  async handle(params: AccountLoginParams) {
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

    return ok({
      name: account.name,
      token
    })
  }

}
